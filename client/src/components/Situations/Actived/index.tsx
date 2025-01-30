import { Typography } from '@mui/material';

type ActivedProps = {
  children: React.ReactNode | string;
};

const Actived = ({ children }: ActivedProps) => {
  return (
    <Typography variant="inherit" color="success.main">
      {children}
    </Typography>
  );
};

export default Actived;
