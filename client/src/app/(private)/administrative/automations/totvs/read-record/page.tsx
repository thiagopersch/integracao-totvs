'use client';

import withAuth from '@/app/withAuth';
import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import EditorSentenca from '@/components/EditorSentenca';
import { Button } from '@/components/ui/button';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Wrapper from '@/components/Wrapper';
import useReadRecord from '@/hooks/administrative/automations/dataservers/read-record/useReadRecord';
import { Search } from 'lucide-react';

const ReadRecord = () => {
  const { form, onSubmit, isLoadingTbc, tbcOptions } = useReadRecord();

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Column cols={3}>
            <FormField
              control={form.control}
              name="primaryKey"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Chave Primária</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                      placeholder="Ex: 0;S;RB.PS.IM.001"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tbcId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TBC</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={form.formState.isSubmitting || isLoadingTbc}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingTbc ? 'Carregando...' : 'Selecione um TBC'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {tbcOptions?.map((tbc) => (
                          <SelectItem key={tbc.id} value={tbc.id ?? ''}>
                            {tbc.name || tbc.id} - {tbc.client?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contexto"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contexto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                      placeholder="Ex: CODCOLIGADA=1;CODFILIAL=1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>
          <CTA>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mx-auto mt-4"
              variant="default"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </CTA>
        </form>
      </Form>

      {form.watch('sentenca') && !form.formState.errors.sentenca && (
        <div className="mt-4">
          <EditorSentenca value={form.watch('sentenca')} />
        </div>
      )}

      {form.formState.errors.sentenca && (
        <p className="mt-4 text-center text-sm font-bold text-red-600">
          {form.formState.errors.sentenca.message}
        </p>
      )}
    </Wrapper>
  );
};

export default withAuth(ReadRecord);
