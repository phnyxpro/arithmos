// src/app/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  ShieldCheck,
  Smartphone,
  Calculator as CalculatorIcon,
  ArrowRight,
  CalendarDays,
  BookOpen,
  Bell,
  FileHeart,
  Banknote,
  Leaf,
  Building,
  User,
  House as HomeIcon,
  ReceiptText,
  Linkedin,
  Facebook,
  Download,
  Mail,
  CalendarPlus,
  Percent,
  Cigarette,
  AlarmClock,
  Gift,
  Plane,
  Landmark,
  PiggyBank,
  Coins,
  PercentCircle,
  Target,
  LineChart,
  AreaChart,
  TrendingDown,
  Ship,
  Truck,
  FileBox,
  Stamp,
  Building2,
  ShieldAlert,
  Network,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { BasicTimeCalculator } from '@/components/calculators/BasicTimeCalculator';
import { SimplifiedPayrollCalculator } from '@/components/calculators/SimplifiedPayrollCalculator';
import { SimplifiedLevyCalculator } from '@/components/calculators/SimplifiedLevyCalculator';
import { VoluntaryNisCalculator } from '@/components/calculators/VoluntaryNisCalculator';
import { SimpleVatCalculator } from '@/components/calculators/SimpleVatCalculator';
import { StarReviewDialog } from '@/components/ui/star-review-dialog';
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';

// Import new placeholder calculator components
import { ExciseDutyCalculator } from '@/components/calculators/ExciseDutyCalculator';
import { GrossToNetSalaryCalculator } from '@/components/calculators/GrossToNetSalaryCalculator';
import { OvertimePayCalculator } from '@/components/calculators/OvertimePayCalculator';
import { BonusCommissionCalculator } from '@/components/calculators/BonusCommissionCalculator';
import { VacationPayCalculator } from '@/components/calculators/VacationPayCalculator';
import { LoanAmortisationCalculator } from '@/components/calculators/LoanAmortisationCalculator';
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator';
import { SavingsInvestmentCalculator } from '@/components/calculators/SavingsInvestmentCalculator';
import { CurrencyExchangeCalculator } from '@/components/calculators/CurrencyExchangeCalculator';
import { SimpleInterestCalculator } from '@/components/calculators/SimpleInterestCalculator';
import { MarkupMarginCalculator } from '@/components/calculators/MarkupMarginCalculator';
import { BreakEvenCalculator } from '@/components/calculators/BreakEvenCalculator';
import { CashFlowProjectionCalculator } from '@/components/calculators/CashFlowProjectionCalculator';
import { DepreciationCalculator } from '@/components/calculators/DepreciationCalculator';
import { TariffCustomsDutyCalculator } from '@/components/calculators/TariffCustomsDutyCalculator';
import { FreightShippingCalculator } from '@/components/calculators/FreightShippingCalculator';
import { CIFCalculator } from '@/components/calculators/CIFCalculator';
import { StampDutyCalculator } from '@/components/calculators/StampDutyCalculator';
import { PropertyTaxDialogCalculator } from '@/components/calculators/PropertyTaxDialogCalculator';
import { RentalYieldCalculator } from '@/components/calculators/RentalYieldCalculator';
import { AMLRiskCalculator } from '@/components/calculators/AMLRiskCalculator';
import { FATCACRSCalculator } from '@/components/calculators/FATCACRSCalculator';


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

