
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Keep for potential future image use
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Briefcase,
  ShieldCheck,
  BarChart3,
  FileText,
  CalendarDays,
  ArrowRight,
  Target,
  Zap,
  BookOpen,
  Bell,
  Users as UsersIcon,
  DollarSign,
  Clock,
  FileHeart,
  Landmark,
  Percent,
  Cigarette,
  Gift,
  Plane,
  ArrowRightLeft,
  PercentCircle,
  LineChart,
  Building as BuildingIconLucide,
  Truck,
  Ship,
  FileBox,
  Stamp,
  Home as HomeIconLucide,
  ShieldAlert,
  Network,
  Building2,
  Calculator as CalculatorIcon,
  Download,
  Linkedin,
  Facebook,
  Mail,
  CalendarPlus,
  ListChecks, 
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';
import { detailedCalculatorList, heroContentData as pageHeroData, benefitsData as pageBenefitsData, deadlineItems as pageDeadlineItems, resourceGuides as pageResourceGuides } from '@/app/landing-page-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCalculatorDialogManager } from "@/hooks/useCalculatorDialogManager";
import { StarReviewDialog } from "@/components/ui/star-review-dialog";

// Lazy load calculator components
const LazyBasicTimeCalculator = React.lazy(() => import("@/components/calculators/BasicTimeCalculator").then(module => ({ default: module.BasicTimeCalculator })));
const LazySimplifiedPayrollCalculator = React.lazy(() => import("@/components/calculators/SimplifiedPayrollCalculator").then(module => ({ default: module.SimplifiedPayrollCalculator })));
const LazySimplifiedLevyCalculator = React.lazy(() => import("@/components/calculators/SimplifiedLevyCalculator").then(module => ({ default: module.SimplifiedLevyCalculator })));
const LazySimpleVatCalculator = React.lazy(() => import("@/components/calculators/SimpleVatCalculator").then(module => ({ default: module.SimpleVatCalculator })));
const LazyExciseDutyCalculator = React.lazy(() => import("@/components/calculators/ExciseDutyCalculator").then(module => ({ default: module.ExciseDutyCalculator })));
const LazyGrossToNetSalaryCalculator = React.lazy(() => import("@/components/calculators/GrossToNetSalaryCalculator").then(module => ({ default: module.GrossToNetSalaryCalculator })));
const LazyOvertimePayCalculator = React.lazy(() => import("@/components/calculators/OvertimePayCalculator").then(module => ({ default: module.OvertimePayCalculator })));
const LazyBonusCommissionCalculator = React.lazy(() => import("@/components/calculators/BonusCommissionCalculator").then(module => ({ default: module.BonusCommissionCalculator })));
const LazyVacationPayCalculator = React.lazy(() => import("@/components/calculators/VacationPayCalculator").then(module => ({ default: module.VacationPayCalculator })));
const LazyLoanAmortisationCalculator = React.lazy(() => import("@/components/calculators/LoanAmortisationCalculator").then(module => ({ default: module.LoanAmortisationCalculator })));
const LazyMortgageCalculator = React.lazy(() => import("@/components/calculators/MortgageCalculator").then(module => ({ default: module.MortgageCalculator })));
const LazySavingsInvestmentCalculator = React.lazy(() => import("@/components/calculators/SavingsInvestmentCalculator").then(module => ({ default: module.SavingsInvestmentCalculator })));
const LazyCurrencyExchangeCalculator = React.lazy(() => import("@/components/calculators/CurrencyExchangeCalculator").then(module => ({ default: module.CurrencyExchangeCalculator })));
const LazySimpleInterestCalculator = React.lazy(() => import("@/components/calculators/SimpleInterestCalculator").then(module => ({ default: module.SimpleInterestCalculator })));
const LazyMarkupMarginCalculator = React.lazy(() => import("@/components/calculators/MarkupMarginCalculator").then(module => ({ default: module.MarkupMarginCalculator })));
const LazyBreakEvenCalculator = React.lazy(() => import("@/components/calculators/BreakEvenCalculator").then(module => ({ default: module.BreakEvenCalculator })));
const LazyCashFlowProjectionCalculator = React.lazy(() => import("@/components/calculators/CashFlowProjectionCalculator").then(module => ({ default: module.CashFlowProjectionCalculator })));
const LazyDepreciationCalculator = React.lazy(() => import("@/components/calculators/DepreciationCalculator").then(module => ({ default: module.DepreciationCalculator })));
const LazyTariffCustomsDutyCalculator = React.lazy(() => import("@/components/calculators/TariffCustomsDutyCalculator").then(module => ({ default: module.TariffCustomsDutyCalculator })));
const LazyFreightShippingCalculator = React.lazy(() => import("@/components/calculators/FreightShippingCalculator").then(module => ({ default: module.FreightShippingCalculator })));
const LazyCIFCalculator = React.lazy(() => import("@/components/calculators/CIFCalculator").then(module => ({ default: module.CIFCalculator })));
const LazyStampDutyCalculator = React.lazy(() => import("@/components/calculators/StampDutyCalculator").then(module => ({ default: module.StampDutyCalculator })));
const LazyPropertyTaxDialogCalculator = React.lazy(() => import("@/components/calculators/PropertyTaxDialogCalculator").then(module => ({ default: module.PropertyTaxDialogCalculator })));
const LazyRentalYieldCalculator = React.lazy(() => import("@/components/calculators/RentalYieldCalculator").then(module => ({ default: module.RentalYieldCalculator })));
const LazyAMLRiskCalculator = React.lazy(() => import("@/components/calculators/AMLRiskCalculator").then(module => ({ default: module.AMLRiskCalculator })));
const LazyFATCACRSCalculator = React.lazy(() => import("@/components/calculators/FATCACRSCalculator").then(module => ({ default: module.FATCACRSCalculator })));


