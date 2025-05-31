import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function AppLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { className, ...rest } = props;
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/tax.tt%20(2).png?alt=media&token=b5a3a9f2-7f3c-4d77-b673-7a8b1105da12"
      alt="Arithmos Logo"
      className={cn(
        "h-6 w-auto", // Default size, can be overridden by passed className
        "bg-gray-100 p-0.5 rounded-sm", // Added light background, padding, and rounding
        className // Apply passed className, allowing overrides
      )}
      {...rest}
    />
  );
}
