import { useAuth } from '@/app/AuthContext';
import Navbar from '../Navbar';

const ContentAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      {children}
    </>
  );
};

export default ContentAuth;
