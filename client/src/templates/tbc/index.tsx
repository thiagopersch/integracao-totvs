import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import useTbc from '@/hooks/administrative/registers/tbc/useTbc';
import { cn } from '@/lib/utils';
import { TBC } from '@/types/tbc';
import { CheckIcon, ChevronsUpDown, Eye, EyeOff } from 'lucide-react';
import { useEffect } from 'react';

type TbcFormProps = {
  tbc?: TBC | null;
};

const TbcForm = ({ tbc }: TbcFormProps) => {
  const {
    clients,
    showPassword,
    isSubmitting,
    form,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    setIsModalOpen,
  } = useTbc();

  useEffect(() => {
    if (tbc) {
      form.reset(tbc);
    } else {
      form.reset({
        client_id: '',
        name: '',
        link: '',
        user: '',
        password: '',
        not_required_license: true,
        status: true,
      });
    }
  }, [tbc, form.reset]);

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
              name="not_required_license"
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
                    {field.value ? 'Não consumir licença' : 'Consumir licença'}
                  </FormLabel>
                </FormItem>
              )}
            />
          </Column>

          <Column cols={1}>
            <FormField
              control={form.control}
              name="client_id"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Cliente</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'h-[3rem] w-full justify-between',
                            !field.value && 'text-muted-foreground',
                            fieldState.error &&
                              'border-red-500 dark:border-red-400',
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value
                            ? clients?.find(
                                (client) => client.id === field.value,
                              )?.name
                            : 'Selecione um cliente'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 dark:opacity-100" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Pesquisar cliente..." />
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup className="w-full">
                          {clients?.map((client) => (
                            <CommandItem
                              key={client.id}
                              value={client.name}
                              onSelect={() => {
                                field.onChange(client.id);
                              }}
                            >
                              {client.name}
                              <CheckIcon
                                className={cn(
                                  'h-4 w-4',
                                  field.value === client.id
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <Column cols={2}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={fieldState.error?.message}
                      disabled={isSubmitting}
                      placeholder="Nome do cliente"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={fieldState.error?.message}
                      disabled={isSubmitting}
                      placeholder="Link do TBC"
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
              name="user"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={fieldState.error?.message}
                      disabled={isSubmitting}
                      placeholder="Usuário do TBC"
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
                        disabled={isSubmitting}
                        error={fieldState.error?.message}
                        placeholder="Senha do TBC"
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
        </div>

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
              ? tbc
                ? 'Atualizando...'
                : 'Cadastrando...'
              : tbc
                ? 'Atualizar'
                : 'Cadastrar'}
          </Button>
        </CTA>
      </form>
    </Form>
  );
};

export default TbcForm;
