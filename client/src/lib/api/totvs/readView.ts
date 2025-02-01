import axios from 'axios';

const readView = async (
  dataServerName: string,
  filtro: string,
  contexto: string,
  username: string,
  password: string,
  tbc: string,
) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/totvs/read-view`, {
      params: {
        dataServerName,
        filtro,
        contexto,
        username,
        password,
        tbc,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error reading view:', error);
    throw error;
  }
};

export default readView;
