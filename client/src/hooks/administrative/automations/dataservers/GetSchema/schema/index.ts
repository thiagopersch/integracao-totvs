import { z } from 'zod';

export const schema = z.object({
  dataServerName: z.string().min(1, { message: 'Campo obrigatório.' }),
  contexto: z.string().min(1, { message: 'Campo obrigatório.' }),
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
  tbc: z.string().min(1, { message: 'Campo obrigatório.' }),
});
