import { z } from 'zod';

export const schema = z.object({
  filtro: z
    .string()
    .min(3, { message: 'O campo espera no mínimo 3 caractere.' })
    .nonempty({ message: 'Campo obrigatório.' }),
  contexto: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .min(1, { message: 'O campo espera no mínimo 1 caractere.' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  dataServerName: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .min(1, { message: 'O campo espera no mínimo 1 caractere.' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  tbcId: z.string().nonempty({ message: 'Campo obrigatório.' }),
});
