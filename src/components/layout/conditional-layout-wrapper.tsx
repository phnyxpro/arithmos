
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';
import { Mail, Phone } from 'lucide-react';

interface ConditionalLayoutWrapperProps {
  children: ReactNode;
}

export function ConditionalLayoutWrapper({ children }: ConditionalLayoutWrapperProps) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== '/tax-tt';

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      {showHeaderFooter && (
        <footer className="w-full py-8 text-muted-foreground text-sm bg-gray-100 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-foreground mb-2">Arithmos</p>
              <p>
                Developed by{' '}
                <a
                  href="https://phnyx.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  the phnyx.dev team
                </a>
              </p>
              <p className="mt-1">
                In partnership with{' '}
                <a
                  href="https://ia.tt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Innovation Activators
                </a>
              </p>
              <p className="mt-1">
                <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a> |{' '}
                <a href="/legal" className="underline hover:text-foreground">Terms of Service</a>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-foreground mb-2">Contact Us</p>
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:dev@phnyx.pro" className="underline hover:text-foreground">
                  dev@phnyx.pro
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+18687471191" className="underline hover:text-foreground">
                  +1 (868) 747-1191
                </a>
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-foreground mb-2">Disclaimer</p>
              <p className="text-xs max-w-sm">
                The information and calculations provided on Arithmos are for illustrative purposes only and should not be considered as professional tax or financial advice. Always consult with a qualified professional for advice tailored to your specific situation.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
