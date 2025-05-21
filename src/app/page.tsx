
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Image import is no longer needed for the hero section itself
// import Image from "next/image"; 
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
import { Badge } from "@/components/ui/badge";
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
  // FileText, // No longer used on this page directly, BookOpen is used instead
  // Bell, // No longer used on this page
  // Users, // Duplicate of UsersIcon
  Linkedin,
  Facebook,
  // Heart, // No longer used
  // ShieldHalf, // No longer used
  // TrendingUp, // No longer used
  // FileSpreadsheet, // No longer used
  // ListChecks, // No longer used
  FileHeart,
  BookOpen, 
  CheckCircle2, 
  ThumbsUp,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // DialogDescription removed as not used
import { BasicTimeCalculator } from '@/components/calculators/BasicTimeCalculator';
import { SimplifiedPayrollCalculator } from '@/components/calculators/SimplifiedPayrollCalculator';
import { SimplifiedLevyCalculator } from '@/components/calculators/SimplifiedLevyCalculator';
import { VoluntaryNisCalculator } from '@/components/calculators/VoluntaryNisCalculator';
// useToast and date-fns imports removed as handleAddToCalendar is removed

interface HeroContent {
  icon: React.ElementType;
  headline: string;
  primarySubheadline: string;
  secondarySubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  backgroundImageUrl: string; // This will no longer be used for the main hero image div
}

const heroContentData: HeroContent = {
  icon: Briefcase,
  headline: "Calculate. Track. Comply.",
  primarySubheadline: "Your Tools in One Place.",
  secondarySubheadline: "From time calculations to payroll to levies simplify compliance with powerful, free tools.",
  primaryCtaText: "Try Our Calculators",
  primaryCtaLink: "#popular-calculators",
  backgroundImageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhY2NvdW50aW5nfGVufDB8fHx8MTc0NzM2MTg0MHww&ixlib=rb-4.1.0&q=80&w=1080",
};

interface CalculatorCardData {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  onClick?: () => void;
}

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefitsData: BenefitItem[] = [
  {
    icon: ShieldCheck,
    title: "Stay Compliant with Confidence",
    description: "Tax TT is built on the latest local tax laws and aligned with the Inland Revenue Division (IRD) of Trinidad & Tobago, helping you calculate and file with accuracy.",
  },
  {
    icon: UsersIcon,
    title: "Tailored for SMEs, Freelancers, and Professionals",
    description: "Whether you are managing a growing team, running a side hustle, or consulting independently, Tax TT is built with your workflow in mind, with no unnecessary complexity, just what you need.",
  },
  {
    icon: CalculatorIcon,
    title: "Accurate, IRD-Aligned Calculations",
    description: "Our tools reflect real-world rates and thresholds for PAYE, NIS, Health Surcharge, VAT, Business Levy, and more, so your numbers always match local requirements.",
  },
  {
    icon: Smartphone,
    title: "Seamless Across Devices",
    description: "From desktop to mobile, Tax TT works wherever you are, whether at the office, in the field, or on the move.",
  },
];

interface DeadlineItem {
  id: string;
  name: string;
  description: string;
  nextDueDate: string; 
  periodicity: string;
  status: "Urgent" | "Upcoming" | "Completed";
}

// Example data, dates might need to be dynamic or updated for real application
const deadlineItems: DeadlineItem[] = [
  { id: "paye", name: "PAYE Monthly Remittance", description: "Remittance of PAYE deducted from employees for the previous month.", nextDueDate: "2024-06-15", periodicity: "Monthly", status: "Urgent" },
  { id: "vat", name: "VAT Return & Payment", description: "For tax period May-Jun 2024.", nextDueDate: "2024-07-25", periodicity: "Bi-Monthly", status: "Urgent" },
  { id: "levies", name: "Business & Green Fund Levy (Q2)", description: "Second quarterly installment for 2024.", nextDueDate: "2024-06-30", periodicity: "Quarterly", status: "Urgent" },
  { id: "corp-tax-return", name: "Corporation Tax Return", description: "For income year ended Dec 31, 2023.", nextDueDate: "2024-04-30", periodicity: "Annually", status: "Completed" },
  { id: "corp-tax-install", name: "Corporation Tax Installment (Q3)", description: "Third quarterly installment for 2024.", nextDueDate: "2024-09-30", periodicity: "Quarterly", status: "Upcoming" },
  { id: "income-tax-return", name: "Individual Income Tax Return", description: "For income year 2023.", nextDueDate: "2024-04-30", periodicity: "Annually", status: "Completed" },
];


interface ResourceGuide {
  id: string;
  title: string;
  description: string;
  href: string;
}

