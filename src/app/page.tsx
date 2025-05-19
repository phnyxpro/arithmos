
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Briefcase,
  DollarSign,
  Users as UsersIcon,
  Clock,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Calculator as CalculatorIcon,
  ArrowRight,
  CalendarDays,
  BookOpen,
  Linkedin,
  Facebook,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { BasicTimeCalculator } from '@/components/calculators/BasicTimeCalculator';
import { SimplifiedPayrollCalculator } from '@/components/calculators/SimplifiedPayrollCalculator';
import { SimplifiedLevyCalculator } from '@/components/calculators/SimplifiedLevyCalculator';

interface HeroContent {
  icon: React.ElementType;
  headline: string;
  primarySubheadline: string;
  secondarySubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroImageUrl: string;
}

const heroContentData: HeroContent = {
  icon: Briefcase,
  headline: "Calculate. Track. Comply.",
  primarySubheadline: "All Your Trinidad & Tobago Tax Tools in One Place.",
  secondarySubheadline: "From VAT and Business Levy to PAYE and Green Fund — simplify compliance with powerful, free tools.",
  primaryCtaText: "Try Our Calculators",
  primaryCtaLink: "#popular-calculators",
  secondaryCtaText: "Create Free Account",
  secondaryCtaLink: "/auth/signup", // Assuming a signup page
  heroImageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhY2NvdW50aW5nfGVufDB8fHx8MTc0NzM2MTg0MHww&ixlib=rb-4.1.0&q=80&w=1080",
};

interface CalculatorCardData {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  onClick?: () => void;
}

interface BenefitItem {
  icon: React.ElementType;
  text: string;
}

const whyUseTaxTTBenefits: BenefitItem[] = [
  { icon: CheckCircle2, text: "Always up-to-date with TT tax laws (concept)" },
  { icon: Briefcase, text: "Built for SMEs, freelancers, and professionals" },
  { icon: ShieldCheck, text: "IRD-aligned calculations (concept)" },
  { icon: Smartphone, text: "Mobile and desktop friendly" },
  { icon: ThumbsUp, text: "Free to use — no hidden fees" },
];

interface DeadlineItem {
  id: string;
  icon: React.ElementType;
  text: string;
}

const complianceDeadlines: DeadlineItem[] = [
  { id: "bl-q2", icon: CalendarDays, text: "Business Levy Q2 Deadline: June 30, 2025 (Example)" },
  { id: "vat-filing", icon: CalendarDays, text: "VAT Filing Due: July 25, 2025 (Example)" },
];

