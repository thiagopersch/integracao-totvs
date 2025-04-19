import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import { parseStringPromise } from 'xml2js';
import { TbcService } from '../tbc/tbc.service';

@Injectable()
export class TotvsService {
  constructor(private tbcService: TbcService) {}

  private async createSoapClient(tbcId: string) {
    const config = await this.tbcService.findOne(tbcId);
    const wsdlUrl = config.link.endsWith('/')
      ? `${config.link}wsDataServer/MEX?wsdl`
      : `${config.link}/wsDataServer/MEX?wsdl`;
    const client = await soap.createClientAsync(wsdlUrl);
    const auth =
      'Basic ' +
      Buffer.from(`${config.user}:${config.password}`).toString('base64');
    client.addHttpHeader('Authorization', auth);
    return client;
  }

  private getDynamicKey(parsedResult: any, dataServerName: string) {
    let dynamicKey = dataServerName;

    if (!parsedResult[dynamicKey]) {
      if (dataServerName === 'FinCFODataBR') {
        return dynamicKey;
      }

      const shouldRemoveDataSuffix = /(Data|Server)$/.test(dataServerName);
      if (shouldRemoveDataSuffix) {
        dynamicKey = dataServerName.replace(/Data|BR|Server|RMS/g, '');
      }
    }

    return dynamicKey;
  }

  private extractTables(parsedResult: any, dynamicKey: string) {
    const tables =
      parsedResult[dynamicKey]['xs:schema'][0]['xs:element'][0][
        'xs:complexType'
      ][0]['xs:choice'][0]['xs:element'];
    return tables.map((table: any) => {
      const tableName = table.$.name;
      const schemaElements =
        table['xs:complexType'][0]['xs:sequence'][0]['xs:element'];

      const fields = schemaElements.map((element: any) => ({
        name: element.$.name,
        caption: element.$['msdata:Caption'],
        type: (element.$.type ?? 'xs:string').replace(/^xs:/, ''),
        default: element.$.default,
      }));

      return { tableName, fields };
    });
  }

  private extractPrimaryKeys(parsedResult: any, dynamicKey: string) {
    const primaryKey =
      parsedResult[dynamicKey]['xs:schema'][0]['xs:element'][0]['xs:unique'][0][
        'xs:field'
      ];
    return primaryKey
      .map((field: any) => field.$.xpath.replace(/^mstns:/, ''))
      .join(';');
  }

  async getSchema(dataServerName: string, tbcId: string, contexto: string) {
    try {
      const client = await this.createSoapClient(tbcId);
      const args = { DataServerName: dataServerName, Contexto: contexto };
      const [result] = await client.GetSchemaAsync(args);
      const parsedResult = await parseStringPromise(result.GetSchemaResult);

      const dynamicKey = this.getDynamicKey(parsedResult, dataServerName);
      if (!parsedResult[dynamicKey]) {
        throw new Error(
          `Chave ${dynamicKey} não encontrada no resultado analisado.`,
        );
      }

      const extractedData = this.extractTables(parsedResult, dynamicKey);
      const primaryKeys = this.extractPrimaryKeys(parsedResult, dynamicKey);

      return { extractedData, primaryKeys };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readView(
    dataServerName: string,
    filtro: string,
    contexto: string,
    tbcId: string,
  ): Promise<string> {
    try {
      const client = await this.createSoapClient(tbcId);

      const args = {
        DataServerName: dataServerName,
        Filtro: filtro,
        Contexto: contexto,
      };

      const [result] = await client.ReadViewAsync(args);
      const parsedResult = await parseStringPromise(result.ReadViewResult);
      return parsedResult;
    } catch (error) {
      console.error(`Failed to read view: ${error.message}`);
    }
  }

  async readRecord(
    dataServerName: string,
    primaryKey: string,
    contexto: string,
    tbcId: string,
  ): Promise<any> {
    try {
      const client = await this.createSoapClient(tbcId);

      const args = {
        DataServerName: dataServerName,
        PrimaryKey: primaryKey,
        Contexto: contexto,
      };

      const [result] = await client.ReadRecordAsync(args);
      const parsedResult = await parseStringPromise(result.ReadRecordResult);
      return parsedResult;
    } catch (error) {
      console.error(`Failed to read record: ${error.message}`);
    }
  }

  async saveRecord(
    dataServerName: string,
    xml: string,
    contexto: string,
    tbcId: string,
  ): Promise<any> {
    try {
      const client = await this.createSoapClient(tbcId);

      const xmlData = `<![CDATA[${xml}]]>`;

      const [results] = await client.SaveRecordAsync({
        DataServerName: dataServerName,
        XML: xmlData,
        Contexto: contexto,
      });

      const parsedResult = await results;
      return parsedResult.SaveRecordResult;
    } catch (error) {
      console.error(error);
    }
  }
}
