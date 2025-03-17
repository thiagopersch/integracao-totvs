import axios from 'axios';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const createApi = (session?: Session | null) => {
  const jwt = session?.token;
  const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : undefined,
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

        if (
          status === 401 ||
          (data && (data.user === null || data.user === undefined))
        ) {
          await signOut({
            callbackUrl: '/signIn',
            redirect: true,
          });
          return undefined;
        }

        if (
          !document.cookie.includes(
            `${process.env.NEXTAUTH_COOKIE_SESSION_TOKEN}`,
          ) &&
          !jwt
        ) {
          await signOut({
            callbackUrl: '/signIn',
            redirect: true,
          });
          return undefined;
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
