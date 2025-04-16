import { Client } from './client';

export type TBC = {
  id?: string;
  client?: Client;
  client_id: string;
  name: string;
  link: string;
  user: string;
  password: string;
  not_required_license: boolean;
  coligate_context: number;
  branch_context: number;
  level_education_context: number;
  cod_system_context: string;
  user_context: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
};

export type FormattedTBC = TBC & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedStatus?: string;
  formattedNotRequiredLicense?: string;
};
