import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import { AppProviders } from '@/components/layout/app-providers';
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
  description: 'Explore Arithmos suite of free financial calculators tailored for Trinidad & Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
  keywords: ['Trinidad Tobago tax calculator', 'T&T tax tools', 'SME finance T&T', 'freelancer tax T&T', 'PAYE calculator T&T', 'VAT calculator T&T', 'Business Levy T&T', 'payroll calculator T&T', 'Trinidad Tobago compliance', 'financial tools T&T', 'small business tax T&T'],
  openGraph: {
    title: 'Arithmos: Free Tax Calculators & Financial Tools for T&T SMEs',
    description: 'Explore Arithmos's suite of free financial calculators tailored for Trinidad & Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
    url: 'https://yourwebsite.com', // Replace with your actual website URL
    siteName: 'Arithmos',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg', // Replace with a URL to your OGP image
        width: 1200,
        height: 630,
        alt: 'Arithmos - Tax Calculators and Financial Tools for T&T',
      },
    ],
    locale: 'en_TT', // Specify locale if appropriate
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle', // Replace with your Twitter handle
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
    title: 'Arithmos: Free Tax Calculators & Financial Tools for T&T SMEs',
    description: 'Explore Arithmos suite of free financial calculators tailored for Trinidad & Tobago businesses and freelancers. Simplify PAYE, VAT, Business Levy, payroll, and compliance with our easy-to-use tools.',
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
              <Toaster />
            </div>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
