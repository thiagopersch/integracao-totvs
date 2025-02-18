import createApi from '@/services/api';
import { FormattedUsers, User } from '@/types/user';
import { userMappers } from '@/pipes/userMappers';

type ListUsersFilters = Partial<{
  id: string;
  name: string;
  email: string;
  change_password: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
}>;

export const listUsers = async (
  filters: ListUsersFilters = {},
): Promise<FormattedUsers[]> => {
  try {
    const api = createApi();
    const response = await api.get<{
      success: boolean;
      message?: string;
      data: User[];
    }>('/users', { params: filters });
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch users');
    }

    return response.data.data.map(userMappers);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const api = createApi();
    const response = await api.get<{
      success: boolean;
      data: User;
      message?: string;
    }>(`/users/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'User not found');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const addUser = async (userData: User): Promise<User> => {
  try {
    const api = createApi();
    const requestData = {
      ...userData,
      id: userData.id ? userData.id : undefined,
    };

    const response = userData.id
      ? await api.patch<{ success: boolean; data: User }>(
          `/users/${userData.id}`,
          requestData,
        )
      : await api.post<{ success: boolean; data: User }>('/users', requestData);

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to save user');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const api = createApi();
    const response = await api.delete<{ success: boolean }>(`/users/${id}`);

    if (!response.data.success) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};
