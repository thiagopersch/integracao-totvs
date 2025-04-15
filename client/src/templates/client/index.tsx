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
import useClient from '@/hooks/administrative/registers/client/useClient';
import { Client } from '@/types/client';
import { useEffect } from 'react';

type ClientFormProps = {
  client: Client | null;
};

const ClientForm = ({ client }: ClientFormProps) => {
  const { isSubmitting, handleSubmit, form, setIsModalOpen } = useClient();

  useEffect(() => {
    if (client) {
      form.reset(client);
    } else {
      form.reset({
        name: '',
        link_crm: '',
        site: '',
        status: true,
      });
    }
  }, [client, form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Column cols={1}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{field.value ? 'Ativado' : 'Desativado'}</FormLabel>
              </FormItem>
            )}
          />
        </Column>

        <div className="space-y-4">
          <Column cols={1}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhoe Doe" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <Column cols={2}>
            <FormField
              control={form.control}
              name="link_crm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link CRM</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://"
                      required
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>
        </div>

        <CTA>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? client
                ? 'Atualizando...'
                : 'Cadastrando...'
              : client
                ? 'Atualizar'
                : 'Cadastrar'}
          </Button>
        </CTA>
      </form>
    </Form>
  );
};

export default ClientForm;
