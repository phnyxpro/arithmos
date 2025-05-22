
"use client";

import * as React from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { 
  Building, FileText, CalendarDays, DollarSign, TrendingDown, Percent, Download, Info, AlertCircle, 
  Receipt, Users, Megaphone, Home, Palette, School, Briefcase as BriefcaseIcon, Archive, Plus, Trash2, Sigma, Check, ChevronsUpDown,
  Copy as CopyIcon, ChevronDown as ChevronDownIcon
} from "lucide-react";
import { getYear } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currentYear = getYear(new Date());
const taxYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

const companyTypeOptions = [
  { value: "ordinary", label: "Ordinary Company", rate: 0.30 },
  { value: "banking_petrochemical", label: "Banking / Petrochemical Co.", rate: 0.35 },
  { value: "life_insurance", label: "Life Insurance Co.", rate: 0.15 }, // Simplified, actual is tiered
  { value: "general_insurance", label: "General Insurance Co.", rate: 0.30 },
  { value: "petroleum_production_std", label: "Petroleum Production (Standard PPT)", rate: 0.50 },
  { value: "petroleum_production_deep_sea", label: "Petroleum Production (Deep Sea)", rate: 0.30 },
  { value: "sme_listed", label: "SME (Listed on Stock Exchange)", rate: 0.10 }, // Simplified, actual is tiered
  { value: "sez_company", label: "Special Economic Zone Co.", rate: 0.01 },
];

