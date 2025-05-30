
import * as React from "react";

// Icons from Lucide
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
} from "lucide-react";

// Import Calculator Components for Dialogs (using named imports)
import { BasicTimeCalculator } from "@/components/calculators/BasicTimeCalculator";
import { SimplifiedPayrollCalculator } from "@/components/calculators/SimplifiedPayrollCalculator";
import { SimplifiedLevyCalculator } from "@/components/calculators/SimplifiedLevyCalculator";
import { SimpleVatCalculator } from "@/components/calculators/SimpleVatCalculator";
import { ExciseDutyCalculator } from "@/components/calculators/ExciseDutyCalculator";
import { GrossToNetSalaryCalculator } from "@/components/calculators/GrossToNetSalaryCalculator";
import { OvertimePayCalculator } from "@/components/calculators/OvertimePayCalculator";
import { BonusCommissionCalculator } from "@/components/calculators/BonusCommissionCalculator";
import { VacationPayCalculator } from "@/components/calculators/VacationPayCalculator";
import { LoanAmortisationCalculator } from "@/components/calculators/LoanAmortisationCalculator";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { SavingsInvestmentCalculator } from "@/components/calculators/SavingsInvestmentCalculator";
import { CurrencyExchangeCalculator } from "@/components/calculators/CurrencyExchangeCalculator";
import { SimpleInterestCalculator } from "@/components/calculators/SimpleInterestCalculator";
import { MarkupMarginCalculator } from "@/components/calculators/MarkupMarginCalculator";
import { BreakEvenCalculator } from "@/components/calculators/BreakEvenCalculator";
import { CashFlowProjectionCalculator } from "@/components/calculators/CashFlowProjectionCalculator";
import { DepreciationCalculator } from "@/components/calculators/DepreciationCalculator";
import { TariffCustomsDutyCalculator } from "@/components/calculators/TariffCustomsDutyCalculator";
import { FreightShippingCalculator } from "@/components/calculators/FreightShippingCalculator";
import { CIFCalculator } from "@/components/calculators/CIFCalculator";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { PropertyTaxDialogCalculator } from "@/components/calculators/PropertyTaxDialogCalculator";
import { RentalYieldCalculator } from "@/components/calculators/RentalYieldCalculator";
import { AMLRiskCalculator } from "@/components/calculators/AMLRiskCalculator";
import { FATCACRSCalculator } from "@/components/calculators/FATCACRSCalculator";
import { VoluntaryNisCalculator } from "@/components/calculators/VoluntaryNisCalculator"; // Added missing import

export interface HeroContent {
  icon: React.ElementType;
  headline: string; // Changed from title to headline
  primarySubheadline: string;
  secondarySubheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
}

export const heroContentData: HeroContent = {
  icon: Briefcase,
  headline: "Calculate. Track. Comply.", // Changed from title to headline
  primarySubheadline: "Your Tools in One Place.",
  secondarySubheadline: "From time calculations to payroll to levies simplify compliance with powerful, free tools.",
  primaryCtaText: "Try Our Calculators",
  primaryCtaLink: "#popular-calculators",
};

export interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const benefitsData: BenefitItem[] = [
  {
    icon: ShieldCheck,
    title: "Stay Compliant with Confidence",
    description: "Arithmos is built on the latest local tax laws and aligned with the Inland Revenue Division (IRD) of Trinidad & Tobago, helping you calculate and file with accuracy.",
  },
  {
    icon: UsersIcon,
    title: "Tailored for SMEs, Freelancers, and Professionals",
    description: "Whether you are managing a growing team, running a side hustle, or consulting independently, Arithmos is built with your workflow in mind, with no unnecessary complexity, just what you need.",
  },
  {
    icon: CalculatorIcon,
    title: "Accurate, IRD-Aligned Calculations",
    description: "Our tools reflect real-world rates and thresholds for PAYE, NIS, Health Surcharge, VAT, Business Levy, and more, so your numbers always match local requirements.",
  },
  {
    icon: Smartphone,
    title: "Seamless Across Devices",
    description: "From desktop to mobile, Arithmos works wherever you are, whether at the office, in the field, or on the move.",
  },
];

export interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  periodicity: string;
  status: "Urgent" | "Upcoming" | "Completed" | "Overdue";
}

