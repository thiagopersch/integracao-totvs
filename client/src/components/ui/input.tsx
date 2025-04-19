import { cn } from '@/lib/utils';
import * as React from 'react';

type InputProps = React.ComponentProps<'input'> & {
  error?: string | boolean; // Para indicar erro (string para mensagem, boolean para estado)
  icon?: React.ReactNode; // Propriedade para o ícone
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[3rem] w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            icon ? 'pl-8' : '', // Adiciona padding à esquerda se houver ícone
            error
              ? 'border-red-500 dark:border-red-400 focus-visible:ring-red-500 focus-visible:ring-offset-red-400'
              : 'border-input hover:border-gray-300',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
