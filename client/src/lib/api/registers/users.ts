import { userMappers } from '@/pipes/userMappers';
import createApi from '@/services/api';
import { FormattedUsers, User } from '@/types/user';
import { AxiosInstance } from 'axios';
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

class UserService {
  private api: AxiosInstance;

  constructor(session?: Session) {
    this.api = createApi(session);
  }

  async listUsers(filters: ListUsersFilters = {}): Promise<FormattedUsers[]> {
    const response = await this.api.get<User[]>('/users', { params: filters });
    return response.data.map(userMappers);
  }

  async getUserById(id: string): Promise<User | null> {
    const response = await this.api.get<User>(`/users/${id}`);
    return response.data;
  }

  async addUser(userData: User): Promise<User> {
    const requestData = {
      ...userData,
      id: userData.id ? userData.id : undefined,
    };
    const response = userData.id
      ? await this.api.patch<User>(`/users/${userData.id}`, requestData)
      : await this.api.post<User>('/users', requestData);
    return response.data;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.api.delete(`/users/${id}`);
    return true;
  }
}

export default UserService;
