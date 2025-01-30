'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent() {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <Component />;
  };
}
