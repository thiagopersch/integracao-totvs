import { z } from 'zod';

export const schema = z
  .object({
    id: z.string().optional(),
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
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: 'A senha deve ter no mínimo 8 caracteres.',
      })
      .refine((val) => !val || val.length <= 30, {
        message: 'A senha deve ter no máximo 30 caracteres.',
      })
      .refine(
        (val) =>
          !val ||
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,30}$/.test(
            val,
          ),
        {
          message:
            'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais (@,$,!,%,*,?,&).',
        },
      ),
    change_password: z.boolean().default(true),
    status: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    // Se não houver id (criação), a senha é obrigatória
    if (!data.id && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'Campo obrigatório.',
      });
    }
  });
