import { z } from 'zod';

export const schema = z.object({
  id: z.string().optional(),
  client_id: z.string().min(1, { message: 'Campo obrigatório.' }),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(25, { message: 'Tamanho excedido (25).' })
    .nonempty({ message: 'Campo obrigatório.' }),
  link: z
    .string()
    .nonempty({ message: 'Campo obrigatório.' })
    .url({ message: 'URL inválida.' }),
  user: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(25, { message: 'Tamanho excedido (25).' })
    .nonempty({ message: 'Campo obrigatório.' }),
  password: z
    .string()
    .min(1, { message: 'O nome deve ter no mínimo 1 caracteres.' })
    .max(50, { message: 'Tamanho excedido (50).' })
    .optional(),
  /* .nonempty({ message: 'Campo obrigatório.' }) */
  not_required_license: z.boolean(),
  coligate_context: z
    .number()
    .min(1, { message: 'Preencher no maximo 1 número.' })
    .max(2, { message: 'Preencher no maximo 2 números.' }),
  branch_context: z
    .number()
    .min(1, { message: 'Preencher no maximo 1 número.' })
    .max(2, { message: 'Preencher no maximo 2 números.' }),
  level_education_context: z
    .number()
    .min(1, { message: 'Preencher no maximo 1 número.' })
    .max(2, { message: 'Preencher no maximo 2 números.' }),
  cod_system_context: z
    .string()
    .min(1, { message: 'Preencher no minimo 1 caracter.' })
    .max(2, { message: 'Preencher no maximo 2 caracter.' })
    .nonempty({ message: 'Campo obrigatório.' }),
  user_context: z
    .string()
    .min(1, { message: 'Campo obrigatório.' })
    .max(50, { message: 'Tamanho excedido (50).' })
    .nonempty({ message: 'Campo obrigatório.' }),
  status: z.boolean(),
});
