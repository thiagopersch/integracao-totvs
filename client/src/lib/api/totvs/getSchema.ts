import axios from 'axios';

const getSchema = async (
  dataServerName: string,
  tbcId: string,
  contexto: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/totvs/get-schema`,
      {
        params: {
          dataServerName,
          tbcId,
          contexto,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error getting schema:', error);
    throw error;
  }
};

export default getSchema;
