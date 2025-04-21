import { Client, FormattedClient } from '@/types/client';
import { FormattedTBC, TBC } from '@/types/tbc';
import { FormattedUsers, User } from '@/types/user';
import dayjs from 'dayjs';

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

export const tbcMappers = (tbc: TBC): FormattedTBC => ({
  ...tbc,
  formattedCreatedAt: dayjs(tbc.created_at).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(tbc.updated_at).format('DD/MM/YYYY [às] HH:mm:ss'),
});
