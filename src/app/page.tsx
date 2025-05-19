"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Though not used directly for a <Image> component, it's good practice if it might be in future.
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
  ShieldCheck,
  Smartphone,
  Calculator as CalculatorIcon,
  ArrowRight,
  CalendarDays,
  FileText,
  Bell,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { BasicTimeCalculator } from '@/components/calculators/BasicTimeCalculator';
import { SimplifiedPayrollCalculator } from '@/components/calculators/SimplifiedPayrollCalculator';
import { SimplifiedLevyCalculator } from '@/components/calculators/SimplifiedLevyCalculator';
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';

interface HeroContent {
  icon: React.ElementType;
  headline: string;
  primarySubheadline: string;
  secondarySubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  backgroundImageUrl: string;
}

const heroContentData: HeroContent = {
  icon: Briefcase,
  headline: "Calculate. Track. Comply.",
  primarySubheadline: "Your Tools in One Place.",
  secondarySubheadline: "From time calculations to payroll to levies simplify compliance with powerful, free tools.",
  primaryCtaText: "Try Our Calculators",
  primaryCtaLink: "#popular-calculators",
  backgroundImageUrl: "https://firebasestorage.googleapis.com/v0/b/wage-wiz.firebasestorage.app/o/hero-taxes.webp?alt=media&token=37c7b6ac-f45e-4c1c-b33f-7381fb55244d",
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

const deadlineItems: DeadlineItem[] = [
  { id: "paye", name: "PAYE Monthly Remittance", description: "Remittance of PAYE deducted from employees for the previous month.", nextDueDate: "2024-06-15", periodicity: "Monthly", status: "Urgent" },
  { id: "vat", name: "VAT Return & Payment", description: "For tax period May-Jun 2024.", nextDueDate: "2024-07-25", periodicity: "Bi-Monthly", status: "Upcoming" },
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
  { id: "vat-reg", title: "How to Register for VAT in Trinidad", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#vat-registration" },
  { id: "paye-employer", title: "Understanding PAYE for Employers", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#paye-employer-guide" },
  { id: "green-fund", title: "Who Must Pay the Green Fund Levy?", description: "An in-depth guide to help you navigate this tax topic.", href: "/knowledge-centre#green-fund-levy-guide" },
];

interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
}
const calculatorInfoList: CalculatorInfo[] = [
  { id: "time", name: "Time Calculator", description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers." },
  { id: "paye", name: "PAYE + NIS + HS (Payroll)", description: "Determines monthly statutory deductions for employees, including Pay As You Earn (PAYE) based on 25%/30% tax brackets, National Insurance Scheme (NIS) contributions (5.6% employee), and Health Surcharge based on weekly income thresholds." },
  { id: "business-levy", name: "Business Levy", description: "Calculates the Business Levy at 0.6% on annualized gross income that exceeds the TT$360,000 exemption threshold. Considers exemptions for new companies (first 3 years)." },
  { id: "green-fund", name: "Green Fund Levy", description: "Estimates the Green Fund Levy at 0.3% of total annualized gross sales, payable quarterly." },
  { id: "corp-tax", name: "Corporation Tax", description: "Estimates Corporation Tax liability based on chargeable profits, considering allowable deductions, other income, loss carried forward, and tax credits. Standard rate of 30% applied." },
  { id: "income-tax", name: "Income Tax (Personal)", description: "Calculates personal income tax (PAYE), NIS, and Health Surcharge based on gross annual income and allowable deductions, applying the TT$90,000 personal allowance and relevant tax brackets." },
  { id: "property-tax", name: "Property Tax Estimator", description: "Provides a conceptual estimate of property tax based on Annual Rental Value (ARV) and property type, using simplified rates (e.g., 3% for residential after a 10% ARV deduction)." },
  { id: "vat-calc", name: "VAT Calculator", description: "Calculates Value Added Tax (12.5%) on prices, allowing for input of price excluding or including VAT. Also includes a VAT registration eligibility checker." },
];

export default function LandingPage() {
  const [isBasicTimeCalcOpen, setIsBasicTimeCalcOpen] = React.useState(false);
  const [isPayrollCalcOpen, setIsPayrollCalcOpen] = React.useState(false);
  const [isLevyCalcOpen, setIsLevyCalcOpen] = React.useState(false);
  const { toast } = useToast();

  const handleOpenBasicTimeCalc = React.useCallback(() => setIsBasicTimeCalcOpen(true), []);
  const handleOpenPayrollCalc = React.useCallback(() => setIsPayrollCalcOpen(true), []);
  const handleOpenLevyCalc = React.useCallback(() => setIsLevyCalcOpen(true), []);


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
      icon: DollarSign,
      title: "Levy Calculator",
      description: "Estimate Business Levy and Green Fund Levy from gross income.",
      ctaText: "Estimate Levies",
      onClick: handleOpenLevyCalc,
    },
  ];

  const handleAddToCalendar = React.useCallback((deadline: DeadlineItem) => {
    const eventDate = parseISO(deadline.nextDueDate);
    if (isNaN(eventDate.getTime()) || eventDate < new Date(new Date().setHours(0,0,0,0))) {
      toast({
        title: "Invalid or Past Date",
        description: `Cannot set a reminder for "${deadline.name}" as the date is invalid or in the past.`,
        variant: "destructive",
      });
      return;
    }

    const startDateStr = format(eventDate, "yyyyMMdd");
    const endDateStr = format(addDays(eventDate, 1), "yyyyMMdd"); 

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//TaxTT//TaxTT Reminder//EN`,
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}@taxtt.com`,
      `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
      `DTSTART;VALUE=DATE:${startDateStr}`,
      `DTEND;VALUE=DATE:${endDateStr}`,
      `SUMMARY:Tax TT Reminder: ${deadline.name}`,
      `DESCRIPTION:Deadline for ${deadline.name} - ${deadline.description}. Periodicity: ${deadline.periodicity}.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Tax_TT_Reminder_${deadline.name.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({
      title: "Reminder Sent to Calendar",
      description: `A calendar event file for "${deadline.name}" is being downloaded.`,
    });
  }, [toast]);

  const HeroIcon = heroContentData.icon;

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative w-full bg-cover bg-center py-24 md:py-32"
      >
        <div 
          className="absolute inset-0 grayscale opacity-20"
          style={{ backgroundImage: `url('${heroContentData.backgroundImageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-label="Background image of tax preparation scene"
        ></div>
        <div className="absolute inset-0 bg-black/60"></div> 
        
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
          <HeroIcon className="mb-6 h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl mb-4">
            {heroContentData.headline}
          </h1>
          <p className="mt-2 text-xl md:text-2xl font-semibold text-primary-foreground/90 mb-6">
            {heroContentData.primarySubheadline}
          </p>
          <p className="max-w-xl text-base md:text-lg text-primary-foreground/80 mb-10">
            {heroContentData.secondarySubheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-md lg:max-w-none lg:flex-row lg:space-x-4">
             <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto lg:mb-0 mb-2">
              <Link href={heroContentData.primaryCtaLink}>
                {heroContentData.primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Calculators */}
      <section id="popular-calculators" className="py-16 lg:py-24 bg-muted/30">
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
       <section id="why-tax-tt" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Tax TT?
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {benefitsData.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left p-6 rounded-lg hover:shadow-md transition-shadow bg-muted/30">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <benefit.icon className="h-12 w-12 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-foreground">{benefit.description}</p> {/* Changed from text-primary-foreground to text-foreground for better contrast on bg-muted/30 */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section id="deadlines-compliance" className="py-16 lg:py-24 bg-muted/30">
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
                
                const dueDate = parseISO(item.nextDueDate);
                const isPast = dueDate < new Date(new Date().setHours(0,0,0,0)) && item.status !== "Completed";

              return (
                <Card key={item.id} className={`flex flex-col shadow-md rounded-xl ${isPast ? 'opacity-70' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-primary">{item.name}</CardTitle>
                       <Badge variant={badgeVariant} className={badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}>
                        {isPast ? "Overdue" : item.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs pt-1">Periodicity: {item.periodicity}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center text-sm font-medium text-foreground">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      Due: {format(dueDate, "MMMM d, yyyy")}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-primary hover:bg-primary/10 p-1"
                      onClick={() => handleAddToCalendar(item)}
                      disabled={item.status === "Completed"}
                    >
                      <Bell className="mr-1.5 h-3 w-3"/> Set Reminder
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
      <section id="resources-guides" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Resources & Guides
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {resourceGuides.map((resource) => (
              <Card key={resource.id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <CardHeader>
                  <FileText className="h-8 w-8 text-accent mb-3" />
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
                <Link href="/knowledge-centre">Explore All Resources <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learn About Our Calculators */}
      <section id="learn-calculators" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Learn About Our Calculators
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {calculatorInfoList.map((calc) => (
              <AccordionItem value={calc.id} key={calc.id}>
                <AccordionTrigger className="text-lg text-primary/90 hover:text-primary hover:no-underline">
                  {calc.name}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {calc.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Get Started / Contact */}
      <section id="get-started" className="py-16 lg:py-24 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Simplify Your Taxes?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Access all our calculators and features by creating a free account or logging in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#popular-calculators">Use a Calculator Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
          </div>
          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-2">Connect with us (Conceptual)</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></Link>
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
            </div>
          </div>
        </div>
      </section>

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

    