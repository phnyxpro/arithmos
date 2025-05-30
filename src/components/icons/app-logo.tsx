import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function AppLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { className, ...rest } = props;
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/file.svg?alt=media&token=970ecef0-bfd9-4df4-911b-87c0ad9a5a06"
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
