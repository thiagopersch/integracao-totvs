import createApi from '@/lib/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type LoginDataProps = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      change_password: boolean;
      status?: boolean;
    };
    token: string;
  };
};

type Schema = z.infer<typeof schema> & {
  showPassword?: boolean;
};

const extendedSchema = schema.extend({
  showPassword: z.boolean().optional(),
});

export default function useLogin() {
  const router = useRouter();

  const form = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(extendedSchema),
    defaultValues: {
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

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data: Schema) => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          form.setError('root', {
            type: 'manual',
            message:
              result.error === 'CredentialsSignin'
                ? 'Credenciais inválidas'
                : result.error,
          });
        } else {
          const api = createApi();
          const response = await api.post<LoginDataProps>(
            `${process.env.API_URL}/auth/login`,
            {
              email: data.email,
              password: data.password,
            },
          );

          const loginData = response?.data?.data?.user;

          if (loginData?.change_password) {
            router.push(`/change-password/${loginData?.id}`);
          } else {
            router.push('/');
          }
        }
      } catch (error: any) {
        console.error(error);
        form.setError('root', {
          type: 'manual',
          message: 'Erro ao realizar login. Tente novamente mais tarde.',
        });
      }
    },
    [router, form],
  );

  const errorMessage = form.formState.errors.root?.message || '';

  const showPassword = form.watch('showPassword');

  return {
    handleClickShowPassword,
    handleMouseDownPassword,
    onSubmit,
    form,
    showPassword,
    errorMessage,
  };
}
