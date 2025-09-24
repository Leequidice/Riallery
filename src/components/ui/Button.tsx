import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-neutral-900 text-white hover:bg-neutral-800 font-medium': variant === 'primary',
            'bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-300': variant === 'secondary',
            'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-50': variant === 'outline',
            'text-neutral-700 hover:bg-primary-400/20': variant === 'ghost',
            // Sizes
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };