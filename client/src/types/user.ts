export type User = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  change_password: boolean;
  status: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FormattedUsers = User & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedStatus?: string;
  formattedChangePassword?: string;
};
