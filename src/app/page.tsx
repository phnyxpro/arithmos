
// src/app/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  CalendarDays,
  FileHeart,
  Banknote,
  Leaf,
  Building,
  User,
  House as HomeIcon,
  ReceiptText,
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
  BookOpen,
  ShieldCheck,
  Smartphone,
  Calculator as CalculatorIcon,
  FileText as FileTextIcon,
  ListChecks,
  BarChart3, // Added from a previous request, ensure it's used or remove if not
  CheckCircle2, // Added from a previous request, ensure it's used or remove if not
  ThumbsUp, // Added from a previous request, ensure it's used or remove if not
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
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
  id: string;
  name: string;
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
    let wasOpen = false;
    // This switch needs to be exhaustive for all dialogs you want to trigger reviews for.
    switch (calculatorName) {
      case "Basic Time Calculator": wasOpen = isBasicTimeCalcOpen; break;
      case "PAYE, NIS & HS Calculator": wasOpen = isPayrollCalcOpen; break;
      case "Voluntary NIS Contribution Calculator": wasOpen = isVoluntaryNisCalcOpen; break;
      case "Levy Calculator": wasOpen = isLevyCalcOpen; break;
      case "Simple VAT Calculator": wasOpen = isSimpleVatCalcOpen; break;
      case "Excise Duty Calculator": wasOpen = isExciseDutyCalcOpen; break;
      case "Gross to Net Salary Calculator": wasOpen = isGrossToNetCalcOpen; break;
      case "Overtime Pay Calculator": wasOpen = isOvertimePayCalcOpen; break;
      case "Bonus & Commission Calculator": wasOpen = isBonusCommCalcOpen; break;
      case "Vacation Pay Calculator": wasOpen = isVacationPayCalcOpen; break;
      case "Loan Interest & Amortisation Calculator": wasOpen = isLoanAmortCalcOpen; break;
      case "Mortgage Calculator": wasOpen = isMortgageCalcOpen; break;
      case "Savings & Investment Calculator": wasOpen = isSavingsInvestCalcOpen; break;
      case "Currency Exchange Calculator": wasOpen = isCurrencyExCalcOpen; break;
      case "Simple Interest Calculator": wasOpen = isSimpleInterestCalcOpen; break;
      case "Markup & Margin Calculator": wasOpen = isMarkupMarginCalcOpen; break;
      case "Break-even Analysis Calculator": wasOpen = isBreakEvenCalcOpen; break;
      case "Cash Flow Projection Calculator": wasOpen = isCashFlowProjCalcOpen; break;
      case "Depreciation Calculator": wasOpen = isDepreciationCalcOpen; break;
      case "Tariff & Customs Duty Calculator": wasOpen = isTariffDutyCalcOpen; break;
      case "Freight & Shipping Cost Calculator": wasOpen = isFreightShipCalcOpen; break;
      case "Cost, Insurance, and Freight (CIF) Calculator": wasOpen = isCIFCalcOpen; break;
      case "Stamp Duty Calculator": wasOpen = isStampDutyCalcOpen; break;
      case "Property Tax Calculator": wasOpen = isPropertyTaxDialogCalcOpen; break;
      case "Rental Yield Calculator": wasOpen = isRentalYieldCalcOpen; break;
      case "AML Compliance Risk Assessment Calculator": wasOpen = isAMLRiskCalcOpen; break;
      case "FATCA & CRS Compliance Calculator": wasOpen = isFATCACRSCalcOpen; break;
      default: break;
    }

    if (wasOpen && !currentOpenState) {
      setCalculatorToReview(calculatorName);
      setIsReviewModalOpen(true);
    }
    setOpenState(currentOpenState);
  };

 const detailedCalculatorList: CalculatorCardData[] = [
    { id: "time", name: "Basic Time Calculator", title: "Basic Time Calculator", description: "Calculates total work hours, distinguishes between regular and overtime, and estimates gross pay based on hourly rates and overtime multipliers.", icon: Clock, onClick: () => openCalculatorDialog(setIsBasicTimeCalcOpen, setBasicTimeCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Basic Time Calculator" },
    { id: "paye", name: "PAYE + NIS + HS (Payroll)", title: "PAYE, NIS & HS Calculator", description: "Determines monthly statutory deductions for employees, including Pay As You Earn (PAYE) based on 25%/30% tax brackets, National Insurance Scheme (NIS) contributions (5.6% employee), and Health Surcharge based on weekly income thresholds.", icon: UsersIcon, onClick: () => openCalculatorDialog(setIsPayrollCalcOpen, setPayrollCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "PAYE, NIS & HS Calculator" },
    { id: "voluntary-nis", name: "Voluntary NIS Contribution", title: "Voluntary NIS Contribution", description: "Calculates National Insurance Scheme (NIS) contributions for self-employed persons based on their declared monthly earnings and official NIBTT earnings classes.", icon: FileHeart, onClick: () => openCalculatorDialog(setIsVoluntaryNisCalcOpen, setVoluntaryNisCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Voluntary NIS Contribution Calculator" },
    { id: "levy-dialog", name: "Levy Calculator", title: "Levy Calculator", description: "Estimate Business Levy and Green Fund Levy from gross income, with options for monthly, quarterly, or annual income input. Displayed in a quick dialog.", icon: Banknote, onClick: () => openCalculatorDialog(setIsLevyCalcOpen, setLevyCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Levy Calculator" },
    { id: "simple-vat", name: "Simple VAT Calculator", title: "Simple VAT Calculator", description: "Quickly add or remove 12.5% VAT from a price, specifying if the input is VAT inclusive or exclusive.", icon: Percent, onClick: () => openCalculatorDialog(setIsSimpleVatCalcOpen, setSimpleVatCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Simple VAT Calculator" },
    { id: "excise-duty", name: "Excise Duty Calculator", title: "Excise Duty Calculator", description: "Compute excise duties on specific imports like alcohol, tobacco, and fuels.", icon: Cigarette, onClick: () => openCalculatorDialog(setIsExciseDutyCalcOpen, setExciseDutyCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Excise Duty Calculator" },
    { id: "gross-to-net", name: "Gross to Net Salary Calculator", title: "Gross to Net Salary Calculator", description: "Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.", icon: TrendingDown, onClick: () => openCalculatorDialog(setIsGrossToNetCalcOpen, setGrossToNetCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Gross to Net Salary Calculator" },
    { id: "overtime-pay", name: "Overtime Pay Calculator", title: "Overtime Pay Calculator", description: "Compute overtime pay accurately for hourly paid workers.", icon: AlarmClock, onClick: () => openCalculatorDialog(setIsOvertimePayCalcOpen, setOvertimePayCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Overtime Pay Calculator" },
    { id: "bonus-commission", name: "Bonus & Commission Calculator", title: "Bonus & Commission Calculator", description: "Determine tax impacts of bonuses or commissions.", icon: Gift, onClick: () => openCalculatorDialog(setIsBonusCommCalcOpen, setBonusCommCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Bonus & Commission Calculator" },
    { id: "vacation-pay", name: "Vacation Pay Calculator", title: "Vacation Pay Calculator", description: "Easily estimate accrued vacation pay entitlements.", icon: Plane, onClick: () => openCalculatorDialog(setIsVacationPayCalcOpen, setVacationPayCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Vacation Pay Calculator" },
    { id: "loan-amort", name: "Loan Interest & Amortisation Calculator", title: "Loan Interest & Amortisation Calculator", description: "Calculate loan repayments (monthly, quarterly, annually).", icon: Landmark, onClick: () => openCalculatorDialog(setIsLoanAmortCalcOpen, setLoanAmortCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Loan Interest & Amortisation Calculator" },
    { id: "mortgage", name: "Mortgage Calculator", title: "Mortgage Calculator", description: "Calculate mortgage repayments, including down payments and interest.", icon: HomeIcon, onClick: () => openCalculatorDialog(setIsMortgageCalcOpen, setMortgageCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Mortgage Calculator" },
    { id: "savings-invest", name: "Savings & Investment Calculator", title: "Savings & Investment Calculator", description: "Project returns from savings accounts, fixed deposits, and investment products.", icon: PiggyBank, onClick: () => openCalculatorDialog(setIsSavingsInvestCalcOpen, setSavingsInvestCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Savings & Investment Calculator" },
    { id: "currency-ex", name: "Currency Exchange Calculator", title: "Currency Exchange Calculator", description: "Real-time currency conversion for international transactions.", icon: Coins, onClick: () => openCalculatorDialog(setIsCurrencyExCalcOpen, setCurrencyExCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Currency Exchange Calculator" },
    { id: "simple-interest", name: "Simple Interest Calculator", title: "Simple Interest Calculator", description: "Quickly calculate simple interest amounts for short-term loans or deposits.", icon: PercentCircle, onClick: () => openCalculatorDialog(setIsSimpleInterestCalcOpen, setSimpleInterestCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Simple Interest Calculator" },
    { id: "markup-margin", name: "Markup & Margin Calculator", title: "Markup & Margin Calculator", description: "Accurately determine product/service pricing and profit margins.", icon: Target, onClick: () => openCalculatorDialog(setIsMarkupMarginCalcOpen, setMarkupMarginCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Markup & Margin Calculator" },
    { id: "break-even", name: "Break-even Analysis Calculator", title: "Break-even Analysis Calculator", description: "Determine sales needed to cover fixed and variable expenses.", icon: LineChart, onClick: () => openCalculatorDialog(setIsBreakEvenCalcOpen, setBreakEvenCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Break-even Analysis Calculator" },
    { id: "cash-flow-proj", name: "Cash Flow Projection Calculator", title: "Cash Flow Projection Calculator", description: "Forecast monthly or quarterly cash flows easily.", icon: AreaChart, onClick: () => openCalculatorDialog(setIsCashFlowProjCalcOpen, setCashFlowProjCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Cash Flow Projection Calculator" },
    { id: "depreciation", name: "Depreciation Calculator", title: "Depreciation Calculator", description: "Calculate depreciation using methods (Straight Line, Reducing Balance) according to tax rules.", icon: TrendingDown, onClick: () => openCalculatorDialog(setIsDepreciationCalcOpen, setDepreciationCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Depreciation Calculator" },
    { id: "tariff-duty", name: "Tariff & Customs Duty Calculator", title: "Tariff & Customs Duty Calculator", description: "Quickly calculate import duties based on HS codes and tariff schedules.", icon: Ship, onClick: () => openCalculatorDialog(setIsTariffDutyCalcOpen, setTariffDutyCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Tariff & Customs Duty Calculator" },
    { id: "freight-ship", name: "Freight & Shipping Cost Calculator", title: "Freight & Shipping Cost Calculator", description: "Estimate total landed costs, including shipping, insurance, and duties.", icon: Truck, onClick: () => openCalculatorDialog(setIsFreightShipCalcOpen, setFreightShipCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Freight & Shipping Cost Calculator" },
    { id: "cif-calc", name: "Cost, Insurance, and Freight (CIF) Calculator", title: "Cost, Insurance, and Freight (CIF) Calculator", description: "Compute total import costs for accurate pricing and profit analysis.", icon: FileBox, onClick: () => openCalculatorDialog(setIsCIFCalcOpen, setCIFCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Cost, Insurance, and Freight (CIF) Calculator" },
    { id: "stamp-duty", name: "Stamp Duty Calculator", title: "Stamp Duty Calculator", description: "Determine stamp duty payable on property transfers.", icon: Stamp, onClick: () => openCalculatorDialog(setIsStampDutyCalcOpen, setStampDutyCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Stamp Duty Calculator" },
    { id: "prop-tax-dialog", name: "Property Tax Calculator", title: "Property Tax Calculator", description: "Estimate annual property tax obligations.", icon: HomeIcon, onClick: () => openCalculatorDialog(setIsPropertyTaxDialogCalcOpen, setPropertyTaxDialogCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Property Tax Calculator" },
    { id: "rental-yield", name: "Rental Yield Calculator", title: "Rental Yield Calculator", description: "Calculate returns on rental property investments.", icon: Building2, onClick: () => openCalculatorDialog(setIsRentalYieldCalcOpen, setRentalYieldCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "Rental Yield Calculator" },
    { id: "aml-risk", name: "AML Compliance Risk Assessment Calculator", title: "AML Compliance Risk Assessment Calculator", description: "Quickly determine the Anti-Money Laundering (AML) risk of transactions.", icon: ShieldAlert, onClick: () => openCalculatorDialog(setIsAMLRiskCalcOpen, setAMLRiskCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "AML Compliance Risk Assessment Calculator" },
    { id: "fatca-crs", name: "FATCA & CRS Compliance Calculator", title: "FATCA & CRS Compliance Calculator", description: "Assess and report obligations under FATCA & CRS regulations.", icon: Network, onClick: () => openCalculatorDialog(setIsFATCACRSCalcOpen, setFATCACRSCalcKey), ctaText: "Open Calculator", calculatorIdentifier: "FATCA & CRS Compliance Calculator" },
    // Full page calculators (no onClick, uses href)
    { id: "business-levy-page", name: "Business Levy (Full Page)", title: "Business Levy (Full Page)", description: "Detailed Business Levy calculation with quarterly tracking. Considers exemptions for new companies (first 3 years).", icon: Banknote, href: "/calculators/business-levy", ctaText: "View Page", calculatorIdentifier: "Business Levy (Full Page)" },
    { id: "green-fund", name: "Green Fund Levy (Full Page)", title: "Green Fund Levy (Full Page)", description: "Detailed Green Fund Levy calculation with quarterly tracking. Applies at 0.3% of total annualized gross sales.", icon: Leaf, href: "/calculators/green-fund-levy", ctaText: "View Page", calculatorIdentifier: "Green Fund Levy (Full Page)" },
    { id: "corp-tax", name: "Corporation Tax Calculator", title: "Corporation Tax Calculator", description: "Estimates Corporation Tax liability based on chargeable profits, considering allowable deductions, other income, loss carried forward, and tax credits.", icon: Building, href: "/calculators/corporation-tax", ctaText: "View Page", calculatorIdentifier: "Corporation Tax Calculator" },
    { id: "income-tax", name: "Income Tax (Personal)", title: "Income Tax (Personal)", description: "Calculates personal income tax (PAYE), NIS, and Health Surcharge based on gross annual income and allowable deductions, applying the TT$90,000 personal allowance and relevant tax brackets.", icon: User, href: "/calculators/income-tax", ctaText: "View Page", calculatorIdentifier: "Income Tax (Personal)" },
    { id: "property-tax-page", name: "Property Tax Estimator (Full Page)", title: "Property Tax Estimator (Full Page)", description: "Provides a conceptual estimate of property tax based on Annual Rental Value (ARV) and property type, using simplified rates (e.g., 3% for residential after a 10% ARV deduction).", icon: HomeIcon, href: "/calculators/property-tax", ctaText: "View Page", calculatorIdentifier: "Property Tax Estimator (Full Page)" },
    { id: "vat-calc-page", name: "VAT Calculator (Full Page)", title: "VAT Calculator (Full Page)", description: "Calculates Value Added Tax (12.5%) on prices, allowing for input of price excluding or including VAT. Also includes a VAT registration eligibility checker.", icon: ReceiptText, href: "/calculators/vat", ctaText: "View Page", calculatorIdentifier: "VAT Calculator (Full Page)" },
  ];


  const coreCalculators = detailedCalculatorList.filter(calc =>
    ["time", "paye", "voluntary-nis", "levy-dialog", "simple-vat",
     "excise-duty", "gross-to-net", "overtime-pay", "bonus-commission", "vacation-pay",
     "loan-amort", "mortgage", "savings-invest", "currency-ex", "simple-interest",
     "markup-margin", "break-even", "cash-flow-proj", "depreciation", "tariff-duty",
     "freight-ship", "cif-calc", "stamp-duty", "prop-tax-dialog", "rental-yield",
     "aml-risk", "fatca-crs"
    ]
    .includes(calc.id)
  );

  const HeroIcon = heroContentData.icon;

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
    if (eventDate < new Date(new Date().setHours(0, 0, 0, 0)) && deadline.status !== "Completed") {
      toast({
        title: "Past Due Date",
        description: `Cannot set a reminder for "${deadline.name}" as the date is in the past.`,
        variant: "default",
      });
      return;
    }

    const eventTitle = `Tax TT Reminder: ${deadline.name}`;
    const eventDescription = `Deadline for ${deadline.name} - ${deadline.description}. Periodicity: ${deadline.periodicity}. Remember to verify with official IRD sources.`;

    if (type === 'google') {
      const googleStartDate = format(eventDate, "yyyyMMdd");
      const googleEndDate = format(addDays(eventDate, 1), "yyyyMMdd");
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
              <Card key={calc.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <calc.icon className="h-8 w-8 text-accent mr-3" />
                    <CardTitle className="text-xl text-primary">{calc.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm h-12 overflow-hidden text-ellipsis"> {/* Added height and overflow control */}
                    {calc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Content can be added here if needed in the future */}
                </CardContent>
                <CardFooter>
                  {calc.onClick ? (
                    <Button onClick={calc.onClick} variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      {calc.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                      <Link href={calc.ctaLink || "#"}>{calc.ctaText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
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

              const dueDate = parseISO(item.nextDueDate);
              const isPast = dueDate < new Date(new Date().setHours(0, 0, 0, 0)) && item.status !== "Completed";

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
                       <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.46 14.354V10.822H21.75V4.763C21.75 4.03 21.17 3.45 20.438 3.45H3.563C2.83 3.45 2.25 4.03 2.25 4.763V20.145C2.25 20.878 2.83 21.457 3.563 21.457H12.69V20.181H3.563C3.546 20.181 3.53 20.175 3.518 20.162C3.506 20.149 3.5 20.132 3.5 20.115V8.52H20.5V10.822H19.219V14.354H20.46Z" fill="#34A853"/>
                        <path d="M19.219 14.354V10.822H10.888V8.52H3.5V4.793C3.5 4.776 3.506 4.759 3.518 4.746C3.53 4.733 3.546 4.728 3.563 4.728H20.438C20.454 4.728 20.47 4.733 20.482 4.746C20.494 4.759 20.5 4.776 20.5 4.793V8.52H13.15V10.822H20.5V14.354H19.219Z" fill="#4285F4"/>
                        <path d="M12.69 20.181H3.563C3.546 20.181 3.53 20.175 3.518 20.162C3.506 20.149 3.5 20.132 3.5 20.115V8.52H10.888V14.354H13.15V20.181H12.69Z" fill="#FBBC04"/>
                        <path d="M20.5 8.52H13.15V14.354H10.888V20.115C10.888 20.132 10.882 20.149 10.87 20.162C10.857 20.175 10.841 20.181 10.824 20.181H12.69V21.457H20.438C21.17 21.457 21.75 20.878 21.75 20.145V4.763C21.75 4.03 21.17 3.45 20.438 3.45H3.563C2.83 3.45 2.25 4.03 2.25 4.763V8.52H20.5Z" fill="#EA4335"/>
                        <path d="M16.8563 21.75C18.7368 21.75 20.25 20.2368 20.25 18.3562C20.25 16.4757 18.7368 14.9625 16.8563 14.9625C14.9757 14.9625 13.4625 16.4757 13.4625 18.3562C13.4625 20.2368 14.9757 21.75 16.8563 21.75Z" fill="#FFFFFF"/>
                        <path d="M16.8563 20.8125C18.2105 20.8125 19.3125 19.7105 19.3125 18.3562C19.3125 17.0019 18.2105 15.9 16.8563 15.9C15.502 15.9 14.4 17.0019 14.4 18.3562C14.4 19.7105 15.502 20.8125 16.8563 20.8125Z" fill="#4285F4"/>
                        <path d="M18.5625 16.65H17.775V15.8625H15.9V16.65H15.1125V17.5125H15.9V18.3H17.775V17.5125H18.5625V16.65Z" fill="#FFFFFF"/>
                       </svg>
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
                       <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4 3.6H3.6C3.26863 3.6 3 3.86863 3 4.2V19.8C3 20.1314 3.26863 20.4 3.6 20.4H20.4C20.7314 20.4 21 20.1314 21 19.8V4.2C21 3.86863 20.7314 3.6 20.4 3.6Z" fill="#0078D4"/>
                        <path d="M9.86252 12.4603L5.01002 16.2178V7.06785L9.86252 12.4603Z" fill="white"/>
                        <path d="M10.6711 13.1009L12.0001 14.1396L13.3291 13.1009L18.0616 7.50146H5.93857L10.6711 13.1009Z" fill="white"/>
                        <path d="M14.1311 12.4603L18.9836 7.06785V16.2178L14.1311 12.4603Z" fill="white"/>
                        <path d="M10.6711 13.1008L12.0001 14.1395L13.3291 13.1008L14.1311 12.4602L18.9836 16.2177V16.7327L12.0001 11.4664L5.01657 16.7327V16.2177L9.86255 12.4602L10.6711 13.1008Z" fill="#C4DDFF"/>
                       </svg>
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
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.35355 3.14645C8.15829 2.95118 7.84171 2.95118 7.64645 3.14645L4.14645 6.64645C3.95118 6.84171 3.95118 7.15829 4.14645 7.35355C4.34171 7.54882 4.65829 7.54882 4.85355 7.35355L7.5 4.70711V12.5C7.5 12.7761 7.72386 13 8 13C8.27614 13 8.5 12.7761 8.5 12.5V4.70711L11.1464 7.35355C11.3417 7.54882 11.6583 7.54882 11.8536 7.35355C12.0488 7.15829 12.0488 6.84171 11.8536 6.64645L8.35355 3.14645ZM2.5 10.5C2.22386 10.5 2 10.7239 2 11V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V11C14 10.7239 13.7761 10.5 13.5 10.5C13.2239 10.5 13 10.7239 13 11V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V11C3 10.7239 2.77614 10.5 2.5 10.5Z" />
                        </svg>
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
                    <Link href={resource.href}>Read Guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Link href="/knowledge-base">Explore All Resources <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
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

      {/* Dialogs for calculators */}
      <Dialog open={isBasicTimeCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Basic Time Calculator", open, setIsBasicTimeCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Clock className="mr-2 h-6 w-6" />Basic Time Calculator</DialogTitle>
          </DialogHeader>
          <BasicTimeCalculator key={basicTimeCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isPayrollCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("PAYE, NIS & HS Calculator", open, setIsPayrollCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><UsersIcon className="mr-2 h-6 w-6" />PAYE, NIS & HS Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedPayrollCalculator key={payrollCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isSimpleVatCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Simple VAT Calculator", open, setIsSimpleVatCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Percent className="mr-2 h-6 w-6" />Simple VAT Calculator</DialogTitle>
          </DialogHeader>
          <SimpleVatCalculator key={simpleVatCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isLevyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Levy Calculator", open, setIsLevyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><Banknote className="mr-2 h-6 w-6" />Levy Calculator</DialogTitle>
          </DialogHeader>
          <SimplifiedLevyCalculator key={levyCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isVoluntaryNisCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Voluntary NIS Contribution Calculator", open, setIsVoluntaryNisCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center"><FileHeart className="mr-2 h-6 w-6" />Voluntary NIS Calculator</DialogTitle>
          </DialogHeader>
          <VoluntaryNisCalculator key={voluntaryNisCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isExciseDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Excise Duty Calculator", open, setIsExciseDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Cigarette className="mr-2 h-6 w-6" />Excise Duty Calculator</DialogTitle></DialogHeader>
          <ExciseDutyCalculator key={exciseDutyCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isGrossToNetCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Gross to Net Salary Calculator", open, setIsGrossToNetCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><TrendingDown className="mr-2 h-6 w-6" />Gross to Net Salary Calculator</DialogTitle></DialogHeader>
          <GrossToNetSalaryCalculator key={grossToNetCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isOvertimePayCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Overtime Pay Calculator", open, setIsOvertimePayCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><AlarmClock className="mr-2 h-6 w-6" />Overtime Pay Calculator</DialogTitle></DialogHeader>
          <OvertimePayCalculator key={overtimePayCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isBonusCommCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Bonus & Commission Calculator", open, setIsBonusCommCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Gift className="mr-2 h-6 w-6" />Bonus & Commission Calculator</DialogTitle></DialogHeader>
          <BonusCommissionCalculator key={bonusCommCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isVacationPayCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Vacation Pay Calculator", open, setIsVacationPayCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Plane className="mr-2 h-6 w-6" />Vacation Pay Calculator</DialogTitle></DialogHeader>
          <VacationPayCalculator key={vacationPayCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoanAmortCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Loan Interest & Amortisation Calculator", open, setIsLoanAmortCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Landmark className="mr-2 h-6 w-6" />Loan Interest & Amortisation Calculator</DialogTitle></DialogHeader>
          <LoanAmortisationCalculator key={loanAmortCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isMortgageCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Mortgage Calculator", open, setIsMortgageCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><HomeIcon className="mr-2 h-6 w-6" />Mortgage Calculator</DialogTitle></DialogHeader>
          <MortgageCalculator key={mortgageCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isSavingsInvestCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Savings & Investment Calculator", open, setIsSavingsInvestCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><PiggyBank className="mr-2 h-6 w-6" />Savings & Investment Calculator</DialogTitle></DialogHeader>
          <SavingsInvestmentCalculator key={savingsInvestCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isCurrencyExCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Currency Exchange Calculator", open, setIsCurrencyExCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Coins className="mr-2 h-6 w-6" />Currency Exchange Calculator</DialogTitle></DialogHeader>
          <CurrencyExchangeCalculator key={currencyExCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isSimpleInterestCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Simple Interest Calculator", open, setIsSimpleInterestCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><PercentCircle className="mr-2 h-6 w-6" />Simple Interest Calculator</DialogTitle></DialogHeader>
          <SimpleInterestCalculator key={simpleInterestCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isMarkupMarginCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Markup & Margin Calculator", open, setIsMarkupMarginCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Target className="mr-2 h-6 w-6" />Markup & Margin Calculator</DialogTitle></DialogHeader>
          <MarkupMarginCalculator key={markupMarginCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isBreakEvenCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Break-even Analysis Calculator", open, setIsBreakEvenCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><LineChart className="mr-2 h-6 w-6" />Break-even Analysis Calculator</DialogTitle></DialogHeader>
          <BreakEvenCalculator key={breakEvenCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isCashFlowProjCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Cash Flow Projection Calculator", open, setIsCashFlowProjCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><AreaChart className="mr-2 h-6 w-6" />Cash Flow Projection Calculator</DialogTitle></DialogHeader>
          <CashFlowProjectionCalculator key={cashFlowProjCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isDepreciationCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Depreciation Calculator", open, setIsDepreciationCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><TrendingDown className="mr-2 h-6 w-6" />Depreciation Calculator</DialogTitle></DialogHeader>
          <DepreciationCalculator key={depreciationCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isTariffDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Tariff & Customs Duty Calculator", open, setIsTariffDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Ship className="mr-2 h-6 w-6" />Tariff & Customs Duty Calculator</DialogTitle></DialogHeader>
          <TariffCustomsDutyCalculator key={tariffDutyCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreightShipCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Freight & Shipping Cost Calculator", open, setIsFreightShipCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Truck className="mr-2 h-6 w-6" />Freight & Shipping Cost Calculator</DialogTitle></DialogHeader>
          <FreightShippingCalculator key={freightShipCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isCIFCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Cost, Insurance, and Freight (CIF) Calculator", open, setIsCIFCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><FileBox className="mr-2 h-6 w-6" />Cost, Insurance, and Freight (CIF) Calculator</DialogTitle></DialogHeader>
          <CIFCalculator key={cifCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isStampDutyCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Stamp Duty Calculator", open, setIsStampDutyCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Stamp className="mr-2 h-6 w-6" />Stamp Duty Calculator</DialogTitle></DialogHeader>
          <StampDutyCalculator key={stampDutyCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isPropertyTaxDialogCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Property Tax Calculator", open, setIsPropertyTaxDialogCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><HomeIcon className="mr-2 h-6 w-6" />Property Tax Calculator</DialogTitle></DialogHeader>
          <PropertyTaxDialogCalculator key={propertyTaxDialogCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isRentalYieldCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("Rental Yield Calculator", open, setIsRentalYieldCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Building2 className="mr-2 h-6 w-6" />Rental Yield Calculator</DialogTitle></DialogHeader>
          <RentalYieldCalculator key={rentalYieldCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isAMLRiskCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("AML Compliance Risk Assessment Calculator", open, setIsAMLRiskCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><ShieldAlert className="mr-2 h-6 w-6" />AML Compliance Risk Assessment Calculator</DialogTitle></DialogHeader>
          <AMLRiskCalculator key={amlRiskCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isFATCACRSCalcOpen} onOpenChange={(open) => handleCalculatorDialogClose("FATCA & CRS Compliance Calculator", open, setIsFATCACRSCalcOpen)}>
        <DialogContent className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl text-primary flex items-center"><Network className="mr-2 h-6 w-6" />FATCA & CRS Compliance Calculator</DialogTitle></DialogHeader>
          <FATCACRSCalculator key={fatcaCRSCalcKey} />
          <DialogClose asChild><Button type="button" variant="outline" className="mt-4 w-full">Close</Button></DialogClose>
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
