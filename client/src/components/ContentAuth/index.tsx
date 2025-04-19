import { useSession } from 'next-auth/react';
import Navbar from '../Navbar';

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
