'use client';

import Column from '@/components/Columns';
import { ModeToggle } from '@/components/ModeToggle';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { useSignup } from '@/hooks/public/sign-up/useSignup';
import { Eye, EyeOff } from 'lucide-react';

import Link from 'next/link';

export default function SignupForm() {
  const {
    form,
    showPassword,
    errorMessage,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
  } = useSignup();

  return (
    <>
      <ModeToggle className="absolute top-4 right-4" />
      <Card className="w-full shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CardHeader className="grid grid-cols-1 place-items-center">
                <CardTitle className="text-2xl font-black text-primary">
                  Criar Conta
                </CardTitle>
                <CardDescription className="text-center">
                  Preencha os campos abaixo para criar sua conta
                </CardDescription>
              </CardHeader>
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Column cols={1}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={form.formState.isSubmitting}
                          placeholder="Jhoe Doe"
                          error={fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={form.formState.isSubmitting}
                          placeholder="jhoedoe@example.com"
                          error={fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            disabled={form.formState.isSubmitting}
                            error={fieldState.error?.message}
                            className="pr-10"
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            aria-label="toggle password visibility"
                            disabled={form.formState.isSubmitting}
                          >
                            {showPassword ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Column>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Criando conta...'
                  : 'Criar Conta'}
              </Button>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Já possui uma conta?{' '}
                  <Link
                    href="/signIn"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Entrar
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
