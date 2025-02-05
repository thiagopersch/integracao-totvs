import { Clients } from './Clients';

export type Tbc = {
  id: string;
  client: Clients;
  client_id: string;
  name: string;
  link: string;
  user: string;
  password: string;
  not_required_license: boolean;
  coligate_context: string;
  branch_context: string;
  level_education_context: string;
  cod_system_context: string;
  user_context: string;
  status: boolean;
};
