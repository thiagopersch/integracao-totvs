import { Clients } from './Clients';
import { Tbc } from './Tbc';

export type Filters = {
  id: string;
  tbc: Tbc;
  tbc_id: string;
  client: Clients;
  client_id: string;
  filter: string;
  status: boolean;
};
