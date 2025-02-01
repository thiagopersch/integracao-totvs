'use client';

import * as S from '@/app/(administrative)/styles';
import withAuth from '@/app/withAuth';
import ContainerTable from '@/components/ContainerTable';
import NoRow from '@/components/Table/NoRow';
import readView from '@/lib/api/totvs/readView';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Search as SearchIcon,
  Storage as StorageIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

const ReadViewPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isLoading },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      filtro: `CODSENTENCA LIKE 'RB%'`,
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbConsSqlData',
      username: '',
      password: '',
      tbc: '',
      rows: [],
    },
  });

  const rows = watch('rows');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

      const formattedData = result?.NewDataSet?.GConsSql?.map(
        (item: any, index: any) => ({
          id: index,
          APLICACAO: item.APLICACAO[0],
          NOMESISTEMA: item.NOMESISTEMA[0],
          CODCOLIGADA: item.CODCOLIGADA[0],
          NOMEFANTASIA: item.NOMEFANTASIA[0],
          CODSENTENCA: item.CODSENTENCA[0],
          TITULO: item.TITULO,
          SENTENCA: item.SENTENCA,
          DTULTALTERACAO: dayjs(item.DTULTALTERACAO[0]).format(
            'DD/MM/YYYY [às] HH:mm:ss',
          ),
          USRULTALTERACAO: item.USRULTALTERACAO[0],
        }),
      );

      setValue('rows', formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'APLICACAO', headerName: 'Sistema', width: 100 },
    { field: 'NOMESISTEMA', headerName: 'Nome Sistema', width: 150 },
    { field: 'CODCOLIGADA', headerName: 'Coligada', width: 100 },
    { field: 'NOMEFANTASIA', headerName: 'Nome coligada', width: 150 },
    { field: 'CODSENTENCA', headerName: 'Codigo', width: 200 },
    { field: 'TITULO', headerName: 'Nome sentença', width: 400 },
    {
      field: 'SENTENCA',
      headerName: 'SQL',
      width: 100,
      renderCell(params) {
        return (
          <Tooltip
            title={params.value || 'Clique aqui para copiar o conteúdo'}
            arrow
            placement="right-start"
          >
            <IconButton
              onClick={() => navigator.clipboard.writeText(params.value)}
              size="small"
              aria-label="copy"
              color="primary"
            >
              <StorageIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: 'DTULTALTERACAO',
      headerName: 'Data Última Alteração',
      width: 200,
    },
    {
      field: 'USRULTALTERACAO',
      headerName: 'Usuário Última Alteração',
      width: 200,
    },
  ];

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleReadView)}>
        <S.InputSentences>
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register('username')}
            disabled={isSubmitting}
            helperText={errors.username?.message}
            error={errors.username !== undefined}
            required
            fullWidth
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Senha"
            variant="filled"
            {...register('password')}
            disabled={isSubmitting}
            helperText={errors.password?.message}
            error={errors.password !== undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="tbc"
            label="TBC"
            variant="filled"
            disabled={isSubmitting}
            helperText={errors.tbc?.message}
            error={errors.tbc !== undefined}
            {...register('tbc')}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="filtro"
            label="Filtro"
            variant="filled"
            {...register('filtro')}
            disabled={isSubmitting}
            helperText={errors.filtro?.message}
            error={errors.filtro !== undefined}
            placeholder="Filtro"
            required
            fullWidth
          />
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register('contexto')}
            disabled={isSubmitting}
            helperText={errors.contexto?.message}
            error={errors.contexto !== undefined}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.Actions>
          <S.CTA
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            disabled={isSubmitting}
            startIcon={<SearchIcon />}
          >
            Buscar
          </S.CTA>
        </S.Actions>
      </S.Form>
      {rows && isSubmitted && (
        <ContainerTable>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            autoHeight
            pageSizeOptions={[10, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'year', sort: 'asc' }],
              },
            }}
            slots={{
              noRowsOverlay: NoRow,
            }}
            sx={{ '--DataGrid-overlayHeight': '18.75rem' }}
          />
        </ContainerTable>
      )}
      {!rows && (
        <Typography
          sx={{
            color: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            fontWeight: 'bold',
          }}
        >
          Algo deu errado
        </Typography>
      )}
    </S.Wrapper>
  );
};

export default withAuth(ReadViewPage);