const LazyComponentMap: Record<string, React.LazyExoticComponent<any>> = {
  BasicTimeCalculator: LazyBasicTimeCalculator,
  SimplifiedPayrollCalculator: LazySimplifiedPayrollCalculator,
  SimplifiedLevyCalculator: LazySimplifiedLevyCalculator,
  SimpleVatCalculator: LazySimpleVatCalculator,
  ExciseDutyCalculator: LazyExciseDutyCalculator,
  GrossToNetSalaryCalculator: LazyGrossToNetSalaryCalculator,
  OvertimePayCalculator: LazyOvertimePayCalculator,
  BonusCommissionCalculator: LazyBonusCommissionCalculator,
  VacationPayCalculator: LazyVacationPayCalculator,
  LoanAmortisationCalculator: LazyLoanAmortisationCalculator,
  MortgageCalculator: LazyMortgageCalculator,
  SavingsInvestmentCalculator: LazySavingsInvestmentCalculator,
  CurrencyExchangeCalculator: LazyCurrencyExchangeCalculator,
  SimpleInterestCalculator: LazySimpleInterestCalculator,
  MarkupMarginCalculator: LazyMarkupMarginCalculator,
  BreakEvenCalculator: LazyBreakEvenCalculator,
  CashFlowProjectionCalculator: LazyCashFlowProjectionCalculator,
  DepreciationCalculator: LazyDepreciationCalculator,
  TariffCustomsDutyCalculator: LazyTariffCustomsDutyCalculator,
  FreightShippingCalculator: LazyFreightShippingCalculator,
  CIFCalculator: LazyCIFCalculator,
  StampDutyCalculator: LazyStampDutyCalculator,
  PropertyTaxDialogCalculator: LazyPropertyTaxDialogCalculator,
  RentalYieldCalculator: LazyRentalYieldCalculator,
  AMLRiskCalculator: LazyAMLRiskCalculator,
  FATCACRSCalculator: LazyFATCACRSCalculator,
};

