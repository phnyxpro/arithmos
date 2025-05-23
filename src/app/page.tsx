
"use client";

import * as React from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added this import
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
  FileText as FileTextIconLucide,
  Bell,
  Linkedin,
  Facebook,
  FileHeart,
  Leaf,
  Building,
  House,
  ReceiptText,
  Percent,
  Landmark,
  PiggyBank,
  ArrowRightLeft,
  Target,
  LineChart,
  AreaChart,
  Building as BuildingIconLucide,
  Truck,
  Ship,
  FileBox,
  Stamp,
  Home as HomeIconLucide,
  ShieldAlert,
  Network,
  BookOpen,
  Search,
  Copy,
  Trash2,
  Cigarette,
  Gift,
  Plane,
  PercentCircle,
  Building2,
  Download,
  Mail,
  Save,
  ListChecks,
  Eye,
  Loader2,
  HelpCircle,
  Settings,
  Calculator as CalculatorIconLucide,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';
import CalculatorDialog from "@/components/ui/CalculatorDialog";
import { StarReviewDialog } from "@/components/ui/star-review-dialog";

// Dynamically import calculator components
const LazyBasicTimeCalculator = React.lazy(() => import("@/components/calculators/BasicTimeCalculator"));
const LazySimplifiedPayrollCalculator = React.lazy(() => import("@/components/calculators/SimplifiedPayrollCalculator"));
const LazySimplifiedLevyCalculator = React.lazy(() => import("@/components/calculators/SimplifiedLevyCalculator"));
const LazyVoluntaryNisCalculator = React.lazy(() => import("@/components/calculators/VoluntaryNisCalculator"));
const LazySimpleVatCalculator = React.lazy(() => import("@/components/calculators/SimpleVatCalculator"));
const LazyExciseDutyCalculator = React.lazy(() => import("@/components/calculators/ExciseDutyCalculator"));
const LazyGrossToNetSalaryCalculator = React.lazy(() => import("@/components/calculators/GrossToNetSalaryCalculator"));
const LazyOvertimePayCalculator = React.lazy(() => import("@/components/calculators/OvertimePayCalculator"));
const LazyBonusCommissionCalculator = React.lazy(() => import("@/components/calculators/BonusCommissionCalculator"));
const LazyVacationPayCalculator = React.lazy(() => import("@/components/calculators/VacationPayCalculator"));
const LazyLoanAmortisationCalculator = React.lazy(() => import("@/components/calculators/LoanAmortisationCalculator"));
const LazyMortgageCalculator = React.lazy(() => import("@/components/calculators/MortgageCalculator"));
const LazySavingsInvestmentCalculator = React.lazy(() => import("@/components/calculators/SavingsInvestmentCalculator"));
const LazyCurrencyExchangeCalculator = React.lazy(() => import("@/components/calculators/CurrencyExchangeCalculator"));
const LazySimpleInterestCalculator = React.lazy(() => import("@/components/calculators/SimpleInterestCalculator"));
const LazyMarkupMarginCalculator = React.lazy(() => import("@/components/calculators/MarkupMarginCalculator"));
const LazyBreakEvenCalculator = React.lazy(() => import("@/components/calculators/BreakEvenCalculator"));
const LazyCashFlowProjectionCalculator = React.lazy(() => import("@/components/calculators/CashFlowProjectionCalculator"));
const LazyDepreciationCalculator = React.lazy(() => import("@/components/calculators/DepreciationCalculator"));
const LazyTariffCustomsDutyCalculator = React.lazy(() => import("@/components/calculators/TariffCustomsDutyCalculator"));
const LazyFreightShippingCalculator = React.lazy(() => import("@/components/calculators/FreightShippingCalculator"));
const LazyCIFCalculator = React.lazy(() => import("@/components/calculators/CIFCalculator"));
const LazyStampDutyCalculator = React.lazy(() => import("@/components/calculators/StampDutyCalculator"));
const LazyPropertyTaxDialogCalculator = React.lazy(() => import("@/components/calculators/PropertyTaxDialogCalculator"));
const LazyRentalYieldCalculator = React.lazy(() => import("@/components/calculators/RentalYieldCalculator"));
const LazyAMLRiskCalculator = React.lazy(() => import("@/components/calculators/AMLRiskCalculator"));
const LazyFATCACRSCalculator = React.lazy(() => import("@/components/calculators/FATCACRSCalculator"));

const calculatorComponents: { [key: string]: React.LazyExoticComponent<any> } = {
  BasicTimeCalculator: LazyBasicTimeCalculator,
  SimplifiedPayrollCalculator: LazySimplifiedPayrollCalculator,
  SimplifiedLevyCalculator: LazySimplifiedLevyCalculator,
  VoluntaryNisCalculator: LazyVoluntaryNisCalculator,
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

interface HeroContent {
  icon: React.ElementType;
  headline: string;
  primarySubheadline: string;
  secondarySubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
}

const heroContentData: HeroContent = {
  icon: Briefcase,
  headline: "Calculate. Track. Comply.",
  primarySubheadline: "Your Tools in One Place.",
  secondarySubheadline: "From time calculations to payroll to levies simplify compliance with powerful, free tools.",
  primaryCtaText: "Try Our Calculators",
  primaryCtaLink: "#popular-calculators",
};

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
    icon: CalculatorIconLucide,
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
  title: string;
  dueDate: string;
  description: string;
  periodicity: string;
  status: "Urgent" | "Upcoming" | "Completed" | "Overdue";
}

