import { Box, CircularProgress, css, keyframes, styled } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const rotateSpinner = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
`;

export const Spinner = styled(CircularProgress)`
  ${({ theme }) => css`
    width: 2rem;
    margin-right: ${theme.spacing(1)};
    animation: 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) infinite
      ${rotateSpinner};
  `}
`;
