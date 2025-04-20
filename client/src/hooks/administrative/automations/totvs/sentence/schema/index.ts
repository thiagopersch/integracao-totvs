import { z } from 'zod';

export const schema = z.object({
  codColigada: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .max(3, { message: 'Tamanho excedido.' }),
  codSistema: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .max(1, { message: 'Tamanho excedido.' }),
  codSentenca: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .max(16, { message: 'Tamanho excedido (16).' }),
  parameters: z.string().max(255, { message: 'Tamanho excedido (255).' }),
  tbcId: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .max(255, { message: 'Tamanho excedido (255).' }),
});
