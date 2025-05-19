import Link from 'next/link';
import { AppLogo } from '@/components/icons/app-logo';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">TaxTT</h1>
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}
