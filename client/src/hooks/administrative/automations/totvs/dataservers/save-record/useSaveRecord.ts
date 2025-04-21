import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import { saveRecord } from '@/lib/api/totvs/saveRecord';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  message?: string;
};

export const useSaveRecord = () => {
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
      nameSentenca: '',
      sentenca: '',
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbConsSqlData',
      tbcId: '',
      message: '',
    },
  });

  const sentenca = form.watch('sentenca');

  const handleSubmit: SubmitHandler<Schema> = async (formData: Schema) => {
    try {
      const {
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        contexto,
        dataServerName,
        tbcId,
      } = formData;

      const result = await saveRecord(
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        dataServerName,
        contexto,
        tbcId,
      );

      if (result?.status === 201) {
        form.setError('message', {
          message: 'Registro salvo com sucesso!',
        });
      }

      return result;
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
    }
  };

  return {
    handleSaveRecord: handleSubmit,
    form,
    sentenca,
    tbcOptions,
    isLoadingTbc,
  };
};
