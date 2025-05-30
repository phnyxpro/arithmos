"use client";

import * as React from "react";
// Removed LazyExoticComponent import

// Next.js core
import Link from "next/link";
import Image from "next/image";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useCalculatorDialogManager } from "@/hooks/useCalculatorDialogManager";

// Utilities
import { format, parseISO } from "date-fns";

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
  Briefcase,
  BookOpen,
  Building2,
  CalendarDays,
  Calculator as CalculatorIcon,
  Clock,
  DollarSign,
  FileBox,
  FileHeart,
  Home as HomeIconLucide,
  Landmark,
  Leaf,
  LineChart,
  Network,
  Percent,
  PercentCircle,
  PiggyBank,
  ShieldAlert,
  Ship,
  Stamp,
  Target,
  Truck,
  Users as UsersIcon,
} from "lucide-react";

// Static Data
import {
  detailedCalculatorList,
  heroContentData as pageHeroData,
  benefitsData as pageBenefitsData,
  deadlineItems as pageDeadlineItems,
  resourceGuides as pageResourceGuides,
  DetailedCalculatorListItem // Import the interface
} from "@/app/landing-page-data";
import { faqData } from "@/constants/faqData";

// Removed LazyComponentMap and related types/logic

// Define the type for ActiveCalculatorInfo to directly hold the component
interface ActiveCalculatorInfo {
  key: string;
  // component: CalculatorComponentName; // Removed
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
  } = useCalculatorDialogManager() as { // Cast to include description
    activeCalculator: ActiveCalculatorInfo | null;
    closeDialog: (isOpen: boolean) => void;
    setActiveCalculator: (calculator: ActiveCalculatorInfo | null) => void;
  };

  const HeroIcon = pageHeroData.icon;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [calculatorToReview, setCalculatorToReview] = React.useState<string | null>(null);

  // Add type annotation to isOpen parameter
  const handleCalculatorDialogClose = React.useCallback((isOpen: boolean) => {
    if (!isOpen && activeCalculator) {
      setCalculatorToReview(activeCalculator.title);
      setIsReviewDialogOpen(true);
      setActiveCalculator(null);
    }
  }, [activeCalculator, setIsReviewDialogOpen, setCalculatorToReview, setActiveCalculator]);

  // Add type annotations to parameters
  const handleSubmitReview = (calculatorName: string, rating: number) => {
    console.log(`Review submitted for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Review Submitted!",
      description: `Thanks for rating the ${calculatorName} ${rating} stars.`,
    });
    setIsReviewDialogOpen(false);
    setCalculatorToReview(null);
  };

  const dialogCalculators = React.useMemo(() => {
    // Filter for items that have a component (dialogs)
    return detailedCalculatorList.filter((calc): calc is DetailedCalculatorListItem & { component: React.ComponentType<any> } => !!calc.component);
  }, [detailedCalculatorList]);

  const uniqueCategories = React.useMemo(() => {
    // Add type annotation to category parameter
    return Array.from(new Set(dialogCalculators.map((calc) => calc.category)));
  }, [dialogCalculators]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative w-full py-20 md:py-28 text-center">
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
          <HeroIcon className="mb-6 h-16 w-16 text-primary-foreground" aria-hidden="true" />
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

      {/* Popular Calculators Section */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Popular Financial Tools &amp; Calculators
          </h2>
          <Tabs defaultValue={uniqueCategories[0]} className="w-full">
            <ScrollArea className="max-w-full pb-4">
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-1 text-muted-foreground">
                {/* Add type annotation to category parameter */}
                {uniqueCategories.slice(0, 5).map((category: string) => (
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

            {/* Add type annotation to category parameter */}
            {uniqueCategories.map((category: string) => {
              // Filter calculators by category, ensuring they have a component
              const calculatorsInCategory = detailedCalculatorList.filter(
                (calc): calc is DetailedCalculatorListItem & { component: React.ComponentType<any> } => calc.category === category && !!calc.component
              );

              return (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Add type annotation to calculator parameter */}
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
                                // Directly use the component from the list item
                                if (calculator.component) {
                                  setActiveCalculator({
                                    key: calculator.calculatorIdentifier,
                                    component: calculator.component, // Use the component directly
                                    title: calculator.name,
                                    icon: calculator.icon ?? CalculatorIcon,
                                    description: calculator.description,
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add type annotations to item and index parameters */}
            {pageDeadlineItems.map((item: typeof pageDeadlineItems[0], index: number) => {
              let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
              let dueDate: Date | 'Invalid Date' = 'Invalid Date'; // Initialize as Invalid Date

              try {
                if (typeof item.dueDate === 'string') {
                  const parsedDate = parseISO(item.dueDate);
                  // Check if parseISO returned a valid date object
                  if (!isNaN(parsedDate.getTime())) {
                    dueDate = parsedDate;
                  }
                }
              } catch (error) {
                console.error("Error parsing date:", item.dueDate, error);
                // dueDate remains 'Invalid Date'
              }

              const isPast = dueDate !== 'Invalid Date' && dueDate < new Date(new Date().setHours(0, 0, 0, 0));

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
            {/* Add type annotations to item and index parameters */}
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
            // Use the custom hook's closeDialog function
            onOpenChange={(isOpen) => {
              // Only trigger review if a calculator was actively open and is now closing
              if (!isOpen) {
                 handleCalculatorDialogClose(isOpen); // Use the local handler
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

              {/* Render the calculator component directly */}
              {React.createElement(
                activeCalculator.component,
                { key: activeCalculator.key } // Pass key or other props
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
