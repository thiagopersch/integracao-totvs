import useApiService from '@/services/api';
import { Session } from 'next-auth';
import { isServer } from './isServer';
import { unstable__api } from './unstable-api';

type CreateSessionParams = {
  login: string;
  password: string;
};

export const createSession = (params: CreateSessionParams) => {
  const baseURL = isServer
    ? process.env.APP_URL_INTERNAL
    : process.env.LOCAL_API_URL;

  return unstable__api.post(`${baseURL}/api/login`, params);
};

type FetchSessionFilters = {
  login?: string;
  password?: string;
};

const BASE_URL = isServer ? process.env.API_URL : process.env.LOCAL_API_URL;

export const SESSION_KEYS = {
  all: ['sessions'] as const,
  users: () => [...SESSION_KEYS.all, 'users'] as const,
} as const;

export const getSession = async () => {
  try {
    const response = await unstable__api.get<{ token?: string }>(
      `${BASE_URL}/api/login`,
    );
    return response.data;
  } catch {
    return undefined;
  }
};

export const FetchSession = async (
  session?: Session | undefined,
  filters: FetchSessionFilters = {},
) => {
  const api = useApiService(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.post('/auth/login', { params });

  return response;
};
