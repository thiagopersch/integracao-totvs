import axios from 'axios';

const getSchema = async (
  dataServerName: string,
  username: string,
  password: string,
  tbc: string,
  contexto: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/totvs/get-schema`,
      {
        params: {
          dataServerName,
          username,
          password,
          tbc,
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
