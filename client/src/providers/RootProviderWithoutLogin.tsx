'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Suspense, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from '@/app/loading';
import GlobalLoading from '@/components/GlobalLoading';
import NextAuthSessionProvider from './sessionProvider';

export default function RootProviderWithoutLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <GlobalLoading />
            {children}
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              theme="colored"
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={2}
              style={{ width: 'auto' }}
            />
          </NextThemesProvider>
        </Suspense>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
