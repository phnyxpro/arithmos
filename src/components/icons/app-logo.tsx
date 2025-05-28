import type { SVGProps } from 'react';
import Image from 'next/image';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <img src="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/file.svg?alt=media&token=970ecef0-bfd9-4df4-911b-87c0ad9a5a06" alt="Arithmos Logo" className="h-6 w-auto" />
  );
}