export default function LandingPage() {
  const { toast } = useToast();
  const {
    activeCalculator,
    openDialog: openCalculatorDialog,
    closeDialog: closeCalculatorDialog,
    setActiveCalculator,
  } = useCalculatorDialogManager();

  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [calculatorToReview, setCalculatorToReview] = React.useState<string | null>(null);

  const handleCalculatorDialogClose = React.useCallback((isOpen: boolean) => {
    if (!isOpen && activeCalculator) {
      setCalculatorToReview(activeCalculator.title); // Pass the title for review
      setIsReviewDialogOpen(true);
    }
    closeCalculatorDialog();
  }, [activeCalculator, closeCalculatorDialog]);

  const handleSubmitReview = (calculatorName: string, rating: number) => {
    console.log(`Review submitted for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Review Submitted!",
      description: `Thanks for rating the ${calculatorName} ${rating} stars.`,
    });
    setIsReviewDialogOpen(false);
    setCalculatorToReview(null);
  };

  const handleAddToCalendar = React.useCallback((deadline: typeof pageDeadlineItems[0], type: 'google' | 'outlook' | 'ics') => {
    const eventDate = parseISO(deadline.nextDueDate);
    if (isNaN(eventDate.getTime())) {
      toast({
        title: "Invalid Date",
        description: `Cannot set reminder for "${deadline.name}" due to an invalid date format.`,
        variant: "destructive",
      });
      return;
    }
    if (eventDate < new Date(new Date().setHours(0,0,0,0)) && deadline.status !== "Completed") {
      toast({
        title: "Past Date",
        description: `The due date for "${deadline.name}" is in the past.`,
        variant: "default",
      });
      return;
    }
    if (deadline.status === "Completed") {
      toast({
        title: "Task Completed",
        description: `"${deadline.name}" is already marked as completed. No reminder set.`,
        variant: "default"
      });
      return;
    }

    const startDate = format(eventDate, "yyyyMMdd");
    const endDate = format(addDays(eventDate, 1), "yyyyMMdd"); // For all-day event
    const eventTitle = `TaxTT Reminder: ${deadline.name}`;
    const eventDescription = `Deadline for ${deadline.name} - ${deadline.description}. Periodicity: ${deadline.periodicity}.`;

    if (type === 'google') {
      const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}`;
      window.open(googleUrl, '_blank');
      toast({ title: "Opening Google Calendar..."});
    } else if (type === 'outlook') {
      const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${startDate}T000000&enddt=${endDate}T000000&subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(eventDescription)}`;
      window.open(outlookUrl, '_blank');
      toast({ title: "Opening Outlook Calendar..."});
    } else { // ICS
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        `PRODID:-//TaxTT//TaxTT Reminder//EN`,
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@taxtt.com`,
        `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
        `DTSTART;VALUE=DATE:${startDate}`,
        `DTEND;VALUE=DATE:${endDate}`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription}`,
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
      toast({ title: "ICS File Downloading...", description: `Add "${deadline.name}" to your calendar.`});
    }
  }, [toast]);

  const HeroIcon = pageHeroData.icon;

  const dialogCalculators = detailedCalculatorList.filter(calc => calc.componentName);
  const uniqueCategories = Array.from(new Set(dialogCalculators.map(calc => calc.category)));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full py-20 md:py-28 text-center"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://placehold.co/1920x1080.png')`, // Placeholder, replace with actual image if desired
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          data-ai-hint="financial planning"
          aria-hidden="true"
        >
           <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
          <HeroIcon className="mb-6 h-16 w-16 text-primary-foreground" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {pageHeroData.headline}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-primary-foreground/90 mb-6">
            {pageHeroData.primarySubheadline}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-primary-foreground/80 mb-10">
            {pageHeroData.secondarySubheadline}
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={pageHeroData.primaryCtaLink}>
              {pageHeroData.primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Compliance Ticker Section */}
      <section id="compliance-ticker" className="py-4 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold mb-3 text-center">Upcoming Compliance Reminders</h3>
          <div className="overflow-hidden relative h-12 group"> {/* Viewport for ticker */}
            <div className="absolute top-0 left-0 flex animate-marquee-scroll group-hover:pause-animation">
              {[...pageDeadlineItems.filter(d => d.status !== "Completed").sort((a,b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime()).slice(0,5), ...pageDeadlineItems.filter(d => d.status !== "Completed").sort((a,b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime()).slice(0,5)].map((item, index) => (
                <div key={`${item.id}-${index}`} className="mx-4 p-2.5 rounded-md bg-card/80 shadow flex items-center flex-shrink-0" style={{ minWidth: '280px' }}>
                  <Bell className="h-5 w-5 mr-2.5 text-accent" />
                  <div className="text-xs">
                    <span className="font-semibold text-card-foreground block truncate">{item.name}</span>
                    <span className="text-muted-foreground">Due: {item.nextDueDate && !isNaN(parseISO(item.nextDueDate).getTime()) ? format(parseISO(item.nextDueDate), "MMM d, yyyy") : "Invalid Date"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Financial Tools & Calculators Section */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Popular Financial Tools &amp; Calculators
          </h2>
          <Tabs defaultValue={uniqueCategories[0]} className="w-full">
            <ScrollArea className="max-w-full pb-4">
              <TabsList className="grid w-full grid-flow-col auto-cols-max items-center justify-start gap-2 rounded-md p-1 text-muted-foreground">
                {uniqueCategories.map(category => (
                  <TabsTrigger key={category} value={category} className="data-[state=active]:text-primary data-[state=active]:bg-background rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {uniqueCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {dialogCalculators.filter(calc => calc.category === category).map(calculator => {
                    const CalculatorIconComponent = calculator.icon || CalculatorIcon; // Default icon
                    return (
                      <Card key={calculator.calculatorIdentifier} className="flex flex-col shadow-md hover:shadow-xl transition-shadow rounded-xl">
                        <CardHeader className="flex flex-row items-start space-x-4">
                          <CalculatorIconComponent className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                          <CardTitle className="text-lg text-primary">{calculator.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <CardDescription className="text-sm text-muted-foreground">{calculator.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => {
                              if (calculator.componentName) {
                                const LazyComponent = LazyComponentMap[calculator.componentName];
                                if (LazyComponent) {
                                  openCalculatorDialog(
                                    calculator.calculatorIdentifier,
                                    calculator.name,
                                    CalculatorIconComponent,
                                    LazyComponent
                                  );
                                } else {
                                  console.error(`Lazy component for ${calculator.componentName} not found.`);
                                  toast({ title: "Error", description: `Calculator ${calculator.name} could not be loaded.`, variant: "destructive"});
                                }
                              } else if (calculator.href) {
                                // This part is for navigating to a full page if href is defined
                                // For dialog-only section, this might not be hit if filtered correctly
                                window.location.href = calculator.href;
                              } else {
                                console.error(`No action defined for calculator: ${calculator.name}`);
                                toast({ title: "Configuration Error", description: `No action available for ${calculator.name}.`, variant: "destructive"});
                              }
                            }}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            {calculator.ctaText || "Open Calculator"} <ArrowRight className="ml-2 h-4 w-4"/>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>


      {/* Why Choose Tax TT */}
       <section id="why-tax-tt" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose TaxTT?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageBenefitsData.map((benefit) => (
              <Card key={benefit.title} className="shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader className="flex flex-row items-start space-x-4">
                  <benefit.icon className="h-10 w-10 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-xl text-primary mb-1">{benefit.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section id="deadlines-compliance" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              Key Compliance Deadlines for T&amp;T SMEs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about crucial tax and statutory deadlines. Dates are illustrative. Always verify with official IRD publications.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageDeadlineItems.map((item) => {
                let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
                const dueDate = parseISO(item.dueDate);
                const isPast = dueDate < new Date(new Date().setHours(0,0,0,0));

                if (item.status === "Urgent" && !isPast) badgeVariant = "destructive";
                else if (item.status === "Upcoming" && !isPast) badgeVariant = "default";
                else if (item.status === "Completed") badgeVariant = "outline";
                else if (isPast) badgeVariant = "destructive";


              return (
                <Card key={item.id} className={`flex flex-col shadow-md rounded-xl ${isPast && item.status !== "Completed" ? 'opacity-70' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                       <Badge variant={badgeVariant} className={badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}>
                        {isPast && item.status !== "Completed" ? "Overdue" : item.status}
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
                   <CardFooter className="flex items-center justify-start space-x-1 pt-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => handleAddToCalendar(item, 'google')} disabled={item.status === "Completed"} aria-label="Add to Google Calendar" title="Add to Google Calendar">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.56 10.44V6.5H19V5H5v1.5H3.44v3.94H2v7.12h1.44v3.94H5V23h14v-1.5h1.56v-3.94H22v-7.12h-1.44zM5 7.61h1.5v1.07H5V7.61zm0 3.93h1.5v1.07H5v-1.07zm0 3.93h1.5v1.07H5v-1.07zm0 3.94h1.5v1.07H5v-1.07zm14 2.01H6.5V6.5h11v15.02h1.5v-1.07zm0-3.94h-1.5v-1.07h1.5v1.07zm0-3.93h-1.5v-1.07h1.5v1.07zm0-3.93h-1.5V7.61h1.5v1.07z"/><path d="M12 10.75c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/><path d="M12.5 8.25h-1V12h3.75v-1H12.5z" fillRule="evenodd"/></svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => handleAddToCalendar(item, 'outlook')} disabled={item.status === "Completed"} aria-label="Add to Microsoft Outlook Calendar" title="Add to Outlook Calendar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.45 3.552H8.023L2 8.583V20.13c0 .98.796 1.775 1.776 1.775h15.898a1.776 1.776 0 001.776-1.776V5.327a1.776 1.776 0 00-1.776-1.775zM9.113 5.327h10.56v3.263l-5.28 3.21-5.28-3.21V5.327zm10.56 14.803H4.328V10.31l5.28 3.21 5.28-3.21v6.605z"/></svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => handleAddToCalendar(item, 'ics')} disabled={item.status === "Completed"} aria-label="Download ICS File for Apple/Other Calendars" title="Download ICS for Apple/Other Calendars">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1 17.2c-.4-.3-1.1-.4-1.7-.4-.9 0-1.6.3-2.2.9-.6.6-.9 1.4-.9 2.3 0 .8.2 1.5.5 2.1.4.6.9 1.1 1.5 1.4.6.3 1.3.5 2.1.5.6 0 1.2-.1 1.7-.3.6-.2 1-.5 1.4-.9.3-.3.6-.7.7-1.1.1-.4.2-.8.2-1.3 0-1.3-.5-2.4-1.4-3.2zm-2.4 5c-.3.2-.7.3-1.1.3-.5 0-.9-.1-1.3-.4-.3-.2-.6-.5-.8-.9-.2-.4-.3-.8-.3-1.2s.1-.8.4-1.1c.3-.3.6-.5.9-.7.4-.1.8-.2 1.2-.2.4 0 .8.1 1.1.2.2.1.4.3.6.5.4.5.6 1.1.6 1.8 0 .5-.1.9-.3 1.3-.2.4-.5.7-.8 1zM17.2 0h-1.6c-.5.1-1 .2-1.6.4-.5.2-1 .5-1.4.9-.4.4-.8.8-1.1 1.4-.3.6-.5 1.2-.6 1.9H9.1c-.4-.8-.9-1.5-1.5-2.1C7 2.1 6.2 1.8 5.3 1.8c-.9 0-1.7.3-2.3.8-.6.5-1 1.2-1.2 2C1.6 5.3 1.5 6 1.5 6.7c0 .9.2 1.7.7 2.4.5.7 1.2 1.3 2.1 1.7.7.3 1.4.5 2.2.5.8 0 1.5-.1 2.2-.4.7-.3 1.3-.7 1.8-1.3v6.6c-.7.8-1.2 1.5-1.6 2.1-.4.6-.6 1.2-.6 1.8 0 .9.2 1.6.6 2.3.4.7.9 1.2 1.5 1.7.6.4 1.3.6 2.1.6s1.5-.2 2.1-.6c.6-.4 1.1-.9 1.5-1.7.4-.7.6-1.4.6-2.3 0-.6-.1-1.1-.3-1.6-.2-.5-.5-1-.8-1.4V6.2C19.1 4.9 18.5 3 17.2 0zm-2.2 9.8c-.5.5-1 .9-1.6 1.1-.6.2-1.3.4-2.1.4-.7 0-1.3-.1-1.8-.4-.5-.2-1-.6-1.3-1-.3-.4-.5-.9-.5-1.4s.1-.9.4-1.3c.2-.4.5-.7.8-.9s.7-.3 1.1-.3c.8 0 1.5.2 2.1.5.6.3 1.1.7 1.5 1.2.3.4.4.8.4 1.3zm0-6.5c0 .4-.1.8-.2 1.1-.1.3-.3.6-.6.9-.6.5-1.3.7-2.1.7-.6 0-1.1-.1-1.5-.3-.4-.2-.7-.5-.9-.8-.2-.3-.3-.7-.3-1.1s.1-.7.3-1c.1-.3.3-.5.5-.7.4-.3.9-.5 1.4-.6.5-.1 1-.1 1.5-.1h.2v3.3z"/></svg>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources & Guides */}
      <section id="resources-guides" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            SME Finance &amp; Tax Hub for Trinidad &amp; Tobago
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pageResourceGuides.map((item) => (
              <Card key={item.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-accent mb-3" />
                  <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-accent p-0">
                    <Link href={item.link}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Link href="/knowledge-base">
                Explore All Knowledge Base Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

       {/* Tax Season Ready Section */}
      <section id="tax-season-ready" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground p-8 md:p-12 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Tax Season Ready? Simplify Your Filing.</h2>
                <p className="text-lg opacity-90 mb-6">
                  Our platform provides tools and guidance to help you prepare for tax season.
                  While we don't file for you, we empower you to gather information and understand your obligations.
                </p>
                <ul className="space-y-2 text-left mb-8 opacity-90">
                  <li className="flex items-center"><ListChecks className="h-5 w-5 mr-2 text-background/80" /> Organize income and expenses for easy reporting.</li>
                  <li className="flex items-center"><BookOpen className="h-5 w-5 mr-2 text-background/80" /> Access relevant tax information and guides.</li>
                  <li className="flex items-center"><CalculatorIcon className="h-5 w-5 mr-2 text-background/80" /> Use our calculators to estimate liabilities.</li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image src="https://placehold.co/400x300/ffffff/3F51B5?text=Tax+Prep+Illustration" alt="Tax Preparation Illustration" width={400} height={300} className="rounded-lg shadow-md" data-ai-hint="tax document organization" />
              </div>
            </div>
          </Card>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Find answers to common questions about our platform and Trinidad & Tobago tax & finance.
          </p>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">Is this platform officially endorsed by the IRD?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, TaxTT is an independent platform designed to assist users with understanding and calculating their tax obligations. While we strive for accuracy based on public information, always refer to official IRD (Inland Revenue Division) publications and seek professional advice for definitive guidance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg hover:no-underline">Are the calculators always up-to-date with the latest tax laws?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We make every effort to keep our calculators and information current with the latest tax laws in Trinidad & Tobago. However, tax legislation can change. We recommend cross-referencing with official IRD announcements for the most recent updates, especially before making financial decisions based solely on calculator results.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:no-underline">Can I file my taxes directly through this platform?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Currently, TaxTT does not offer direct tax filing services. Our platform is designed to help you prepare, calculate, and understand your tax information, which you can then use for official filing through the IRD's e-Tax portal or with the assistance of a tax professional.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg hover:no-underline">Is my data secure on this platform?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We take data privacy seriously. While many of our calculators can be used anonymously without storing personal data, if account features are introduced, we will implement industry-standard security measures. Please refer to our Privacy Policy for detailed information once account features are live.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg hover:no-underline">Who is this platform for?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                TaxTT is designed for individuals, sole traders, small to medium-sized enterprises (SMEs), and financial professionals in Trinidad & Tobago who need tools to simplify tax calculations, financial planning, and compliance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="py-12 bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="h-10 w-10 text-primary-foreground/80 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">{pageHeroData.headline}</h3>
          <p className="text-sm text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Your trusted partner for Trinidad & Tobago SME financial solutions.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
             <Link href="#" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Linkedin size={24} />
             </Link>
             <Link href="#" aria-label="Facebook" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Facebook size={24} />
             </Link>
          </div>
          <div className="text-xs text-primary-foreground/70">
            <Link href="#" className="hover:underline">Privacy Policy</Link> • <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-4">
            © {new Date().getFullYear()} TaxTT for SMEs. All rights reserved.
          </p>
           <p className="text-[10px] text-primary-foreground/50 mt-4 max-w-xl mx-auto">
            Disclaimer: TaxTT provides tools and information for general guidance only. It is not a substitute for professional financial or legal advice.
            All calculations should be verified with official IRD guidelines and qualified professionals. Tax laws are subject to change.
          </p>
        </div>
      </footer>

      {activeCalculator && LazyComponentMap[activeCalculator.component as keyof typeof LazyComponentMap] && (
        <React.Suspense fallback={<div>Loading Calculator...</div>}>
          <Dialog open={!!activeCalculator} onOpenChange={(isOpen) => handleCalculatorDialogClose(isOpen)}>
            <DialogContent className="w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary flex items-center">
                  {React.createElement(activeCalculator.icon, { className: "mr-2 h-6 w-6" })}
                  {activeCalculator.title}
                </DialogTitle>
              </DialogHeader>
              {React.createElement(LazyComponentMap[activeCalculator.component as keyof typeof LazyComponentMap], { key: activeCalculator.key })}
               <DialogClose asChild>
                 <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </React.Suspense>
      )}
      
      <StarReviewDialog
        isOpen={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        calculatorName={calculatorToReview}
        onSubmitReview={handleSubmitReview}
      />

    </div>
  );
}

    