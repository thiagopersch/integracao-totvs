'use client';

import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import DynamicTable from '@/components/Table';
import { ColumnDef } from '@/components/Table/useTableHook';
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
import useReadView from '@/hooks/administrative/automations/totvs/dataservers/read-view/useReadView';

import { Clipboard, Search } from 'lucide-react';
import { toast } from 'react-toastify';

const ReadViewPage = () => {
  const { handleReadView, rows, form, tbcOptions } = useReadView();

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'ID', width: 'auto' },
    { accessorKey: 'APLICACAO', header: 'Sistema', width: 'auto' },
    { accessorKey: 'NOMESISTEMA', header: 'Nome do sistema', width: 'auto' },
    { accessorKey: 'CODCOLIGADA', header: 'Coligada', width: 'auto' },
    { accessorKey: 'NOMEFANTASIA', header: 'Nome da coligada', width: 'auto' },
    { accessorKey: 'CODSENTENCA', header: 'Código', width: 'auto' },
    { accessorKey: 'TITULO', header: 'Nome da sentença', width: 'auto' },
    {
      accessorKey: 'SENTENCA',
      header: 'SQL',
      width: 'auto',
      cell: ({ row }: { row: any }) => {
        const sentenca = row.original?.SENTENCA || '';
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (sentenca) {
                navigator.clipboard.writeText(sentenca);
                toast.success('SQL copiado para a área de transferência!', {
                  position: 'bottom-center',
                  autoClose: 3000,
                  type: 'success',
                  closeOnClick: true,
                  pauseOnHover: true,
                  theme: 'colored',
                });
              }
            }}
            title={sentenca || 'Nenhum SQL disponível'}
            disabled={!sentenca}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'DTULTALTERACAO',
      header: 'Data Última Alteração',
      width: 'auto',
    },
    {
      accessorKey: 'USRULTALTERACAO',
      header: 'Usuário Última Alteração',
      width: 'auto',
    },
  ];

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReadView)}>
          <Column cols={3}>
            <FormField
              control={form.control}
              name="filtro"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Filtro</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                      placeholder="Digite o filtro"
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
                      placeholder="Digite o contexto"
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

      {rows && form.formState.isSubmitSuccessful && (
        <div className="mt-6">
          <DynamicTable
            columns={columns}
            rows={rows}
            isLoading={form.formState.isLoading}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default ReadViewPage;
