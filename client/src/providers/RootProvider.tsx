'use client';

import Loading from '@/app/loading';
import ContentAuth from '@/components/ContentAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import NextAuthSessionProvider from './sessionProvider';

export default function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <NextAuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {isLoading ? (
            <Loading />
          ) : (
            <ContentAuth>
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
            </ContentAuth>
          )}
        </NextThemesProvider>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