const deadlineItems: DeadlineItem[] = [
  { id: "paye", title: "PAYE Monthly Remittance", dueDate: "2025-06-15", description: "Remittance of PAYE deducted from employees for the previous month.", periodicity: "Monthly", status: "Upcoming" },
  { id: "vat", title: "VAT Return & Payment", dueDate: "2025-07-25", description: "For tax period May-Jun 2025.", periodicity: "Bi-Monthly", status: "Upcoming" },
  { id: "levies", title: "Business & Green Fund Levy (Q2)", dueDate: "2025-06-30", description: "Second quarterly installment for 2025.", periodicity: "Quarterly", status: "Upcoming" },
  { id: "corp-tax-return", title: "Corporation Tax Return", dueDate: "2025-04-30", description: "For income year 2024.", periodicity: "Annually", status: "Upcoming" },
  { id: "corp-tax-install", title: "Corporation Tax Installment (Q3)", dueDate: "2025-09-30", description: "Third quarterly installment for 2025.", periodicity: "Quarterly", status: "Upcoming" },
  { id: "income-tax-return", title: "Individual Income Tax Return", dueDate: "2025-04-30", description: "For income year 2024.", periodicity: "Annually", status: "Upcoming" },
];

interface ResourceGuide {
  title: string;
  description: string;
  link: string;
  category: string;
}

const resourceGuides: ResourceGuide[] = [
    {
      title: "Understanding VAT",
      description: "An in-depth guide to VAT registration, obligations, and filing.",
      link: "/knowledge-base/vat",
      category: "VAT"
    },
    {
      title: "Income & Corporation Tax",
      description: "Overview of personal and corporate income tax laws.",
      link: "/knowledge-base/income-corporation-tax",
      category: "Income Tax"
    },
    {
      title: "Property Tax Essentials",
      description: "Key aspects of the Property Tax Act explained.",
      link: "/knowledge-base/property-tax",
      category: "Property Tax"
    },
];

interface DetailedCalculatorListItem {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  ctaText?: string;
  href?: string;
  onClick?: () => void; // For dialogs
  componentName?: string; // For lazy loading dialogs
  calculatorIdentifier: string; // For review modal and unique keys
}

