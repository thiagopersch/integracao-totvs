import axios from 'axios';

type PerformSentenceProps = Partial<{
  codColigada: string;
  codSistema: string;
  codSentenca: string;
  parameters?: string;
  result?: string;
  tbcId: string;
}>;

const performSentence = async (formData: PerformSentenceProps) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/sentence/execute`,
      { params: formData },
    );
    return response.data;
  } catch (error) {
    console.error('Error reading record:', error);
    throw error;
  }
};

export default performSentence;
