import createApi from '@/lib/services/api';
import { tbcMappers } from '@/pipes/mappers';
import { FormattedTBC, TBC } from '@/types/tbc';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const findAll = async (
  filters: Partial<TBC> = {},
): Promise<FormattedTBC[]> => {
  try {
    const api = createApi();
    const response = await api.get<ApiResponse<TBC[]>>('/tbc', {
      params: filters,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch tbc');
    }

    return response.data.data.map(tbcMappers);
  } catch (error) {
    console.error('Error fetching tbc:', error);
    throw error;
  }
};

export const findById = async (id: string): Promise<TBC> => {
  try {
    const api = createApi();
    const response = await api.get<ApiResponse<TBC>>(`/tbc/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'TBC not found');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const create = async (tbc: TBC): Promise<TBC> => {
  try {
    const api = createApi();
    const response = await api.post<{ success: boolean; data: TBC }>(
      '/tbc',
      tbc,
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

export const update = async (id: string, tbc: Partial<TBC>): Promise<TBC> => {
  try {
    const api = createApi();
    const response = await api.patch<{ success: boolean; data: TBC }>(
      `/tbc/${id}`,
      tbc,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to update tbc');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const remove = async (id: string): Promise<boolean> => {
  try {
    const api = createApi();
    const response = await api.delete<{ success: boolean }>(`/tbc/${id}`);

    if (!response.data.success) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};
