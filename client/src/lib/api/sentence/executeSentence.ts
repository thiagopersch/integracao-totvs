import axios from 'axios';

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
