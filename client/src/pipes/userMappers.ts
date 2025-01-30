import { FormattedUsers, User } from '@/model/user';
import dayjs from 'dayjs';

export const userMappers = (user: User): FormattedUsers => ({
  ...user,
  formattedCreatedAt: dayjs(user.created_at).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(user.updated_at).format('DD/MM/YYYY [às] HH:mm:ss'),
});