const expenseOptionsList = [
  { category: "Payroll & Employee Benefits", value: "Salaries & Wages", label: "Salaries & Wages" },
  { category: "Payroll & Employee Benefits", value: "Bonuses & Commissions", label: "Bonuses & Commissions" },
  { category: "Payroll & Employee Benefits", value: "Employee Health Insurance", label: "Employee Health Insurance" },
  { category: "Payroll & Employee Benefits", value: "Pension Contributions", label: "Pension Contributions" },
  { category: "Payroll & Employee Benefits", value: "Employer Taxes (PAYE, NIS, Health Surcharge)", label: "Employer Taxes (PAYE, NIS, HS)" },
  { category: "Payroll & Employee Benefits", value: "Training & Development Costs", label: "Training & Development Costs" },
  { category: "Payroll & Employee Benefits", value: "Employee Allowances", label: "Employee Allowances" },
  { category: "Office & Administrative Expenses", value: "Office Rent or Lease", label: "Office Rent or Lease" },
  { category: "Office & Administrative Expenses", value: "Utilities (electricity, water, internet)", label: "Utilities" },
  { category: "Office & Administrative Expenses", value: "Office Supplies & Stationery", label: "Office Supplies & Stationery" },
  { category: "Office & Administrative Expenses", value: "Office Equipment", label: "Office Equipment" },
  { category: "Office & Administrative Expenses", value: "Repairs & Maintenance", label: "Repairs & Maintenance" },
  { category: "Office & Administrative Expenses", value: "Postage & Courier Services", label: "Postage & Courier Services" },
  { category: "Office & Administrative Expenses", value: "Cleaning & Janitorial Services", label: "Cleaning & Janitorial Services" },
  { category: "Professional & Consulting Fees", value: "Legal Fees", label: "Legal Fees" },
  { category: "Professional & Consulting Fees", value: "Accounting & Auditing Fees", label: "Accounting & Auditing Fees" },
  { category: "Professional & Consulting Fees", value: "Consulting & Advisory Services", label: "Consulting & Advisory Services" },
  { category: "Professional & Consulting Fees", value: "IT & Software Support", label: "IT & Software Support" },
  { category: "Professional & Consulting Fees", value: "Recruitment & Placement Fees", label: "Recruitment & Placement Fees" },
  { category: "Marketing & Advertising", value: "Digital Advertising", label: "Digital Advertising" },
  { category: "Marketing & Advertising", value: "Print & Media Advertising", label: "Print & Media Advertising" },
  { category: "Marketing & Advertising", value: "Promotional Materials", label: "Promotional Materials" },
  { category: "Marketing & Advertising", value: "Branding & Design Services", label: "Branding & Design Services" },
  { category: "Marketing & Advertising", value: "Market Research", label: "Market Research" },
  { category: "Marketing & Advertising", value: "Sponsorship & Events", label: "Sponsorship & Events" },
  { category: "Travel & Entertainment", value: "Business Travel Expenses", label: "Business Travel Expenses" },
  { category: "Travel & Entertainment", value: "Mileage & Vehicle Expenses", label: "Mileage & Vehicle Expenses" },
  { category: "Travel & Entertainment", value: "Entertainment (business meals, client hospitality)", label: "Entertainment" },
  { category: "Travel & Entertainment", value: "Conference & Seminar Fees", label: "Conference & Seminar Fees" },
  { category: "Travel & Entertainment", value: "Staff Meetings & Retreats", label: "Staff Meetings & Retreats" },
  { category: "Technology & IT Expenses", value: "Software & Subscription Licenses", label: "Software & Subscription Licenses" },
  { category: "Technology & IT Expenses", value: "Cloud Services & Hosting", label: "Cloud Services & Hosting" },
  { category: "Technology & IT Expenses", value: "Website & Domain Hosting", label: "Website & Domain Hosting" },
  { category: "Technology & IT Expenses", value: "Computer Hardware & Mobile Devices", label: "Computer Hardware & Mobile Devices" },
  { category: "Technology & IT Expenses", value: "IT Infrastructure & Network Expenses", label: "IT Infrastructure & Network Expenses" },
  { category: "Insurance", value: "General Liability Insurance", label: "General Liability Insurance" },
  { category: "Insurance", value: "Property Insurance", label: "Property Insurance" },
  { category: "Insurance", value: "Workers’ Compensation", label: "Workers’ Compensation" },
  { category: "Insurance", value: "Professional Liability Insurance", label: "Professional Liability Insurance" },
  { category: "Insurance", value: "Directors & Officers (D&O) Insurance", label: "Directors & Officers (D&O) Insurance" },
  { category: "Financial Expenses", value: "Bank Charges & Fees", label: "Bank Charges & Fees" },
  { category: "Financial Expenses", value: "Interest Expense (loans, overdrafts)", label: "Interest Expense" },
  { category: "Financial Expenses", value: "Merchant Service Fees (payment processing)", label: "Merchant Service Fees" },
  { category: "Financial Expenses", value: "Foreign Exchange Losses/Gains", label: "Foreign Exchange Losses/Gains" },
  { category: "Taxes & Regulatory Fees", value: "Business Levy", label: "Business Levy (Paid)" },
  { category: "Taxes & Regulatory Fees", value: "Green Fund Levy", label: "Green Fund Levy (Paid)" },
  { category: "Taxes & Regulatory Fees", value: "Corporation Tax", label: "Corporation Tax (Installments)" },
  { category: "Taxes & Regulatory Fees", value: "VAT Payments", label: "VAT Payments (Net)" },
  { category: "Taxes & Regulatory Fees", value: "Licenses & Permits", label: "Licenses & Permits" },
  { category: "Taxes & Regulatory Fees", value: "Fines & Penalties", label: "Fines & Penalties (If allowable)" },
  { category: "Cost of Goods Sold (COGS)", value: "Raw Materials & Supplies", label: "Raw Materials & Supplies" },
  { category: "Cost of Goods Sold (COGS)", value: "Inventory Costs", label: "Inventory Costs" },
  { category: "Cost of Goods Sold (COGS)", value: "Manufacturing & Production Expenses", label: "Manufacturing & Production Expenses" },
  { category: "Cost of Goods Sold (COGS)", value: "Direct Labour Costs", label: "Direct Labour Costs" },
  { category: "Cost of Goods Sold (COGS)", value: "Freight & Shipping Costs", label: "Freight & Shipping Costs" },
  { category: "Depreciation & Amortisation", value: "Depreciation of Equipment & Machinery", label: "Depreciation - Equipment & Machinery" },
  { category: "Depreciation & Amortisation", value: "Depreciation of Buildings", label: "Depreciation - Buildings" },
  { category: "Depreciation & Amortisation", value: "Amortisation of Intangible Assets", label: "Amortisation - Intangible Assets" },
  { category: "Research & Development", value: "Product Development Expenses", label: "Product Development Expenses" },
  { category: "Research & Development", value: "Laboratory & Testing Costs", label: "Laboratory & Testing Costs" },
  { category: "Research & Development", value: "Prototype & Sample Production", label: "Prototype & Sample Production" },
  { category: "Miscellaneous Expenses", value: "Donations & Charitable Contributions", label: "Donations & Charitable Contributions" },
  { category: "Miscellaneous Expenses", value: "Membership & Subscriptions", label: "Membership & Subscriptions" },
  { category: "Miscellaneous Expenses", value: "Staff Welfare & Gifts", label: "Staff Welfare & Gifts" },
  { category: "Miscellaneous Expenses", value: "Contingency Expenses", label: "Contingency Expenses" },
  { category: "Miscellaneous Expenses", value: "Other Operating Expense", label: "Other Operating Expense" },
];

const corporationTaxFormSchema = z.object({
  taxYear: z.string({ required_error: "Tax year is required." }),
  companyType: z.string({ required_error: "Company type is required." }),
  grossIncome: z.coerce.number({ required_error: "Gross income is required." }).min(0, "Gross income must be positive."),
  dynamicOperatingExpenses: z.array(
    z.object({
      expenseType: z.string().min(1, "Expense type/name is required."),
      expenseValue: z.coerce.number({ invalid_type_error: "Must be a number" }).min(0, "Value must be positive.").optional().default(0),
    })
  ).optional(),
  allowableDeductions: z.coerce.number().min(0, "Deductions must be positive.").optional().default(0),
  otherIncome: z.coerce.number().min(0, "Other income must be positive.").optional().default(0),
  lossCarriedForward: z.coerce.number().min(0, "Loss must be positive.").optional().default(0),
  businessLevyPaid: z.coerce.number().min(0, "Business Levy paid must be positive.").optional().default(0),
  taxCreditsClaimed: z.coerce.number().min(0, "Tax credits must be positive.").optional().default(0),
});

type CorporationTaxFormData = z.infer<typeof corporationTaxFormSchema>;

