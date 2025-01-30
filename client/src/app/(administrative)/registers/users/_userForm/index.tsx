import * as S from '@/app/(administrative)/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import useUsers from '../hook/useUsers';

export default function UserForm() {
  const {
    errors,
    showPassword,
    isSubmitting,
    control,
    errorMessage,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    register,
    Controller,
  } = useUsers();

  return (
    <S.Form onSubmit={handleSubmit}>
      {errorMessage && (
        <Alert
          variant="standard"
          color="error"
          severity="error"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          {errorMessage}
        </Alert>
      )}
      <S.InputSentences>
        <FormGroup>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={!!field.value} />}
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
                control={<Checkbox {...field} checked={!!field.value} />}
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
          required
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
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </S.CTA>
      </S.Actions>
    </S.Form>
  );
}
