
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from '@/components/layout/app-providers';
import { ThemeProvider } from "next-themes";
import { ConditionalLayoutWrapper } from '@/components/layout/conditional-layout-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Arithmos: Financial Tools for Trinidad and Tobago SMEs',
    template: '%s | Arithmos', 
  },
  description: 'Explore Arithmos suite of financial calculators tailored for Trinidad & Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
  keywords: ['Trinidad Tobago tax calculator', 'T&T tax tools', 'SME finance T&T', 'freelancer tax T&T', 'PAYE calculator T&T', 'VAT calculator T&T', 'Business Levy T&T', 'payroll calculator T&T', 'Trinidad Tobago compliance', 'financial tools T&T', 'small business tax T&T'],
  openGraph: {
    title: 'Arithmos:  Tax Calculators & Financial Tools for T&T SMEs',
    description: 'Explore Arithmos suite of  financial calculators tailored for Trinidad and Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
    url: 'https://yourwebsite.com', 
    siteName: 'Arithmos',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Arithmos - Financial Tools for Trinidad and Tobago',
      },
    ],
    locale: 'en_TT', 
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle', 
    creator: '@yourtwitterhandle', 
    title: 'Arithmos: Calculators & Financial Tools for Trinidad and Tobago SMEs',
    description: 'Explore Arithmos suite of financial calculators tailored for Trinidad and Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
    images: ['https://yourwebsite.com/twitter-image.jpg'], 
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
            <ConditionalLayoutWrapper>{children}</ConditionalLayoutWrapper>
            <Toaster />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
