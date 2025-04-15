import readView from '@/lib/api/totvs/readView';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const form = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      filtro: `CODSENTENCA LIKE 'RB%'`,
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=wsrubeus',
      dataServerName: 'GlbConsSqlData',
      username: '',
      password: '',
      tbc: '',
      rows: [],
    },
  });

  const rows = form.watch('rows');

  const handleClickShowPassword = (
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    if (inputRef.current) {
      const currentType = inputRef.current.type;
      inputRef.current.type = currentType === 'password' ? 'text' : 'password';
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleReadView: SubmitHandler<Schema> = async (formData: Schema) => {
    const { filtro, contexto, dataServerName, username, password, tbc } =
      formData;

    try {
      const result = await readView(
        dataServerName,
        filtro,
        contexto,
        username,
        password,
        tbc,
      );

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
    handleClickShowPassword,
    handleMouseDownPassword,
    handleReadView,
    form,
    rows,
  };
};
