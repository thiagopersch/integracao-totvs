import { Typography } from '@mui/material';

type DisabledProps = {
  children: React.ReactNode | string;
};

const Disabled = ({ children }: DisabledProps) => {
  return (
    <Typography variant="inherit" color="error.main">
      {children}
    </Typography>
  );
};

export default Disabled;
