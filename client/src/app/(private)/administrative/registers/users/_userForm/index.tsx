import * as S from '@/app/(private)/administrative/styles';
import useUsers from '@/hooks/administrative/registers/users/useUsers';
import { User } from '@/types/user';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';

type UserFormProps = {
  user?: User | null;
};

export default function UserForm({ user }: UserFormProps) {
  const {
    errors,
    showPassword,
    isSubmitting,
    control,
    reset,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    register,
    Controller,
  } = useUsers();

  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        change_password: true,
        status: true,
      });
    }
  }, [user, reset]);

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.InputSentences>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
          <Controller
            name="change_password"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Alterar senha no primeiro login?"
              />
            )}
          />
        </FormGroup>
      </S.InputSentences>
      <S.InputSentences>
        <TextField
          type="text"
          label="Nome"
          variant="filled"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isSubmitting}
          fullWidth
          required
        />
      </S.InputSentences>
      <S.InputSentences>
        <TextField
          type="email"
          label="E-mail"
          variant="filled"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
          fullWidth
          required
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          id="password"
          label="Senha"
          variant="filled"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
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
        >
          {isSubmitting
            ? user
              ? 'Atualizando...'
              : 'Cadastrando...'
            : user
              ? 'Atualizar'
              : 'Cadastrar'}
        </S.CTA>
      </S.Actions>
    </S.Form>
  );
}
