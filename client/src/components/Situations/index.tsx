'use client';

import { cn } from '@/lib/utils';

type StatusTextProps = {
  children: React.ReactNode | string;
  status: 'active' | 'disabled';
};

const StatusText = ({ children, status }: StatusTextProps) => {
  return (
    <span
      className={cn(
        'text-sm font-medium',
        status === 'active' && 'text-green-600 dark:text-green-400',
        status === 'disabled' && 'text-red-600 dark:text-red-400',
      )}
    >
      {children}
    </span>
  );
};

export default StatusText;
