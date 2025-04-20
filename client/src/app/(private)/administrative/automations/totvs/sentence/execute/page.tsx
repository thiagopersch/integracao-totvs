'use client';

import { FormLabel } from '@mui/material';

import CTA from '@/components/CTA';
import Column from '@/components/Columns';
import DynamicTable from '@/components/Table';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import useExecute from '@/hooks/administrative/automations/totvs/sentence/useExecute';
import { Loader2, RefreshCcw } from 'lucide-react';

const ExecuteSentece = () => {
  const { form, tbcOptions, rows, columns, handleExecute, message } =
    useExecute();

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleExecute)}>
          <Column cols={3}>
            <FormField
              control={form.control}
              name="codColigada"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código da coligada</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={!!fieldState.error}
                      placeholder="Ex: 0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codSistema"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código do Sistema</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={!!fieldState.error}
                      placeholder="Ex: S"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codSentenca"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código da sentenca</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={!!fieldState.error}
                      placeholder="Ex: RB.PS.IM.005"
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
              name="parameters"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Parâmetros</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={!!fieldState.error}
                      placeholder="FIELD1=VALUE1;FIELD2=VALUE2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tbcId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>TBC</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger error={!!fieldState.error}>
                        <SelectValue placeholder="Selecione um TBC" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tbcOptions.map((tbc) => (
                        <SelectItem key={tbc.id} value={tbc.id ?? ''}>
                          {tbc.name} - {tbc.client?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <CTA className="mt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mx-auto"
              variant="default"
              size="lg"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Executar
            </Button>
          </CTA>
        </form>

        {form.formState.isSubmitting && (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2">Carregando...</span>
          </div>
        )}

        {rows && rows.length > 0 && (
          <DynamicTable
            rows={rows}
            columns={columns ?? []}
            isLoading={form.formState.isSubmitting}
            className="mt-4"
          />
        )}

        {message && (
          <Text className="mt-4 text-center text-sm font-bold text-red-600">
            {message || ''}
          </Text>
        )}
      </Form>
    </Wrapper>
  );
};

export default ExecuteSentece;
