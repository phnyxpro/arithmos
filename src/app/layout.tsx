import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import { AppProviders } from '@/components/layout/app-providers';
import { Mail, Phone } from 'lucide-react';
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Arithmos: Financial Tools for Trinidad and Tobago SMEs',
    template: '%s | Arithmos', // This allows page.tsx to override the title 
  },
  description: 'Explore Arithmos suite of financial calculators tailored for Trinidad & Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
  keywords: ['Trinidad Tobago tax calculator', 'T&T tax tools', 'SME finance T&T', 'freelancer tax T&T', 'PAYE calculator T&T', 'VAT calculator T&T', 'Business Levy T&T', 'payroll calculator T&T', 'Trinidad Tobago compliance', 'financial tools T&T', 'small business tax T&T'],
  openGraph: {
    title: 'Arithmos:  Tax Calculators & Financial Tools for T&T SMEs',
    description: 'Explore Arithmos suite of  financial calculators tailored for Trinidad and Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
    url: 'https://yourwebsite.com', // Replace with your actual website URL
    siteName: 'Arithmos',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg', // Replace with a URL to your OGP image
        width: 1200,
        height: 630,
        alt: 'Arithmos - Financial Tools for Trinidad and Tobago',
      },
    ],
    locale: 'en_TT', // Specify locale if appropriate
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle', // Replace with your Twitter handle
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
    title: 'Arithmos: Calculators & Financial Tools for Trinidad and Tobago SMEs',
    description: 'Explore Arithmos suite of financial calculators tailored for Trinidad and Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
    images: ['https://yourwebsite.com/twitter-image.jpg'], // Replace with a URL to your Twitter card image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
 attribute="class"
 defaultTheme="system"
 enableSystem
 disableTransitionOnChange
 >
 <AppProviders>
 <div className="flex flex-col min-h-screen">
 <Header />
 <main className="flex-grow container mx-auto px-4 py-8">
 {children}
 </main>
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
                      <a href="/legal" className="underline hover:text-foreground">Terms of Service</a>                    </p>
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
              <Toaster />
            </div>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
