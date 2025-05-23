
"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  HelpCircle,
  Search,
  Settings,
  Info,
  ListChecks,
  BarChart3,
  CheckCircle2,
  ThumbsUp,
  Clock // Retained as it's used for the generic Time Calculator icon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CalculatorDialog from "@/components/ui/CalculatorDialog";
import { heroContentData, benefitsData, resourceGuides } from "@/constants/ui";
import { deadlineItems } from "@/constants/deadlines";
import { detailedCalculatorList } from "@/constants/calculators";

// Lazy loaded calculator components
const LazyAMLRiskCalculator = React.lazy(() => import("@/components/calculators/AMLRiskCalculator"));
const LazyBasicTimeCalculator = React.lazy(() => import("@/components/calculators/BasicTimeCalculator"));
const LazyBonusCommissionCalculator = React.lazy(() => import("@/components/calculators/BonusCommissionCalculator"));
const LazyBreakEvenCalculator = React.lazy(() => import("@/components/calculators/BreakEvenCalculator"));
const LazyCIFCalculator = React.lazy(() => import("@/components/calculators/CIFCalculator"));
const LazyCashFlowProjectionCalculator = React.lazy(() => import("@/components/calculators/CashFlowProjectionCalculator"));
const LazyCurrencyExchangeCalculator = React.lazy(() => import("@/components/calculators/CurrencyExchangeCalculator"));
const LazyDepreciationCalculator = React.lazy(() => import("@/components/calculators/DepreciationCalculator"));
const LazyExciseDutyCalculator = React.lazy(() => import("@/components/calculators/ExciseDutyCalculator"));
const LazyFATCACRSCalculator = React.lazy(() => import("@/components/calculators/FATCACRSCalculator"));
const LazyFreightShippingCalculator = React.lazy(() => import("@/components/calculators/FreightShippingCalculator"));
const LazyGrossToNetSalaryCalculator = React.lazy(() => import("@/components/calculators/GrossToNetSalaryCalculator"));
const LazyLoanAmortisationCalculator = React.lazy(() => import("@/components/calculators/LoanAmortisationCalculator"));
const LazyMarkupMarginCalculator = React.lazy(() => import("@/components/calculators/MarkupMarginCalculator"));
const LazyMortgageCalculator = React.lazy(() => import("@/components/calculators/MortgageCalculator"));
const LazyOvertimePayCalculator = React.lazy(() => import("@/components/calculators/OvertimePayCalculator"));
const LazyPropertyTaxDialogCalculator = React.lazy(() => import("@/components/calculators/PropertyTaxDialogCalculator"));
const LazyRentalYieldCalculator = React.lazy(() => import("@/components/calculators/RentalYieldCalculator"));
const LazySavingsInvestmentCalculator = React.lazy(() => import("@/components/calculators/SavingsInvestmentCalculator"));
const LazySimpleInterestCalculator = React.lazy(() => import("@/components/calculators/SimpleInterestCalculator"));
const LazySimpleVatCalculator = React.lazy(() => import("@/components/calculators/SimpleVatCalculator"));
const LazySimplifiedLevyCalculator = React.lazy(() => import("@/components/calculators/SimplifiedLevyCalculator"));
const LazySimplifiedPayrollCalculator = React.lazy(() => import("@/components/calculators/SimplifiedPayrollCalculator"));
const LazyStampDutyCalculator = React.lazy(() => import("@/components/calculators/StampDutyCalculator"));
const LazyTariffCustomsDutyCalculator = React.lazy(() => import("@/components/calculators/TariffCustomsDutyCalculator"));
const LazyVacationPayCalculator = React.lazy(() => import("@/components/calculators/VacationPayCalculator"));
const LazyVoluntaryNisCalculator = React.lazy(() => import("@/components/calculators/VoluntaryNisCalculator"));

