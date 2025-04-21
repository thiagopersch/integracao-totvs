import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import readView from '@/lib/api/totvs/readView';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows?: any[];
  message?: string;
};

export default function useWorkflow() {
  const form = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      filtro: 'CODCOLIGADA = 0',
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbWorkflowData',
      tbcId: '',
      rows: [],
    },
  });

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

  const rows = form.watch('rows');
  const message = form.watch('message');

  const isArray = (value: any): value is any[] => Array.isArray(value);

  const handleReadView: SubmitHandler<Schema> = async (formData: Schema) => {
    const { filtro, contexto, dataServerName, tbcId } = formData;

    try {
      form.setValue('message', '');
      const result = await readView(dataServerName, filtro, contexto, tbcId);

      const workflowData = result?.data?.NewDataSet?.GWORKFLOW;

      if (!isArray(workflowData)) {
        console.error('GWORKFLOW não é um array ou está indefinido');
        return;
      }

      const formattedData = workflowData.map((item: any, index: any) => ({
        id: index + 1,
        CODCOLIGADA: isArray(item.CODCOLIGADA)
          ? item.CODCOLIGADA[0]
          : item.CODCOLIGADA,
        ID: isArray(item.ID) ? item.ID[0] : item.ID,
        IDPAI: isArray(item.IDPAI) ? item.IDPAI[0] : item.IDPAI,
        NOME: isArray(item.NOME) ? item.NOME[0] : item.NOME,
        ATIVO: isArray(item.ATIVO) ? item.ATIVO[0] : item.ATIVO,
        XOMLDATA: isArray(item.XOMLDATA) ? item.XOMLDATA[0] : item.XOMLDATA,
      }));

      form.setValue('rows', formattedData);
    } catch (error) {
      console.error(error);
      form.setValue('rows', []);

      form.setValue(
        'message',
        'Falha na busca das fórmulas visuais. Por favor, tente novamente.',
      );
    }
  };

  return {
    handleReadView,
    rows,
    form,
    tbcOptions,
    isLoadingTbc,
    message,
  };
}
