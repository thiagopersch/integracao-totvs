import { FormattedUsers, User } from '@/model/user';
import { userMappers } from '@/pipes/userMappers';
import createApi from '@/services/api';
import { Session } from 'next-auth';

type ListUsersFilters = Partial<{
  id: string;
  name: string;
  email: string;
  change_password: string;
  status: string;
  created_at: string;
  updated_at: string;
}>;

export const listUsers = async (
  session?: Session,
  filters: ListUsersFilters = {},
): Promise<FormattedUsers[]> => {
  const api = createApi(session);

  const response = await api.get<User[]>('/users', { params: filters });
  return response.data.map(userMappers);
};
