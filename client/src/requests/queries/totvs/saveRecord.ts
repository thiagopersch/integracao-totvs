import axios from 'axios';

const encodeSpecialChars = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '&#10;');
};

const decodeSpecialChars = (str: string) => {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#10;/g, '\n');
};

export const saveRecord = async (
  codColigada: string,
  codSistema: string,
  codSentenca: string,
  nameSentenca: string,
  sentenca: string,
  dataServerName: string,
  contexto: string,
  username: string,
  password: string,
  tbc: string,
) => {
  const cleanSentenca = encodeSpecialChars(sentenca);

  const data = {
    dataServerName: dataServerName,
    contexto: contexto,
    username: username,
    password: password,
    tbc: tbc,
    xml: `<GlbConsSql>
  <GConsSql>
    <CODCOLIGADA>${codColigada}</CODCOLIGADA>
    <APLICACAO>${codSistema}</APLICACAO>
    <CODSENTENCA>${codSentenca}</CODSENTENCA>
    <TITULO>${nameSentenca}</TITULO>
    <SENTENCA>${cleanSentenca}</SENTENCA>
  </GConsSql>
</GlbConsSql>`,
  };

  console.log(data);

  try {
    return await axios.post(`${process.env.API_URL}/totvs/save-record`, data);
  } catch (error) {
    console.error('Error saving record:', error);
  }
};
