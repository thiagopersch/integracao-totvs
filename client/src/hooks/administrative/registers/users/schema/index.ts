import { z } from 'zod';

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  email: z
    .string()
    .email({ message: 'Email inválido.' })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Tamanho excedido (255).' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    .max(30, { message: 'A senha deve ter no máximo 30 caracteres.' })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,30}$/,
      {
        message:
          'A sua senha deve conter letras maiúsculas, letras minúsculas, números e caracteres especiais (@,$,!,%,*,?,&).',
      },
    ),
  change_password: z.boolean().default(true),
  status: z.boolean().default(true),
});
