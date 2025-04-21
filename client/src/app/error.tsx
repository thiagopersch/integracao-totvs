'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Error() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          A critical error occurred. Please contact the administrator!
        </AlertDescription>
      </Alert>
    </div>
  );
}
