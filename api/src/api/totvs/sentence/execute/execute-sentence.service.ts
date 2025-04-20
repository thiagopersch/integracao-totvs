import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import { TbcService } from 'src/api/tbc/tbc.service';
import * as xml2js from 'xml2js';

@Injectable()
export class ExecuteSentenceService {
  constructor(private tbcService: TbcService) {}

  private async createSoapClient(tbcId: string) {
    const config = await this.tbcService.findOne(tbcId);
    const wsdlUrl = config.link.endsWith('/')
      ? `${config.link}wsConsultaSQL/MEX?wsdl`
      : `${config.link}/wsConsultaSQL/MEX?wsdl`;
    const client = await soap.createClientAsync(wsdlUrl);
    const auth =
      'Basic ' +
      Buffer.from(`${config.user}:${config.password}`).toString('base64');
    client.addHttpHeader('Authorization', auth);
    return client;
  }

  async performSentence(
    codColigada: string,
    codSistema: string,
    codSentenca: string,
    parameters: string,
    tbcId: string,
  ): Promise<any> {
    try {
      const parser = new xml2js.Parser();
      const client = await this.createSoapClient(tbcId);

      const args = {
        codSentenca,
        codColigada,
        codSistema,
        parameters,
      };

      const [result] = await client.RealizarConsultaSQLAsync(args);
      const parsedResult = await result.RealizarConsultaSQLResult;
      const parsedXml = await parser.parseStringPromise(parsedResult);
      const resultado = parsedXml.NewDataSet.Resultado;

      const formatItem = (item: any): any => {
        if (Array.isArray(item)) {
          return item.length === 1 ? formatItem(item[0]) : item.map(formatItem);
        } else if (item && typeof item === 'object') {
          if (item.$ && item.$['xml:space'] === 'preserve') {
            return '';
          }
          const formattedItem: any = {};
          for (const key in item) {
            formattedItem[key] = formatItem(item[key]);
          }
          return formattedItem;
        } else {
          return item;
        }
      };

      const formattedResult = formatItem(resultado);
      return formattedResult;
    } catch (error) {
      console.error(`Failed to execute sentence: ${error.message}`);
    }
  }
}