interface CalculatorCardData {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  onClick?: () => void;
  calculatorIdentifier: string;
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
  { id: "paye", name: "PAYE Monthly Remittance", description: "Remittance of PAYE deducted from employees for the previous month.", nextDueDate: "2025-06-15", periodicity: "Monthly", status: "Upcoming" },
  { id: "vat", name: "VAT Return & Payment", description: "For tax period May-Jun 2025.", nextDueDate: "2025-07-25", periodicity: "Bi-Monthly", status: "Upcoming" },
  { id: "levies", name: "Business & Green Fund Levy (Q2)", description: "Second quarterly installment for 2025.", nextDueDate: "2025-06-30", periodicity: "Quarterly", status: "Upcoming" },
  { id: "corp-tax-return", name: "Corporation Tax Return", description: "For income year 2024.", nextDueDate: "2025-04-30", periodicity: "Annually", status: "Upcoming" },
  { id: "corp-tax-install", name: "Corporation Tax Installment (Q3)", description: "Third quarterly installment for 2025.", nextDueDate: "2025-09-30", periodicity: "Quarterly", status: "Upcoming" },
  { id: "income-tax-return", name: "Individual Income Tax Return", description: "For income year 2024.", nextDueDate: "2025-04-30", periodicity: "Annually", status: "Upcoming" },
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

export default function LandingPage() {
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

  // State for new calculators
  const [isExciseDutyCalcOpen, setIsExciseDutyCalcOpen] = React.useState(false);
  const [exciseDutyCalcKey, setExciseDutyCalcKey] = React.useState(0);
  const [isGrossToNetCalcOpen, setIsGrossToNetCalcOpen] = React.useState(false);
  const [grossToNetCalcKey, setGrossToNetCalcKey] = React.useState(0);
  const [isOvertimePayCalcOpen, setIsOvertimePayCalcOpen] = React.useState(false);
  const [overtimePayCalcKey, setOvertimePayCalcKey] = React.useState(0);
  const [isBonusCommCalcOpen, setIsBonusCommCalcOpen] = React.useState(false);
  const [bonusCommCalcKey, setBonusCommCalcKey] = React.useState(0);
  const [isVacationPayCalcOpen, setIsVacationPayCalcOpen] = React.useState(false);
  const [vacationPayCalcKey, setVacationPayCalcKey] = React.useState(0);
  const [isLoanAmortCalcOpen, setIsLoanAmortCalcOpen] = React.useState(false);
  const [loanAmortCalcKey, setLoanAmortCalcKey] = React.useState(0);
  const [isMortgageCalcOpen, setIsMortgageCalcOpen] = React.useState(false);
  const [mortgageCalcKey, setMortgageCalcKey] = React.useState(0);
  const [isSavingsInvestCalcOpen, setIsSavingsInvestCalcOpen] = React.useState(false);
  const [savingsInvestCalcKey, setSavingsInvestCalcKey] = React.useState(0);
  const [isCurrencyExCalcOpen, setIsCurrencyExCalcOpen] = React.useState(false);
  const [currencyExCalcKey, setCurrencyExCalcKey] = React.useState(0);
  const [isSimpleInterestCalcOpen, setIsSimpleInterestCalcOpen] = React.useState(false);
  const [simpleInterestCalcKey, setSimpleInterestCalcKey] = React.useState(0);
  const [isMarkupMarginCalcOpen, setIsMarkupMarginCalcOpen] = React.useState(false);
  const [markupMarginCalcKey, setMarkupMarginCalcKey] = React.useState(0);
  const [isBreakEvenCalcOpen, setIsBreakEvenCalcOpen] = React.useState(false);
  const [breakEvenCalcKey, setBreakEvenCalcKey] = React.useState(0);
  const [isCashFlowProjCalcOpen, setIsCashFlowProjCalcOpen] = React.useState(false);
  const [cashFlowProjCalcKey, setCashFlowProjCalcKey] = React.useState(0);
  const [isDepreciationCalcOpen, setIsDepreciationCalcOpen] = React.useState(false);
  const [depreciationCalcKey, setDepreciationCalcKey] = React.useState(0);
  const [isTariffDutyCalcOpen, setIsTariffDutyCalcOpen] = React.useState(false);
  const [tariffDutyCalcKey, setTariffDutyCalcKey] = React.useState(0);
  const [isFreightShipCalcOpen, setIsFreightShipCalcOpen] = React.useState(false);
  const [freightShipCalcKey, setFreightShipCalcKey] = React.useState(0);
  const [isCIFCalcOpen, setIsCIFCalcOpen] = React.useState(false);
  const [cifCalcKey, setCIFCalcKey] = React.useState(0);
  const [isStampDutyCalcOpen, setIsStampDutyCalcOpen] = React.useState(false);
  const [stampDutyCalcKey, setStampDutyCalcKey] = React.useState(0);
  const [isPropertyTaxDialogCalcOpen, setIsPropertyTaxDialogCalcOpen] = React.useState(false);
  const [propertyTaxDialogCalcKey, setPropertyTaxDialogCalcKey] = React.useState(0);
  const [isRentalYieldCalcOpen, setIsRentalYieldCalcOpen] = React.useState(false);
  const [rentalYieldCalcKey, setRentalYieldCalcKey] = React.useState(0);
  const [isAMLRiskCalcOpen, setIsAMLRiskCalcOpen] = React.useState(false);
  const [amlRiskCalcKey, setAMLRiskCalcKey] = React.useState(0);
  const [isFATCACRSCalcOpen, setIsFATCACRSCalcOpen] = React.useState(false);
  const [fatcaCRSCalcKey, setFATCACRSCalcKey] = React.useState(0);


  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [calculatorToReview, setCalculatorToReview] = React.useState<string | null>(null);

  const { toast } = useToast();

  const openCalculatorDialog = (
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setKey?: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (setKey) {
      setKey(prevKey => prevKey + 1);
    }
    setIsOpen(true);
  };

  const handleCalculatorDialogClose = (
    calculatorName: string,
    currentOpenState: boolean,
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const wasOpen = (
        (calculatorName === "Basic Time Calculator" && isBasicTimeCalcOpen) ||
        (calculatorName === "PAYE, NIS & HS Calculator" && isPayrollCalcOpen) ||
        (calculatorName === "Voluntary NIS Contribution Calculator" && isVoluntaryNisCalcOpen) ||
        (calculatorName === "Levy Calculator" && isLevyCalcOpen) ||
        (calculatorName === "Simple VAT Calculator" && isSimpleVatCalcOpen) ||
        (calculatorName === "Excise Duty Calculator" && isExciseDutyCalcOpen) ||
        (calculatorName === "Gross to Net Salary Calculator" && isGrossToNetCalcOpen) ||
        (calculatorName === "Overtime Pay Calculator" && isOvertimePayCalcOpen) ||
        (calculatorName === "Bonus & Commission Calculator" && isBonusCommCalcOpen) ||
        (calculatorName === "Vacation Pay Calculator" && isVacationPayCalcOpen) ||
        (calculatorName === "Loan Interest & Amortisation Calculator" && isLoanAmortCalcOpen) ||
        (calculatorName === "Mortgage Calculator" && isMortgageCalcOpen) ||
        (calculatorName === "Savings & Investment Calculator" && isSavingsInvestCalcOpen) ||
        (calculatorName === "Currency Exchange Calculator" && isCurrencyExCalcOpen) ||
        (calculatorName === "Simple Interest Calculator" && isSimpleInterestCalcOpen) ||
        (calculatorName === "Markup & Margin Calculator" && isMarkupMarginCalcOpen) ||
        (calculatorName === "Break-even Analysis Calculator" && isBreakEvenCalcOpen) ||
        (calculatorName === "Cash Flow Projection Calculator" && isCashFlowProjCalcOpen) ||
        (calculatorName === "Depreciation Calculator" && isDepreciationCalcOpen) ||
        (calculatorName === "Tariff & Customs Duty Calculator" && isTariffDutyCalcOpen) ||
        (calculatorName === "Freight & Shipping Cost Calculator" && isFreightShipCalcOpen) ||
        (calculatorName === "Cost, Insurance, and Freight (CIF) Calculator" && isCIFCalcOpen) ||
        (calculatorName === "Stamp Duty Calculator" && isStampDutyCalcOpen) ||
        (calculatorName === "Property Tax Calculator" && isPropertyTaxDialogCalcOpen) ||
        (calculatorName === "Rental Yield Calculator" && isRentalYieldCalcOpen) ||
        (calculatorName === "AML Compliance Risk Assessment Calculator" && isAMLRiskCalcOpen) ||
        (calculatorName === "FATCA & CRS Compliance Calculator" && isFATCACRSCalcOpen)
    );

    if (wasOpen && !currentOpenState) {
        setCalculatorToReview(calculatorName);
        setIsReviewModalOpen(true);
    }
    setOpenState(currentOpenState);
  };


  const coreCalculators: CalculatorCardData[] = [
    {
      icon: Clock,
      title: "Basic Time Calculator",
      description: "For daily-paid workers to track work hours & pay.",
      ctaText: "Track Hours & Earnings",
      onClick: () => openCalculatorDialog(setIsBasicTimeCalcOpen, setBasicTimeCalcKey),
      calculatorIdentifier: "Basic Time Calculator",
    },
    {
      icon: UsersIcon,
      title: "PAYE, NIS & HS Calculator",
      description: "Determine monthly statutory deductions live.",
      ctaText: "Estimate Deductions",
      onClick: () => openCalculatorDialog(setIsPayrollCalcOpen, setPayrollCalcKey),
      calculatorIdentifier: "PAYE, NIS & HS Calculator",
    },
     {
      icon: Percent,
      title: "Simple VAT Calculator",
      description: "Quickly add or remove 12.5% VAT from a price.",
      ctaText: "Calculate VAT",
      onClick: () => openCalculatorDialog(setIsSimpleVatCalcOpen, setSimpleVatCalcKey),
      calculatorIdentifier: "Simple VAT Calculator",
    },
    {
      icon: FileHeart,
      title: "Voluntary NIS Contribution",
      description: "Estimate your NIS contributions as a self-employed individual.",
      ctaText: "Estimate Voluntary NIS",
      onClick: () => openCalculatorDialog(setIsVoluntaryNisCalcOpen, setVoluntaryNisCalcKey),
      calculatorIdentifier: "Voluntary NIS Contribution Calculator",
    },
    {
      icon: Banknote,
      title: "Levy Calculator",
      description: "Estimate Business Levy and Green Fund Levy from gross income.",
      ctaText: "Estimate Levies",
      onClick: () => openCalculatorDialog(setIsLevyCalcOpen, setLevyCalcKey),
      calculatorIdentifier: "Levy Calculator",
    },
    {
      icon: Cigarette,
      title: "Excise Duty Calculator",
      description: "Compute excise duties on specific imports like alcohol, tobacco, and fuels.",
      ctaText: "Calculate Excise Duty",
      onClick: () => openCalculatorDialog(setIsExciseDutyCalcOpen, setExciseDutyCalcKey),
      calculatorIdentifier: "Excise Duty Calculator",
    },
    {
      icon: TrendingDown, 
      title: "Gross to Net Salary Calculator",
      description: "Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.",
      ctaText: "Calculate Net Salary",
      onClick: () => openCalculatorDialog(setIsGrossToNetCalcOpen, setGrossToNetCalcKey),
      calculatorIdentifier: "Gross to Net Salary Calculator",
    },
    {
      icon: AlarmClock,
      title: "Overtime Pay Calculator",
      description: "Compute overtime pay accurately for hourly paid workers.",
      ctaText: "Calculate Overtime",
      onClick: () => openCalculatorDialog(setIsOvertimePayCalcOpen, setOvertimePayCalcKey),
      calculatorIdentifier: "Overtime Pay Calculator",
    },
    {
      icon: Gift,
      title: "Bonus & Commission Calculator",
      description: "Determine tax impacts of bonuses or commissions.",
      ctaText: "Assess Tax Impact",
      onClick: () => openCalculatorDialog(setIsBonusCommCalcOpen, setBonusCommCalcKey),
      calculatorIdentifier: "Bonus & Commission Calculator",
    },
    {
      icon: Plane,
      title: "Vacation Pay Calculator",
      description: "Easily estimate accrued vacation pay entitlements.",
      ctaText: "Estimate Vacation Pay",
      onClick: () => openCalculatorDialog(setIsVacationPayCalcOpen, setVacationPayCalcKey),
      calculatorIdentifier: "Vacation Pay Calculator",
    },
    {
      icon: Landmark,
      title: "Loan Interest & Amortisation Calculator",
      description: "Calculate loan repayments (monthly, quarterly, annually).",
      ctaText: "View Amortisation",
      onClick: () => openCalculatorDialog(setIsLoanAmortCalcOpen, setLoanAmortCalcKey),
      calculatorIdentifier: "Loan Interest & Amortisation Calculator",
    },
    {
      icon: HomeIcon,
      title: "Mortgage Calculator",
      description: "Calculate mortgage repayments, including down payments and interest.",
      ctaText: "Estimate Mortgage",
      onClick: () => openCalculatorDialog(setIsMortgageCalcOpen, setMortgageCalcKey),
      calculatorIdentifier: "Mortgage Calculator",
    },
    {
      icon: PiggyBank,
      title: "Savings & Investment Calculator",
      description: "Project returns from savings accounts, fixed deposits, and investment products.",
      ctaText: "Project Returns",
      onClick: () => openCalculatorDialog(setIsSavingsInvestCalcOpen, setSavingsInvestCalcKey),
      calculatorIdentifier: "Savings & Investment Calculator",
    },
    {
      icon: Coins,
      title: "Currency Exchange Calculator",
      description: "Real-time currency conversion for international transactions.",
      ctaText: "Convert Currency",
      onClick: () => openCalculatorDialog(setIsCurrencyExCalcOpen, setCurrencyExCalcKey),
      calculatorIdentifier: "Currency Exchange Calculator",
    },
    {
      icon: PercentCircle,
      title: "Simple Interest Calculator",
      description: "Quickly calculate simple interest amounts for short-term loans or deposits.",
      ctaText: "Calculate Interest",
      onClick: () => openCalculatorDialog(setIsSimpleInterestCalcOpen, setSimpleInterestCalcKey),
      calculatorIdentifier: "Simple Interest Calculator",
    },
    {
      icon: Target,
      title: "Markup & Margin Calculator",
      description: "Accurately determine product/service pricing and profit margins.",
      ctaText: "Calculate Pricing",
      onClick: () => openCalculatorDialog(setIsMarkupMarginCalcOpen, setMarkupMarginCalcKey),
      calculatorIdentifier: "Markup & Margin Calculator",
    },
    {
      icon: LineChart,
      title: "Break-even Analysis Calculator",
      description: "Determine sales needed to cover fixed and variable expenses.",
      ctaText: "Analyze Break-even",
      onClick: () => openCalculatorDialog(setIsBreakEvenCalcOpen, setBreakEvenCalcKey),
      calculatorIdentifier: "Break-even Analysis Calculator",
    },
    {
      icon: AreaChart,
      title: "Cash Flow Projection Calculator",
      description: "Forecast monthly or quarterly cash flows easily.",
      ctaText: "Project Cash Flow",
      onClick: () => openCalculatorDialog(setIsCashFlowProjCalcOpen, setCashFlowProjCalcKey),
      calculatorIdentifier: "Cash Flow Projection Calculator",
    },
    {
      icon: TrendingDown,
      title: "Depreciation Calculator",
      description: "Calculate depreciation using methods (Straight Line, Reducing Balance) according to tax rules.",
      ctaText: "Calculate Depreciation",
      onClick: () => openCalculatorDialog(setIsDepreciationCalcOpen, setDepreciationCalcKey),
      calculatorIdentifier: "Depreciation Calculator",
    },
    {
      icon: Ship,
      title: "Tariff & Customs Duty Calculator",
      description: "Quickly calculate import duties based on HS codes and tariff schedules.",
      ctaText: "Calculate Duties",
      onClick: () => openCalculatorDialog(setIsTariffDutyCalcOpen, setTariffDutyCalcKey),
      calculatorIdentifier: "Tariff & Customs Duty Calculator",
    },
    {
      icon: Truck,
      title: "Freight & Shipping Cost Calculator",
      description: "Estimate total landed costs, including shipping, insurance, and duties.",
      ctaText: "Estimate Landed Costs",
      onClick: () => openCalculatorDialog(setIsFreightShipCalcOpen, setFreightShipCalcKey),
      calculatorIdentifier: "Freight & Shipping Cost Calculator",
    },
    {
      icon: FileBox,
      title: "Cost, Insurance, and Freight (CIF) Calculator",
      description: "Compute total import costs for accurate pricing and profit analysis.",
      ctaText: "Calculate CIF",
      onClick: () => openCalculatorDialog(setIsCIFCalcOpen, setCIFCalcKey),
      calculatorIdentifier: "Cost, Insurance, and Freight (CIF) Calculator",
    },
    {
      icon: Stamp,
      title: "Stamp Duty Calculator",
      description: "Determine stamp duty payable on property transfers.",
      ctaText: "Calculate Stamp Duty",
      onClick: () => openCalculatorDialog(setIsStampDutyCalcOpen, setStampDutyCalcKey),
      calculatorIdentifier: "Stamp Duty Calculator",
    },
    {
      icon: HomeIcon,
      title: "Property Tax Calculator",
      description: "Estimate annual property tax obligations.",
      ctaText: "Estimate Property Tax",
      onClick: () => openCalculatorDialog(setIsPropertyTaxDialogCalcOpen, setPropertyTaxDialogCalcKey),
      calculatorIdentifier: "Property Tax Calculator",
    },
    {
      icon: Building2,
      title: "Rental Yield Calculator",
      description: "Calculate returns on rental property investments.",
      ctaText: "Calculate Yield",
      onClick: () => openCalculatorDialog(setIsRentalYieldCalcOpen, setRentalYieldCalcKey),
      calculatorIdentifier: "Rental Yield Calculator",
    },
    {
      icon: ShieldAlert,
      title: "AML Compliance Risk Assessment Calculator",
      description: "Quickly determine the Anti-Money Laundering (AML) risk of transactions.",
      ctaText: "Assess AML Risk",
      onClick: () => openCalculatorDialog(setIsAMLRiskCalcOpen, setAMLRiskCalcKey),
      calculatorIdentifier: "AML Compliance Risk Assessment Calculator",
    },
    {
      icon: Network,
      title: "FATCA & CRS Compliance Calculator",
      description: "Assess and report obligations under FATCA & CRS regulations.",
      ctaText: "Assess FATCA/CRS",
      onClick: () => openCalculatorDialog(setIsFATCACRSCalcOpen, setFATCACRSCalcKey),
      calculatorIdentifier: "FATCA & CRS Compliance Calculator",
    },
  ];

  const HeroIcon = heroContentData.icon;

  const detailedCalculatorList: Array<CalculatorCardData & {id: string, name: string}> = [
    { id: "time", name: "Basic Time Calculator", description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.", icon: Clock, onClick: () => openCalculatorDialog(setIsBasicTimeCalcOpen, setBasicTimeCalcKey), ctaText: "Open Calculator", title: "Basic Time Calculator", calculatorIdentifier: "Basic Time Calculator" },
    { id: "paye", name: "PAYE + NIS + HS (Payroll)", description: "Determines monthly statutory deductions for employees, including Pay As You Earn (PAYE) based on 25%/30% tax brackets, National Insurance Scheme (NIS) contributions (5.6% employee), and Health Surcharge based on weekly income thresholds.", icon: UsersIcon, onClick: () => openCalculatorDialog(setIsPayrollCalcOpen, setPayrollCalcKey), ctaText: "Open Calculator", title: "PAYE, NIS & HS Calculator", calculatorIdentifier: "PAYE, NIS & HS Calculator" },
    { id: "simple-vat", name: "Simple VAT Calculator", description: "Quickly add or remove 12.5% VAT from a price, specifying if the input is VAT inclusive or exclusive.", icon: Percent, onClick: () => openCalculatorDialog(setIsSimpleVatCalcOpen, setSimpleVatCalcKey), ctaText: "Open Calculator", title: "Simple VAT Calculator", calculatorIdentifier: "Simple VAT Calculator" },
    { id: "voluntary-nis", name: "Voluntary NIS Contribution", description: "Calculates National Insurance Scheme (NIS) contributions for self-employed persons based on their declared monthly earnings and official NIBTT earnings classes.", icon: FileHeart, onClick: () => openCalculatorDialog(setIsVoluntaryNisCalcOpen, setVoluntaryNisCalcKey), ctaText: "Open Calculator", title: "Voluntary NIS Contribution", calculatorIdentifier: "Voluntary NIS Contribution Calculator" },
    { id: "levy-dialog", name: "Levy Calculator", description: "Estimate Business Levy and Green Fund Levy from gross income, with options for monthly, quarterly, or annual income input. Displayed in a quick dialog.", icon: Banknote, onClick: () => openCalculatorDialog(setIsLevyCalcOpen, setLevyCalcKey), ctaText: "Open Calculator", title: "Levy Calculator", calculatorIdentifier: "Levy Calculator" },
    { id: "excise-duty", name: "Excise Duty Calculator", description: "Compute excise duties on specific imports like alcohol, tobacco, and fuels.", icon: Cigarette, onClick: () => openCalculatorDialog(setIsExciseDutyCalcOpen, setExciseDutyCalcKey), ctaText: "Open Calculator", title: "Excise Duty Calculator", calculatorIdentifier: "Excise Duty Calculator" },
    { id: "gross-to-net", name: "Gross to Net Salary Calculator", description: "Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.", icon: TrendingDown, onClick: () => openCalculatorDialog(setIsGrossToNetCalcOpen, setGrossToNetCalcKey), ctaText: "Open Calculator", title: "Gross to Net Salary Calculator", calculatorIdentifier: "Gross to Net Salary Calculator" },
    { id: "overtime-pay", name: "Overtime Pay Calculator", description: "Compute overtime pay accurately for hourly paid workers.", icon: AlarmClock, onClick: () => openCalculatorDialog(setIsOvertimePayCalcOpen, setOvertimePayCalcKey), ctaText: "Open Calculator", title: "Overtime Pay Calculator", calculatorIdentifier: "Overtime Pay Calculator" },
    { id: "bonus-commission", name: "Bonus & Commission Calculator", description: "Determine tax impacts of bonuses or commissions.", icon: Gift, onClick: () => openCalculatorDialog(setIsBonusCommCalcOpen, setBonusCommCalcKey), ctaText: "Open Calculator", title: "Bonus & Commission Calculator", calculatorIdentifier: "Bonus & Commission Calculator" },
    { id: "vacation-pay", name: "Vacation Pay Calculator", description: "Easily estimate accrued vacation pay entitlements.", icon: Plane, onClick: () => openCalculatorDialog(setIsVacationPayCalcOpen, setVacationPayCalcKey), ctaText: "Open Calculator", title: "Vacation Pay Calculator", calculatorIdentifier: "Vacation Pay Calculator" },
    { id: "loan-amort", name: "Loan Interest & Amortisation Calculator", description: "Calculate loan repayments (monthly, quarterly, annually).", icon: Landmark, onClick: () => openCalculatorDialog(setIsLoanAmortCalcOpen, setLoanAmortCalcKey), ctaText: "Open Calculator", title: "Loan Interest & Amortisation Calculator", calculatorIdentifier: "Loan Interest & Amortisation Calculator" },
    { id: "mortgage", name: "Mortgage Calculator", description: "Calculate mortgage repayments, including down payments and interest.", icon: HomeIcon, onClick: () => openCalculatorDialog(setIsMortgageCalcOpen, setMortgageCalcKey), ctaText: "Open Calculator", title: "Mortgage Calculator", calculatorIdentifier: "Mortgage Calculator" },
    { id: "savings-invest", name: "Savings & Investment Calculator", description: "Project returns from savings accounts, fixed deposits, and investment products.", icon: PiggyBank, onClick: () => openCalculatorDialog(setIsSavingsInvestCalcOpen, setSavingsInvestCalcKey), ctaText: "Open Calculator", title: "Savings & Investment Calculator", calculatorIdentifier: "Savings & Investment Calculator" },
    { id: "currency-ex", name: "Currency Exchange Calculator", description: "Real-time currency conversion for international transactions.", icon: Coins, onClick: () => openCalculatorDialog(setIsCurrencyExCalcOpen, setCurrencyExCalcKey), ctaText: "Open Calculator", title: "Currency Exchange Calculator", calculatorIdentifier: "Currency Exchange Calculator" },
    { id: "simple-interest", name: "Simple Interest Calculator", description: "Quickly calculate simple interest amounts for short-term loans or deposits.", icon: PercentCircle, onClick: () => openCalculatorDialog(setIsSimpleInterestCalcOpen, setSimpleInterestCalcKey), ctaText: "Open Calculator", title: "Simple Interest Calculator", calculatorIdentifier: "Simple Interest Calculator" },
    { id: "markup-margin", name: "Markup & Margin Calculator", description: "Accurately determine product/service pricing and profit margins.", icon: Target, onClick: () => openCalculatorDialog(setIsMarkupMarginCalcOpen, setMarkupMarginCalcKey), ctaText: "Open Calculator", title: "Markup & Margin Calculator", calculatorIdentifier: "Markup & Margin Calculator" },
    { id: "break-even", name: "Break-even Analysis Calculator", description: "Determine sales needed to cover fixed and variable expenses.", icon: LineChart, onClick: () => openCalculatorDialog(setIsBreakEvenCalcOpen, setBreakEvenCalcKey), ctaText: "Open Calculator", title: "Break-even Analysis Calculator", calculatorIdentifier: "Break-even Analysis Calculator" },
    { id: "cash-flow-proj", name: "Cash Flow Projection Calculator", description: "Forecast monthly or quarterly cash flows easily.", icon: AreaChart, onClick: () => openCalculatorDialog(setIsCashFlowProjCalcOpen, setCashFlowProjCalcKey), ctaText: "Open Calculator", title: "Cash Flow Projection Calculator", calculatorIdentifier: "Cash Flow Projection Calculator" },
    { id: "depreciation", name: "Depreciation Calculator", description: "Calculate depreciation using methods (Straight Line, Reducing Balance) according to tax rules.", icon: TrendingDown, onClick: () => openCalculatorDialog(setIsDepreciationCalcOpen, setDepreciationCalcKey), ctaText: "Open Calculator", title: "Depreciation Calculator", calculatorIdentifier: "Depreciation Calculator" },
    { id: "tariff-duty", name: "Tariff & Customs Duty Calculator", description: "Quickly calculate import duties based on HS codes and tariff schedules.", icon: Ship, onClick: () => openCalculatorDialog(setIsTariffDutyCalcOpen, setTariffDutyCalcKey), ctaText: "Open Calculator", title: "Tariff & Customs Duty Calculator", calculatorIdentifier: "Tariff & Customs Duty Calculator" },
    { id: "freight-ship", name: "Freight & Shipping Cost Calculator", description: "Estimate total landed costs, including shipping, insurance, and duties.", icon: Truck, onClick: () => openCalculatorDialog(setIsFreightShipCalcOpen, setFreightShipCalcKey), ctaText: "Open Calculator", title: "Freight & Shipping Cost Calculator", calculatorIdentifier: "Freight & Shipping Cost Calculator" },
    { id: "cif-calc", name: "Cost, Insurance, and Freight (CIF) Calculator", description: "Compute total import costs for accurate pricing and profit analysis.", icon: FileBox, onClick: () => openCalculatorDialog(setIsCIFCalcOpen, setCIFCalcKey), ctaText: "Open Calculator", title: "Cost, Insurance, and Freight (CIF) Calculator", calculatorIdentifier: "Cost, Insurance, and Freight (CIF) Calculator" },
    { id: "stamp-duty", name: "Stamp Duty Calculator", description: "Determine stamp duty payable on property transfers.", icon: Stamp, onClick: () => openCalculatorDialog(setIsStampDutyCalcOpen, setStampDutyCalcKey), ctaText: "Open Calculator", title: "Stamp Duty Calculator", calculatorIdentifier: "Stamp Duty Calculator" },
    { id: "prop-tax-dialog", name: "Property Tax Calculator", description: "Estimate annual property tax obligations.", icon: HomeIcon, onClick: () => openCalculatorDialog(setIsPropertyTaxDialogCalcOpen, setPropertyTaxDialogCalcKey), ctaText: "Open Calculator", title: "Property Tax Calculator", calculatorIdentifier: "Property Tax Calculator" },
    { id: "rental-yield", name: "Rental Yield Calculator", description: "Calculate returns on rental property investments.", icon: Building2, onClick: () => openCalculatorDialog(setIsRentalYieldCalcOpen, setRentalYieldCalcKey), ctaText: "Open Calculator", title: "Rental Yield Calculator", calculatorIdentifier: "Rental Yield Calculator" },
    { id: "aml-risk", name: "AML Compliance Risk Assessment Calculator", description: "Quickly determine the Anti-Money Laundering (AML) risk of transactions.", icon: ShieldAlert, onClick: () => openCalculatorDialog(setIsAMLRiskCalcOpen, setAMLRiskCalcKey), ctaText: "Open Calculator", title: "AML Compliance Risk Assessment Calculator", calculatorIdentifier: "AML Compliance Risk Assessment Calculator" },
    { id: "fatca-crs", name: "FATCA & CRS Compliance Calculator", description: "Assess and report obligations under FATCA & CRS regulations.", icon: Network, onClick: () => openCalculatorDialog(setIsFATCACRSCalcOpen, setFATCACRSCalcKey), ctaText: "Open Calculator", title: "FATCA & CRS Compliance Calculator", calculatorIdentifier: "FATCA & CRS Compliance Calculator" },

    { id: "business-levy-page", name: "Business Levy (Full Page)", description: "Detailed Business Levy calculation with quarterly tracking. Considers exemptions for new companies (first 3 years).", icon: Banknote, href: "/calculators/business-levy", ctaText: "View Page", title: "Business Levy (Full Page)", calculatorIdentifier: "Business Levy (Full Page)" },
    { id: "green-fund", name: "Green Fund Levy (Full Page)", description: "Detailed Green Fund Levy calculation with quarterly tracking. Applies at 0.3% of total annualized gross sales.", icon: Leaf, href: "/calculators/green-fund-levy", ctaText: "View Page", title: "Green Fund Levy (Full Page)", calculatorIdentifier: "Green Fund Levy (Full Page)" },
    { id: "corp-tax", name: "Corporation Tax Calculator", description: "Estimates Corporation Tax liability based on chargeable profits, considering allowable deductions, other income, loss carried forward, and tax credits.", icon: Building, href: "/calculators/corporation-tax", ctaText: "View Page", title: "Corporation Tax Calculator", calculatorIdentifier: "Corporation Tax Calculator" },
    { id: "income-tax", name: "Income Tax (Personal)", description: "Calculates personal income tax (PAYE), NIS, and Health Surcharge based on gross annual income and allowable deductions, applying the TT$90,000 personal allowance and relevant tax brackets.", icon: User, href: "/calculators/income-tax", ctaText: "View Page", title: "Income Tax (Personal)", calculatorIdentifier: "Income Tax (Personal)" },
    { id: "property-tax-page", name: "Property Tax Estimator (Full Page)", description: "Provides a conceptual estimate of property tax based on Annual Rental Value (ARV) and property type, using simplified rates (e.g., 3% for residential after a 10% ARV deduction).", icon: HomeIcon, href: "/calculators/property-tax", ctaText: "View Page", title: "Property Tax Estimator (Full Page)", calculatorIdentifier: "Property Tax Estimator (Full Page)" },
    { id: "vat-calc-page", name: "VAT Calculator (Full Page)", description: "Calculates Value Added Tax (12.5%) on prices, allowing for input of price excluding or including VAT. Also includes a VAT registration eligibility checker.", icon: ReceiptText, href: "/calculators/vat", ctaText: "View Page", title: "VAT Calculator (Full Page)", calculatorIdentifier: "VAT Calculator (Full Page)" },
  ];


  const firstHalfCalculators = detailedCalculatorList.slice(0, Math.ceil(detailedCalculatorList.length / 2));
  const secondHalfCalculators = detailedCalculatorList.slice(Math.ceil(detailedCalculatorList.length / 2));

  const handleAddToCalendar = React.useCallback((deadline: DeadlineItem, type: 'google' | 'outlook' | 'ics') => {
    const eventDate = parseISO(deadline.nextDueDate);
    if (isNaN(eventDate.getTime())) {
      toast({
        title: "Invalid Date",
        description: `Cannot set a reminder for "${deadline.name}" due to an invalid date.`,
        variant: "destructive",
      });
      return;
    }
     if (eventDate < new Date(new Date().setHours(0,0,0,0)) && deadline.status !== "Completed") {
      toast({
        title: "Past Due Date",
        description: `Cannot set a reminder for "${deadline.name}" as the date is in the past.`,
        variant: "default",
      });
      return;
    }

    const eventTitle = `Tax TT Reminder: ${deadline.name}`;
    const eventDescription = `Deadline for ${deadline.name} - ${deadline.description}. Periodicity: ${deadline.periodicity}. Remember to verify with official IRD sources.`;
    
    const googleStartDate = format(eventDate, "yyyyMMdd");
    const googleEndDate = format(addDays(eventDate, 1), "yyyyMMdd");

    if (type === 'google') {
      const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${googleStartDate}/${googleEndDate}&details=${encodeURIComponent(eventDescription)}`;
      window.open(googleUrl, '_blank');
      toast({ title: "Opening Google Calendar", description: `Adding reminder for "${deadline.name}".` });
    } else if (type === 'outlook') {
      const outlookAllDayStartDate = format(eventDate, "yyyy-MM-dd");
      const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?rru=addevent&path=/calendar/action/compose&subject=${encodeURIComponent(eventTitle)}&startdt=${outlookAllDayStartDate}&enddt=${outlookAllDayStartDate}&allday=true&body=${encodeURIComponent(eventDescription)}`;
      window.open(outlookUrl, '_blank');
      toast({ title: "Opening Outlook Calendar", description: `Adding reminder for "${deadline.name}".` });
    } else if (type === 'ics') {
      const startDateStrICS = format(eventDate, "yyyyMMdd");
      const endDateStrICS = format(addDays(eventDate, 1), "yyyyMMdd");

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        `PRODID:-//TaxTT//TaxTT Reminder//EN`,
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@taxtt.com`,
        `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
        `DTSTART;VALUE=DATE:${startDateStrICS}`,
        `DTEND;VALUE=DATE:${endDateStrICS}`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Tax_TT_Reminder_${deadline.name.replace(/[\s&/]+/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast({ title: "ICS File Downloading", description: `Import the file for "${deadline.name}" into your calendar.` });
    }
  }, [toast]);

  const upcomingTickerItems = React.useMemo(() => {
    return deadlineItems
      .filter(item => item.status !== "Completed")
      .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime())
      .slice(0, 5);
  }, []);

  const handleSubmitReview = (calculatorName: string, rating: number) => {
    console.log(`Review for ${calculatorName}: ${rating} stars`);
    toast({
      title: "Thank You!",
      description: `You rated the ${calculatorName} ${rating} star(s).`,
    });
    setCalculatorToReview(null);
  };


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
             <div className="w-full max-w-3xl">
              <div className="flex items-center justify-center mb-6">
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
          </div>
        </div>
      </section>

      {/* Upcoming Compliance Ticker */}
      {upcomingTickerItems.length > 0 && (
        <section id="compliance-ticker" className="py-4 bg-primary">
          <div className="container mx-auto px-4">
            <div className="relative flex overflow-x-hidden">
              <div className="py-2 animate-marquee-scroll whitespace-nowrap flex">
                {[...upcomingTickerItems, ...upcomingTickerItems].map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center mx-4 px-3 py-1.5 bg-card/80 rounded-full shadow">
                    <Bell className="h-4 w-4 text-accent mr-2" />
                    <span className="text-sm font-medium text-card-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1.5">
                      (Due: {format(parseISO(item.nextDueDate), "MMM d")})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Start With Our Most Popular Calculators */}
      <section id="popular-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Start With Our Most Popular Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      {calc.ctaText} <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                  ) : (
                     <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      <Link href={calc.ctaLink || "#"}>{calc.ctaText} <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Explore All Our Calculators */}
      <section id="learn-calculators" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Explore All Our Calculators
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8">
            <Accordion type="single" collapsible className="w-full">
              {firstHalfCalculators.map((calc) => (
                <AccordionItem value={calc.id} key={calc.id}>
                  <AccordionTrigger className="text-lg text-primary/90 hover:text-primary hover:no-underline">
                    <div className="flex items-center">
                      {calc.icon && <calc.icon className="mr-3 h-5 w-5 text-accent flex-shrink-0" />}
                      {calc.name}
                    </div>
                  </AccordionTrigger>
                   <AccordionContent className="text-muted-foreground leading-relaxed">
                    <p className="mb-3">{calc.description}</p>
                    {calc.onClick ? (
                        <Button onClick={calc.onClick} variant="link" className="text-accent p-0 h-auto">
                            {calc.ctaText} <ArrowRight className="ml-1 h-4 w-4"/>
                        </Button>
                    ) : (
                        <Button asChild variant="link" className="text-accent p-0 h-auto">
                            <Link href={calc.ctaLink || "#"}>{calc.ctaText} <ArrowRight className="ml-1 h-4 w-4"/></Link>
                        </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              {secondHalfCalculators.map((calc) => (
                <AccordionItem value={calc.id} key={calc.id}>
                  <AccordionTrigger className="text-lg text-primary/90 hover:text-primary hover:no-underline">
                     <div className="flex items-center">
                      {calc.icon && <calc.icon className="mr-3 h-5 w-5 text-accent flex-shrink-0" />}
                      {calc.name}
                    </div>
                  </AccordionTrigger>
                   <AccordionContent className="text-muted-foreground leading-relaxed">
                    <p className="mb-3">{calc.description}</p>
                     {calc.onClick ? (
                        <Button onClick={calc.onClick} variant="link" className="text-accent p-0 h-auto">
                            {calc.ctaText} <ArrowRight className="ml-1 h-4 w-4"/>
                        </Button>
                    ) : (
                        <Button asChild variant="link" className="text-accent p-0 h-auto">
                            <Link href={calc.ctaLink || "#"}>{calc.ctaText} <ArrowRight className="ml-1 h-4 w-4"/></Link>
                        </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
                   <CardFooter className="pt-4 flex items-center justify-start space-x-1 sm:space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary hover:bg-primary/10"
                      onClick={() => handleAddToCalendar(item, 'google')}
                      disabled={item.status === "Completed"}
                      aria-label="Add to Google Calendar"
                      title="Add to Google Calendar"
                    >
                      <CalendarPlus className="h-4 w-4"/>
                    </Button>
                     <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary hover:bg-primary/10"
                      onClick={() => handleAddToCalendar(item, 'outlook')}
                      disabled={item.status === "Completed"}
                      aria-label="Add to Outlook Calendar"
                      title="Add to Outlook Calendar"
                    >
                      <Mail className="h-4 w-4"/>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary hover:bg-primary/10"
                      onClick={() => handleAddToCalendar(item, 'ics')}
                      disabled={item.status === "Completed"}
                      aria-label="Download ICS File for Apple/Other Calendars"
                      title="Download ICS for Apple/Other"
                    >
                      <Download className="h-4 w-4"/>
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
                  <Button asChild variant="link" className="text-accent p-0 h-auto">
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

      {/* Footer Section */}
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

      {/* Dialogs for existing calculators */}
      <Dialog open={isBasicTimeCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Basic Time Calculator", open, setIsBasicTimeCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Clock className="mr-2 h-6 w-6"/>Basic Time Calculator</DialogTitle>
          </DialogHeader>
          <BasicTimeCalculator key={basicTimeCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isPayrollCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("PAYE, NIS & HS Calculator", open, setIsPayrollCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><UsersIcon className="mr-2 h-6 w-6"/>PAYE, NIS & HS Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedPayrollCalculator key={payrollCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isSimpleVatCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Simple VAT Calculator", open, setIsSimpleVatCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Percent className="mr-2 h-6 w-6"/>Simple VAT Calculator</DialogTitle>
          </DialogHeader>
          <SimpleVatCalculator key={simpleVatCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isLevyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Levy Calculator", open, setIsLevyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Banknote className="mr-2 h-6 w-6"/>Levy Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedLevyCalculator key={levyCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isVoluntaryNisCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Voluntary NIS Contribution Calculator", open, setIsVoluntaryNisCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><FileHeart className="mr-2 h-6 w-6"/>Voluntary NIS Calculator</DialogTitle>
          </DialogHeader>
          <VoluntaryNisCalculator key={voluntaryNisCalcKey} />
        </DialogContent>
      </Dialog>

      {/* Dialogs for new calculators */}
      <Dialog open={isExciseDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Excise Duty Calculator", open, setIsExciseDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Cigarette className="mr-2 h-6 w-6"/>Excise Duty Calculator</DialogTitle></DialogHeader>
          <ExciseDutyCalculator key={exciseDutyCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isGrossToNetCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Gross to Net Salary Calculator", open, setIsGrossToNetCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><TrendingDown className="mr-2 h-6 w-6"/>Gross to Net Salary Calculator</DialogTitle></DialogHeader>
          <GrossToNetSalaryCalculator key={grossToNetCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isOvertimePayCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Overtime Pay Calculator", open, setIsOvertimePayCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><AlarmClock className="mr-2 h-6 w-6"/>Overtime Pay Calculator</DialogTitle></DialogHeader>
          <OvertimePayCalculator key={overtimePayCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isBonusCommCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Bonus & Commission Calculator", open, setIsBonusCommCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Gift className="mr-2 h-6 w-6"/>Bonus & Commission Calculator</DialogTitle></DialogHeader>
          <BonusCommissionCalculator key={bonusCommCalcKey} />
        </DialogContent>
      </Dialog>

       <Dialog open={isVacationPayCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Vacation Pay Calculator", open, setIsVacationPayCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Plane className="mr-2 h-6 w-6"/>Vacation Pay Calculator</DialogTitle></DialogHeader>
          <VacationPayCalculator key={vacationPayCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isLoanAmortCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Loan Interest & Amortisation Calculator", open, setIsLoanAmortCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Landmark className="mr-2 h-6 w-6"/>Loan Interest & Amortisation Calculator</DialogTitle></DialogHeader>
          <LoanAmortisationCalculator key={loanAmortCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isMortgageCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Mortgage Calculator", open, setIsMortgageCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><HomeIcon className="mr-2 h-6 w-6"/>Mortgage Calculator</DialogTitle></DialogHeader>
          <MortgageCalculator key={mortgageCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isSavingsInvestCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Savings & Investment Calculator", open, setIsSavingsInvestCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><PiggyBank className="mr-2 h-6 w-6"/>Savings & Investment Calculator</DialogTitle></DialogHeader>
          <SavingsInvestmentCalculator key={savingsInvestCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCurrencyExCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Currency Exchange Calculator", open, setIsCurrencyExCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Coins className="mr-2 h-6 w-6"/>Currency Exchange Calculator</DialogTitle></DialogHeader>
          <CurrencyExchangeCalculator key={currencyExCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isSimpleInterestCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Simple Interest Calculator", open, setIsSimpleInterestCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><PercentCircle className="mr-2 h-6 w-6"/>Simple Interest Calculator</DialogTitle></DialogHeader>
          <SimpleInterestCalculator key={simpleInterestCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isMarkupMarginCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Markup & Margin Calculator", open, setIsMarkupMarginCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Target className="mr-2 h-6 w-6"/>Markup & Margin Calculator</DialogTitle></DialogHeader>
          <MarkupMarginCalculator key={markupMarginCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isBreakEvenCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Break-even Analysis Calculator", open, setIsBreakEvenCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><LineChart className="mr-2 h-6 w-6"/>Break-even Analysis Calculator</DialogTitle></DialogHeader>
          <BreakEvenCalculator key={breakEvenCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCashFlowProjCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Cash Flow Projection Calculator", open, setIsCashFlowProjCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><AreaChart className="mr-2 h-6 w-6"/>Cash Flow Projection Calculator</DialogTitle></DialogHeader>
          <CashFlowProjectionCalculator key={cashFlowProjCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDepreciationCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Depreciation Calculator", open, setIsDepreciationCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><TrendingDown className="mr-2 h-6 w-6"/>Depreciation Calculator</DialogTitle></DialogHeader>
          <DepreciationCalculator key={depreciationCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isTariffDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Tariff & Customs Duty Calculator", open, setIsTariffDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Ship className="mr-2 h-6 w-6"/>Tariff & Customs Duty Calculator</DialogTitle></DialogHeader>
          <TariffCustomsDutyCalculator key={tariffDutyCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isFreightShipCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Freight & Shipping Cost Calculator", open, setIsFreightShipCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Truck className="mr-2 h-6 w-6"/>Freight & Shipping Cost Calculator</DialogTitle></DialogHeader>
          <FreightShippingCalculator key={freightShipCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCIFCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Cost, Insurance, and Freight (CIF) Calculator", open, setIsCIFCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><FileBox className="mr-2 h-6 w-6"/>Cost, Insurance, and Freight (CIF) Calculator</DialogTitle></DialogHeader>
          <CIFCalculator key={cifCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isStampDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Stamp Duty Calculator", open, setIsStampDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Stamp className="mr-2 h-6 w-6"/>Stamp Duty Calculator</DialogTitle></DialogHeader>
          <StampDutyCalculator key={stampDutyCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isPropertyTaxDialogCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Property Tax Calculator", open, setIsPropertyTaxDialogCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><HomeIcon className="mr-2 h-6 w-6"/>Property Tax Calculator</DialogTitle></DialogHeader>
          <PropertyTaxDialogCalculator key={propertyTaxDialogCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isRentalYieldCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Rental Yield Calculator", open, setIsRentalYieldCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Building2 className="mr-2 h-6 w-6"/>Rental Yield Calculator</DialogTitle></DialogHeader>
          <RentalYieldCalculator key={rentalYieldCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isAMLRiskCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("AML Compliance Risk Assessment Calculator", open, setIsAMLRiskCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><ShieldAlert className="mr-2 h-6 w-6"/>AML Compliance Risk Assessment Calculator</DialogTitle></DialogHeader>
          <AMLRiskCalculator key={amlRiskCalcKey} />
        </DialogContent>
      </Dialog>

      <Dialog open={isFATCACRSCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("FATCA & CRS Compliance Calculator", open, setIsFATCACRSCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Network className="mr-2 h-6 w-6"/>FATCA & CRS Compliance Calculator</DialogTitle></DialogHeader>
          <FATCACRSCalculator key={fatcaCRSCalcKey} />
        </DialogContent>
      </Dialog>


      <StarReviewDialog
        isOpen={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
        calculatorName={calculatorToReview}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}

