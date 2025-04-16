import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import useUsers from '@/hooks/administrative/registers/users/useUsers';
import { User } from '@/types/user';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect } from 'react';

type UserFormProps = {
  user?: User | null;
};

const UserForm = ({ user }: UserFormProps) => {
  const {
    showPassword,
    isSubmitting,
    form,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    setIsModalOpen,
  } = useUsers();

  useEffect(() => {
    if (user) {
      form.reset(user);
    } else {
      form.reset({
        name: '',
        email: '',
        password: '',
        change_password: true,
        status: true,
      });
    }
  }, [user, form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4">
          <Column cols={2}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">
                    {field.value ? 'Ativado' : 'Desativado'}
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="change_password"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">
                    Alterar senha no próximo login?
                  </FormLabel>
                </FormItem>
              )}
            />
          </Column>
        </div>

        <Column cols={1}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Jhoe Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Column>
        <Column cols={2}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={isSubmitting}
                    placeholder="jhoedoe@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      disabled={isSubmitting}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                      disabled={isSubmitting}
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

        <Separator />

        <CTA>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? user
                ? 'Atualizando...'
                : 'Cadastrando...'
              : user
                ? 'Atualizar'
                : 'Cadastrar'}
          </Button>
        </CTA>
      </form>
    </Form>
  );
};

export default UserForm;
