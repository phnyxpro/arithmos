import Link from 'next/link';
import { AppLogo } from '@/components/icons/app-logo';
import { Button } from '@/components/ui/button'; // Added for potential future use or styling consistency

export default function Header() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/calculators", label: "Calculators" },
    { href: "/accounting", label: "Accounting" },
    { href: "/knowledge-base", label: "Knowledge Base" },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">TaxTT</h1>
        </Link>
        <nav className="flex items-center space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors px-2 py-1 rounded-md md:px-3"
            >
              {item.label}
            </Link>
          ))}
          {/* Example of a CTA button in the nav if needed later
          <Button variant="secondary" size="sm" asChild className="ml-2 hidden sm:inline-flex">
            <Link href="/auth/login">Login</Link>
          </Button>
          */}
        </nav>
      </div>
    </header>
  );
}
