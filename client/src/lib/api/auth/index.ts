import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}
