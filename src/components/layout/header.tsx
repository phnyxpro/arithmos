
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { AppLogo } from "@/components/icons/app-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calculator,
  ChevronDown,
  CreditCard,
  Home,
  LayoutDashboard,
  BookOpen,
  LogIn,
  Settings,
  Clock,
  PiggyBank,
  ReceiptText,
  BarChart4,
  Menu,
  Moon,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { onAuthStateChanged, User } from "firebase/auth";

type UserNavItem =
  | { type: "label"; label: string }
  | { type: "separator" }
  | { type: "item"; href: string; label: string; Icon: React.ElementType; nonInteractive?: boolean }
  | { type: "item"; label: string; Icon: React.ElementType; onClick: () => void }
  | { type: "themeToggle"; label: string; Icon: React.ElementType };

export default function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add auth.signOut() or similar here.
  };

  const calculatorNavItems = [
    { href: "/calculators/time-calculator", label: "Time Calculator", Icon: Clock },
    { href: "/calculators/payroll", label: "Payroll Calculator", Icon: PiggyBank },
  ];

  const accountingNavItems = [
    { href: "/accounting/invoices", label: "Invoices", Icon: ReceiptText },
    { href: "/accounting/expenses", label: "Expenses", Icon: BarChart4 },
  ];

  const knowledgeBaseNavItems: ({ href: string; label: string; Icon: React.ElementType } | { type: "separator" | "label"; label: string })[] = [
    { href: "/knowledge-base", label: "All Articles", Icon: BookOpen },
    { type: "separator", label: "" },
    { type: "label", label: "Articles" },
    { href: "/knowledge-base/article-1", label: "Article 1", Icon: BookOpen },
    { href: "/knowledge-base/article-2", label: "Article 2", Icon: BookOpen },
  ];

  const userNavItems: UserNavItem[] = [
    { type: "label", label: user ? "My Account" : "Account" },
    { type: "separator" },
    ...(user ? [{ type: "item", href: "/profile", label: "Profile Settings", Icon: Settings }] : []),
    ...(user ? [{ type: "item", label: "Subscription", Icon: CreditCard, onClick: () => {} }] : []),
    {
      type: "themeToggle",
      label: "Toggle Theme",
      Icon: theme === "dark" ? Sun : Moon,
    },
    { type: "separator" },
    ...(user
      ? [{ type: "item", label: "Logout", Icon: LogIn, onClick: handleLogout }]
      : [{ type: "item", href: "/auth/login", label: "Login", Icon: LogIn }]),
  ];

  return (
    <header className="sticky top-0 z-50 w-full text-header-foreground shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-10">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <AppLogo className="h-8 w-8 text-header-foreground" />
          <span className="font-bold text-xl text-header-accent sm:inline-block">Arithmos</span>
        </Link>

        {/* Insert Desktop Navigation and Mobile Trigger Here (unchanged for brevity) */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <UserIcon className="h-6 w-6 text-header-foreground" />
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
                return (
                  mounted && (
                    <DropdownMenuItem
                      key={`user-item-${index}`}
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex items-center w-full"
                    >
                      <item.Icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  )
                );
              }
              if ("onClick" in item) {
                return (
                  <DropdownMenuItem key={`user-item-${index}`} onClick={item.onClick} className="flex items-center w-full">
                    <item.Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem key={`user-item-${index}`} asChild>
                  <Link href={item.href} className="flex items-center w-full">
                    <item.Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
