import axios from 'axios';

const readRecord = async (
  dataServerName: string,
  primaryKey: string,
  contexto: string,
  tbcId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/totvs/read-record`,
      {
        params: {
          dataServerName,
          primaryKey,
          contexto,
          tbcId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error reading record:', error);
    throw error;
  }
};

export default readRecord;
