import { cn } from '@/lib/utils';
import { Children, ReactNode } from 'react';

type CTAProps = {
  children: ReactNode;
  className?: string;
};

export default function CTA({ children, className }: CTAProps) {
  const childCount = Children.count(children);
  const isSingleChild = childCount === 1;
  const childrens = !isSingleChild
    ? 'justify-end items-center'
    : 'justify-center items-center flex-col-reverse';

  return (
    <div className={cn(`flex flex-row gap-4 ${childrens}`, className)}>
      {children}
    </div>
  );
}
