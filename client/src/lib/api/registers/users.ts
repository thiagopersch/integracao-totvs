import createApi from '@/lib/services/api';
import { userMappers } from '@/pipes/mappers';
import { FormattedUsers, User } from '@/types/user';

export const listUsers = async (
  filters: Partial<User> = {},
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
    const response = await api.post<{ success: boolean; data: User }>(
      '/users',
      userData,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to save user');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: User): Promise<User> => {
  try {
    const api = createApi();
    const response = await api.patch<{ success: boolean; data: User }>(
      `/users/${id}`,
      userData,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to update user');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
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