const calculatorComponents: { [key: string]: React.LazyExoticComponent<any> } = {
  IncomeTaxCalculator: LazyGrossToNetSalaryCalculator, // Assuming GrossToNet can be used or a specific one exists
  CorporationTaxCalculator: LazySimplifiedLevyCalculator, // Placeholder, replace with actual if exists
  SimpleVatCalculator: LazySimpleVatCalculator,
  PropertyTaxCalculator: LazyPropertyTaxDialogCalculator,
  SimplifiedLevyCalculator: LazySimplifiedLevyCalculator,
  SimplifiedPayrollCalculator: LazySimplifiedPayrollCalculator,
  VoluntaryNisCalculator: LazyVoluntaryNisCalculator,
  GrossToNetSalaryCalculator: LazyGrossToNetSalaryCalculator,
  OvertimePayCalculator: LazyOvertimePayCalculator,
  VacationPayCalculator: LazyVacationPayCalculator,
  BonusCommissionCalculator: LazyBonusCommissionCalculator,
  BasicTimeCalculator: LazyBasicTimeCalculator,
  LoanAmortisationCalculator: LazyLoanAmortisationCalculator,
  MortgageCalculator: LazyMortgageCalculator,
  SavingsInvestmentCalculator: LazySavingsInvestmentCalculator,
  CurrencyExchangeCalculator: LazyCurrencyExchangeCalculator,
  MarkupMarginCalculator: LazyMarkupMarginCalculator,
  BreakEvenCalculator: LazyBreakEvenCalculator,
  DepreciationCalculator: LazyDepreciationCalculator,
  CashFlowProjectionCalculator: LazyCashFlowProjectionCalculator,
  SimpleInterestCalculator: LazySimpleInterestCalculator,
  RentalYieldCalculator: LazyRentalYieldCalculator,
  StampDutyCalculator: LazyStampDutyCalculator,
  TariffCustomsDutyCalculator: LazyTariffCustomsDutyCalculator,
  ExciseDutyCalculator: LazyExciseDutyCalculator,
  FreightShippingCalculator: LazyFreightShippingCalculator,
  CIFCalculator: LazyCIFCalculator,
  AMLRiskCalculator: LazyAMLRiskCalculator,
  FATCACRSCalculator: LazyFATCACRSCalculator,
};

interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  details: string;
}