const detailedCalculatorList: DetailedCalculatorListItem[] = [
    {
      name: "Time Calculator",
      description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.",
      icon: Clock,
      category: "Payroll & HR",
      ctaText: "Open Calculator",
      componentName: "BasicTimeCalculator",
      calculatorIdentifier: "Time Calculator",
    },
    {
      name: "PAYE, NIS & HS (Payroll)",
      description: "Determines monthly statutory deductions for employees, including PAYE, NIS, and Health Surcharge.",
      icon: UsersIcon,
      category: "Payroll & HR",
      ctaText: "Open Calculator",
      componentName: "SimplifiedPayrollCalculator",
      calculatorIdentifier: "Payroll Calculator",
    },
    {
      name: "Voluntary NIS Contribution",
      description: "Estimate your NIS contributions as a self-employed individual based on declared monthly earnings.",
      icon: FileHeart,
      category: "Payroll & HR",
      ctaText: "Estimate Voluntary NIS",
      componentName: "VoluntaryNisCalculator",
      calculatorIdentifier: "Voluntary NIS Calculator",
    },
     {
      name: "Simple VAT Calculator",
      description: "Quickly add or remove 12.5% VAT from a price. Includes VAT registration eligibility checker.",
      icon: Percent,
      category: "Tax",
      ctaText: "Calculate VAT",
      componentName: "SimpleVatCalculator",
      calculatorIdentifier: "Simple VAT Calculator",
    },
    {
      name: "Excise Duty Calculator",
      description: "Compute excise duties on specific imports like alcohol, tobacco, and fuels.",
      icon: Cigarette,
      category: "Trade & Customs",
      ctaText: "Calculate Excise Duty",
      componentName: "ExciseDutyCalculator",
      calculatorIdentifier: "Excise Duty Calculator",
    },
    {
      name: "Gross to Net Salary Calculator",
      description: "Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.",
      icon: DollarSign,
      category: "Payroll & HR",
      ctaText: "Calculate Net Salary",
      componentName: "GrossToNetSalaryCalculator",
      calculatorIdentifier: "Gross to Net Salary Calculator",
    },
    {
      name: "Overtime Pay Calculator",
      description: "Compute overtime pay accurately for hourly paid workers by entering regular rate, hours, and OT conditions.",
      icon: Clock,
      category: "Payroll & HR",
      ctaText: "Calculate Overtime",
      componentName: "OvertimePayCalculator",
      calculatorIdentifier: "Overtime Pay Calculator",
    },
    {
      name: "Bonus & Commission Calculator",
      description: "Determine tax impacts (PAYE, NIS, HS) of bonuses or commissions in addition to regular salary.",
      icon: Gift,
      category: "Payroll & HR",
      ctaText: "Assess Tax Impact",
      componentName: "BonusCommissionCalculator",
      calculatorIdentifier: "Bonus & Commission Calculator",
    },
    {
      name: "Vacation Pay Calculator",
      description: "Easily estimate accrued vacation pay entitlements based on regular pay rate and vacation days.",
      icon: Plane,
      category: "Payroll & HR",
      ctaText: "Estimate Vacation Pay",
      componentName: "VacationPayCalculator",
      calculatorIdentifier: "Vacation Pay Calculator",
    },
    {
      name: "Loan Amortisation Calculator",
      description: "Calculate loan repayments (monthly, quarterly, annually) and view amortisation schedule.",
      icon: Landmark,
      category: "Financial Planning",
      ctaText: "View Schedule",
      componentName: "LoanAmortisationCalculator",
      calculatorIdentifier: "Loan Amortisation Calculator",
    },
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage repayments, including down payments and interest. View indicative bank rates.",
      icon: HomeIconLucide,
      category: "Financial Planning",
      ctaText: "Estimate Payments",
      componentName: "MortgageCalculator",
      calculatorIdentifier: "Mortgage Calculator",
    },
    {
      name: "Savings & Investment Calculator",
      description: "Project returns from savings accounts, fixed deposits, and investment products with various contribution and compounding frequencies.",
      icon: PiggyBank,
      category: "Financial Planning",
      ctaText: "Project Growth",
      componentName: "SavingsInvestmentCalculator",
      calculatorIdentifier: "Savings & Investment Calculator",
    },
    {
      name: "Currency Exchange Calculator",
      description: "Get indicative exchange rates using AI for various currencies. Includes popular rates (TTD base).",
      icon: ArrowRightLeft,
      category: "Business Tools",
      ctaText: "Convert Currency",
      componentName: "CurrencyExchangeCalculator",
      calculatorIdentifier: "Currency Exchange Calculator",
    },
    {
      name: "Simple Interest Calculator",
      description: "Quickly calculate simple interest amounts for short-term loans or deposits.",
      icon: PercentCircle,
      category: "Financial Planning",
      ctaText: "Calculate Interest",
      componentName: "SimpleInterestCalculator",
      calculatorIdentifier: "Simple Interest Calculator",
    },
    {
      name: "Markup & Margin Calculator",
      description: "Accurately determine product/service pricing and profit margins by calculating markup or margin based on cost and selling price.",
      icon: Target,
      category: "Business Tools",
      ctaText: "Analyze Pricing",
      componentName: "MarkupMarginCalculator",
      calculatorIdentifier: "Markup & Margin Calculator",
    },
    {
      name: "Break-even Analysis Calculator",
      description: "Determine sales volume (units and revenue) needed to cover fixed and variable expenses.",
      icon: LineChart,
      category: "Business Tools",
      ctaText: "Find Break-even Point",
      componentName: "BreakEvenCalculator",
      calculatorIdentifier: "Break-even Analysis Calculator",
    },
    {
      name: "Cash Flow Projection Calculator",
      description: "Forecast monthly or quarterly cash flows easily based on opening balance and average inflows/outflows.",
      icon: AreaChart,
      category: "Financial Planning",
      ctaText: "Project Cash Flow",
      componentName: "CashFlowProjectionCalculator",
      calculatorIdentifier: "Cash Flow Projection Calculator",
    },
    {
      name: "Depreciation Calculator",
      description: "Calculate depreciation using Straight-Line or Reducing Balance methods and view the schedule.",
      icon: BuildingIconLucide,
      category: "Business Tools",
      ctaText: "Calculate Depreciation",
      componentName: "DepreciationCalculator",
      calculatorIdentifier: "Depreciation Calculator",
    },
    {
      name: "Tariff & Customs Duty Calculator",
      description: "Estimate import duties and taxes based on CIF value and user-provided rates. Helps understand landed cost.",
      icon: Ship,
      category: "Trade & Customs",
      ctaText: "Estimate Duties",
      componentName: "TariffCustomsDutyCalculator",
      calculatorIdentifier: "Tariff & Customs Duty Calculator",
    },
    {
      name: "Freight & Shipping Cost Calculator",
      description: "Estimate total landed costs by inputting product value, shipping, insurance, and applicable duty/tax rates.",
      icon: Truck,
      category: "Trade & Customs",
      ctaText: "Estimate Landed Cost",
      componentName: "FreightShippingCalculator",
      calculatorIdentifier: "Freight & Shipping Cost Calculator",
    },
    {
      name: "Cost, Insurance, and Freight (CIF) Calculator",
      description: "Compute total Cost, Insurance, and Freight (CIF) value for imports. This value is often the basis for customs duties.",
      icon: FileBox,
      category: "Trade & Customs",
      ctaText: "Calculate CIF",
      componentName: "CIFCalculator",
      calculatorIdentifier: "CIF Calculator",
    },
    {
      name: "Stamp Duty Calculator",
      description: "Estimate stamp duty payable on residential property transfers based on property value using tiered rates.",
      icon: Stamp,
      category: "Tax",
      ctaText: "Estimate Stamp Duty",
      componentName: "StampDutyCalculator",
      calculatorIdentifier: "Stamp Duty Calculator",
    },
    {
      name: "Property Tax Calculator (Dialog)",
      description: "Quickly estimate annual property tax obligations based on Annual Rental Value (ARV).",
      icon: HomeIconLucide,
      category: "Tax",
      ctaText: "Estimate Property Tax",
      componentName: "PropertyTaxDialogCalculator",
      calculatorIdentifier: "Property Tax Calculator (Dialog)",
    },
    {
      name: "Rental Yield Calculator",
      description: "Calculate gross and net rental yield to evaluate the profitability of rental property investments.",
      icon: Building2,
      category: "Financial Planning",
      ctaText: "Calculate Yield",
      componentName: "RentalYieldCalculator",
      calculatorIdentifier: "Rental Yield Calculator",
    },
    {
      name: "AML Compliance Risk Calculator",
      description: "Quickly determine the Anti-Money Laundering (AML) risk of transactions based on various factors.",
      icon: ShieldAlert,
      category: "Compliance",
      ctaText: "Assess AML Risk",
      componentName: "AMLRiskCalculator",
      calculatorIdentifier: "AML Risk Calculator",
    },
    {
      name: "FATCA & CRS Compliance Calculator",
      description: "Assess and report obligations under FATCA & CRS regulations based on account holder information.",
      icon: Network,
      category: "Compliance",
      ctaText: "Assess FATCA/CRS",
      componentName: "FATCACRSCalculator",
      calculatorIdentifier: "FATCA & CRS Calculator",
    },
];

interface DeadlineCardProps {
  item: DeadlineItem;
  onAddToCalendar: (item: DeadlineItem, type: 'google' | 'outlook' | 'ics') => void;
}

