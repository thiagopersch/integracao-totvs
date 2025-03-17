'use client';

import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { ReactNode } from 'react';

type NextAuthSessionProviderProps = {
  children: ReactNode;
};

const cache = createCache({ key: 'css' });

export default function CacheProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <EmotionCacheProvider value={cache}>{children}</EmotionCacheProvider>;
}
