import axios from 'axios';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const createApi = (session?: Session | null) => {
  const jwt = session?.token ? session?.token : localStorage.getItem('token');
  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
  });

  api.interceptors.request.use((config) => {
    const params = config.params || {};
    const newParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );

    config.params = newParams;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        signOut({
          callbackUrl: '/login',
          redirect: true,
        });
        return undefined;
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;

/* import axios, { AxiosInstance } from 'axios';

const useApiService = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  const get = async <T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<T> => {
    const response = await api.get(url, { params });
    return response.data;
  };

  const post = async <T>(
    url: string,
    data: Record<string, any>,
  ): Promise<T> => {
    const response = await api.post(url, data);
    return response.data;
  };

  const put = async <T>(url: string, data: Record<string, any>): Promise<T> => {
    const response = await api.put(url, data);
    return response.data;
  };

  const del = async <T>(url: string): Promise<T> => {
    const response = await api.delete(url);
    return response.data;
  };

  return { get, post, put, del };
};

export default useApiService;
 */
