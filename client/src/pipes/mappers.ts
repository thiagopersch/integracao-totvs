import { FormattedUsers, User } from '@/types/user';
import dayjs from 'dayjs';
import { Client, FormattedClient } from '@/types/client';

export const userMappers = (user: User): FormattedUsers => ({
  ...user,
  formattedCreatedAt: dayjs(user.created_at).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(user.updated_at).format('DD/MM/YYYY [às] HH:mm:ss'),
});

export const clientMappers = (client: Client): FormattedClient => ({
  ...client,
  formattedCreatedAt: dayjs(client.created_at).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(client.updated_at).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});