const DeadlineCard = React.memo(({ item }: { item: DeadlineItem }) => (
  <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-xl text-primary flex items-center">
        <CalendarDays className="mr-2 h-5 w-5" />
        {item.title}
      </CardTitle>
      <CardDescription>Due: {item.dueDate}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700">{item.details}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full">
        <AlertCircle className="mr-2 h-4 w-4" />
        Set Reminder
      </Button>
    </CardFooter>
  </Card>
));
DeadlineCard.displayName = 'DeadlineCard';

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCalculator, setActiveCalculator] = React.useState<{ name: string, key: number, title: string, icon: React.ElementType, componentName: string } | null>(null);

  const handleCalculatorDialogOpen = (name: string, title: string, icon: React.ElementType, componentName: string) => {
    setActiveCalculator({ name, key: Date.now(), title, icon, componentName });
  };

  const handleCalculatorDialogClose = () => {
    setActiveCalculator(null);
  };

  const filteredCalculators = React.useMemo(() =>
    detailedCalculatorList.filter((calc) =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  const CalculatorCard = React.memo(({ calc }: { calc: typeof detailedCalculatorList[0] }) => (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center">
          <calc.icon className="mr-2 h-6 w-6" />
          {calc.name}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">{calc.category}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">{calc.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleCalculatorDialogOpen(calc.name, calc.name, calc.icon, calc.componentName)}
          className="w-full"
        >
          Open Calculator
        </Button>
      </CardFooter>
    </Card>
  ));
  CalculatorCard.displayName = 'CalculatorCard';

  const renderCalculator = () => {
    if (!activeCalculator) return null;
    const CalculatorComponent = calculatorComponents[activeCalculator.componentName];
    if (!CalculatorComponent) {
        console.error(`Calculator component ${activeCalculator.componentName} not found.`);
        return <p>Calculator not available at the moment.</p>;
    }
    return <CalculatorComponent key={activeCalculator.key} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}>
          <div className="container px-4 md:px-6 text-center text-white">
            <div className="space-y-6 max-w-3xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                {heroContentData.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-200">
                {heroContentData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#calculator-showcase">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    {heroContentData.ctaButton}
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                    {heroContentData.secondaryButton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Why Choose Us?</h2>
              <p className="max-w-2xl mx-auto text-gray-600 md:text-xl dark:text-gray-400">
                Our platform offers a suite of tools and resources tailored for Barbados, making financial management simpler and more efficient.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefitsData.map((benefit, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-800">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Showcase Section */}
        <section id="calculator-showcase" className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Financial Calculators</h2>
              <p className="max-w-3xl text-gray-600 md:text-xl dark:text-gray-400">
                Access a wide range of calculators for tax, payroll, finance, and trade. Find the tool you need with our easy search.
              </p>
              <div className="w-full max-w-md">
                <Input
                  type="search"
                  placeholder="Search calculators (e.g., Income Tax, VAT, Mortgage)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-lg py-6 px-4 rounded-lg shadow-sm dark:bg-slate-700 dark:text-white"
                  aria-label="Search calculators"
                />
              </div>
            </div>
            {filteredCalculators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCalculators.map((calc) => (
                  <CalculatorCard key={calc.name} calc={calc} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Calculators Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your search for "{searchTerm}" did not match any calculators. Try a different keyword or explore all calculators.</p>
                <Button variant="link" onClick={() => setSearchTerm("")} className="mt-4 text-primary">
                  Clear Search & View All
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Deadlines Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Stay Ahead of Deadlines</h2>
              <p className="max-w-2xl mx-auto text-gray-600 md:text-xl dark:text-gray-400">
                Keep track of important tax and financial deadlines in Barbados.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deadlineItems.map((item) => (
                <DeadlineCard key={item.id} item={item} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/profile#deadlines"> {/* Assuming a profile page section for all deadlines */}
                <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/5">
                  View All Deadlines <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Knowledge Base / Resource Hub Section */}
        <section className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Knowledge Hub</h2>
              <p className="max-w-2xl mx-auto text-gray-600 md:text-xl dark:text-gray-400">
                Explore our guides and articles on various financial and tax topics relevant to Barbados.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resourceGuides.map((guide, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center">
                      <Info className="mr-2 h-5 w-5" />
                      {guide.title}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">{guide.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={guide.link} className="w-full">
                      <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/knowledge-base">
                <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/5">
                  Explore All Resources <HelpCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tax Form / Filing Assistance Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
                Tax Season Ready
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Simplify Your Tax Filing</h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform provides tools and guidance to help you prepare for tax season. While we don't file for you, we empower you to gather information and understand your obligations.
              </p>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center">
                  <ListChecks className="mr-2 h-5 w-5 text-primary" />
                  Organize income and expenses for easy reporting.
                </li>
                <li className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  Access relevant tax information and guides.
                </li>
                <li className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" />
                  Use our calculators to estimate liabilities.
                </li>
              </ul>
              <Link href="/profile#tax-preparation"> {/* Assuming a tax prep section in profile */}
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Preparing
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              {/* Placeholder for an image or illustration related to tax filing */}
              <img
                alt="Tax Filing Assistance Illustration"
                className="overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="400"
                src="/placeholder.svg?height=400&width=600&text=Tax+Prep+Visual"
                width="600"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Frequently Asked Questions</h2>
              <p className="max-w-2xl mx-auto text-gray-600 md:text-xl dark:text-gray-400">
                Find answers to common questions about our platform and Barbadian tax & finance.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary dark:hover:text-primary-foreground">Is this platform officially endorsed by the Barbados Revenue Authority (BRA)?</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400 pt-2">
                    No, this platform is an independent initiative designed to assist users with understanding and managing their financial obligations in Barbados. It is not officially endorsed by the BRA. For official information, please refer to the BRA website.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary dark:hover:text-primary-foreground">Are the calculators always up-to-date with the latest tax laws?</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400 pt-2">
                    We strive to keep our calculators and information as current as possible. However, tax laws can change. We recommend cross-referencing with official sources or consulting a financial advisor for critical decisions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary dark:hover:text-primary-foreground">Can I file my taxes directly through this platform?</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400 pt-2">
                    Currently, our platform does not support direct tax filing. We provide tools for calculation, estimation, and information gathering to help you prepare for filing with the relevant authorities.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary dark:hover:text-primary-foreground">Is my data secure on this platform?</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400 pt-2">
                    We take data privacy seriously. While most calculators can be used anonymously, if you choose to create an account, we employ security measures to protect your information. Please review our Privacy Policy for details.
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary dark:hover:text-primary-foreground">Who is this platform for?</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400 pt-2">
                    This platform is designed for individuals, small to medium-sized businesses, accountants, and financial advisors in Barbados or those dealing with Barbadian financial matters. Our goal is to provide accessible tools for a wide range of users.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {activeCalculator && (
         <React.Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center"><p className="text-white">Loading Calculator...</p></div>}>
            <CalculatorDialog
                isOpen={!!activeCalculator}
                onOpenChange={handleCalculatorDialogClose}
                icon={activeCalculator.icon}
                title={activeCalculator.title}
                CalculatorComponent={renderCalculator()}
            />
        </React.Suspense>
      )}
    </div>
  );
}
