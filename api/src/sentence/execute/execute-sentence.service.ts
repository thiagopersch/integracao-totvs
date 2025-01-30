import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import * as xml2js from 'xml2js';

@Injectable()
export class ExecuteSentenceService {
  async performSentence(
    codColigada: string,
    codSistema: string,
    codSentenca: string,
    parameters: string,
    username: string,
    password: string,
    tbc: string,
  ): Promise<any> {
    try {
      const parser = new xml2js.Parser();
      const existTbc = tbc.endsWith('/')
        ? `${tbc}wsConsultaSQL/MEX?wsdl`
        : `${tbc}/wsConsultaSQL/MEX?wsdl`;

      const client = await soap.createClientAsync(existTbc);

      const auth =
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
      client.addHttpHeader('Authorization', auth);

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
