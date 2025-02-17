import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import { signIn } from 'next-auth/react';

type Schema = z.infer<typeof schema>;

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitted, isLoading },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'administrador@gmail.com',
      password: '#mpresaPC10',
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
          setErrorMessage(
            result.error === 'CredentialsSignin'
              ? 'Credenciais inválidas'
              : result.error,
          );
        } else {
          router.push('/');
        }
      } catch (error: any) {
        setErrorMessage('Erro ao realizar login. Tente novamente mais tarde.');
      }
    },
    [router],
  );

  return {
    handleClickShowPassword,
    handleMouseDownPassword,
    onSubmit,
    handleSubmit,
    register,
    setValue,
    showPassword,
    errors,
    isSubmitting,
    isSubmitted,
    isLoading,
    errorMessage,
  };
}
