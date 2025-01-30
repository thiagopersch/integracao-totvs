'use client';

import * as S from '@/app/login/styles';
import { theme } from '@/styles/theme';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import useLogin from './hook/useLogin';

const LoginPage = () => {
  const {
    errors,
    showPassword,
    isSubmitting,
    errorMessage,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    onSubmit,
    register,
  } = useLogin();

  return (
    <S.Container>
      <S.CardContainer
        variant="elevation"
        elevation={4}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <S.Wrapper>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.Title variant="h4" color="primary" gutterBottom>
              Acessar o sistema
            </S.Title>
            {errorMessage && (
              <Alert color="error" severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <S.InputSentences>
              <TextField
                type="email"
                label="E-mail"
                variant="outlined"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isSubmitting}
                fullWidth
                required
              />
            </S.InputSentences>
            <S.InputSentences>
              <TextField
                type={showPassword ? 'text' : 'password'}
                id="password"
                label="Senha"
                variant="outlined"
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
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
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
                type="button"
                color="secondary"
                variant="outlined"
                size="large"
              >
                Recuperar senha
              </S.CTA>
              <S.CTA
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </S.CTA>
            </S.Actions>
          </S.Form>
        </S.Wrapper>
      </S.CardContainer>
    </S.Container>
  );
};

export default LoginPage;
