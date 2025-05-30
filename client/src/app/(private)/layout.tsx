import { nextAuthOptions } from '@/auth/nextAuthOptions';
import RootProvider from '@/providers/RootProvider';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type PrivateLayoutProps = {
  children: React.ReactNode;
};
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/signIn');
  }
  return <RootProvider>{children}</RootProvider>;
}