export const deadlineItems: DeadlineItem[] = [
  { id: "paye", title: "PAYE Monthly Remittance", dueDate: "2025-06-15", description: "Remittance of PAYE deducted from employees for the previous month.", periodicity: "Monthly", status: "Upcoming" },
  { id: "vat", title: "VAT Return & Payment", dueDate: "2025-07-25", description: "For tax period May-Jun 2025.", periodicity: "Bi-Monthly", status: "Upcoming" },
  { id: "levies", title: "Business & Green Fund Levy (Q2)", dueDate: "2025-06-30", description: "Second quarterly installment for 2025.", periodicity: "Quarterly", status: "Upcoming" },
  { id: "corp-tax-return", title: "Corporation Tax Return", dueDate: "2025-04-30", description: "For income year 2024.", periodicity: "Annually", status: "Upcoming" },
  { id: "corp-tax-install", title: "Corporation Tax Installment (Q3)", dueDate: "2025-09-30", description: "Third quarterly installment for 2025.", periodicity: "Quarterly", status: "Upcoming" },
  { id: "income-tax-return", title: "Individual Income Tax Return", dueDate: "2025-04-30", description: "For income year 2024.", periodicity: "Annually", status: "Upcoming" },
];

export interface ResourceGuide {
  title: string;
  description: string;
  link: string;
  category: string;
}

