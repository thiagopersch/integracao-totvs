'use client';

import Column from '@/components/Columns';
import CTA from '@/components/CTA';
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
import { Separator } from '@/components/ui/separator';
import useLogin from '@/hooks/public/signIn/useLogin';
import { Eye, EyeOff, Loader2, UserPlus2 } from 'lucide-react';
import Link from 'next/link';

const SigninForm = () => {
  const {
    form,
    showPassword,
    errorMessage,
    handleClickShowPassword,
    handleMouseDownPassword,
    onSubmit,
  } = useLogin();

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardHeader className="grid grid-cols-1 place-items-center">
              <CardTitle className="text-2xl font-black text-primary">
                Acessar o sistema
              </CardTitle>
              <CardDescription className="text-center">
                Entre com seu email e senha para acessar sua conta
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Senha</FormLabel>
                      {/* <Link
                        href="/change-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Esqueceu a senha?
                      </Link> */}
                    </div>
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
                          className="absolute right-0 top-0 h-full w-10"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                          disabled={form.formState.isSubmitting}
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Column>
            <CTA>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </CTA>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ou
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={form.formState.isSubmitting}
                asChild
              >
                <Link href="/create-account">
                  <UserPlus2 className="h-4 w-4" />
                  Criar nova conta
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
