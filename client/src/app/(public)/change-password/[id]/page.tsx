'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import createApi from '@/lib/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

// Schema de validação
const schema = z.object({
  newPassword: z
    .string()
    .min(8, 'A nova senha deve ter no mínimo 8 caracteres.')
    .max(30, 'A nova senha deve ter no máximo 30 caracteres.'),
});

type Schema = z.infer<typeof schema>;

const ChangePasswordPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const resolvedParams = use(params);
  const userId = resolvedParams.id;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
    },
  });

  const onSubmit = async (data: Schema) => {
    try {
      const api = createApi();
      await api.post(`${process.env.API_URL}/users/${userId}/change-password`, {
        newPassword: data.newPassword,
      });
      toast.success('Senha alterada com sucesso!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao alterar a senha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-zinc-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Insira sua nova senha para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          error={fieldState.error?.message}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full w-10"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Alterando...' : 'Alterar Senha'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
