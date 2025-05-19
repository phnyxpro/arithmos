
"use client";

import Link from 'next/link';
import { AppLogo } from '@/components/icons/app-logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Users,
  Banknote,
  Leaf,
  Building,
  FileText as FileTextIcon,
  House,
  ReceiptText,
  ChevronDown,
} from 'lucide-react';

// Define calculator items for the dropdown
const calculatorNavItems = [
  { href: "/calculators/time-calculator", label: "Time Calculator", Icon: Clock },
  { href: "/calculators/payroll", label: "PAYE, NIS & HS (Payroll)", Icon: Users },
  { href: "/calculators/business-levy", label: "Business Levy", Icon: Banknote },
  { href: "/calculators/green-fund-levy", label: "Green Fund Levy", Icon: Leaf },
  { href: "/calculators/corporation-tax", label: "Corporation Tax", Icon: Building },
  { href: "/calculators/income-tax", label: "Income Tax", Icon: FileTextIcon },
  { href: "/calculators/property-tax", label: "Property Tax", Icon: House },
  { href: "/calculators/vat", label: "VAT Calculator", Icon: ReceiptText },
];

export default function Header() {
  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    // Calculators will be handled by DropdownMenu
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
        <nav className="flex items-center space-x-1 md:space-x-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors px-2 py-1 rounded-md md:px-3"
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Calculators
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover text-popover-foreground">
              {calculatorNavItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center w-full">
                    <item.Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
