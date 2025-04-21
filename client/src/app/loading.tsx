'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen max-h-full">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
