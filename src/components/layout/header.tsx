
"use client";

import * as React from 'react';
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Users as UsersIconLucide, // Renamed to avoid conflict with User icon
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
  Library,
  Factory,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const calculatorNavItems = [
  { href: "/calculators/time-calculator", label: "Time Calculator", Icon: Clock },
  { href: "/calculators/payroll", label: "PAYE, NIS & HS (Payroll)", Icon: UsersIconLucide },
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
    { href: "/knowledge-base", label: "All Articles", Icon: Library },
    { href: "/knowledge-base/property-tax", label: "Property Tax Act", Icon: House },
    { href: "/knowledge-base/vat", label: "VAT Act", Icon: ReceiptText },
    { href: "/knowledge-base/income-corporation-tax", label: "Income & Corp. Tax Act", Icon: Building },
    { href: "/knowledge-base/aid-to-industry", label: "Aid to Industry Act", Icon: Factory },
];

type UserNavItem =
  | { type: "label"; label: string }
  | { type: "separator" }
  | { type: "item"; href?: string; label: string; Icon: React.ElementType; nonInteractive?: boolean }
  | { type: "themeToggle"; label?: string; Icon?: React.ElementType };


const userNavItems: UserNavItem[] = [
    { type: "label" as const, label: "My Account" },
    { type: "separator" as const },
    { type: "item" as const, href: "/profile", label: "Profile Settings", Icon: Settings },
    { type: "item" as const, label: "Subscription", Icon: CreditCard, nonInteractive: true },
    { type: "themeToggle" as const },
    { type: "separator" as const },
    { type: "item" as const, href: "/auth/login", label: "Login", Icon: LogIn },
];


export default function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const mainNavItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full text-header-foreground shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-10">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <AppLogo className="h-8 w-8 text-header-foreground" />
          <span className="font-bold text-xl text-header-accent sm:inline-block">Arithmos</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 md:space-x-2 ml-auto">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-header-foreground hover:bg-header-foreground/10 transition-colors px-2 py-1 rounded-md md:px-3"
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-medium text-header-foreground hover:bg-header-foreground/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Calculators
                <ChevronDown className="ml-1 h-4 w-4 text-header-foreground" />
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
                className="text-sm font-medium text-header-foreground hover:bg-header-foreground/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Accounting
                <ChevronDown className="ml-1 h-4 w-4 text-header-foreground" />
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
                className="text-sm font-medium text-header-foreground hover:bg-header-foreground/10 transition-colors px-2 py-1 rounded-md md:px-3"
              >
                Knowledge Base
                <ChevronDown className="ml-1 h-4 w-4 text-header-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover text-popover-foreground">
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
          
          {/* User Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full p-0 text-header-foreground hover:bg-header-foreground/10"
              >
                <UserIcon className="h-5 w-5 text-header-foreground" />
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
                if (item.type === "themeToggle") {
                  if (!mounted) {
                    return (
                      <DropdownMenuItem key={`user-item-${index}`} disabled>
                        <Sun className="mr-2 h-4 w-4" /> 
                        <span>Loading theme...</span>
                      </DropdownMenuItem>
                    );
                  }
                  const CurrentIcon = resolvedTheme === 'dark' ? Sun : Moon;
                  const currentLabel = resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                  return (
                    <DropdownMenuItem key={`user-item-${index}`} onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                      <CurrentIcon className="mr-2 h-4 w-4" />
                      <span>{currentLabel}</span>
                    </DropdownMenuItem>
                  );
                }
                if (item.nonInteractive) {
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

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto flex items-center">
           <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-header-foreground hover:bg-header-foreground/10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] bg-sidebar text-sidebar-foreground">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-sidebar-primary flex items-center">
                  <AppLogo className="h-7 w-7 mr-2" />
                  Arithmos Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 text-sm">
                {mainNavItems.map((item) => (
                  <Link
                    key={`mobile-${item.label}`}
                    href={item.href}
                    className="block px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2 bg-sidebar-border" />
                <div className="px-3 py-1 font-semibold text-sidebar-foreground/70">Calculators</div>
                {calculatorNavItems.map((item) => (
                  <Link
                    key={`mobile-calc-${item.label}`}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2 bg-sidebar-border" />
                <div className="px-3 py-1 font-semibold text-sidebar-foreground/70">Accounting</div>
                {accountingNavItems.map((item) => (
                  <Link
                    key={`mobile-acc-${item.label}`}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2 bg-sidebar-border" />
                <div className="px-3 py-1 font-semibold text-sidebar-foreground/70">Knowledge Base</div>
                {knowledgeBaseNavItems.map((item) => (
                  <Link
                    key={`mobile-kb-${item.label}`}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          {/* User Menu still needs to be accessible on mobile, placing it after the sheet trigger */}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full p-0 ml-2 text-header-foreground hover:bg-header-foreground/10"
              >
                <UserIcon className="h-5 w-5 text-header-foreground" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground">
              {userNavItems.map((item, index) => {
                if (item.type === "label") {
                  return <DropdownMenuLabel key={`mobile-user-item-${index}`}>{item.label}</DropdownMenuLabel>;
                }
                if (item.type === "separator") {
                  return <DropdownMenuSeparator key={`mobile-user-item-${index}`} />;
                }
                if (item.type === "themeToggle") {
                  if (!mounted) {
                    return (
                      <DropdownMenuItem key={`mobile-user-item-${index}`} disabled>
                        <Sun className="mr-2 h-4 w-4" /> 
                        <span>Loading theme...</span>
                      </DropdownMenuItem>
                    );
                  }
                  const CurrentIcon = resolvedTheme === 'dark' ? Sun : Moon;
                  const currentLabel = resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                  return (
                    <DropdownMenuItem key={`mobile-user-item-${index}`} onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                      <CurrentIcon className="mr-2 h-4 w-4" />
                      <span>{currentLabel}</span>
                    </DropdownMenuItem>
                  );
                }
                if (item.nonInteractive) {
                  return (
                    <DropdownMenuItem key={`mobile-user-item-${index}`} disabled className="flex items-center w-full opacity-100 cursor-default">
                       {item.Icon && <item.Icon className="mr-2 h-4 w-4" />}
                       <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                }
                return (
                  <DropdownMenuItem key={`mobile-user-item-${index}`} asChild>
                    <Link href={item.href || "#"} className="flex items-center w-full">
                      {item.Icon && <item.Icon className="mr-2 h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
