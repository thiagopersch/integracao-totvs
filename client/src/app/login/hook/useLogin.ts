import { useAuth } from '@/app/AuthContext';
import { login } from '@/requests/queries/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

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
  const { setAuthState } = useAuth();

  const onSubmit = async (data: Schema) => {
    try {
      const { token, user } = await login(data.email, data.password);
      setAuthState(user, token);
      router.push('/home');
    } catch (err: string | any) {
      setErrorMessage(err.response.data.message);
    }
  };

  return {
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    register,
    setValue,
    onSubmit,
    showPassword,
    errors,
    isSubmitting,
    isSubmitted,
    isLoading,
    errorMessage,
  };
}
