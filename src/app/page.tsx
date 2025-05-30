
"use client";

import * as React from "react";

// Next.js core
import Link from "next/link";
import Image from "next/image";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useCalculatorDialogManager } from "@/hooks/useCalculatorDialogManager";

// Utilities
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";


// UI Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
  ScrollBar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { StarReviewDialog } from "@/components/ui/star-review-dialog";

// Icons from Lucide
import {
  ArrowRight,
  BookOpen,
  Calculator as CalculatorIcon,
  CalendarDays,
} from "lucide-react";

// Static Data
import {
  detailedCalculatorList,
  heroContentData as pageHeroData,
  benefitsData as pageBenefitsData,
  deadlineItems as pageDeadlineItems,
  resourceGuides as pageResourceGuides,
  type DetailedCalculatorListItem,
  type DeadlineItem,
} from "@/app/landing-page-data";
import { faqData } from "@/constants/faqData";

// Define the type for ActiveCalculatorInfo to directly hold the component
interface ActiveCalculatorInfo {
  key: string;
  component?: React.ComponentType<any>; // Now directly holds the component or is undefined
  title: string;
  icon: React.ElementType; // Assuming icon is a React component type
  description?: string; // Make description optional if not always present
}

export default function LandingPage() {
  const { toast } = useToast();
  const {
    activeCalculator,
    setActiveCalculator,
  } = useCalculatorDialogManager() as { 
    activeCalculator: ActiveCalculatorInfo | null;
    closeDialog: (isOpen: boolean) => void;
    setActiveCalculator: (calculator: ActiveCalculatorInfo | null) => void;
  };

  const HeroIcon = pageHeroData.icon;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [calculatorToReview, setCalculatorToReview] = React.useState<string | null>(null);
  const calculatorCategories = React.useMemo(() => [
    "All",
    ...Array.from(new Set(calculatorList.map((calc) => calc.category))),
  ], []);
  const [activeCalculatorFilter, setActiveCalculatorFilter] = React.useState<string>("All");
  const [activeDeadlineFilter, setActiveDeadlineFilter] = React.useState<string>("All");

  const LazyComponentMap = React.useMemo(() => {
    const map: Record<string, React.ComponentType<any>> = {
      BasicTimeCalculator: React.lazy(() => import("@/components/calculators/BasicTimeCalculator").then(module => ({ default: module.default }))),
      SimplifiedPayrollCalculator: React.lazy(() => import("@/components/calculators/SimplifiedPayrollCalculator").then(module => ({ default: module.default }))),
      VoluntaryNisCalculator: React.lazy(() => import("@/components/calculators/VoluntaryNisCalculator").then(module => ({ default: module.default }))),
      SimplifiedLevyCalculator: React.lazy(() => import("@/components/calculators/SimplifiedLevyCalculator").then(module => ({ default: module.default }))),
      SimpleVatCalculator: React.lazy(() => import("@/components/calculators/SimpleVatCalculator").then(module => ({ default: module.default }))),
      ExciseDutyCalculator: React.lazy(() => import("@/components/calculators/ExciseDutyCalculator").then(module => ({ default: module.default }))),
      GrossToNetSalaryCalculator: React.lazy(() => import("@/components/calculators/GrossToNetSalaryCalculator").then(module => ({ default: module.default }))),
      OvertimePayCalculator: React.lazy(() => import("@/components/calculators/OvertimePayCalculator").then(module => ({ default: module.default }))),
      BonusCommissionCalculator: React.lazy(() => import("@/components/calculators/BonusCommissionCalculator").then(module => ({ default: module.BonusCommissionCalculator }))),
      VacationPayCalculator: React.lazy(() => import("@/components/calculators/VacationPayCalculator").then(module => ({ default: module.default }))),
      LoanAmortisationCalculator: React.lazy(() => import("@/components/calculators/LoanAmortisationCalculator").then(module => ({ default: module.default }))),
      MortgageCalculator: React.lazy(() => import("@/components/calculators/MortgageCalculator").then(module => ({ default: module.default }))),
      SavingsInvestmentCalculator: React.lazy(() => import("@/components/calculators/SavingsInvestmentCalculator").then(module => ({ default: module.default }))),
      CurrencyExchangeCalculator: React.lazy(() => import("@/components/calculators/CurrencyExchangeCalculator").then(module => ({ default: module.CurrencyExchangeCalculator }))),
      SimpleInterestCalculator: React.lazy(() => import("@/components/calculators/SimpleInterestCalculator").then(module => ({ default: module.default }))),
      MarkupMarginCalculator: React.lazy(() => import("@/components/calculators/MarkupMarginCalculator").then(module => ({ default: module.MarkupMarginCalculator }))),
      BreakEvenCalculator: React.lazy(() => import("@/components/calculators/BreakEvenCalculator").then(module => ({ default: module.BreakEvenCalculator }))),
      CashFlowProjectionCalculator: React.lazy(() => import("@/components/calculators/CashFlowProjectionCalculator").then(module => ({ default: module.CashFlowProjectionCalculator }))),
      DepreciationCalculator: React.lazy(() => import("@/components/calculators/DepreciationCalculator").then(module => ({ default: module.DepreciationCalculator }))),
      TariffCustomsDutyCalculator: React.lazy(() => import("@/components/calculators/TariffCustomsDutyCalculator").then(module => ({ default: module.default }))),
      FreightShippingCalculator: React.lazy(() => import("@/components/calculators/FreightShippingCalculator").then(module => ({ default: module.default }))),
      CIFCalculator: React.lazy(() => import("@/components/calculators/CIFCalculator").then(module => ({ default: module.CIFCalculator }))),
      StampDutyCalculator: React.lazy(() => import("@/components/calculators/StampDutyCalculator").then(module => ({ default: module.default }))),
      PropertyTaxDialogCalculator: React.lazy(() => import("@/components/calculators/PropertyTaxDialogCalculator").then(module => ({ default: module.PropertyTaxDialogCalculator }))),
      RentalYieldCalculator: React.lazy(() => import("@/components/calculators/RentalYieldCalculator").then(module => ({ default: module.default }))),
      AMLRiskCalculator: React.lazy(() => import("@/components/calculators/AMLRiskCalculator").then(module => ({ default: module.AMLRiskCalculator }))),
      FATCACRSCalculator: React.lazy(() => import("@/components/calculators/FATCACRSCalculator").then(module => ({ default: module.FATCACRSCalculator }))),
    };
    return map;
  }, []);

  const handleCalculatorDialogClose = React.useCallback((isOpen: boolean) => {
    if (!isOpen && activeCalculator) {
      setCalculatorToReview(activeCalculator.title);
      setIsReviewDialogOpen(true);
      setActiveCalculator(null);
    }
  }, [activeCalculator, setIsReviewDialogOpen, setCalculatorToReview, setActiveCalculator]);

  const handleSubmitReview = (calculatorName: string, rating: number) => {
    console.log(`Review submitted for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Review Submitted!",
      description: `Thanks for rating the ${calculatorName} ${rating} stars.`,
    });
    setIsReviewDialogOpen(false);
    setCalculatorToReview(null);
  };

  const uniqueCategories = React.useMemo(() => {
    return Array.from(new Set(dialogCalculators.map((calc) => calc.category)));
  }, [dialogCalculators]);

  const deadlineFilterCategories = React.useMemo(() => {
    const categories = new Set(pageDeadlineItems.map(item => item.category));
    return ["All", ...Array.from(categories)];
  }, []);

  const filteredDeadlines = React.useMemo(() => {
    if (activeDeadlineFilter === "All") {
      return pageDeadlineItems;
    }
    return pageDeadlineItems.filter(item => item.category === activeDeadlineFilter);
  }, [activeDeadlineFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative w-full py-20 md:py-28 text-center">
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
          <HeroIcon className="mb-6 h-16 w-16 text-primary-foreground" aria-hidden="true" />
           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary-foreground dark:from-primary-foreground dark:via-accent dark:to-primary-foreground bg-clip-text text-transparent mb-4">
            {pageHeroData.headline}
          </h1>
          <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-accent to-primary-foreground dark:from-primary-foreground dark:via-accent dark:to-primary-foreground bg-clip-text text-transparent mb-6">
            {pageHeroData.primarySubheadline}
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-primary/80 dark:text-primary-foreground/80 mb-10">
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

      {/* Popular Calculators Section */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Popular Financial Tools &amp; Calculators
          </h2>
          <Tabs defaultValue={uniqueCategories[0]} className="w-full">
            <ScrollArea className="max-w-full pb-4">
              <TabsList className="flex w-full items-center justify-between gap-x-2 rounded-md bg-muted p-1 text-muted-foreground">
                {uniqueCategories.slice(0, 5).map((category: string) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="flex-1 data-[state=active]:text-primary data-[state=active]:bg-background rounded-md px-3 py-2 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {uniqueCategories.map((category: string) => {
              const calculatorsInCategory = detailedCalculatorList.filter(
                (calc): calc is DetailedCalculatorListItem & { component?: React.ComponentType<any> } => calc.category === category && !!calc.component
              );

              return (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {calculatorsInCategory.map((calculator) => {
                      const Icon = calculator.icon || CalculatorIcon;
                      const ComponentToRender = LazyComponentMap[calculator.calculatorIdentifier];

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
                                if (calculator.href) {
                                  window.location.href = calculator.href; 
                                } else if (ComponentToRender) {
                                  setActiveCalculator({
                                    key: calculator.calculatorIdentifier,
                                    component: ComponentToRender,
                                    title: calculator.name,
                                    icon: calculator.icon ?? CalculatorIcon,
                                    description: calculator.description,
                                  });
                                } else {
                                  toast({
                                    title: "Calculator Not Available",
                                    description: `The ${calculator.name} calculator is currently not configured correctly.`,
                                    variant: "destructive",
                                  });
                                }
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

      {/* Why Choose Arithmos */}
       <section id="why-tax-tt" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Arithmos?
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
          
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {deadlineFilterCategories.map((category) => (
              <Button
                key={category}
                variant={activeDeadlineFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDeadlineFilter(category)}
                className={cn(
                  "text-xs h-8 px-3 rounded-full",
                  activeDeadlineFilter === category 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border-primary text-primary hover:bg-primary/10"
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDeadlines.map((item: DeadlineItem) => {
              let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
              let dueDateObj: Date | 'Invalid Date' = 'Invalid Date'; 

              try {
                if (typeof item.dueDate === 'string') {
                  const parsedDate = parseISO(item.dueDate);
                  if (!isNaN(parsedDate.getTime())) {
                    dueDateObj = parsedDate;
                  }
                }
              } catch (error) {
                console.error("Error parsing date:", item.dueDate, error);
              }

              const isPast = dueDateObj !== 'Invalid Date' && dueDateObj < new Date(new Date().setHours(0, 0, 0, 0));

              if (item.status === "Urgent" && !isPast) badgeVariant = "destructive";
              else if (item.status === "Upcoming" && !isPast) badgeVariant = "default";
              else if (item.status === "Completed") badgeVariant = "outline";
              else if (isPast) badgeVariant = "destructive";


              return (
                <Card key={item.id} className={cn(
                    "flex flex-col shadow-md rounded-xl transition-opacity duration-300",
                    isPast && item.status !== "Completed" ? 'opacity-70' : 'opacity-100'
                  )}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                       <Badge variant={badgeVariant} className={badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}>
                        {isPast && item.status !== "Completed" ? "Overdue" : item.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs pt-1">Periodicity: {item.periodicity} | Category: {item.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center text-sm font-medium text-foreground">
                      <CalendarDays className="mr-2 h-4 w-4 text-accent" />
                      {dueDateObj !== 'Invalid Date' ? format(dueDateObj, 'MMMM dd, yyyy') : 'Invalid Date'}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredDeadlines.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No deadlines match the selected filter.</p>
          )}
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
            {faqData.map((item: {question: string; answer: string}, index: number) => (
              <AccordionItem key={`faq-item-${index}`} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-muted-foreground">
        {/* Add footer content here if needed */}
      </footer>

      {/* Calculator Dialog */}
      {activeCalculator && activeCalculator.component && (
        <React.Suspense fallback={<div>Loading Calculator...</div>}>
          <Dialog
            open={!!activeCalculator}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                 handleCalculatorDialogClose(isOpen); 
              }
            }}
          >
            <DialogContent className="w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary flex items-center">
                  {React.createElement(activeCalculator.icon, {
                    className: "mr-2 h-6 w-6",
                  })}
                  {activeCalculator.title}
                </DialogTitle>
                {activeCalculator.description && (
                  <DialogDescription>{activeCalculator.description}</DialogDescription>
                )}
              </DialogHeader>

              {React.createElement(
                activeCalculator.component,
                { key: activeCalculator.key } 
              )}

              <DialogClose asChild>
                <Button type="button" variant="outline" className="mt-4 w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </React.Suspense>
      )}

      {/* Review Dialog */}
      <StarReviewDialog
        isOpen={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        calculatorName={calculatorToReview}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}

