'use client';

import { Alert, Stack } from '@mui/material';

const Error = () => {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Alert severity="error">
        Aconteceu algum erro crítico, por favor entre em contato com o
        administrador!
      </Alert>
    </Stack>
  );
};

export default Error;
