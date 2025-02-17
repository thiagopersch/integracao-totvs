'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login');
      }
    }, [status, router]);

    if (status === 'loading') return <div>Carregando...</div>;

    return session ? <Component /> : null;
  };
}
