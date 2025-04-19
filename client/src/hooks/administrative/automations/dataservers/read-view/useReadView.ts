import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import readView from '@/lib/api/totvs/readView';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows?: Array<{
    id: number;
    APLICACAO: string;
    NOMESISTEMA: string;
    CODCOLIGADA: string;
    NOMEFANTASIA: string;
    CODSENTENCA: string;
    TITULO: string;
    SENTENCA: string;
    DTULTALTERACAO: string;
    USRULTALTERACAO: string;
  }>;
};

export const useReadView = () => {
  const queryClient = useQueryClient();

  // Use useCrud to fetch active TBCs
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
      filtro: `CODSENTENCA LIKE 'RB%'`,
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=wsrubeus',
      dataServerName: 'GlbConsSqlData',
      tbcId: '',
      rows: [],
    },
  });

  const rows = form.watch('rows');

  const handleReadView: SubmitHandler<Schema> = async (formData: Schema) => {
    const { filtro, contexto, dataServerName, tbcId } = formData;

    try {
      const result = await readView(dataServerName, filtro, contexto, tbcId);

      if (!result?.data?.NewDataSet?.GConsSql) {
        console.warn('Dados da API estão vazios ou malformados:', result);
        form.setValue('rows', []);
        return;
      }

      const formattedData = result?.data?.NewDataSet?.GConsSql?.map(
        (item: any, index: any) => ({
          id: index,
          APLICACAO: item.APLICACAO[0] ?? '',
          NOMESISTEMA: item.NOMESISTEMA[0] ?? '',
          CODCOLIGADA: item.CODCOLIGADA[0] ?? '',
          NOMEFANTASIA: item.NOMEFANTASIA[0] ?? '',
          CODSENTENCA: item.CODSENTENCA[0] ?? '',
          TITULO: item.TITULO ?? '',
          SENTENCA: item.SENTENCA ?? '',
          DTULTALTERACAO: item.DTULTALTERACAO?.[0]
            ? dayjs(item.DTULTALTERACAO[0]).format('DD/MM/YYYY [às] HH:mm:ss')
            : '',
          USRULTALTERACAO: item.USRULTALTERACAO?.[0] || '',
        }),
      );

      form.setValue('rows', formattedData);
    } catch (error) {
      console.error(error);
      form.setValue('rows', []);
    }
  };

  return {
    handleReadView,
    form,
    rows,
    tbcOptions,
    isLoadingTbc,
  };
};
