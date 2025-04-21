import { z } from 'zod';

export const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Campo obrigatório.' }),
  link_crm: z
    .string({ message: 'Campo obrigatório.' })
    .nonempty({ message: 'Campo obrigatório.' })
    .url({ message: 'URL inválida.' }),
  site: z
    .string({ message: 'Campo obrigatório.' })
    .nonempty({ message: 'Campo obrigatório.' })
    .url({ message: 'URL inválida.' }),
  status: z.boolean(),
});
