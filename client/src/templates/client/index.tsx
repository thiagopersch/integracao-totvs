import * as S from '@/app/(private)/administrative/styles';
import useClient from '@/hooks/administrative/registers/client/useClient';
import { Client } from '@/types/client';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useEffect } from 'react';

type ClientFormProps = {
  client: Client | null;
};

const ClientForm = ({ client }: ClientFormProps) => {
  const {
    errors,
    isSubmitting,
    control,
    reset,
    handleSubmit,
    register,
    Controller,
  } = useClient();

  useEffect(() => {
    if (client) {
      reset(client);
    } else {
      reset({
        name: '',
        link_crm: '',
        site: '',
        status: true,
      });
    }
  }, [client, reset]);

  return (
    <S.Form onSubmit={handleSubmit}>
      <Box>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={field.value ? 'Ativado' : 'Desativado'}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          type="text"
          label="Nome"
          variant="filled"
          fullWidth
        />
        <TextField
          {...register('link_crm')}
          error={!!errors.link_crm}
          helperText={errors.link_crm?.message}
          type="url"
          label="Link CRM"
          variant="filled"
          fullWidth
        />
        <TextField
          {...register('site')}
          error={!!errors.site}
          helperText={errors.site?.message}
          type="url"
          label="Website"
          variant="filled"
          fullWidth
        />
      </Box>

      <S.Actions>
        <S.CTA
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? client
              ? 'Atualizando...'
              : 'Cadastrando...'
            : client
              ? 'Atualizar'
              : 'Cadastrar'}
        </S.CTA>
      </S.Actions>
    </S.Form>
  );
};

export default ClientForm;
