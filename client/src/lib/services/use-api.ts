import { Session } from 'next-auth';
import { useMemo } from 'react';
import useApiService from './api';

export function useApi(session?: Session | null) {
  const store = useMemo(() => useApiService(session), [session]);
  return store;
}
