import Navbar from '../Navbar';
import { useSession } from 'next-auth/react';

const ContentAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && <Navbar />}
      {children}
    </>
  );
};

export default ContentAuth;
