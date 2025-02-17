'use client';

import * as S from '@/app/(private)/administrative/styles';
import Loading from '@/app/loading';
import withAuth from '@/app/withAuth';
import { saveRecord } from '@/lib/api/totvs/saveRecord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@monaco-editor/react';
import {
  Save as SaveIcon,
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

type Schema = z.infer<typeof schema>;

const SaveRecord = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
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
      username: '',
      password: '',
      tbc: '',
    },
  });

  const sentenca = watch('sentenca');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleSaveRecord: SubmitHandler<Schema> = async (formData: Schema) => {
    try {
      const {
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        contexto,
        dataServerName,
        username,
        password,
        tbc,
      } = formData;

      const result = await saveRecord(
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        dataServerName,
        contexto,
        username,
        password,
        tbc,
      );

      if (result?.status === 201) {
        setMessage(result.data);
      }

      return result;
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleSaveRecord)}>
        <S.InputSentences>
          <TextField
            type="text"
            id="codColigada"
            label="Código da Coligada"
            variant="filled"
            {...register('codColigada')}
            helperText={errors.codColigada?.message}
            error={!!errors.codColigada}
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type="text"
            id="codSistema"
            label="Código do Sistema"
            variant="filled"
            helperText={errors.codSistema?.message}
            error={!!errors.codSistema}
            {...register('codSistema')}
            disabled={isSubmitting}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="codSentenca"
            label="Código da Sentença"
            variant="filled"
            helperText={errors.codSentenca?.message}
            error={!!errors.codSentenca}
            {...register('codSentenca')}
            disabled={isSubmitting}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="nameSentenca"
            label="Nome da Sentença"
            variant="filled"
            helperText={errors.nameSentenca?.message}
            error={!!errors.nameSentenca}
            {...register('nameSentenca')}
            disabled={isSubmitting}
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
            helperText={errors.username?.message}
            error={!!errors.username}
            {...register('username')}
            disabled={isSubmitting}
            required
            fullWidth
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Senha"
            variant="filled"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register('password')}
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
            helperText={errors.tbc?.message}
            error={!!errors.tbc}
            {...register('tbc')}
            placeholder="Ex: http://localhost:8051/"
            disabled={isSubmitting}
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
            helperText={errors.contexto?.message}
            error={!!errors.contexto}
            {...register('contexto')}
            disabled={isSubmitting}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="dataServerName"
            label="DataServer"
            variant="filled"
            helperText={errors.dataServerName?.message}
            error={!!errors.dataServerName}
            {...register('dataServerName')}
            disabled
            aria-readonly={true}
            required
            fullWidth
            hidden
          />
        </S.InputSentences>
        <Editor
          height="40dvh"
          language="sql"
          defaultLanguage="sql"
          theme="vs-dark"
          value={sentenca}
          loading={<Loading />}
          defaultValue={sentenca}
          onChange={(value) => setValue('sentenca', value || '')}
          options={{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
        />
        <S.Actions>
          <S.CTA
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            startIcon={<SaveIcon />}
          >
            Salvar no TOTVS
          </S.CTA>
        </S.Actions>
      </S.Form>
      {message && <Typography sx={{ color: 'red' }}>{message}</Typography>}
    </S.Wrapper>
  );
};

export default withAuth(SaveRecord);
