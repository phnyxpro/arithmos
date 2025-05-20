
"use client";

import Link from 'next/link';
import { AppLogo } from '@/components/icons/app-logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  CloudUpload, 
  Landmark,    
  BarChart3,   
  User as UserIcon, 
  Settings,
  CreditCard,
  LogIn,
  Library, // Added for Knowledge Base main item
  Factory // Added for Aid to Industry
} from 'lucide-react';

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

const accountingNavItems = [
  { href: "/invoices/billing", label: "Invoicing & Billing", Icon: FileTextIcon },
  { href: "/invoices/expenses", label: "Expense Tracking", Icon: CloudUpload },
  { href: "/invoices/reconciliation", label: "Bank Reconciliation", Icon: Landmark },
  { href: "/invoices/reports", label: "Financial Reporting", Icon: BarChart3 },
];

const knowledgeBaseNavItems = [
  { href: "/knowledge-base/property-tax", label: "Property Tax Act", Icon: House },
  { href: "/knowledge-base/vat", label: "VAT Act", Icon: ReceiptText },
  { href: "/knowledge-base/income-corporation-tax", label: "Income & Corp. Tax Act", Icon: Building },
  { href: "/knowledge-base/aid-to-industry", label: "Aid to Industry Act", Icon: Factory },
];

const userNavItems = [
    { type: "label" as const, label: "My Account" },
    { type: "separator" as const },
    { type: "item" as const, href: "/profile", label: "Profile Settings", Icon: Settings },
    { type: "item" as const, label: "Subscription", Icon: CreditCard, nonInteractive: true }, 
    { type: "separator" as const },
    { type: "item" as const, href: "/auth/login", label: "Login", Icon: LogIn },
];

export default function Header() {
  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-primary sm:inline-block">TaxTT</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-1 md:space-x-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-2 py-1 rounded-md md:px-3"
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors px-2 py-1 rounded-md md:px-3"
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Accounting
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover text-popover-foreground">
              {accountingNavItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center w-full">
                    <item.Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Knowledge Base
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover text-popover-foreground">
               <DropdownMenuItem asChild>
                  <Link href="/knowledge-base" className="flex items-center w-full">
                    <Library className="mr-2 h-4 w-4" />
                    <span>All Articles</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
              {knowledgeBaseNavItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center w-full">
                    <item.Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full p-0 text-foreground/80 hover:text-foreground hover:bg-accent/10"
              >
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground">
              {userNavItems.map((item, index) => {
                if (item.type === "label") {
                  return <DropdownMenuLabel key={`user-item-${index}`}>{item.label}</DropdownMenuLabel>;
                }
                if (item.type === "separator") {
                  return <DropdownMenuSeparator key={`user-item-${index}`} />;
                }
                if (item.type === "item" && item.nonInteractive) {
                  return (
                    <DropdownMenuItem key={`user-item-${index}`} disabled className="flex items-center w-full opacity-100 cursor-default">
                       {item.Icon && <item.Icon className="mr-2 h-4 w-4" />}
                       <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                }
                return (
                  <DropdownMenuItem key={`user-item-${index}`} asChild>
                    <Link href={item.href || "#"} className="flex items-center w-full">
                      {item.Icon && <item.Icon className="mr-2 h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}

    