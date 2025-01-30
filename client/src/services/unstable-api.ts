import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import useApiService from './api';
import { isServer } from './isServer';
import queryClient from './queryClient';
import { SESSION_KEYS } from './session';

const unstable__api = useApiService();

if (!isServer) {
  unstable__api.interceptors.request.use(async (config) => {
    const session = queryClient.getQueryData<{ token?: string }>([
      SESSION_KEYS.all,
    ]);
    let token = session?.token;

    const isSessionRequest = config.url === `${process.env.API_URL}/auth/login`;

    if (!token && !isSessionRequest) {
      const newSession = await getSession();
      queryClient.setQueryData([SESSION_KEYS.all], newSession);
      token = newSession?.token;
    }

    config.headers.Authorization = token ? `Bearer ${token}` : undefined;

    return config;
  });
}

export const createUnstableApi = (session?: Session | null) => {
  const authorization = session?.token ? `Bearer ${session.token}` : undefined;
  unstable__api.defaults.headers.common.Authorization = authorization;

  return unstable__api;
};

export { unstable__api };