const initialFormValues: CorporationTaxFormData = {
  taxYear: currentYear.toString(),
  companyType: "ordinary",
  grossIncome: 0,
  dynamicOperatingExpenses: [],
  allowableDeductions: 0,
  otherIncome: 0,
  lossCarriedForward: 0,
  businessLevyPaid: 0,
  taxCreditsClaimed: 0,
};

const initialCalculationResults = {
  chargeableIncomeBeforeAdjustments: 0,
  finalChargeableIncome: 0,
  taxRateApplied: 0,
  corporationTaxBeforeOffsets: 0,
  businessLevyOffsetApplied: 0,
  taxCreditsApplied: 0,
  finalCorporationTaxDue: 0,
};

export default function CorporationTaxPage() {
  const { toast } = useToast();
  const [calculationResults, setCalculationResults] = React.useState(initialCalculationResults);
  const [comboboxOpenStates, setComboboxOpenStates] = React.useState<boolean[]>([]);
  
  const [incomeInputPeriod, setIncomeInputPeriod] = React.useState<"annually" | "quarterly" | "monthly">("annually");
  const [annualIncomeInput, setAnnualIncomeInput] = React.useState<string>("");
  const [quarterlyIncomes, setQuarterlyIncomes] = React.useState<string[]>(Array(4).fill(""));
  const [monthlyIncomes, setMonthlyIncomes] = React.useState<string[]>(Array(12).fill(""));

  const form = useForm<CorporationTaxFormData>({
    resolver: zodResolver(corporationTaxFormSchema),
    defaultValues: initialFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dynamicOperatingExpenses",
  });

  const watchedDynamicExpenses = form.watch("dynamicOperatingExpenses");
  
  React.useEffect(() => {
    if (incomeInputPeriod === "monthly") {
      setAnnualIncomeInput("");
      setQuarterlyIncomes(Array(4).fill(""));
    } else if (incomeInputPeriod === "quarterly") {
      setAnnualIncomeInput("");
      setMonthlyIncomes(Array(12).fill(""));
    } else { // annually
      setQuarterlyIncomes(Array(4).fill(""));
      setMonthlyIncomes(Array(12).fill(""));
    }
  }, [incomeInputPeriod]);

  React.useEffect(() => {
    let annualized = 0;
    if (incomeInputPeriod === "annually") {
      annualized = Number(annualIncomeInput) || 0;
    } else if (incomeInputPeriod === "quarterly") {
      annualized = quarterlyIncomes.reduce((sum, income) => sum + (Number(income) || 0), 0);
    } else if (incomeInputPeriod === "monthly") {
      annualized = monthlyIncomes.reduce((sum, income) => sum + (Number(income) || 0), 0);
    }
    if (form.getValues("grossIncome") !== annualized) {
        form.setValue("grossIncome", annualized, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
  }, [incomeInputPeriod, annualIncomeInput, quarterlyIncomes, monthlyIncomes, form]);


  React.useEffect(() => {
    if (watchedDynamicExpenses) {
      const totalOpEx = watchedDynamicExpenses.reduce((sum, item) => {
        return sum + (Number(item.expenseValue) || 0);
      }, 0);
      if (form.getValues("allowableDeductions") !== totalOpEx) {
        form.setValue("allowableDeductions", totalOpEx, { shouldValidate: false, shouldDirty: true, shouldTouch: true });
      }
    }
  }, [watchedDynamicExpenses, form, JSON.stringify(watchedDynamicExpenses)]); 
  
  const watchedTaxYear = form.watch("taxYear");
  const watchedCompanyType = form.watch("companyType");
  const watchedGrossIncome = form.watch("grossIncome");
  const watchedAllowableDeductions = form.watch("allowableDeductions");
  const watchedOtherIncome = form.watch("otherIncome");
  const watchedLossCarriedForward = form.watch("lossCarriedForward");
  const watchedBusinessLevyPaid = form.watch("businessLevyPaid");
  const watchedTaxCreditsClaimed = form.watch("taxCreditsClaimed");

  React.useEffect(() => {
    const grossIncomeNum = Number(watchedGrossIncome) || 0;
    const allowableDeductionsNum = Number(watchedAllowableDeductions) || 0;
    const otherIncomeNum = Number(watchedOtherIncome) || 0;
    const lossCarriedForwardNum = Number(watchedLossCarriedForward) || 0;
    const businessLevyPaidNum = Number(watchedBusinessLevyPaid) || 0;
    const taxCreditsClaimedNum = Number(watchedTaxCreditsClaimed) || 0;

    const selectedCompanyType = companyTypeOptions.find(opt => opt.value === watchedCompanyType);
    
    if (!selectedCompanyType) {
      if (JSON.stringify(initialCalculationResults) !== JSON.stringify(calculationResults)) {
        setCalculationResults(initialCalculationResults);
      }
      return;
    }

    let taxRate = selectedCompanyType.rate;
    
    const initialChargeable = Math.max(0, grossIncomeNum - allowableDeductionsNum);
    const finalChargeable = Math.max(0, initialChargeable + otherIncomeNum - lossCarriedForwardNum);
    const taxBeforeOffsetsAndCredits = finalChargeable * taxRate;
    
    const blOffset = Math.min(businessLevyPaidNum, taxBeforeOffsetsAndCredits);
    const taxAfterBLOffset = taxBeforeOffsetsAndCredits - blOffset;

    const creditsApplied = Math.min(taxCreditsClaimedNum, taxAfterBLOffset);
    const finalTax = Math.max(0, taxAfterBLOffset - creditsApplied);

    const newResults = {
      chargeableIncomeBeforeAdjustments: initialChargeable,
      finalChargeableIncome: finalChargeable,
      taxRateApplied: taxRate,
      corporationTaxBeforeOffsets: taxBeforeOffsetsAndCredits,
      businessLevyOffsetApplied: blOffset,
      taxCreditsApplied: creditsApplied,
      finalCorporationTaxDue: finalTax,
    };

    if (JSON.stringify(newResults) !== JSON.stringify(calculationResults)) {
        setCalculationResults(newResults);
    }

  }, [
    watchedTaxYear, 
    watchedCompanyType, 
    watchedGrossIncome, 
    watchedAllowableDeductions, 
    watchedOtherIncome, 
    watchedLossCarriedForward, 
    watchedBusinessLevyPaid, 
    watchedTaxCreditsClaimed,
    calculationResults 
  ]);

  const chargeableIncomeAutoCalculated = React.useMemo(() => {
    const gross = Number(form.watch("grossIncome")) || 0;
    const deductions = Number(form.watch("allowableDeductions")) || 0;
    return Math.max(0, gross - deductions);
  }, [form.watch("grossIncome"), form.watch("allowableDeductions")]);

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "0.00";
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleComboboxOpenChange = (index: number, open: boolean) => {
    setComboboxOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = open;
      return newStates;
    });
  };
  
  const handleClearFields = () => {
    form.reset(initialFormValues);
    setAnnualIncomeInput("");
    setQuarterlyIncomes(Array(4).fill(""));
    setMonthlyIncomes(Array(12).fill(""));
    setIncomeInputPeriod("annually");
    setCalculationResults(initialCalculationResults);
    setComboboxOpenStates([]);
    toast({ title: "Fields Cleared", description: "All inputs and results have been reset." });
  };

  const handleCopyResults = () => {
    const formData = form.getValues();
    const results = calculationResults;
    const selectedCompany = companyTypeOptions.find(opt => opt.value === formData.companyType);

    let incomeDetails = "";
    if (incomeInputPeriod === "annually") {
        incomeDetails = `Annual Gross Income: TT$ ${formatCurrency(Number(annualIncomeInput) || 0)}\n`;
    } else if (incomeInputPeriod === "quarterly") {
        quarterlyIncomes.forEach((qIncome, i) => {
            incomeDetails += `Quarter ${i + 1} Income: TT$ ${formatCurrency(Number(qIncome) || 0)}\n`;
        });
    } else if (incomeInputPeriod === "monthly") {
        monthlyIncomes.forEach((mIncome, i) => {
            incomeDetails += `Month ${i + 1} Income: TT$ ${formatCurrency(Number(mIncome) || 0)}\n`;
        });
    }
    incomeDetails += `Annualized Gross Income: TT$ ${formatCurrency(formData.grossIncome)}\n`;

    let expenseDetails = "Operating Expenses:\n";
    if (formData.dynamicOperatingExpenses && formData.dynamicOperatingExpenses.length > 0) {
      formData.dynamicOperatingExpenses.forEach(exp => {
        const expenseLabel = expenseOptionsList.find(opt => opt.value === exp.expenseType)?.label || exp.expenseType;
        expenseDetails += `  - ${expenseLabel}: TT$ ${formatCurrency(exp.expenseValue)}\n`;
      });
    } else {
      expenseDetails += "  None entered\n";
    }
    expenseDetails += `Total Allowable Deductions: TT$ ${formatCurrency(formData.allowableDeductions)}\n`;
    
    const textToCopy = `
CORPORATION TAX CALCULATION SUMMARY
---------------------------------
INPUTS:
Tax Year: ${formData.taxYear}
Company Type: ${selectedCompany ? selectedCompany.label : 'N/A'}
${incomeDetails}
${expenseDetails}
Other Income: TT$ ${formatCurrency(formData.otherIncome)}
Loss Carried Forward: TT$ ${formatCurrency(formData.lossCarriedForward)}
Business Levy Paid (for offset): TT$ ${formatCurrency(formData.businessLevyPaid)}
Tax Credits Claimed: TT$ ${formatCurrency(formData.taxCreditsClaimed)}
---------------------------------
CALCULATION RESULTS:
Chargeable Income (Gross - Total Deductions): TT$ ${formatCurrency(results.chargeableIncomeBeforeAdjustments)}
Final Chargeable Income (after Other Income/Loss): TT$ ${formatCurrency(results.finalChargeableIncome)}
Tax Rate Applied: ${(results.taxRateApplied * 100).toFixed(1)}%
Corporation Tax Before Offsets/Credits: TT$ ${formatCurrency(results.corporationTaxBeforeOffsets)}
Business Levy Offset Applied: TT$ ${formatCurrency(results.businessLevyOffsetApplied)}
Tax Credits Applied: TT$ ${formatCurrency(results.taxCreditsApplied)}
FINAL CORPORATION TAX DUE: TT$ ${formatCurrency(results.finalCorporationTaxDue)}
---------------------------------
Disclaimer: This calculator provides estimates. Consult official guidelines.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Corporation Tax summary copied to clipboard." });
  };

  const handleExportCSV = () => {
    const formData = form.getValues();
    const results = calculationResults;
    const selectedCompany = companyTypeOptions.find(opt => opt.value === formData.companyType);

    const csvRows = [
      ["Description", "Value"],
      ["Tax Year", formData.taxYear],
      ["Company Type", selectedCompany ? selectedCompany.label : 'N/A'],
    ];

    if (incomeInputPeriod === "annually") {
        csvRows.push(["Annual Gross Income (Input)", formatCurrency(Number(annualIncomeInput) || 0)]);
    } else if (incomeInputPeriod === "quarterly") {
        quarterlyIncomes.forEach((qIncome, i) => {
            csvRows.push([`Quarter ${i + 1} Income`, formatCurrency(Number(qIncome) || 0)]);
        });
    } else if (incomeInputPeriod === "monthly") {
        monthlyIncomes.forEach((mIncome, i) => {
            csvRows.push([`Month ${i + 1} Income`, formatCurrency(Number(mIncome) || 0)]);
        });
    }
    csvRows.push(["Annualized Gross Income", formatCurrency(formData.grossIncome)]);

    if (formData.dynamicOperatingExpenses && formData.dynamicOperatingExpenses.length > 0) {
      formData.dynamicOperatingExpenses.forEach(exp => {
        const expenseLabel = expenseOptionsList.find(opt => opt.value === exp.expenseType)?.label || exp.expenseType;
        csvRows.push([`Operating Expense: ${expenseLabel}`, formatCurrency(exp.expenseValue)]);
      });
    }
    csvRows.push(["Total Allowable Deductions", formatCurrency(formData.allowableDeductions)]);
    
    csvRows.push(["Other Income", formatCurrency(formData.otherIncome)]);
    csvRows.push(["Loss Carried Forward", formatCurrency(formData.lossCarriedForward)]);
    csvRows.push(["Business Levy Paid (for offset)", formatCurrency(formData.businessLevyPaid)]);
    csvRows.push(["Tax Credits Claimed", formatCurrency(formData.taxCreditsClaimed)]);
    
    csvRows.push(["--- CALCULATION RESULTS ---", ""]);
    csvRows.push(["Chargeable Income (Gross - Deductions)", formatCurrency(results.chargeableIncomeBeforeAdjustments)]);
    csvRows.push(["Final Chargeable Income", formatCurrency(results.finalChargeableIncome)]);
    csvRows.push(["Tax Rate Applied", `${(results.taxRateApplied * 100).toFixed(1)}%`]);
    csvRows.push(["Corporation Tax Before Offsets/Credits", formatCurrency(results.corporationTaxBeforeOffsets)]);
    csvRows.push(["Business Levy Offset Applied", formatCurrency(results.businessLevyOffsetApplied)]);
    csvRows.push(["Tax Credits Applied", formatCurrency(results.taxCreditsApplied)]);
    csvRows.push(["FINAL CORPORATION TAX DUE", formatCurrency(results.finalCorporationTaxDue)]);

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `corporation_tax_summary_${formData.taxYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "CSV Exported", description: "Corporation tax summary downloaded." });
  };

  const handleExportXLSX = () => toast({ title: "XLSX Export (Coming Soon)", description: "This feature will be implemented." });
  const handleExportPDF = () => toast({ title: "PDF Export (Coming Soon)", description: "This feature will be implemented." });

  const showResultsCard = (Number(watchedGrossIncome) || 0) > 0 || calculationResults.finalCorporationTaxDue !== initialCalculationResults.finalCorporationTaxDue;

  const faqItems = [
    {
      value: "item-1",
      trigger: "Who Pays Corporation Tax?",
      content: "A Trinidad and Tobago resident corporation is taxed on worldwide income. A non-resident company engaged in business in Trinidad and Tobago is taxed only on income directly or indirectly accruing in or derived from Trinidad and Tobago. This includes limited liability companies, unincorporated associations, and other bodies corporate.",
    },
    {
      value: "item-2",
      trigger: "Latest Tax Rates (Simplified Overview)",
      content: (
        <>
          <p className="mb-2">The standard corporation tax rate is 30%, but varies for certain classes of companies. This calculator uses simplified rates for estimation. For exact applicability and conditions, refer to the Income Tax Act and official IRD guidelines.</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Ordinary Companies:</strong> 30% (e.g., retail, services, manufacturing not in special categories).</li>
            <li><strong>Commercial Banks & Petrochemical Companies:</strong> 35%.</li>
            <li><strong>Life Insurance Companies:</strong> Chargeable income from the long-term insurance business is taxed at 15%. Other profits may be subject to different rates (e.g. 30%). This calculator uses a simplified 15% for estimation.</li>
            <li><strong>General Insurance Companies:</strong> 30%.</li>
            <li><strong>Petroleum Production Companies (Petroleum Profits Tax):</strong> 50% on profits from petroleum operations.</li>
            <li><strong>Petroleum Production Companies (Deep Sea Operations):</strong> 30% under specific contractual arrangements.</li>
            <li><strong>Small and Medium Enterprises (SMEs) Listed on the T&T Stock Exchange:</strong> The first TT$1,000,000 of chargeable profit is taxed at 0%, and profits exceeding TT$1,000,000 are taxed at 15%. This calculator uses a simplified 10% for general estimation.</li>
            <li><strong>Companies in Special Economic Zones (SEZs):</strong> May qualify for a rate of 1% or other concessions under the SEZ Act.</li>
          </ul>
          <p className="mt-2 text-xs">Rates and conditions can change with new Finance Acts. Always consult the latest legislation.</p>
        </>
      ),
    },
    {
      value: "item-3",
      trigger: "Filing Deadlines",
      content: "Corporation Tax returns are typically due by April 30th of the year following the income year (for companies with a December 31st year-end). Quarterly installment payments are due by March 31, June 30, September 30, and December 31. Always verify specific deadlines with the IRD.",
    },
    {
      value: "item-4",
      trigger: "Penalties, Interest, and Offences",
      content: "Failure to comply with the Corporation Tax Act, including late filing of returns, late payment of taxes, or incorrect declarations, can lead to penalties and interest charges. Specific offences and their corresponding penalties are detailed in the Income Tax Act and Corporation Tax Act. It is crucial to adhere to all filing and payment obligations to avoid these. For detailed information, refer to the relevant sections of the Acts or consult with the IRD/a tax professional.",
    },
     {
      value: "item-adjustments",
      trigger: "Adjustments to Net Income (Profit)",
      content: (<>
        <p className="text-sm text-muted-foreground">These items are either added back or deducted from accounting profit to arrive at the taxable profit:</p>
        <h4 className="font-semibold text-sm mt-2">➕ Additions to Profit</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Depreciation Expense: Replace accounting depreciation with tax capital allowances.</li>
          <li>Non-deductible Expenses: Personal or non-business-related expenses, Entertainment (beyond permitted limit), Donations (without tax exemption status), Fines and penalties.</li>
          <li>Provisions and Reserves: (e.g., provision for doubtful debts, general provisions).</li>
          <li>Amortisation of Non-taxable Items (e.g., goodwill amortisation).</li>
          <li>Capital Expenditures: Capital expenses incorrectly recorded as operating expenses.</li>
        </ul>
        <h4 className="font-semibold text-sm mt-2">➖ Deductions from Profit</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Capital Allowances (Wear and Tear Allowance): Deduction based on official capital allowance rates.</li>
          <li>Tax-exempt Income: Income from sources specifically exempted from corporation tax (e.g., dividends from resident companies).</li>
          <li>Previously Taxed Income: Avoiding double taxation of previously taxed amounts.</li>
        </ul>
      </>),
    },
    {
      value: "item-offsets",
      trigger: "Tax Offsets (Credits)",
      content: (<>
        <p className="text-sm text-muted-foreground">Corporation Tax liabilities may be offset by:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Business Levy Paid: Deduction of the Business Levy already paid during the tax year.</li>
          <li>Quarterly Installments Already Paid: Quarterly payments made towards your annual tax liability.</li>
          <li>Foreign Tax Credits: Taxes paid on income earned abroad (subject to Double Taxation Agreements).</li>
          <li>Green Fund Levy: Although the Green Fund Levy itself isn’t offsettable, tracking it separately ensures correct tax accounting.</li>
        </ul>
      </>)
    },
    {
      value: "item-capital-allowances",
      trigger: "Capital Allowances (Wear and Tear Allowances)",
      content: (<>
        <p className="text-sm text-muted-foreground">Replace accounting depreciation with official capital allowances for assets including:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Machinery and Equipment</li>
          <li>Motor Vehicles</li>
          <li>Computer Hardware and Software</li>
          <li>Buildings (Industrial and Commercial)</li>
        </ul>
        <p className="text-sm text-muted-foreground">These allowances reduce taxable income.</p>
      </>)
    },
    {
      value: "item-loss-relief",
      trigger: "Loss Relief",
      content: (<>
        <p className="text-sm text-muted-foreground">Businesses can claim offsets from losses carried forward from prior tax years, reducing the taxable profit:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Carry-forward Losses: Business losses from previous years can offset future profits.</li>
          <li>Group Relief (if applicable): Transfer of losses within a corporate group structure.</li>
        </ul>
      </>)
    },
    {
      value: "item-dta",
      trigger: "Double Taxation Relief",
      content: (<>
        <p className="text-sm text-muted-foreground">If Trinidad and Tobago has Double Taxation Agreements (DTAs) with other countries, taxes already paid abroad can offset local Corporation Tax liabilities.</p>
        <p className="text-sm text-muted-foreground">Examples:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
          <li>Income from CARICOM states</li>
          <li>Income from countries with DTAs (e.g., Canada, USA, UK)</li>
        </ul>
      </>)
    },
    {
      value: "item-transfer-pricing",
      trigger: "Adjustments for Related-Party Transactions (Transfer Pricing)",
      content: <p className="text-sm text-muted-foreground">Ensuring arm’s length pricing for goods and services provided between related entities.</p>
    },
    {
      value: "item-withholding",
      trigger: "Withholding Taxes (if applicable)",
      content: <p className="text-sm text-muted-foreground">Deduction or credit for withholding taxes already deducted on income received (e.g., royalties, dividends, management fees).</p>
    },
     {
      value: "item-important-links",
      trigger: "Important Links & Disclaimer",
      content: (<>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li><a href="https://www.ird.gov.tt/corporations" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">IRD - Corporation Tax Information</a></li>
          <li><a href="https://www.finance.gov.tt/wp-content/uploads/2014/08/The-Corporation-Tax-Act.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Corporation Tax Act (finance.gov.tt)</a></li>
           <li><a href="http://rgd.legalaffairs.gov.tt/Laws2/Alphabetical_List/lawspdfs/75.01.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Income Tax Act (Chap. 75:01) (legalaffairs.gov.tt)</a></li>
        </ul>
        This calculator provides an estimate and does not cover all scenarios (e.g., specific industry incentives, detailed capital allowance rules, group relief, exact tiered rate calculations for SMEs/Life Insurance).
      </>),
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">Corporation Tax Calculator</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Estimate your company's Corporation Tax liability for Trinidad and Tobago. This calculator provides an estimate based on general rates and rules. For precise calculations, especially for complex scenarios or specific industries, refer to the official tax legislation and consult a tax professional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-6"> 
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Input Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Tax Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select tax year" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {taxYearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground" />Company Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select company type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {companyTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">Refer to FAQ for rate details.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Income Input Period</Label>
                    <Select value={incomeInputPeriod} onValueChange={(value: "annually" | "quarterly" | "monthly") => setIncomeInputPeriod(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income input period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annually">Annual Income</SelectItem>
                        <SelectItem value="quarterly">Quarterly Incomes (4 Quarters)</SelectItem>
                        <SelectItem value="monthly">Monthly Incomes (12 months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {incomeInputPeriod === "annually" && (
                    <FormItem>
                      <FormLabel>Annual Gross Income (TT$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 500000" value={annualIncomeInput} onChange={(e) => setAnnualIncomeInput(e.target.value)} />
                      </FormControl>
                    </FormItem>
                  )}
                  {incomeInputPeriod === "quarterly" && (
                     <div className="space-y-4">
                      <Label className="font-semibold">Quarterly Gross Incomes (TT$)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {quarterlyIncomes.map((income, index) => (
                          <FormItem key={`quarter-${index}`}>
                            <Label htmlFor={`quarter-${index}-income`} className="text-xs text-muted-foreground">Quarter {index + 1}</Label>
                            <Input
                              id={`quarter-${index}-income`}
                              type="number"
                              step="0.01"
                              placeholder="e.g., 125000"
                              value={income}
                              onChange={(e) => {
                                const newQuarterlyIncomes = [...quarterlyIncomes];
                                newQuarterlyIncomes[index] = e.target.value;
                                setQuarterlyIncomes(newQuarterlyIncomes);
                              }}
                              className="h-9 text-xs"
                            />
                          </FormItem>
                        ))}
                      </div>
                      <FormDescription className="text-xs">Enter income for each of the 4 quarters. The sum will be used as the annualized income.</FormDescription>
                    </div>
                  )}
                  {incomeInputPeriod === "monthly" && (
                    <div className="space-y-4">
                      <Label className="font-semibold">Monthly Gross Incomes (TT$)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                        {monthlyIncomes.map((income, index) => (
                          <FormItem key={`month-${index}`}>
                            <Label htmlFor={`month-${index}-income`} className="text-xs text-muted-foreground">Month {index + 1}</Label>
                            <Input
                              id={`month-${index}-income`}
                              type="number"
                              step="0.01"
                              placeholder="e.g., 41667"
                              value={income}
                              onChange={(e) => {
                                const newMonthlyIncomes = [...monthlyIncomes];
                                newMonthlyIncomes[index] = e.target.value;
                                setMonthlyIncomes(newMonthlyIncomes);
                              }}
                              className="h-9 text-xs"
                            />
                          </FormItem>
                        ))}
                      </div>
                      <FormDescription className="text-xs">Enter income for each of the 12 months. The sum will be used as the annualized income.</FormDescription>
                    </div>
                  )}

                   <FormField
                    control={form.control}
                    name="grossIncome"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel className="flex items-center font-semibold"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Annualized Gross Income (TT$)</FormLabel>
                        <FormControl><Input type="number" step="0.01" {...field} value={field.value ?? ""} readOnly className="bg-muted/50 font-bold" /></FormControl>
                        <FormDescription className="text-xs">Auto-calculated based on your input period.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center">
                        <Receipt className="mr-2 h-5 w-5" /> Operating Expenses
                    </CardTitle>
                    <CardDescription>Enter your company's operating expenses for the tax year. The total will automatically update "Allowable Deductions".</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-end border-b pb-2 last:border-b-0 last:pb-0">
                      <FormField
                        control={form.control}
                        name={`dynamicOperatingExpenses.${index}.expenseType`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel className="text-xs">Expense Type</FormLabel>}
                            <Popover open={comboboxOpenStates[index]} onOpenChange={(open) => handleComboboxOpenChange(index, open)}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between h-9 text-xs",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? expenseOptionsList.find(
                                          (option) => option.value === field.value
                                        )?.label || field.value 
                                      : "Select or type expense..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                  <CommandInput 
                                    placeholder="Search or type custom..." 
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="h-9 text-xs"
                                  />
                                  <CommandList>
                                    <CommandEmpty>No predefined expense found. Your typed text will be used.</CommandEmpty>
                                    <CommandGroup>
                                      {expenseOptionsList.map((option) => (
                                        <CommandItem
                                          value={option.value}
                                          key={option.value}
                                          onSelect={() => {
                                            form.setValue(`dynamicOperatingExpenses.${index}.expenseType`, option.value);
                                            handleComboboxOpenChange(index, false);
                                          }}
                                          className="text-xs"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              option.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {option.category} - {option.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`dynamicOperatingExpenses.${index}.expenseValue`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel className="text-xs">Value (TT$)</FormLabel>}
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="e.g., 1000"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                className="h-9 text-xs"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 mt-auto"
                        onClick={() => remove(index)}
                        aria-label="Remove expense"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ expenseType: "", expenseValue: 0 })}
                    className="w-full mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Expense Line
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />Adjustments &amp; Offsets
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <FormField
                      control={form.control}
                      name="allowableDeductions"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel className="flex items-center font-semibold"><Sigma className="mr-2 h-4 w-4 text-muted-foreground" />Total Allowable Deductions (TT$)</FormLabel>
                          <FormControl><Input type="number" step="0.01" {...field} value={field.value ?? ""} readOnly className="bg-muted/50 font-bold" /></FormControl>
                          <FormDescription>Sum of detailed operating expenses.</FormDescription>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <div className="p-3 bg-muted/50 rounded-md">
                      <Label className="flex items-center mb-1 font-semibold">Chargeable Income (Before Other Income/Loss)</Label>
                      <p className="text-lg font-bold text-primary">${formatCurrency(chargeableIncomeAutoCalculated)}</p>
                      <FormDescription className="mt-1">Annualized Gross Income - Total Allowable Deductions</FormDescription>
                  </div>
                  <FormField
                      control={form.control}
                      name="otherIncome"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Other Income (e.g., Dividends, Royalties) (TT$)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="e.g., 10000" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="lossCarriedForward"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel className="flex items-center"><TrendingDown className="mr-2 h-4 w-4 text-muted-foreground" />Loss Carried Forward (TT$)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000 (optional)" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="businessLevyPaid"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Business Levy Paid (for offset) (TT$)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="e.g., 1500 (optional)" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="taxCreditsClaimed"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Tax Credits Claimed (TT$)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="e.g., 1000 (optional)" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                          <FormDescription>E.g., investment tax credits.</FormDescription>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>

           {showResultsCard ? (
            <Card className="shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Percent className="mr-2 h-5 w-5" /> Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Annualized Gross Income:</span>
                  <span className="font-semibold text-lg">${formatCurrency(watchedGrossIncome)}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Total Allowable Deductions:</span>
                  <span className="font-semibold text-lg">${formatCurrency(watchedAllowableDeductions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Chargeable Income (Gross - Total Deductions):</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.chargeableIncomeBeforeAdjustments)}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Final Chargeable Income (after Other Income/Loss):</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.finalChargeableIncome)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Tax Rate Applied (Simplified):</span>
                  <span className="font-semibold text-lg">{(calculationResults.taxRateApplied * 100).toFixed(1)}%</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Tax Before Offsets/Credits:</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.corporationTaxBeforeOffsets)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Business Levy Offset Applied:</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.businessLevyOffsetApplied)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Tax Credits Applied:</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.taxCreditsApplied)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3 mt-3">
                  <span className="font-bold text-xl text-primary">Final Corporation Tax Due:</span>
                  <span className="font-bold text-xl text-primary">${formatCurrency(calculationResults.finalCorporationTaxDue)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 pt-6 border-t mt-4">
                 <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
                    <CopyIcon className="mr-2 h-4 w-4" /> Copy Results
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full text-sm h-9 flex-1">
                        <Download className="mr-2 h-4 w-4" /> Export Data <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={handleExportCSV}>Export as CSV</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportXLSX}>Export as XLSX (Coming Soon)</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportPDF}>Export as PDF (Coming Soon)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="destructive" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl shadow-xl rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Info className="mr-2 h-5 w-5" />Information &amp; Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map(item => (
              <AccordionItem value={item.value} key={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground flex items-start">
                <AlertCircle size={16} className="mr-2 mt-0.5 shrink-0" />
                <span>This calculator provides simplified estimates. Corporation tax laws in Trinidad and Tobago are complex and include specific provisions for different industries (e.g., petroleum, insurance, banking, petrochemicals), various types of income, detailed capital allowance rules, group relief, withholding taxes, and potential penalties or interest for non-compliance. The rates for Life Insurance and SMEs (Listed) are tiered and depend on specific profit thresholds or income types not fully captured by this simplified tool. Always consult the official Corporation Tax Act and Income Tax Act of Trinidad and Tobago, IRD guidelines, or a qualified tax professional for definitive advice and precise calculations.</span>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

