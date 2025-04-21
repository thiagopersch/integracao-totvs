import axios from 'axios';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const createApi = (session?: Session | null) => {
  const jwt = session?.token;
  const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    timeout: 60000,
    headers: {
      authorization:
        jwt && typeof jwt === 'string' ? `Bearer ${jwt}` : undefined,
    },
  });

  api.interceptors.request.use((config) => {
    const params = config.params || {};
    config.params = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 && data.message === 'Unauthorized') {
          await signOut({
            callbackUrl: '/signIn',
            redirect: true,
          });
          return;
        }

        console.error('API Error:', error.response);
        return Promise.reject(
          new Error('Ocorreu um erro na requisição. Tente novamente.'),
        );
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
