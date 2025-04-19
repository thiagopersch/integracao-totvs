import { z } from 'zod';

export const schema = z.object({
  primaryKey: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(50, { message: 'Tamanho excedido(50).' }),
  contexto: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  //sentenca: z.string().min(1, { message: 'Campo obrigatório' }),
  dataServerName: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  tbcId: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
});
