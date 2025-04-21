'use client';

import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import DynamicTable from '@/components/Table';
import { ColumnDef } from '@/components/Table/useTableHook';
import Text from '@/components/Text';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Wrapper from '@/components/Wrapper';
import useWorkflow from '@/hooks/administrative/automations/totvs/workflow/useWorkflow';
import { CheckCircle2, Clipboard, Loader2, RefreshCcw, X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Workflow() {
  const { rows, form, message, tbcOptions, handleReadView } = useWorkflow();

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'ID', width: 'auto' },
    { accessorKey: 'CODCOLIGADA', header: 'Coligada', width: 'auto' },
    { accessorKey: 'ID', header: 'Fórmula visual', width: 'auto' },
    { accessorKey: 'IDPAI', header: 'Fórmula visual pai', width: 'auto' },
    { accessorKey: 'NOME', header: 'Nome', width: 'auto' },
    {
      accessorKey: 'ATIVO',
      header: 'Situação',
      width: 'auto',
      cell: (params) =>
        params.row.original?.ATIVO === '1' ? (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <span>Ativo</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <X className="h-6 w-6 text-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <span>Inativo</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
    },
    {
      accessorKey: 'XOMLDATA',
      header: 'XML',
      width: 'auto',
      cell(params) {
        const workflow = params.row?.original?.XOMLDATA || '';
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (workflow) {
                navigator.clipboard.writeText(workflow);
                toast.success(
                  'XML da fórmula visual copiado para a área de transferência!',
                  {
                    position: 'bottom-center',
                    autoClose: 5000,
                    type: 'success',
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored',
                  },
                );
              }
            }}
            title={workflow || 'Nenhum XML disponível'}
            disabled={!workflow}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReadView)}>
          <Column cols={3}>
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
              <RefreshCcw className="mr-2 h-4 w-4" />
              Executar
            </Button>
          </CTA>
        </form>
      </Form>

      {form.formState.isSubmitting && (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2">Carregando...</span>
        </div>
      )}

      {rows && rows.length > 0 && (
        <DynamicTable
          columns={columns ?? []}
          rows={rows}
          isLoading={form.formState.isSubmitting}
          className="mt-4"
        />
      )}
      {message && (
        <Text className="mt-4 text-center text-sm font-bold text-red-600">
          {message || ''}
        </Text>
      )}
    </Wrapper>
  );
}
