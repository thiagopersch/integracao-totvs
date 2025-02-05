import { Filters } from './Filters';
import { Tbc } from './Tbc';

export type Backups = {
  id: string;
  tbc_id: string;
  tbc: Tbc;
  filter_id: string;
  filter: Filters;
  branch_sentence: string;
  cod_system: string;
  code_sentence: string;
  name_sentece: string;
  content_sentence: string;
};
