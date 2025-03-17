import createApi from '@/lib/services/api';
import { clientMappers } from '@/pipes/mappers';
import { Client, FormattedClient } from '@/types/client';

export const findAll = async (
  filters: Partial<Client> = {},
): Promise<FormattedClient[]> => {
  try {
    const api = createApi();
    const response = await api.get<{
      success: boolean;
      message?: string;
      data: Client[];
    }>('/client', { params: filters });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch client');
    }

    return response.data.data.map(clientMappers);
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

export const findById = async (id: string): Promise<Client> => {
  try {
    const api = createApi();
    const response = await api.get<{
      success: boolean;
      data: Client;
      message?: string;
    }>(`/client/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Client not found');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const createClient = async (client: Client): Promise<Client> => {
  try {
    const api = createApi();
    const response = await api.post<{ success: boolean; data: Client }>(
      '/client',
      client,
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

export const updateClient = async (
  id: string,
  client: Partial<Client>,
): Promise<Client> => {
  try {
    const api = createApi();
    const response = await api.patch<{ success: boolean; data: Client }>(
      `/client/${id}`,
      client,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to update client');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<boolean> => {
  try {
    const api = createApi();
    const response = await api.delete<{ success: boolean }>(`/client/${id}`);

    if (!response.data.success) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};
