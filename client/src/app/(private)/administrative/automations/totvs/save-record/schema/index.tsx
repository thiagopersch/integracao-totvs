import { z } from 'zod';

export const schema = z.object({
  codColigada: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(3, { message: 'Tamanho excedido.' }),
  codSistema: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(1, { message: 'Tamanho excedido.' }),
  codSentenca: z
    .string()
    .min(1, { message: 'Campo obrigatório.' })
    .max(16, { message: 'Tamanho excedido (16).' }),
  nameSentenca: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  sentenca: z.string().min(1, { message: 'Campo obrigatório' }),
  dataServerName: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  contexto: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  username: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  password: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  tbc: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(255, { message: 'Tamanho excedido (255).' }),
});
