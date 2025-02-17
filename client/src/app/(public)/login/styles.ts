import { Box, Button, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  overflow: 'hidden',
  backgroundImage: 'linear-gradient(to right top, #3dd5d6, #36cccd, #2ec3c4, #26bbbb, #1db2b2, #17a5a5, #109999, #088d8d, #057b7b, #036969, #015858, #004747)',
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  width: '50dvw',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '1rem',
  [theme.breakpoints.down('md')]: {
    width: '100dvw',
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2rem',
  flex: '1 1 100%',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem',
  },
}));

export const Title = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  padding: '1.5rem',
});

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

export const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column-reverse',
  },
}));

export const CTA = styled(Button)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});
