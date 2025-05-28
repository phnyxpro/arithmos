
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
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';
import { detailedCalculatorList, heroContentData as pageHeroData, benefitsData as pageBenefitsData, deadlineItems as pageDeadlineItems, resourceGuides as pageResourceGuides } from '@/app/landing-page-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCalculatorDialogManager } from "@/hooks/useCalculatorDialogManager";
import { StarReviewDialog } from "@/components/ui/star-review-dialog";

export default function LandingPage() {
  const { toast } = useToast();
  const {
    activeCalculator,
    openDialog: openCalculatorDialog,
    closeDialog: closeCalculatorDialog,
    setActiveCalculator,
  } = useCalculatorDialogManager();

  // Define LazyComponentMap using useMemo inside the component
  const LazyComponentMap = React.useMemo(() => ({
    BasicTimeCalculator: React.lazy(() => import("@/components/calculators/BasicTimeCalculator")),
    SimplifiedPayrollCalculator: React.lazy(() => import("@/components/calculators/SimplifiedPayrollCalculator")),
    SimplifiedLevyCalculator: React.lazy(() => import("@/components/calculators/SimplifiedLevyCalculator")),
    SimpleVatCalculator: React.lazy(() => import("@/components/calculators/SimpleVatCalculator")),
    ExciseDutyCalculator: React.lazy(() => import("@/components/calculators/ExciseDutyCalculator")),
    GrossToNetSalaryCalculator: React.lazy(() => import("@/components/calculators/GrossToNetSalaryCalculator")),
    OvertimePayCalculator: React.lazy(() => import("@/components/calculators/OvertimePayCalculator")),
    BonusCommissionCalculator: React.lazy(() => import("@/components/calculators/BonusCommissionCalculator")),
    VacationPayCalculator: React.lazy(() => import("@/components/calculators/VacationPayCalculator")),
    LoanAmortisationCalculator: React.lazy(() => import("@/components/calculators/LoanAmortisationCalculator")),
    MortgageCalculator: React.lazy(() => import("@/components/calculators/MortgageCalculator")),
    SavingsInvestmentCalculator: React.lazy(() => import("@/components/calculators/SavingsInvestmentCalculator")),
    CurrencyExchangeCalculator: React.lazy(() => import("@/components/calculators/CurrencyExchangeCalculator")),
    SimpleInterestCalculator: React.lazy(() => import("@/components/calculators/SimpleInterestCalculator")),
    MarkupMarginCalculator: React.lazy(() => import("@/components/calculators/MarkupMarginCalculator")),
    BreakEvenCalculator: React.lazy(() => import("@/components/calculators/BreakEvenCalculator")),
    CashFlowProjectionCalculator: React.lazy(() => import("@/components/calculators/CashFlowProjectionCalculator")),
    DepreciationCalculator: React.lazy(() => import("@/components/calculators/DepreciationCalculator")),
    TariffCustomsDutyCalculator: React.lazy(() => import("@/components/calculators/TariffCustomsDutyCalculator")),
    FreightShippingCalculator: React.lazy(() => import("@/components/calculators/FreightShippingCalculator")),
    CIFCalculator: React.lazy(() => import("@/components/calculators/CIFCalculator")),
    StampDutyCalculator: React.lazy(() => import("@/components/calculators/StampDutyCalculator")),
    PropertyTaxDialogCalculator: React.lazy(() => import("@/components/calculators/PropertyTaxDialogCalculator")),
    RentalYieldCalculator: React.lazy(() => import("@/components/calculators/RentalYieldCalculator")),
    AMLRiskCalculator: React.lazy(() => import("@/components/calculators/AMLRiskCalculator")),
    FATCACRSCalculator: React.lazy(() => import("@/components/calculators/FATCACRSCalculator")),
  }), []);

  // Define a type for the map keys
  type CalculatorComponentName = keyof typeof LazyComponentMap;

  const calculatorComponents: Record<CalculatorComponentName, React.ComponentType<any>> = LazyComponentMap;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [calculatorToReview, setCalculatorToReview] = React.useState<string | null>(null);

  const handleCalculatorDialogClose = React.useCallback((isOpen: boolean) => { // This function is now primarily for handling the review dialog logic on close
    if (!isOpen && activeCalculator) {
      setCalculatorToReview(activeCalculator.title); // Pass the title for review
      setIsReviewDialogOpen(true);
      // Explicitly close the dialog by setting state to null
      setActiveCalculator(null);
    }
  }, [activeCalculator, setIsReviewDialogOpen, setCalculatorToReview, setActiveCalculator]); // Added setActiveCalculator to dependency array

  const handleSubmitReview = (calculatorName: string, rating: number) => {
    console.log(`Review submitted for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Review Submitted!",
      description: `Thanks for rating the ${calculatorName} ${rating} stars.`,
    });
    setIsReviewDialogOpen(false);
    setCalculatorToReview(null);
  };

  const HeroIcon = pageHeroData.icon;

  const dialogCalculators = detailedCalculatorList.filter(calc => calc.componentName);
  const uniqueCategories = Array.from(new Set(dialogCalculators.map(calc => calc.category)));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative w-full py-20 md:py-28 text-center">
  <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
    <HeroIcon className="mb-6 h-16 w-16 text-primary-foreground" />
    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
      {pageHeroData.headline}
    </h1>
    <h2 className="text-xl md:text-2xl font-semibold text-primary/90 mb-6">
      {pageHeroData.primarySubheadline}
    </h2>
    <p className="max-w-2xl mx-auto text-base md:text-lg text-primary/80 mb-10">
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

<section id="popular-calculators" className="py-16 lg:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-primary mb-12">
      Popular Financial Tools &amp; Calculators
    </h2>

    <Tabs defaultValue={uniqueCategories[0]} className="w-full">
      <ScrollArea className="max-w-full pb-4">
      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-1 text-muted-foreground">
  {uniqueCategories.slice(0, 5).map((category) => (
    <TabsTrigger
      key={category}
      value={category}
      className="w-full data-[state=active]:text-primary data-[state=active]:bg-background rounded-md px-3 py-2 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
    >
      {category}
    </TabsTrigger>
  ))}
</TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {uniqueCategories.map((category) => {
        const calculatorsInCategory = dialogCalculators.filter(
          (calc) => calc.category === category
        );

        return (
          <TabsContent key={category} value={category} className="mt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {calculatorsInCategory.map((calculator) => {
                const Icon = calculator.icon || CalculatorIcon;

                return (
                  <Card
                    key={calculator.calculatorIdentifier}
                    className="flex flex-col shadow-md hover:shadow-xl transition-shadow rounded-xl"
                  >
                    <CardHeader className="flex flex-row items-start space-x-4">
                      <Icon className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                      <CardTitle className="text-lg text-primary">
                        {calculator.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <CardDescription className="text-sm text-muted-foreground">
                        {calculator.description}
                      </CardDescription>
                    </CardContent>

                    <CardFooter>
                    <Button
  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
  aria-label={`Open ${calculator.name} calculator`}
  onClick={() => {
    console.log("Opening calculator:", calculator);
    setActiveCalculator({
      key: calculator.calculatorIdentifier,
      component: calculator.componentName,
      title: calculator.name,
      icon: calculator.icon || CalculatorIcon,
      description: calculator.description,
    });
  }}
>
  {calculator.ctaText || "Open Calculator"}
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        );
      })}
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
                      <CalendarDays className="mr-2 h-4 w-4 text-accent" />
                      {item.dueDate && typeof item.dueDate === 'string' ? format(parseISO(item.dueDate), 'MMMM dd, yyyy') : 'Invalid Date'}
                    </div>
                  </CardContent>
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
                  <li className="flex items-center"><BookOpen className="h-5 w-5 mr-2 text-background/80" /> Access relevant tax information and guides</li>
                  <li className="flex items-center"><BookOpen className="h-5 w-5 mr-2 text-background/80" /> Organize income and expenses for easy reporting</li>
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
        <Image
  src="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/file.svg?alt=media&token=970ecef0-bfd9-4df4-911b-87c0ad9a5a06"
  alt="TaxTT Logo"
  width={40}
  height={40}
  className="mx-auto mb-4"
  priority
/>
          <h3 className="text-2xl font-bold mb-2">{pageHeroData.headline}</h3>
          <p className="text-sm text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Your trusted partner for Trinidad & Tobago SME financial solutions.
          </p>
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
          <Dialog open={!!activeCalculator} onOpenChange={(isOpen) => { // Keep onOpenChange to control the Dialog's open state
             if (!isOpen) {
               handleCalculatorDialogClose(isOpen); // Call our handler to potentially trigger review and set state to null
             }
          }}>
            <DialogContent className="w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary flex items-center">
                  {React.createElement(activeCalculator.icon, { className: "mr-2 h-6 w-6" })}
                  {activeCalculator.title}
                </DialogTitle>
                 {/* Add DialogDescription for accessibility */}
 {activeCalculator.description && (
               setActiveCalculator(null);
                )}
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

    