export const resourceGuides: ResourceGuide[] = [
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

export interface DetailedCalculatorListItem {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  ctaText?: string;
  href?: string;
  component?: React.ComponentType<any>; // Added
  calculatorIdentifier: string; // For review modal and unique keys
}

export const detailedCalculatorList: DetailedCalculatorListItem[] = [
    {
      name: "Time Calculator",
      description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.",
      icon: Clock,
      category: "Payroll & HR",
      ctaText: "Open Calculator",
      component: BasicTimeCalculator, // Use the imported component
      calculatorIdentifier: "Time Calculator",
    },
    {
      name: "PAYE, NIS & HS (Payroll)",
      description: "Determines monthly statutory deductions for employees, including PAYE, NIS, and Health Surcharge.",
      icon: UsersIcon,
      category: "Payroll & HR",
      ctaText: "Open Calculator",
      component: SimplifiedPayrollCalculator, // Use the imported component
      calculatorIdentifier: "Payroll Calculator",
    },
    {
      name: "Voluntary NIS Contribution",
      description: "Estimate your NIS contributions as a self-employed individual based on declared monthly earnings.",
      icon: FileHeart,
      category: "Payroll & HR",
      ctaText: "Estimate Voluntary NIS",
      component: VoluntaryNisCalculator, // Use the imported component
      calculatorIdentifier: "Voluntary NIS Calculator",
    },
    {
      name: "Levy Calculator (Business & Green Fund)",
      description: "Estimate Business Levy and Green Fund Levy from gross income. Considers exemptions for new companies.",
      icon: Landmark,
      category: "Business Tax",
      ctaText: "Estimate Levies",
      component: SimplifiedLevyCalculator, // Use the imported component
      calculatorIdentifier: "Levy Calculator",
    },

    {
      name: "Simple VAT Calculator",
      description: "Quickly add or remove 12.5% VAT from a price. Includes VAT registration eligibility checker.",
      icon: Percent,
      category: "Tax",
      ctaText: "Calculate VAT",
      component: SimpleVatCalculator, // Use the imported component
      calculatorIdentifier: "Simple VAT Calculator",
    },
    {
      name: "Excise Duty Calculator",
      description: "Compute excise duties on specific imports like alcohol, tobacco, and fuels.",
      icon: Cigarette,
      category: "Trade & Customs",
      ctaText: "Calculate Excise Duty",
      component: ExciseDutyCalculator, // Use the imported component
      calculatorIdentifier: "Excise Duty Calculator",
    },
    {
      name: "Gross to Net Salary Calculator",
      description: "Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.",
      icon: DollarSign,
      category: "Payroll & HR",
      ctaText: "Calculate Net Salary",
      component: GrossToNetSalaryCalculator, // Use the imported component
      calculatorIdentifier: "Gross to Net Salary Calculator",
    },
    {
      name: "Overtime Pay Calculator",
      description: "Compute overtime pay accurately for hourly paid workers by entering regular rate, hours, and OT conditions.",
      icon: Clock,
      category: "Payroll & HR",
      ctaText: "Calculate Overtime",
      component: OvertimePayCalculator, // Use the imported component
      calculatorIdentifier: "Overtime Pay Calculator",
    },
    {
      name: "Bonus & Commission Calculator",
      description: "Determine tax impacts (PAYE, NIS, HS) of bonuses or commissions in addition to regular salary.",
      icon: Gift,
      category: "Payroll & HR",
      ctaText: "Assess Tax Impact",
      component: BonusCommissionCalculator, // Use the imported component
      calculatorIdentifier: "Bonus & Commission Calculator",
    },
    {
      name: "Vacation Pay Calculator",
      description: "Easily estimate accrued vacation pay entitlements based on regular pay rate and vacation days.",
      icon: Plane,
      category: "Payroll & HR",
      ctaText: "Estimate Vacation Pay",
      component: VacationPayCalculator, // Use the imported component
      calculatorIdentifier: "Vacation Pay Calculator",
    },
    {
      name: "Loan Amortisation Calculator",
      description: "Calculate loan repayments (monthly, quarterly, annually) and view amortisation schedule.",
      icon: Landmark,
      category: "Financial Planning",
      ctaText: "View Schedule",
      component: LoanAmortisationCalculator, // Use the imported component
      calculatorIdentifier: "Loan Amortisation Calculator",
    },
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage repayments, including down payments and interest. View indicative bank rates.",
      icon: HomeIconLucide,
      category: "Financial Planning",
      ctaText: "Estimate Payments",
      component: MortgageCalculator, // Use the imported component
      calculatorIdentifier: "Mortgage Calculator",
    },
    {
      name: "Savings & Investment Calculator",
      description: "Project returns from savings accounts, fixed deposits, and investment products with various contribution and compounding frequencies.",
      icon: PiggyBank,
      category: "Financial Planning",
      ctaText: "Project Growth",
      component: SavingsInvestmentCalculator, // Use the imported component
      calculatorIdentifier: "Savings & Investment Calculator",
    },
    {
      name: "Currency Exchange Calculator",
      description: "Get indicative exchange rates using AI for various currencies. Includes popular rates (TTD base).",
      icon: ArrowRightLeft,
      category: "Business Tools",
      ctaText: "Convert Currency",
      component: CurrencyExchangeCalculator, // Use the imported component
      calculatorIdentifier: "Currency Exchange Calculator",
    },
    {
      name: "Simple Interest Calculator",
      description: "Quickly calculate simple interest amounts for short-term loans or deposits.",
      icon: PercentCircle,
      category: "Financial Planning",
      ctaText: "Calculate Interest",
      component: SimpleInterestCalculator, // Use the imported component
      calculatorIdentifier: "Simple Interest Calculator",
    },
    {
      name: "Markup & Margin Calculator",
      description: "Accurately determine product/service pricing and profit margins by calculating markup or margin based on cost and selling price.",
      icon: Target,
      category: "Business Tools",
      ctaText: "Analyze Pricing",
      component: MarkupMarginCalculator, // Use the imported component
      calculatorIdentifier: "Markup & Margin Calculator",
    },
    {
      name: "Break-even Analysis Calculator",
      description: "Determine sales volume (units and revenue) needed to cover fixed and variable expenses.",
      icon: LineChart,
      category: "Business Tools",
      ctaText: "Find Break-even Point",
      component: BreakEvenCalculator, // Use the imported component
      calculatorIdentifier: "Break-even Analysis Calculator",
    },
    {
      name: "Cash Flow Projection Calculator",
      description: "Forecast your business's cash inflows and outflows over several periods.",
      icon: AreaChart,
      category: "Business Tools",
      ctaText: "Project Cash Flow",
      component: CashFlowProjectionCalculator, // Use the imported component
      calculatorIdentifier: "Cash Flow Projection Calculator",
    },
    {
      name: "Depreciation Calculator",
      description: "Calculate depreciation using Straight-Line or Reducing Balance methods and view the schedule.",
      icon: BuildingIconLucide,
      category: "Business Tools",
      ctaText: "Calculate Depreciation",
      component: DepreciationCalculator, // Use the imported component
      calculatorIdentifier: "Depreciation Calculator",
    },
    {
      name: "Tariff & Customs Duty Calculator",
      description: "Estimate import duties and taxes based on CIF value and user-provided rates. Helps understand landed cost.",
      icon: Ship,
      category: "Trade & Customs",
      ctaText: "Estimate Duties",
      component: TariffCustomsDutyCalculator, // Use the imported component
      calculatorIdentifier: "Tariff & Customs Duty Calculator",
    },
    {
      name: "Freight Shipping Calculator",
      description: "Estimate total landed costs by inputting product value, shipping, insurance, and applicable duty/tax rates.",
      icon: Truck,
      category: "Trade & Customs",
      ctaText: "Estimate Landed Cost",
      component: FreightShippingCalculator, // Use the imported component
      calculatorIdentifier: "Freight & Shipping Cost Calculator",
    },
    {
      name: "Cost, Insurance, and Freight (CIF) Calculator",
      description: "Compute total Cost, Insurance, and Freight (CIF) value for imports. This value is often the basis for customs duties.",
      icon: FileBox,
      category: "Trade & Customs",
      ctaText: "Calculate CIF",
      component: CIFCalculator, // Use the imported component
      calculatorIdentifier: "CIF Calculator",
    },
    {
      name: "Stamp Duty Calculator",
      description: "Estimate stamp duty payable on residential property transfers based on property value using tiered rates.",
      icon: Stamp,
      category: "Tax",
      ctaText: "Estimate Stamp Duty",
      component: StampDutyCalculator, // Use the imported component
      calculatorIdentifier: "Stamp Duty Calculator",
    },
    {
      name: "Property Tax Calculator (Dialog)",
      description: "Quickly estimate annual property tax obligations based on Annual Rental Value (ARV).",
      icon: HomeIconLucide,
      category: "Tax",
      ctaText: "Estimate Property Tax",
      component: PropertyTaxDialogCalculator, // Use the imported component
      calculatorIdentifier: "Property Tax Calculator (Dialog)",
    },
    {
      name: "Rental Yield Calculator",
      description: "Calculate gross and net rental yield to evaluate the profitability of rental property investments.",
      icon: Building2,
      category: "Financial Planning",
      ctaText: "Calculate Yield",
      component: RentalYieldCalculator, // Use the imported component
      calculatorIdentifier: "Rental Yield Calculator",
    },
    {
      name: "AML Compliance Risk Calculator",
      description: "Quickly determine the Anti-Money Laundering (AML) risk of transactions based on various factors.",
      icon: ShieldAlert,
      category: "Compliance",
      ctaText: "Assess AML Risk",
      component: AMLRiskCalculator, // Use the imported component
      calculatorIdentifier: "AML Risk Calculator",
    },
    {
      name: "FATCA & CRS Compliance Calculator",
      description: "Assess and report obligations under FATCA & CRS regulations based on account holder information.",
      icon: Network,
      category: "Compliance",
      ctaText: "Assess FATCA/CRS",
      component: FATCACRSCalculator, // Use the imported component
      calculatorIdentifier: "FATCA & CRS Calculator",
    },
    {
      name: "Income Tax (Full Page)",
      description: "Comprehensive personal income tax calculation including PAYE, NIS, and Health Surcharge.",
      icon: DollarSign,
      category: "Tax",
      href: "/calculators/income-tax",
      ctaText: "View Page",
      calculatorIdentifier: "Income Tax (Full Page)",
    },
    {
      name: "Corporation Tax (Full Page)",
      description: "Detailed corporation tax calculation with various income types, deductions, and offsets.",
      icon: Landmark,
      category: "Tax",
      href: "/calculators/corporation-tax",
      ctaText: "View Page",
      calculatorIdentifier: "Corporation Tax (Full Page)",
    },
    {
      name: "VAT Calculator (Full Page)",
      description: "Calculate VAT, check registration eligibility, and explore VAT guides.",
      icon: ReceiptText,
      category: "Tax",
      href: "/calculators/vat",
      ctaText: "View Page",
      calculatorIdentifier: "VAT Calculator (Full Page)",
    },
    {
      name: "Property Tax Estimator (Full Page)",
      description: "Estimate property taxes based on Annual Rental Value (ARV) and property type.",
      icon: HomeIconLucide,
      category: "Tax",
      href: "/calculators/property-tax",
      ctaText: "View Page",
      calculatorIdentifier: "Property Tax Estimator (Full Page)",
    },
    {
      name: "Business Levy (Full Page)",
      description: "Detailed Business Levy calculation with quarterly tracking. Considers exemptions for new companies (first 3 years).",
      icon: Briefcase,
      category: "Tax",
      href: "/calculators/business-levy",
      ctaText: "View Page",
      calculatorIdentifier: "Business Levy (Full Page)",
    },
    {
      name: "Green Fund Levy (Full Page)",
      description: "Calculate Green Fund Levy with options for annual, quarterly, or monthly income input and quarterly tracking.",
      icon: Leaf,
      category: "Tax",
      href: "/calculators/green-fund-levy",
      ctaText: "View Page",
      calculatorIdentifier: "Green Fund Levy (Full Page)",
    },
    {
      name: "Payroll Calculator (Full Page)",
      description: "Full payroll processing including PAYE, NIS, Health Surcharge, overtime, and other earnings/deductions.",
      icon: UsersIcon,
      category: "Payroll & HR",
      href: "/calculators/payroll",
      ctaText: "View Page",
      calculatorIdentifier: "Payroll Calculator (Full Page)",
    },
    {
      name: "Time Calculator (Full Page)",
      description: "Includes basic time duration/pay and advanced daily pay calculations with breaks and overtime.",
      icon: Clock,
      category: "Payroll & HR",
      href: "/calculators/time-calculator",
      ctaText: "View Page",
      calculatorIdentifier: "Time Calculator (Full Page)",
    }
];
