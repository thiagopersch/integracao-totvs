'use client';

import * as S from '@/app/(administrative)/styles';
import Loading from '@/app/loading';
import withAuth from '@/app/withAuth';
import readRecord from '@/lib/api/totvs/readRecord';
import { zodResolver } from '@hookform/resolvers/zod';
import Editor from '@monaco-editor/react';
import {
  Search as SearchIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  sentenca?: string;
};

const ReadRecord = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<Schema>();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      codColigada: '',
      codSistema: '',
      codSentenca: '',
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbConsSqlData',
      username: '',
      password: '',
      tbc: '',
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleReadRecord: SubmitHandler<Schema> = async (formData: Schema) => {
    const {
      codColigada,
      codSentenca,
      codSistema,
      contexto,
      dataServerName,
      password,
      username,
      tbc,
    } = formData;
    const primaryKey = `${codColigada};${codSistema};${codSentenca}`;

    try {
      const result = await readRecord(
        dataServerName,
        primaryKey,
        contexto,
        username,
        password,
        tbc,
      );

      const gConsSql = result.GlbConsSql.GConsSql[0];
      const codColigada = gConsSql.CODCOLIGADA[0];
      const codSentenca = gConsSql.CODSENTENCA[0];
      const sentenca =
        result.GlbConsSql.GConsSql[0].TAMANHO[0] !== '0'
          ? gConsSql.SENTENCA[0]
          : setError('A consulta não retornou dados.');

      setData({
        codColigada,
        codSistema,
        codSentenca,
        contexto,
        dataServerName,
        password,
        sentenca,
        username,
        tbc,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleReadRecord)}>
        <S.InputSentences>
          <TextField
            type="text"
            id="codColigada"
            label="Código da Coligada"
            variant="filled"
            {...register('codColigada')}
            disabled={isSubmitting}
            helperText={errors.codColigada?.message}
            error={!!errors.codColigada}
            fullWidth
            required
          />
          <TextField
            type="text"
            id="codSistema"
            label="Código do Sistema"
            variant="filled"
            {...register('codSistema')}
            disabled={isSubmitting}
            helperText={errors.codSistema?.message}
            error={!!errors.codSistema}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="codSentenca"
            label="Código da Sentença"
            variant="filled"
            {...register('codSentenca')}
            disabled={isSubmitting}
            helperText={errors.codSentenca?.message}
            error={!!errors.codSentenca}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register('username')}
            disabled={isSubmitting}
            helperText={errors.username?.message}
            error={!!errors.username}
            required
            fullWidth
          />
          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            variant="filled"
            {...register('password')}
            disabled={isSubmitting}
            helperText={errors.password?.message}
            error={!!errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            placeholder="Ex: http://localhost:8051/"
            {...register('tbc')}
            disabled={isSubmitting}
            helperText={errors.tbc?.message}
            error={!!errors.tbc}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register('contexto')}
            disabled={isSubmitting}
            helperText={errors.contexto?.message}
            error={!!errors.contexto}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="dataServerName"
            label="DataServer"
            variant="filled"
            aria-readonly={true}
            {...register('dataServerName')}
            disabled
            helperText={errors.dataServerName?.message}
            error={!!errors.dataServerName}
            required
            hidden
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
      {data && error === '' && (
        <Editor
          height="45dvh"
          language="sql"
          defaultLanguage="sql"
          theme="vs-dark"
          loading={<Loading />}
          defaultValue={data.sentenca}
          value={data.sentenca}
          options={{ readOnly: true }}
        />
      )}
      {error && (
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
          {error}
        </Typography>
      )}
    </S.Wrapper>
  );
};

export default withAuth(ReadRecord);
