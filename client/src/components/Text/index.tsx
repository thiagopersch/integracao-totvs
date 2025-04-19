import { cn } from '@/lib/utils';
import React from 'react';

type TextVariant = 'title' | 'subtitle' | 'description' | 'normal';

interface TextProps {
  variant?: TextVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = 'normal',
  size,
  weight = 'normal',
  color,
  align = 'left',
  className,
  as: Tag = 'span',
  children,
}) => {
  const variantStyles: Record<TextVariant, string> = {
    title: cn(
      'text-2xl font-bold tracking-tight dark:text-neutral-50',
      size || 'text-3xl',
      weight === 'normal' ? 'font-bold' : `font-${weight}`,
      color || 'text-neutral-950',
    ),
    subtitle: cn(
      'text-lg font-semibold',
      size || 'text-xl',
      weight === 'normal' ? 'font-semibold' : `font-${weight}`,
      color || 'text-neutral-800',
    ),
    description: cn(
      'text-sm font-normal',
      size || 'text-base',
      weight === 'normal' ? 'font-normal' : `font-${weight}`,
      color || 'text-muted-foreground',
    ),
    normal: cn(
      'text-base font-normal',
      size || 'text-base',
      weight === 'normal' ? 'font-normal' : `font-${weight}`,
      color || 'text-neutral-950',
    ),
  };

  // Escolhe a tag semântica com base na variante, se não for especificada
  const defaultTag =
    variant === 'title'
      ? 'h1'
      : variant === 'subtitle'
        ? 'h2'
        : variant === 'description'
          ? 'p'
          : 'span';
  const Component = Tag || defaultTag;

  return (
    <Component
      className={cn(variantStyles[variant], `text-${align}`, className)}
    >
      {children}
    </Component>
  );
};

export default Text;