const resourceGuides: ResourceGuide[] = [
  { id: "vat-guide", title: "Understanding VAT", description: "An in-depth guide to VAT registration, obligations, and filing.", href: "/knowledge-base/vat" },
  { id: "income-tax-guide", title: "Income & Corporation Tax", description: "Overview of personal and corporate income tax laws.", href: "/knowledge-base/income-corporation-tax" },
  { id: "property-tax-guide", title: "Property Tax Essentials", description: "Key aspects of the Property Tax Act explained.", href: "/knowledge-base/property-tax" },
];

interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType;
}
const calculatorInfoList: CalculatorInfo[] = [
  { id: "time", name: "Time Calculator", description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.", icon: Clock },
  { id: "paye", name: "PAYE + NIS + HS (Payroll)", description: "Determines monthly statutory deductions for employees, including Pay As You Earn (PAYE) based on 25%/30% tax brackets, National Insurance Scheme (NIS) contributions (5.6% employee), and Health Surcharge based on weekly income thresholds.", icon: UsersIcon },
  { id: "voluntary-nis", name: "Voluntary NIS Contribution (Self-Employed)", description: "Calculates National Insurance Scheme (NIS) contributions for self-employed persons based on their declared monthly earnings and official NIBTT earnings classes. Shows weekly, monthly, and quarterly voluntary contribution amounts.", icon: FileHeart },
  { id: "business-levy", name: "Business Levy", description: "Calculates the Business Levy at 0.6% on annualized gross income. Considers exemptions for new companies (first 3 years).", icon: BarChart3 },
  { id: "green-fund", name: "Green Fund Levy", description: "Estimates the Green Fund Levy at 0.3% of total annualized gross sales, payable quarterly.", icon: BarChart3 }, 
  { id: "corp-tax", name: "Corporation Tax", description: "Estimates Corporation Tax liability based on chargeable profits, considering allowable deductions, other income, loss carried forward, and tax credits. Standard rate of 30% applied.", icon: CalculatorIcon },
  { id: "income-tax", name: "Income Tax (Personal)", description: "Calculates personal income tax (PAYE), NIS, and Health Surcharge based on gross annual income and allowable deductions, applying the TT$90,000 personal allowance and relevant tax brackets.", icon: CalculatorIcon }, 
  { id: "property-tax", name: "Property Tax Estimator", description: "Provides a conceptual estimate of property tax based on Annual Rental Value (ARV) and property type, using simplified rates (e.g., 3% for residential after a 10% ARV deduction).", icon: CalculatorIcon }, 
  { id: "vat-calc", name: "VAT Calculator", description: "Calculates Value Added Tax (12.5%) on prices, allowing for input of price excluding or including VAT. Also includes a VAT registration eligibility checker.", icon: CalculatorIcon }, 
];

export default function LandingPage() {
  const [isBasicTimeCalcOpen, setIsBasicTimeCalcOpen] = React.useState(false);
  const [isPayrollCalcOpen, setIsPayrollCalcOpen] = React.useState(false);
  const [isLevyCalcOpen, setIsLevyCalcOpen] = React.useState(false);
  const [levyCalcKey, setLevyCalcKey] = React.useState(0);
  const [isVoluntaryNisCalcOpen, setIsVoluntaryNisCalcOpen] = React.useState(false);
  const [voluntaryNisCalcKey, setVoluntaryNisCalcKey] = React.useState(0);

  const handleOpenBasicTimeCalc = React.useCallback(() => setIsBasicTimeCalcOpen(true), []);
  const handleOpenPayrollCalc = React.useCallback(() => setIsPayrollCalcOpen(true), []);

  const handleOpenLevyCalc = React.useCallback(() => {
    setLevyCalcKey(prevKey => prevKey + 1);
    setIsLevyCalcOpen(true);
  }, []);

  const handleOpenVoluntaryNisCalc = React.useCallback(() => {
    setVoluntaryNisCalcKey(prevKey => prevKey + 1);
    setIsVoluntaryNisCalcOpen(true);
  }, []);


  const coreCalculators: CalculatorCardData[] = [
    {
      icon: Clock,
      title: "Basic Time Calculator",
      description: "For daily-paid workers to track work hours & pay.",
      ctaText: "Track Hours & Earnings",
      onClick: handleOpenBasicTimeCalc,
    },
    {
      icon: UsersIcon,
      title: "PAYE, NIS & HS Calculator",
      description: "Determine monthly statutory deductions live.",
      ctaText: "Estimate Deductions",
      onClick: handleOpenPayrollCalc,
    },
    {
      icon: FileHeart,
      title: "Voluntary NIS Contribution",
      description: "Estimate your NIS contributions as a self-employed individual.",
      ctaText: "Estimate Voluntary NIS",
      onClick: handleOpenVoluntaryNisCalc,
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center"> {/* Centering the content */}
            <div className="md:w-full max-w-3xl"> {/* Max width for text content, was md:w-2/5 */}
              <div className="flex items-center justify-center mb-6"> {/* Centered icon */}
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
              <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-col sm:items-center lg:flex-row lg:space-x-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto lg:mb-0 mb-2">
                  <Link href={heroContentData.primaryCtaLink}>
                    {heroContentData.primaryCtaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            {/* Image div has been removed */}
          </div>
        </div>
      </section>

      {/* Quick Access Calculators */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Start With Our Most Popular Calculators
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreCalculators.map((calc) => (
              <Card key={calc.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <calc.icon className="h-8 w-8 text-accent mr-3" />
                    <CardTitle className="text-xl text-primary">{calc.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{calc.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                </CardContent>
                <CardFooter>
                  {calc.onClick ? (
                    <Button onClick={calc.onClick} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      {calc.ctaText}
                    </Button>
                  ) : (
                     <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      <Link href={calc.ctaLink || "#"}>{calc.ctaText}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Why Choose Tax TT */}
       <section id="why-tax-tt" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Tax TT?
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {benefitsData.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <benefit.icon className="h-12 w-12 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section id="deadlines-compliance" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Stay Ahead with Compliance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keep track of important IRD deadlines. Tax TT aims to provide timely reminders and tools to help you plan and file on time. Always verify dates with official IRD publications.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deadlineItems.map((item) => {
                let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
                if (item.status === "Urgent") badgeVariant = "destructive";
                else if (item.status === "Upcoming") badgeVariant = "default"; 
                else if (item.status === "Completed") badgeVariant = "outline"; 
                
              return (
                <Card key={item.id} className={`flex flex-col shadow-md rounded-xl ${item.status === "Urgent" ? 'border-destructive' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-primary">{item.name}</CardTitle>
                       <Badge variant={badgeVariant} className={badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}>
                        {item.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs pt-1">Periodicity: {item.periodicity}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center text-sm font-medium text-foreground">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                       Due: {item.nextDueDate}
                    </div>
                  </CardContent>
                   <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-primary hover:bg-primary/10 p-1"
                      disabled={item.status === "Completed"}
                    >
                      <CalendarDays className="mr-1.5 h-3 w-3"/> Set Reminder
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="mt-12 text-center">
             <Button asChild variant="outline" size="lg">
                <Link href="https://www.ird.gov.tt/taxcalendar" target="_blank" rel="noopener noreferrer">
                View Official IRD Tax Calendar <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resources & Guides */}
      <section id="resources-guides" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Resources & Guides
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {resourceGuides.map((resource) => (
              <Card key={resource.id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-accent mb-3" />
                  <CardTitle className="text-lg text-primary">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-accent p-0">
                    <Link href={resource.href}>Read Guide <ArrowRight className="ml-1 h-4 w-4"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                <Link href="/knowledge-base">Explore All Resources <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learn About Our Calculators */}
      <section id="learn-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Learn About Our Calculators
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {calculatorInfoList.map((calc) => (
              <AccordionItem value={calc.id} key={calc.id}>
                <AccordionTrigger className="text-lg text-primary/90 hover:text-primary hover:no-underline">
                   {calc.icon && <calc.icon className="mr-3 h-5 w-5 text-primary/80" />}
                  {calc.name}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-10">
                  {calc.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer Section - Get Started was removed */}
      <footer id="footer" className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
            <Briefcase className="h-10 w-10 text-primary-foreground/80 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{heroContentData.headline}</h3>
            <p className="text-sm text-primary-foreground/80 mb-6 max-w-md mx-auto">
                Your trusted partner for Trinidad & Tobago tax solutions.
            </p>
            <div className="text-xs text-primary-foreground/70">
                <Link href="#" className="hover:underline">Privacy Policy</Link> • <Link href="#" className="hover:underline">Terms of Service</Link>
            </div>
             <p className="text-xs text-primary-foreground/60 mt-4">
                © {new Date().getFullYear()} Tax TT. All rights reserved.
            </p>
        </div>
      </footer>

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
            <DialogTitle className="text-2xl text-primary flex items-center"><BarChart3 className="mr-2 h-6 w-6"/>Levy Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedLevyCalculator key={levyCalcKey} />
           <DialogClose asChild>
             <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isVoluntaryNisCalcOpen} onOpenChange={setIsVoluntaryNisCalcOpen}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><FileHeart className="mr-2 h-6 w-6"/>Voluntary NIS Calculator</DialogTitle>
          </DialogHeader>
          <VoluntaryNisCalculator key={voluntaryNisCalcKey} />
           <DialogClose asChild>
             <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}


    