const DeadlineCard = React.memo(({ item, onAddToCalendar }: DeadlineCardProps) => {
    let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "secondary";
    let effectiveStatus = item.status;
    const dueDate = parseISO(item.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (item.status !== "Completed" && dueDate < today) {
      effectiveStatus = "Overdue";
      badgeVariant = "destructive";
    } else if (item.status === "Urgent") {
      badgeVariant = "destructive";
    } else if (item.status === "Upcoming") {
      badgeVariant = "default";
    } else if (item.status === "Completed") {
      badgeVariant = "outline";
    }

  return (
    <Card className={`flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl ${effectiveStatus === "Overdue" || item.status === "Completed" ? 'opacity-70' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
          <Badge variant={badgeVariant} className={badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}>
            {effectiveStatus}
          </Badge>
        </div>
        <CardDescription className="text-xs pt-1">Periodicity: {item.periodicity}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
        <div className="flex items-center text-sm font-medium text-foreground">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Due: {format(parseISO(item.dueDate), "MMMM d, yyyy")}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-start space-x-2 pt-3">
         <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => onAddToCalendar(item, 'google')} disabled={item.status === "Completed"} aria-label="Add to Google Calendar" title="Add to Google Calendar">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Google Calendar</title><path d="M12 2.75A9.25 9.25 0 002.75 12 9.25 9.25 0 0012 21.25c2.13 0 4.09-.725 5.627-1.952V12h-5.627V8.58h5.627V5.364A9.213 9.213 0 0012 2.75zm0 1.41h3.514v2.83h-3.514V4.16zm5.627 5.83h-5.627v3.417h5.627V9.99zm0 4.834h-5.627v2.83h3.514A9.195 9.195 0 0017.627 14.824zM8.583 12v2.83H5.36A9.213 9.213 0 014.16 12h4.423zm0-1.417H4.16a9.213 9.213 0 011.2-2.83h3.223v2.83zM12 19.84a7.818 7.818 0 01-3.514-.838h3.514v-2.83H8.583v-1.417h3.417v2.83h3.514c.293.21.57.436.83.678A7.857 7.857 0 0112 19.84z"></path></svg>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => onAddToCalendar(item, 'outlook')} disabled={item.status === "Completed"} aria-label="Add to Outlook Calendar" title="Add to Outlook Calendar">
           <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Microsoft Outlook</title><path d="M15.831.83H7.58A2.753 2.753 0 004.83 3.582v16.836A2.753 2.753 0 007.58 23.17h8.25a2.753 2.753 0 002.752-2.752V3.582A2.753 2.753 0 0015.83.83zm1.376 8.25h-4.125v1.376H13.08V15.2S11.888 16.5 9.9 16.5c-1.376 0-3.027-1.1-3.027-3.44 0-2.615 1.79-3.577 3.028-3.577 1.816 0 2.904 1.24 2.904 1.24V9.08zM9.9 11.13c-.963 0-1.65.716-1.65 2.062 0 1.348.687 2.063 1.65 2.063.962 0 1.65-.715 1.65-2.063s-.688-2.062-1.65-2.062z"></path></svg>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={() => onAddToCalendar(item, 'ics')} disabled={item.status === "Completed"} aria-label="Download ICS File for Apple Calendars" title="Download ICS for Apple Calendars">
           <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><title>Apple</title><path d="M17.87.11C16.32.04 14.18 0 12.03 0c-2.4 0-4.27.04-5.84.11-2.19.11-3.81 1.44-4.75 3.95C.29 6.99 0 10.04 0 12.2c0 2.12.29 4.89 1.35 7.64.98 2.65 2.49 3.81 4.67 3.91 1.64.07 3.64.11 5.99.11 2.08 0 4.08-.04 5.66-.11 2.27-.11 3.82-1.29 4.79-3.91 1.19-3.04 1.35-5.62 1.35-7.64 0-2.16-.29-5.21-1.45-7.92-.98-2.58-2.55-3.81-4.75-3.95zm-5.84 20.08c1.62 0 3.04-.95 4.17-2.02a.78.78 0 00.21-.56.77.77 0 00-.79-.75c-.49 0-1.15.42-1.92.42s-1.3-.42-2.15-.42c-2.14 0-3.62 1.19-4.4 2.65-.37.65-.81 1.66.19 1.66a.74.74 0 00.5-.16c.99-.78 1.89-1.22 2.99-1.22zm.56-15.76c1.35-.02 2.85-1.73 2.88-3.69a3.13 3.13 0 00-3.13-3.18c-1.46 0-2.99 1.7-3.02 3.66-.02 1.83 1.23 3.21 3.27 3.21z"></path></svg>
        </Button>
      </CardFooter>
    </Card>
  );
});
DeadlineCard.displayName = 'DeadlineCard';


export default function LandingPage() {
  const { toast } = useToast();

  const [activeCalculator, setActiveCalculator] = React.useState<{ name: string; key: number; title: string; icon: React.ElementType; componentName: string } | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = React.useState(false);
  const [calculatorForReview, setCalculatorForReview] = React.useState<string | null>(null);

  const [isBasicTimeCalcOpen, setIsBasicTimeCalcOpen] = React.useState(false);
  const [basicTimeCalcKey, setBasicTimeCalcKey] = React.useState(0);

  const [isPayrollCalcOpen, setIsPayrollCalcOpen] = React.useState(false);
  const [payrollCalcKey, setPayrollCalcKey] = React.useState(0);

  const [isLevyCalcOpen, setIsLevyCalcOpen] = React.useState(false);
  const [levyCalcKey, setLevyCalcKey] = React.useState(0);

  const [isVoluntaryNisCalcOpen, setIsVoluntaryNisCalcOpen] = React.useState(false);
  const [voluntaryNisCalcKey, setVoluntaryNisCalcKey] = React.useState(0);

  const [isSimpleVatCalcOpen, setIsSimpleVatCalcOpen] = React.useState(false);
  const [simpleVatCalcKey, setSimpleVatCalcKey] = React.useState(0);

  const [isExciseDutyCalcOpen, setIsExciseDutyCalcOpen] = React.useState(false);
  const [exciseDutyCalcKey, setExciseDutyCalcKey] = React.useState(0);

  const [isGrossToNetCalcOpen, setIsGrossToNetCalcOpen] = React.useState(false);
  const [grossToNetCalcKey, setGrossToNetCalcKey] = React.useState(0);

  const [isOvertimeCalcOpen, setIsOvertimeCalcOpen] = React.useState(false);
  const [overtimeCalcKey, setOvertimeCalcKey] = React.useState(0);

  const [isBonusCommCalcOpen, setIsBonusCommCalcOpen] = React.useState(false);
  const [bonusCommCalcKey, setBonusCommCalcKey] = React.useState(0);

  const [isVacationCalcOpen, setIsVacationCalcOpen] = React.useState(false);
  const [vacationCalcKey, setVacationCalcKey] = React.useState(0);

  const [isLoanAmortisationCalcOpen, setIsLoanAmortisationCalcOpen] = React.useState(false);
  const [loanAmortisationCalcKey, setLoanAmortisationCalcKey] = React.useState(0);

  const [isMortgageCalcOpen, setIsMortgageCalcOpen] = React.useState(false);
  const [mortgageCalcKey, setMortgageCalcKey] = React.useState(0);

  const [isSavingsInvestmentCalcOpen, setIsSavingsInvestmentCalcOpen] = React.useState(false);
  const [savingsInvestmentCalcKey, setSavingsInvestmentCalcKey] = React.useState(0);

  const [isCurrencyExchangeCalcOpen, setIsCurrencyExchangeCalcOpen] = React.useState(false);
  const [currencyExchangeCalcKey, setCurrencyExchangeCalcKey] = React.useState(0);

  const [isSimpleInterestCalcOpen, setIsSimpleInterestCalcOpen] = React.useState(false);
  const [simpleInterestCalcKey, setSimpleInterestCalcKey] = React.useState(0);

  const [isMarkupMarginCalcOpen, setIsMarkupMarginCalcOpen] = React.useState(false);
  const [markupMarginCalcKey, setMarkupMarginCalcKey] = React.useState(0);

  const [isBreakEvenCalcOpen, setIsBreakEvenCalcOpen] = React.useState(false);
  const [breakEvenCalcKey, setBreakEvenCalcKey] = React.useState(0);

  const [isCashFlowProjectionCalcOpen, setIsCashFlowProjectionCalcOpen] = React.useState(false);
  const [cashFlowProjectionCalcKey, setCashFlowProjectionCalcKey] = React.useState(0);

  const [isDepreciationCalcOpen, setIsDepreciationCalcOpen] = React.useState(false);
  const [depreciationCalcKey, setDepreciationCalcKey] = React.useState(0);

  const [isTariffCustomsDutyCalcOpen, setIsTariffCustomsDutyCalcOpen] = React.useState(false);
  const [tariffCustomsDutyCalcKey, setTariffCustomsDutyCalcKey] = React.useState(0);

  const [isFreightShippingCalcOpen, setIsFreightShippingCalcOpen] = React.useState(false);
  const [freightShippingCalcKey, setFreightShippingCalcKey] = React.useState(0);

  const [isCIFCalcOpen, setIsCIFCalcOpen] = React.useState(false);
  const [cifCalcKey, setCIFCalcKey] = React.useState(0);

  const [isStampDutyCalcOpen, setIsStampDutyCalcOpen] = React.useState(false);
  const [stampDutyCalcKey, setStampDutyCalcKey] = React.useState(0);

  const [isPropertyTaxDialogCalcOpen, setIsPropertyTaxDialogCalcOpen] = React.useState(false);
  const [propertyTaxDialogCalcKey, setPropertyTaxDialogCalcKey] = React.useState(0);

  const [isRentalYieldCalcOpen, setIsRentalYieldCalcOpen] = React.useState(false);
  const [rentalYieldCalcKey, setRentalYieldCalcKey] = React.useState(0);

  const [isAmlRiskCalcOpen, setIsAmlRiskCalcOpen] = React.useState(false);
  const [amlRiskCalcKey, setAmlRiskCalcKey] = React.useState(0);

  const [isFatcaCrsCalcOpen, setIsFatcaCrsCalcOpen] = React.useState(false);
  const [fatcaCrsCalcKey, setFatcaCrsCalcKey] = React.useState(0);

  const openCalculatorDialog = React.useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>, keySetter: React.Dispatch<React.SetStateAction<number>>, calculatorIdentifier: string, title: string, icon: React.ElementType, componentName: string) => {
    setter(true);
    keySetter(prev => prev + 1);
    setActiveCalculator({ name: calculatorIdentifier, key: Date.now(), title, icon, componentName });
  }, []);

  const handleCalculatorDialogClose = React.useCallback((isOpen: boolean) => {
    if (!isOpen && activeCalculator) {
      setCalculatorForReview(activeCalculator.name);
      setIsReviewDialogOpen(true);
      setActiveCalculator(null); // Clear active calculator after initiating review
    }
    // Always ensure all dialogs are marked as closed if the generic close is triggered
    if (!isOpen) {
        setIsBasicTimeCalcOpen(false);
        setIsPayrollCalcOpen(false);
        setIsLevyCalcOpen(false);
        setIsVoluntaryNisCalcOpen(false);
        setIsSimpleVatCalcOpen(false);
        setIsExciseDutyCalcOpen(false);
        setIsGrossToNetCalcOpen(false);
        setIsOvertimeCalcOpen(false);
        setIsBonusCommCalcOpen(false);
        setIsVacationCalcOpen(false);
        setIsLoanAmortisationCalcOpen(false);
        setIsMortgageCalcOpen(false);
        setIsSavingsInvestmentCalcOpen(false);
        setIsCurrencyExchangeCalcOpen(false);
        setIsSimpleInterestCalcOpen(false);
        setIsMarkupMarginCalcOpen(false);
        setIsBreakEvenCalcOpen(false);
        setIsCashFlowProjectionCalcOpen(false);
        setIsDepreciationCalcOpen(false);
        setIsTariffCustomsDutyCalcOpen(false);
        setIsFreightShippingCalcOpen(false);
        setIsCIFCalcOpen(false);
        setIsStampDutyCalcOpen(false);
        setIsPropertyTaxDialogCalcOpen(false);
        setIsRentalYieldCalcOpen(false);
        setIsAmlRiskCalcOpen(false);
        setIsFatcaCrsCalcOpen(false);
    }
  }, [activeCalculator]); // Added activeCalculator to dependencies


  const handleSubmitReview = React.useCallback((calculatorName: string, rating: number) => {
    console.log(`Review for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Review Submitted!",
      description: `Thanks for rating the ${calculatorName} ${rating} stars.`,
    });
    setCalculatorForReview(null); // Clear calculator for review
    setIsReviewDialogOpen(false); // Close review dialog
  }, [toast]);


  const HeroIcon = heroContentData.icon;

  const getOpenHandler = (calcIdentifier: string) => {
    const calc = detailedCalculatorList.find(c => c.calculatorIdentifier === calcIdentifier);
    if (!calc || !calc.componentName) return () => {}; // Should not happen if list is correct

    // A mapping from calculatorIdentifier to its state setters
    const stateSetters: { [key: string]: [React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<number>>] } = {
        "Time Calculator": [setIsBasicTimeCalcOpen, setBasicTimeCalcKey],
        "Payroll Calculator": [setIsPayrollCalcOpen, setPayrollCalcKey],
        "Voluntary NIS Calculator": [setIsVoluntaryNisCalcOpen, setVoluntaryNisCalcKey],
        "Levy Calculator": [setIsLevyCalcOpen, setLevyCalcKey], // This was SimplifiedLevyCalculator
        "Simple VAT Calculator": [setIsSimpleVatCalcOpen, setSimpleVatCalcKey],
        "Excise Duty Calculator": [setIsExciseDutyCalcOpen, setExciseDutyCalcKey],
        "Gross to Net Salary Calculator": [setIsGrossToNetCalcOpen, setGrossToNetCalcKey],
        "Overtime Pay Calculator": [setIsOvertimeCalcOpen, setOvertimeCalcKey],
        "Bonus & Commission Calculator": [setIsBonusCommCalcOpen, setBonusCommCalcKey],
        "Vacation Pay Calculator": [setIsVacationCalcOpen, setVacationCalcKey],
        "Loan Amortisation Calculator": [setIsLoanAmortisationCalcOpen, setLoanAmortisationCalcKey],
        "Mortgage Calculator": [setIsMortgageCalcOpen, setMortgageCalcKey],
        "Savings & Investment Calculator": [setIsSavingsInvestmentCalcOpen, setSavingsInvestmentCalcKey],
        "Currency Exchange Calculator": [setIsCurrencyExchangeCalcOpen, setCurrencyExchangeCalcKey],
        "Simple Interest Calculator": [setIsSimpleInterestCalcOpen, setSimpleInterestCalcKey],
        "Markup & Margin Calculator": [setIsMarkupMarginCalcOpen, setMarkupMarginCalcKey],
        "Break-even Analysis Calculator": [setIsBreakEvenCalcOpen, setBreakEvenCalcKey],
        "Cash Flow Projection Calculator": [setIsCashFlowProjectionCalcOpen, setCashFlowProjectionCalcKey],
        "Depreciation Calculator": [setIsDepreciationCalcOpen, setDepreciationCalcKey],
        "Tariff & Customs Duty Calculator": [setIsTariffCustomsDutyCalcOpen, setTariffCustomsDutyCalcKey],
        "Freight & Shipping Cost Calculator": [setIsFreightShippingCalcOpen, setFreightShippingCalcKey],
        "CIF Calculator": [setIsCIFCalcOpen, setCIFCalcKey],
        "Stamp Duty Calculator": [setIsStampDutyCalcOpen, setStampDutyCalcKey],
        "Property Tax Calculator (Dialog)": [setIsPropertyTaxDialogCalcOpen, setPropertyTaxDialogCalcKey],
        "Rental Yield Calculator": [setIsRentalYieldCalcOpen, setRentalYieldCalcKey],
        "AML Risk Calculator": [setIsAmlRiskCalcOpen, setAmlRiskCalcKey],
        "FATCA & CRS Calculator": [setIsFatcaCrsCalcOpen, setFatcaCrsCalcKey],
    };

    const setters = stateSetters[calcIdentifier];
    if (!setters) {
        console.warn(`No state setters found for calculator: ${calcIdentifier}`);
        return () => {}; // Return a no-op function if setters are not found
    }
    return () => openCalculatorDialog(setters[0], setters[1], calc.calculatorIdentifier, calc.name, calc.icon, calc.componentName as string);
  };

  const getIsOpenState = (calcIdentifier: string) => {
    switch (calcIdentifier) {
        case "Time Calculator": return isBasicTimeCalcOpen;
        case "Payroll Calculator": return isPayrollCalcOpen;
        case "Voluntary NIS Calculator": return isVoluntaryNisCalcOpen;
        case "Levy Calculator": return isLevyCalcOpen; // Corresponds to SimplifiedLevyCalculator
        case "Simple VAT Calculator": return isSimpleVatCalcOpen;
        case "Excise Duty Calculator": return isExciseDutyCalcOpen;
        case "Gross to Net Salary Calculator": return isGrossToNetCalcOpen;
        case "Overtime Pay Calculator": return isOvertimeCalcOpen;
        case "Bonus & Commission Calculator": return isBonusCommCalcOpen;
        case "Vacation Pay Calculator": return isVacationCalcOpen;
        case "Loan Amortisation Calculator": return isLoanAmortisationCalcOpen;
        case "Mortgage Calculator": return isMortgageCalcOpen;
        case "Savings & Investment Calculator": return isSavingsInvestmentCalcOpen;
        case "Currency Exchange Calculator": return isCurrencyExchangeCalcOpen;
        case "Simple Interest Calculator": return isSimpleInterestCalcOpen;
        case "Markup & Margin Calculator": return isMarkupMarginCalcOpen;
        case "Break-even Analysis Calculator": return isBreakEvenCalcOpen;
        case "Cash Flow Projection Calculator": return isCashFlowProjectionCalcOpen;
        case "Depreciation Calculator": return isDepreciationCalcOpen;
        case "Tariff & Customs Duty Calculator": return isTariffCustomsDutyCalcOpen;
        case "Freight & Shipping Cost Calculator": return isFreightShippingCalcOpen;
        case "CIF Calculator": return isCIFCalcOpen;
        case "Stamp Duty Calculator": return isStampDutyCalcOpen;
        case "Property Tax Calculator (Dialog)": return isPropertyTaxDialogCalcOpen;
        case "Rental Yield Calculator": return isRentalYieldCalcOpen;
        case "AML Risk Calculator": return isAmlRiskCalcOpen;
        case "FATCA & CRS Calculator": return isFatcaCrsCalcOpen;
        default: return false;
    }
  };

   const getDialogKey = (calcIdentifier: string) => {
    switch (calcIdentifier) {
        case "Time Calculator": return basicTimeCalcKey;
        case "Payroll Calculator": return payrollCalcKey;
        case "Voluntary NIS Calculator": return voluntaryNisCalcKey;
        case "Levy Calculator": return levyCalcKey; // Corresponds to SimplifiedLevyCalculator
        case "Simple VAT Calculator": return simpleVatCalcKey;
        case "Excise Duty Calculator": return exciseDutyCalcKey;
        case "Gross to Net Salary Calculator": return grossToNetCalcKey;
        case "Overtime Pay Calculator": return overtimeCalcKey;
        case "Bonus & Commission Calculator": return bonusCommCalcKey;
        case "Vacation Pay Calculator": return vacationCalcKey;
        case "Loan Amortisation Calculator": return loanAmortisationCalcKey;
        case "Mortgage Calculator": return mortgageCalcKey;
        case "Savings & Investment Calculator": return savingsInvestmentCalcKey;
        case "Currency Exchange Calculator": return currencyExchangeCalcKey;
        case "Simple Interest Calculator": return simpleInterestCalcKey;
        case "Markup & Margin Calculator": return markupMarginCalcKey;
        case "Break-even Analysis Calculator": return breakEvenCalcKey;
        case "Cash Flow Projection Calculator": return cashFlowProjectionCalcKey;
        case "Depreciation Calculator": return depreciationCalcKey;
        case "Tariff & Customs Duty Calculator": return tariffCustomsDutyCalcKey;
        case "Freight & Shipping Cost Calculator": return freightShippingCalcKey;
        case "CIF Calculator": return cifCalcKey;
        case "Stamp Duty Calculator": return stampDutyCalcKey;
        case "Property Tax Calculator (Dialog)": return propertyTaxDialogCalcKey;
        case "Rental Yield Calculator": return rentalYieldCalcKey;
        case "AML Risk Calculator": return amlRiskCalcKey;
        case "FATCA & CRS Calculator": return fatcaCrsCalcKey;
        default: return Date.now(); // Fallback, should not be reached if list is correct
    }
  };


  const handleAddToCalendar = React.useCallback((deadline: DeadlineItem, type: 'google' | 'outlook' | 'ics') => {
    const eventDate = parseISO(deadline.dueDate);
    if (isNaN(eventDate.getTime())) {
      toast({ title: "Invalid Date", description: `Cannot set reminder for "${deadline.title}" due to invalid date.`, variant: "destructive" });
      return;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    if (eventDate < today && deadline.status !== "Completed") {
        toast({ title: "Past Due Date", description: `Cannot set a reminder for "${deadline.title}" as the date is in the past.`, variant: "default" });
        return;
    }
    if (deadline.status === "Completed") {
         toast({ title: "Already Completed", description: `"${deadline.title}" is marked as completed. No reminder set.`, variant: "default" });
        return;
    }

    const startDate = format(eventDate, "yyyyMMdd");
    const endDate = format(addDays(eventDate, 1), "yyyyMMdd"); // For all-day event
    const eventTitle = encodeURIComponent(`Tax TT Reminder: ${deadline.title}`);
    const details = encodeURIComponent(`Deadline for ${deadline.title} - ${deadline.description}. Periodicity: ${deadline.periodicity}.`);
    const location = encodeURIComponent("Trinidad & Tobago"); // General location

    let url = "";

    if (type === 'google') {
      url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
      toast({ title: "Opening Google Calendar...", description: `Preparing reminder for ${deadline.title}.`});
    } else if (type === 'outlook') {
      // Outlook web deeplink for all-day event
      const outlookStartDate = format(eventDate, "yyyy-MM-dd'T'00:00:00");
      const outlookEndDate = format(addDays(eventDate,1), "yyyy-MM-dd'T'00:00:00");
      url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${eventTitle}&body=${details}&startdt=${outlookStartDate}&enddt=${outlookEndDate}&allday=true&location=${location}`;
      toast({ title: "Opening Outlook Calendar...", description: `Preparing reminder for ${deadline.title}.`});
    } else if (type === 'ics') {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        `PRODID:-//TaxTT//TaxTT Reminder//EN`,
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@taxtt.com`,
        `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
        `DTSTART;VALUE=DATE:${startDate}`,
        `DTEND;VALUE=DATE:${endDate}`,
        `SUMMARY:Tax TT Reminder: ${deadline.title}`,
        `DESCRIPTION:Deadline for ${deadline.title} - ${deadline.description}. Periodicity: ${deadline.periodicity}.`,
        `LOCATION:${location}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const linkElement = document.createElement("a");
      linkElement.href = URL.createObjectURL(blob);
      linkElement.download = `Tax_TT_Reminder_${deadline.title.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '')}.ics`;
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
      URL.revokeObjectURL(linkElement.href);
      toast({ title: "ICS File Downloading...", description: `Calendar event for "${deadline.title}" is being downloaded.` });
      return;
    }

    if (url) {
      window.open(url, '_blank');
    }
  }, [toast]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full py-24 md:py-32"
      >
        <div
          className="absolute inset-0"
          aria-hidden="true"
        ></div>

        <div className="container relative z-10 mx-auto flex flex-col items-center text-center px-4">
          <HeroIcon className="mb-6 h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl mb-4">
            {heroContentData.headline}
          </h1>
          <p className="mt-2 text-xl md:text-2xl font-semibold text-primary/90 mb-6">
            {heroContentData.primarySubheadline}
          </p>
          <p className="max-w-xl text-base md:text-lg text-muted-foreground mb-10">
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

      {/* Compliance Ticker */}
      <section id="compliance-ticker" className="py-4 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Upcoming Compliance Reminders</h3>
          </div>
          <div className="overflow-hidden relative h-16">
            <div className="flex absolute whitespace-nowrap animate-marquee-scroll group-hover:pause-animation">
              {[...deadlineItems.filter(d => d.status !== "Completed").sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()).slice(0, 5),
               ...deadlineItems.filter(d => d.status !== "Completed").sort((a, b) => parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()).slice(0, 5)].map((item, index) => (
                <div key={`${item.id}-${index}`} className="inline-block align-top mx-4 p-3 rounded-lg bg-card/80 shadow-sm min-w-[280px] sm:min-w-[320px]">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold truncate text-primary-foreground">{item.title}</p>
                      <p className="text-xs text-primary-foreground/70">Due: {format(parseISO(item.dueDate), "MMM d, yyyy")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Calculators */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Start With Our Most Popular Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedCalculatorList
              .filter(calc => calc.componentName) // Only show dialog-based calculators here
              .map((calc) => (
              <Card key={calc.calculatorIdentifier} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <calc.icon className="h-8 w-8 text-accent mr-3" />
                    <CardTitle className="text-xl text-primary">{calc.name}</CardTitle>
                  </div>
                  {calc.category && <Badge variant="secondary" className="w-fit">{calc.category}</Badge>}
                </CardHeader>
                <CardContent className="flex-grow">
                   <p className="text-sm text-muted-foreground">{calc.description}</p>
                </CardContent>
                <CardFooter>
                   {calc.href ? (
                    <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      <Link href={calc.href}>
                        {calc.ctaText || "View Page"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      onClick={getOpenHandler(calc.calculatorIdentifier)}
                      variant="outline"
                      className="w-full text-primary border-primary hover:bg-primary/10"
                    >
                      {calc.ctaText || "Open Calculator"} <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deadlineItems.map((item) => (
                <DeadlineCard key={item.id} item={item} onAddToCalendar={handleAddToCalendar} />
            ))}
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
              <Card key={resource.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-accent mb-3" />
                  <CardTitle className="text-lg text-primary">{resource.title}</CardTitle>
                   {resource.category && <Badge variant="outline" className="mt-2 w-fit">{resource.category}</Badge>}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-accent p-0">
                    <Link href={resource.link}>Read Guide <ArrowRight className="ml-1 h-4 w-4"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                <Link href="/knowledge-base">Explore All Resources <HelpCircle className="ml-2 h-5 w-5"/></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tax Form / Filing Assistance Section */}
      <section className="w-full py-12 md:py-24">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Tax Season Ready
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Simplify Your Tax Filing</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides tools and guidance to help you prepare for tax season. While we don't file for you, we empower you to gather information and understand your obligations.
              </p>
              <ul className="grid gap-2 py-4 text-muted-foreground">
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
            </div>
            <div className="flex justify-center">
              <Image
                alt="Tax Filing Assistance Illustration"
                className="overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="400"
                src="https://placehold.co/600x400.png"
                width="600"
                data-ai-hint="tax preparation"
              />
            </div>
          </div>
        </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Find answers to common questions about our platform and Trinidad & Tobago tax & finance.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Is this platform officially endorsed by the IRD?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  No, this platform is an independent initiative designed to assist users with understanding and managing their financial obligations in Trinidad & Tobago. It is not officially endorsed by the IRD. For official information, please refer to the IRD website.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Are the calculators always up-to-date with the latest tax laws?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  We strive to keep our calculators and information as current as possible. However, tax laws can change. We recommend cross-referencing with official sources or consulting a financial advisor for critical decisions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Can I file my taxes directly through this platform?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  Currently, our platform does not support direct tax filing. We provide tools for calculation, estimation, and information gathering to help you prepare for filing with the relevant authorities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Is my data secure on this platform?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  We take data privacy seriously. While most calculators can be used anonymously, if you choose to create an account, we employ security measures to protect your information. Please review our Privacy Policy for details.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">Who is this platform for?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  This platform is designed for individuals, small to medium-sized businesses, accountants, and financial advisors in Trinidad & Tobago or those dealing with T&T financial matters. Our goal is to provide accessible tools for a wide range of users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

      {/* Dynamically render calculator dialogs */}
      {detailedCalculatorList.filter(calc => calc.componentName).map(calc => (
        <React.Suspense key={`dialog-suspense-${calc.calculatorIdentifier}`} fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
          <CalculatorDialog
            isOpen={getIsOpenState(calc.calculatorIdentifier)}
            onOpenChange={(isOpen) => handleCalculatorDialogClose(isOpen)}
            icon={calc.icon}
            title={calc.name}
            CalculatorComponent={renderCalculatorComponent(calc.componentName!, getDialogKey(calc.calculatorIdentifier))}
          />
        </React.Suspense>
      ))}

      {calculatorForReview && (
        <StarReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={(isOpen) => {
            setIsReviewDialogOpen(isOpen);
            if (!isOpen) setCalculatorForReview(null);
          }}
          calculatorName={calculatorForReview}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </div>
  );
}
```