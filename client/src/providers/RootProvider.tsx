'use client';

import Loading from '@/app/loading';
import ContentAuth from '@/components/ContentAuth';
import GlobalStyles from '@/styles/global';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import CacheProvider from './cacheProvider';
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
        <AppRouterCacheProvider>
          <CacheProvider>
            <ThemeProvider theme={theme}>
              {isLoading ? (
                <Loading />
              ) : (
                <ContentAuth>
                  <GlobalStyles />
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
            </ThemeProvider>
          </CacheProvider>
        </AppRouterCacheProvider>
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
