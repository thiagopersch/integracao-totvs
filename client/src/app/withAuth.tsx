'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './loading';

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/signIn');
      }
    }, [status, router]);

    if (status === 'loading') return <Loading />;

    return session ? <Component /> : null;
  };
}
