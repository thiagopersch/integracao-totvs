import { ColumnDef } from '@/components/Table/useTableHook';
import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import performSentence from '@/lib/api/sentence/executeSentence';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows?: any[];
  columns?: ColumnDef<any>[];
  message?: string;
};

interface PerformSentenceProps extends Omit<Schema, 'rows' | 'columns'> {}

export default function useExecute() {
  const { items: tbcOptions, isLoading: isLoadingTbc } = useCrud<TBC, TBC, TBC>(
    {
      queryKey: ['listTbc'],
      listFn: async () => {
        const tbcs = await findAll();
        return tbcs.filter((tbc) => tbc.status); // Filter for active TBCs
      },
      getFn: async (id: string) => {
        throw new Error('Not implemented');
      },
      createFn: async (data: TBC) => {
        throw new Error('Not implemented');
      },
      updateFn: async (id: string, data: TBC) => {
        throw new Error('Not implemented');
      },
      deleteFn: async (id: string) => {
        throw new Error('Not implemented');
      },
      deleteConfirmation: {
        title: '',
        message: '',
      },
      queryOptions: {
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
      },
    },
  );

  const form = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      codColigada: '',
      codSistema: '',
      codSentenca: '',
      parameters: '',
      tbcId: '',
    },
  });

  const rows = form.watch('rows');
  const columns = form.watch('columns');
  const message = form.watch('message');

  const formatExecutionResult = (result: any) => {
    let resultTable: any[] = [];
    if (Array.isArray(result)) {
      if (Array.isArray(result[0])) {
        resultTable = result.flat().map((item: any, index: number) => ({
          id: index,
          ...item,
        }));
      } else {
        resultTable = result.map((item: any, index: number) => ({
          id: index,
          ...item,
        }));
      }
    } else if (result) {
      resultTable = [result].map((item: any, index: number) => ({
        id: index,
        ...item,
      }));
    }

    const columns: ColumnDef<any>[] = Object.keys(resultTable[0] || {}).map(
      (key) => ({
        accessorKey: key !== '' ? key : 'NULL',
        header: key,
      }),
    );

    return { rows: resultTable, columns };
  };

  const handleExecute: SubmitHandler<Schema> = async (formData: Schema) => {
    const { codColigada, codSistema, codSentenca, parameters, tbcId } =
      formData;

    try {
      form.setValue('message', '');
      const result = await performSentence({
        codColigada,
        codSistema,
        codSentenca,
        parameters,
        tbcId,
      });

      if (!result) {
        form.setValue('rows', []);
        form.setValue('columns', []);
        form.setValue(
          'message',
          'Falha na execução da sentença. Por favor, tente novamente.',
        );
        return;
      }

      const { rows, columns } = formatExecutionResult(result.data);
      form.setValue('rows', rows);
      form.setValue('columns', columns);
    } catch (error: any) {
      console.error(error);
      form.setValue('rows', []);
      form.setValue('columns', []);
      form.setValue(
        'message',
        'Erro ao executar a sentença. Por favor, tente novamente.',
      );
    }
  };

  return {
    tbcOptions,
    isLoadingTbc,
    form,
    rows,
    columns,
    message,
    handleExecute,
  };
}
