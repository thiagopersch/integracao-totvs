'use client';

import * as S from '@/app/(administrative)/styles';
import performSentence from '@/lib/api/sentence/executeSentence';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import withAuth from '@/app/withAuth';
import Table from '@/components/Table';
import {
  Sync as SyncIcon,
  Tune as TuneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

const ExecuteSentece = () => {
  const apiRef = useGridApiRef();
  const [showPassword, setShowPassword] = useState(false);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      codColigada: '',
      codSistema: '',
      codSentenca: '',
      parameters: '',
      username: '',
      password: '',
      tbc: '',
      rows: [],
    },
  });

  const rows = watch('rows');

  const handleExpandedTable = () => {
    apiRef.current.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  };

  useEffect(() => {
    handleExpandedTable;
  }, [handleExpandedTable]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmitForm: SubmitHandler<Schema> = async (
    formData: PerformSentenceProps,
  ) => {
    try {
      const result = await performSentence(formData);

      let resultTable;
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
      } else {
        resultTable = [result].map((item: any, index: number) => ({
          id: index,
          ...item,
        }));
      }

      if (resultTable.length > 0) {
        const cols = Object.keys(resultTable[0]).map((key) => ({
          field: key !== '' ? key : 'NULL',
          renderHeader: () => (
            <Tooltip title={key} arrow>
              <Typography
                color="primary"
                variant="caption"
                sx={{ fontWeight: 'bold' }}
              >
                {key}
              </Typography>
            </Tooltip>
          ),
          //headerName: key,
          renderCell(params: any) {
            return (
              <Tooltip title={params.value} arrow>
                <Typography variant="caption" noWrap>
                  {params.value}
                </Typography>
              </Tooltip>
            );
          },
        }));
        setColumns(cols);
      }

      setValue('rows', resultTable);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.InputSentences>
          <TextField
            type="text"
            label="Código da coligada"
            {...register('codColigada')}
            variant="filled"
            error={!!errors.codColigada}
            helperText={errors.codColigada?.message}
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="Código do Sistema"
            {...register('codSistema')}
            error={!!errors.codSistema}
            helperText={errors.codSistema?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="Código da sentença"
            {...register('codSentenca')}
            error={!!errors.codSentenca}
            helperText={errors.codSentenca?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />

          <TextField
            type="text"
            label="Parâmetros"
            {...register('parameters')}
            error={!!errors.parameters}
            helperText="Ex: PARAM=VALUE"
            variant="filled"
            disabled={isSubmitting}
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            label="Usuário"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="filled"
            disabled={isSubmitting}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="TBC"
            error={!!errors.tbc}
            helperText={errors.tbc?.message}
            {...register('tbc')}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
        </S.InputSentences>
        <S.Actions>
          <S.CTA
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            disabled={isSubmitting}
            startIcon={<SyncIcon />}
          >
            Executar
          </S.CTA>
        </S.Actions>
      </S.Form>
      {rows && isSubmitted && (
        <Table
          rows={rows}
          columns={columns}
          isLoading={isSubmitting}
          apiRef={apiRef}
          onClick={handleExpandedTable}
          density="compact"
          autoHeight
          sortingField="name"
          label="Ajustar colunas"
          icon={<TuneIcon />}
        />
      )}
      {!rows && !isSubmitted && (
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

export default withAuth(ExecuteSentece);
