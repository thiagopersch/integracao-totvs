import { SentenceCategories } from './SentenceCategories';

export type Sentences = {
  id: string;
  sentence_categories: SentenceCategories;
  sentence_categories_id: string;
  code: string;
  cod_system: string;
  name: string;
  status: boolean;
};
