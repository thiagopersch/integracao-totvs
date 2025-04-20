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
import { useSaveRecord } from '@/hooks/administrative/automations/totvs/dataservers/save-record/useSaveRecord';
import { Save } from 'lucide-react';

const SaveRecord = () => {
  const { form, sentenca, isLoadingTbc, tbcOptions, handleSaveRecord } =
    useSaveRecord();

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveRecord)}>
          <Column cols={4}>
            <FormField
              name="codColigada"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código da Coligada</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="codSistema"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código do Sistema</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="codSentenca"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Código da Sentença</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nameSentenca"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nome da Sentença</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
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

            <FormField
              name="contexto"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contexto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <EditorSentenca
            value={sentenca}
            readOnly={form.formState.isSubmitting}
            onChange={(value) => form.setValue('sentenca', value || '')}
            className="mt-8"
          />

          <CTA>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mx-auto mt-4"
              variant="default"
              size="lg"
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar no TOTVS
            </Button>
          </CTA>
        </form>
      </Form>

      {form.watch('message') && (
        <p className="text-red-500 mt-4">{form.watch('message')}</p>
      )}
    </Wrapper>
  );
};

export default withAuth(SaveRecord);
