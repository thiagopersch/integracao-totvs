'use client';

import { useIsFetching } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  const isFetching = useIsFetching();

  if (isFetching) {
    return (
      <div className="fixed inset-0 flex backdrop-blur-[2px] justify-center items-center bg-black/50 z-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return null;
}
