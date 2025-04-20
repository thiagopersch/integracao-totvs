import { z } from 'zod';

export const schema = z.object({
  filtro: z.string().min(1, { message: 'Campo obrigatório.' }),
  contexto: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  dataServerName: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  tbcId: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
});
