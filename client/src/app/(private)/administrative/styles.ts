import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2rem',
  flex: '1 1 100%',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const InputSentences = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const Actions = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '1rem',
  gap: '2rem',
});

export const CTA = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
