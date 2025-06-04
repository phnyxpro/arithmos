
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase"; // Assuming your firebase init is here
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
import { ScrollArea } from "@/components/ui/scroll-area"; // Added ScrollArea import
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
import { onAuthStateChanged, User } from "firebase/auth";

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
    { href: "/knowledge-base/income-tax", label: "Income Tax Act", Icon: Building },
    { href: "/knowledge-base/corporation-tax", label: "Corporation Tax Act", Icon: Banknote},
    { href: "/knowledge-base/aid-to-industry", label: "Aid to Industry Act", Icon: Factory },
];

type UserNavItem =
  | { type: "label"; label: string }
  | { type: "separator" }
  | { type: "item"; href?: string; label: string; Icon: React.ElementType; nonInteractive?: boolean }
  | { type: "themeToggle"; label?: string; Icon?: React.ElementType };

export default function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [user, setUser] = useState<User | null>(null); // State to hold authenticated user

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Placeholder for logout
  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement actual logout logic here
  };

  const userNavItems: UserNavItem[] = [
    { type: "label", label: user ? "My Account" : "Account" },
    { type: "separator" },
    ...(user ? [{ type: "item" as const, href: "/profile", label: "Profile Settings", Icon: Settings }] : []),
    ...(user ? [{ type: "item" as const, label: "Subscription", Icon: CreditCard, nonInteractive: true }] : []),
    { type: "themeToggle" },
    { type: "separator" },
    ...(user ? [{ type: "item" as const, label: "Logout", Icon: LogIn, onClick: handleLogout }] : [{ type: "item" as const, href: "/auth/login", label: "Login", Icon: LogIn }]),
  ];

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

        {/* Desktop Navigation is intentionally omitted in this simplified version */}

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto flex items-center">
          <Sheet>
            {/* Basic SheetTrigger for mobile menu */}
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
          </Sheet>

          {/* User Menu Dropdown */}
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
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
