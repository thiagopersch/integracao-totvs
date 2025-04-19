import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import readRecord from '@/lib/api/totvs/readRecord';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  sentenca?: string;
};

export default function useReadRecord() {
  const queryClient = useQueryClient();

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
      primaryKey: '',
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbConsSqlData',
      tbcId: '',
    },
  });

  const handleSubmit: SubmitHandler<Schema> = async (formData: Schema) => {
    const { primaryKey, contexto, dataServerName, tbcId } = formData;

    try {
      const result = await readRecord(
        dataServerName,
        primaryKey,
        contexto,
        tbcId,
      );

      const gConsSql = result.data.GlbConsSql.GConsSql[0];
      const sentenca =
        gConsSql.TAMANHO[0] !== '0'
          ? gConsSql.SENTENCA[0]
          : form.setError('sentenca', {
              message: 'A sentença não pode ser vazia',
            });

      form.setValue('sentenca', sentenca);
    } catch (err: string | any) {
      form.setError('sentenca', {
        message: err.message || 'Erro ao ler o registro',
      });
      toast.error(
        'Oops! ocorreu algum erro ao tentar ler o registro do TOTVS.',
        {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        },
      );
    }
  };

  return {
    form,
    tbcOptions,
    isLoadingTbc,
    onSubmit: handleSubmit,
  };
}
