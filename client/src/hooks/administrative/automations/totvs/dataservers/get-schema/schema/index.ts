import { z } from 'zod';

export const schema = z.object({
  dataServerName: z.string().nonempty({ message: 'Campo obrigatório.' }),
  contexto: z.string().nonempty({ message: 'Campo obrigatório.' }),
  tbcId: z.string().nonempty({ message: 'Campo obrigatório.' }),
});
