'use client';

import createApi from '@/lib/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  showPassword?: boolean;
};

const extendedSchema = schema.extend({
  showPassword: z.boolean().optional(),
});

export function useSignup() {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(extendedSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      showPassword: false,
    },
  });

  const handleClickShowPassword = useCallback(() => {
    const currentValue = form.getValues('showPassword');
    form.setValue('showPassword', !currentValue);
  }, [form]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: Schema) => {
    try {
      const api = createApi();

      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
        status: true,
        change_password: false,
      });

      router.push('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao criar sua conta';

      form.setError('root', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const errorMessage = form.formState.errors.root?.message || '';

  // Obtém o valor de showPassword do formulário
  const showPassword = form.watch('showPassword');

  return {
    form,
    showPassword,
    errorMessage,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
}