interface ResourceGuide {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const resourceGuides: ResourceGuide[] = [
  { id: "vat-reg", title: "How to Register for VAT in Trinidad", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#vat-registration", icon: BookOpen },
  { id: "paye-employer", title: "Understanding PAYE for Employers", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#paye-employer-guide", icon: BookOpen },
  { id: "green-fund", title: "Who Must Pay the Green Fund Levy?", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#green-fund-levy-guide", icon: BookOpen },
];

interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}
const calculatorInfoList: CalculatorInfo[] = [
  { id: "time", name: "Time Calculator", description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.", icon: CalculatorIcon },
  { id: "paye", name: "PAYE + NIS + HS (Payroll)", description: "Determines monthly statutory deductions for employees, including Pay As You Earn (PAYE) based on 25%/30% tax brackets, National Insurance Scheme (NIS) contributions (5.6% employee), and Health Surcharge based on weekly income thresholds.", icon: CalculatorIcon },
  { id: "business-levy", name: "Business Levy", description: "Calculates the Business Levy at 0.6% on annualized gross income that exceeds the TT$360,000 exemption threshold. Considers exemptions for new companies (first 3 years).", icon: CalculatorIcon },
  { id: "green-fund", name: "Green Fund Levy", description: "Estimates the Green Fund Levy at 0.3% of total annualized gross sales, payable quarterly.", icon: CalculatorIcon },
  { id: "corp-tax", name: "Corporation Tax", description: "Estimates Corporation Tax liability based on chargeable profits, considering allowable deductions, other income, loss carried forward, and tax credits. Standard rate of 30% applied.", icon: CalculatorIcon },
  { id: "income-tax", name: "Income Tax (Personal)", description: "Calculates personal income tax (PAYE), NIS, and Health Surcharge based on gross annual income and allowable deductions, applying the TT$90,000 personal allowance and relevant tax brackets.", icon: CalculatorIcon },
  { id: "property-tax", name: "Property Tax Estimator", description: "Provides a conceptual estimate of property tax based on Annual Rental Value (ARV) and property type, using simplified rates (e.g., 3% for residential after a 10% ARV deduction).", icon: CalculatorIcon },
  { id: "vat-calc", name: "VAT Calculator", description: "Calculates Value Added Tax (12.5%) on prices, allowing for input of price excluding or including VAT. Also includes a VAT registration eligibility checker.", icon: CalculatorIcon },
];

export default function LandingPage() {
  const [isBasicTimeCalcOpen, setIsBasicTimeCalcOpen] = React.useState(false);
  const [isPayrollCalcOpen, setIsPayrollCalcOpen] = React.useState(false);
  const [isLevyCalcOpen, setIsLevyCalcOpen] = React.useState(false);

  const handleOpenBasicTimeCalc = React.useCallback(() => setIsBasicTimeCalcOpen(true), []);
  const handleOpenPayrollCalc = React.useCallback(() => setIsPayrollCalcOpen(true), []);
  const handleOpenLevyCalc = React.useCallback(() => setIsLevyCalcOpen(true), []);

  const popularCalculators: CalculatorCardData[] = [
    {
      icon: Clock,
      title: "Basic Time Calculator",
      description: "For daily-paid workers to track work hours & pay.",
      ctaText: "Track Hours & Earnings",
      onClick: handleOpenBasicTimeCalc,
    },
    {
      icon: UsersIcon,
      title: "PAYE, NIS & HS",
      description: "Determine monthly statutory deductions live.",
      ctaText: "Estimate Deductions",
      onClick: handleOpenPayrollCalc,
    },
    {
      icon: BarChart3,
      title: "Levy Calculator",
      description: "Estimate Business Levy and Green Fund Levy from gross income.",
      ctaText: "Estimate Levies",
      onClick: handleOpenLevyCalc,
    },
  ];

  const HeroIcon = heroContentData.icon;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-2/5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <HeroIcon className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {heroContentData.headline}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary/90 mb-6">
                {heroContentData.primarySubheadline}
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-10">
                {heroContentData.secondarySubheadline}
              </p>
              <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-col sm:items-start lg:flex-row lg:space-x-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto lg:mb-0 mb-2">
                  <Link href={heroContentData.primaryCtaLink}>
                    {heroContentData.primaryCtaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10 w-full sm:w-auto">
                  <Link href={heroContentData.secondaryCtaLink}>{heroContentData.secondaryCtaText}</Link>
                </Button>
              </div>
            </div>
            <div 
              className="md:w-3/5 mt-10 md:mt-0 rounded-lg shadow-2xl aspect-video bg-cover bg-center"
              style={{ backgroundImage: `url('${heroContentData.heroImageUrl}')` }}
              aria-label="Person managing taxes with calculator and documents"
              data-ai-hint="taxes planning"
            ></div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="py-16" id="popular-calculators">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Start With Our Most Popular Calculators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCalculators.map((calc) => (
              <Card key={calc.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <calc.icon className="h-8 w-8 text-accent" />
                    <CardTitle className="text-xl text-primary">{calc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{calc.description}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={calc.onClick} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                    {calc.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Tax TT Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Use Tax TT?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {whyUseTaxTTBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg shadow-sm">
                <benefit.icon className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
                <p className="text-md text-foreground">{benefit.text}</p>
              </div>
            ))}
            <div className="md:col-span-2 lg:col-span-1 lg:col-start-2 p-6 bg-card rounded-lg shadow-md mt-8 md:mt-0">
              <p className="text-lg font-semibold text-primary mb-2">Real User Feedback</p>
              <blockquote className="italic text-muted-foreground">
                “Tax TT helped me understand my PAYE in minutes.”
              </blockquote>
              <p className="text-sm font-medium text-right mt-2">– Kareem, Sole Trader</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Stay Ahead with Compliance Tools</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {complianceDeadlines.map((deadline) => (
              <Card key={deadline.id} className="p-4 text-left shadow">
                <CardContent className="p-0">
                  <p className="font-semibold text-foreground flex items-center">
                    <deadline.icon className="mr-2 h-5 w-5 text-accent" />
                    {deadline.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground mt-6">
            Our dashboard provides timely reminders and planning tools (feature coming soon).
          </p>
        </div>
      </section>

      {/* Resources & Guides Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Resources &amp; Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resourceGuides.map((guide) => (
              <Card key={guide.id} className="shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader>
                  <div className="font-semibold tracking-tight text-lg text-primary flex items-center">
                    <guide.icon className="mr-2 h-5 w-5" />
                    {guide.title}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-accent p-0 h-auto">
                    <Link href={guide.href}>
                      Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Link href="/knowledge-centre">Explore All Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learn About Our Calculators Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Learn About Our Calculators</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {calculatorInfoList.map((calc) => (
              <AccordionItem value={calc.id} key={calc.id}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center">
                    <calc.icon className="mr-3 h-5 w-5 text-primary/80" />
                    {calc.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-10">
                  {calc.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Get Started/CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Taxes?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Access all our calculators and features by creating a free account or logging in.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:space-x-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80 w-full sm:w-auto">
              <Link href="#popular-calculators">Use a Calculator Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
          </div>
          <div className="mt-12">
            <p className="text-sm opacity-80 mb-2">Connect with us (Conceptual)</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" aria-label="LinkedIn" className="hover:opacity-80">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:opacity-80">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-slate-800 text-slate-300 text-center">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-7 w-7 text-accent" />
            <span className="font-bold text-xl text-primary-foreground">{heroContentData.headline}</span>
          </Link>
          <p>© {new Date().getFullYear()} {heroContentData.headline}. All rights reserved.</p>
          <p className="text-xs mt-1 opacity-70">Your trusted partner for Trinidad & Tobago tax solutions.</p>
          <div className="mt-2 space-x-3 text-xs">
            <Link href="#" className="hover:underline opacity-70 hover:opacity-100">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline opacity-70 hover:opacity-100">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Dialogs for Calculators */}
      <Dialog open={isBasicTimeCalcOpen} onOpenChange={setIsBasicTimeCalcOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Clock className="mr-2 h-6 w-6"/>Basic Time Calculator</DialogTitle>
          </DialogHeader>
          <BasicTimeCalculator />
          <DialogClose asChild>
             <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isPayrollCalcOpen} onOpenChange={setIsPayrollCalcOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><UsersIcon className="mr-2 h-6 w-6"/>PAYE, NIS & HS Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedPayrollCalculator />
          <DialogClose asChild>
             <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isLevyCalcOpen} onOpenChange={setIsLevyCalcOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><DollarSign className="mr-2 h-6 w-6"/>Levy Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedLevyCalculator />
           <DialogClose asChild>
             <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    