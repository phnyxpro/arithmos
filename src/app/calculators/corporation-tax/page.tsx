
"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
import { Building, FileText, CalendarDays, DollarSign, TrendingDown, Percent, Download, Info, AlertCircle } from "lucide-react";
import { getYear } from 'date-fns';

const currentYear = getYear(new Date());
const taxYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

const companyTypeOptions = [
  { value: "regular", label: "Regular Company (e.g. Retail, Services)", rate: 0.30 },
  { value: "commercial_bank", label: "Commercial Bank", rate: 0.35 },
  { value: "petroleum_upstream", label: "Petroleum Co. (Upstream Exploration & Production)", rate: 0.35 }, // This can be higher, 55% for deepwater
  { value: "petroleum_downstream", label: "Petroleum Co. (Downstream Refining & Marketing)", rate: 0.35 },
  { value: "insurance_life", label: "Insurance Co. (Long-term Business)", rate: 0.15 }, // On net investment income, 0% on other profits
  { value: "insurance_general", label: "Insurance Co. (General Business)", rate: 0.30 },
];

const corporationTaxFormSchema = z.object({
  taxYear: z.string({ required_error: "Tax year is required." }),
  companyType: z.string({ required_error: "Company type is required." }),
  grossIncome: z.coerce.number({ required_error: "Gross income is required." }).min(0, "Gross income must be positive."),
  allowableDeductions: z.coerce.number().min(0, "Deductions must be positive.").optional().default(0),
  otherIncome: z.coerce.number().min(0, "Other income must be positive.").optional().default(0),
  lossCarriedForward: z.coerce.number().min(0, "Loss must be positive.").optional().default(0),
  businessLevyPaid: z.coerce.number().min(0, "Business Levy paid must be positive.").optional().default(0),
  taxCreditsClaimed: z.coerce.number().min(0, "Tax credits must be positive.").optional().default(0),
});

type CorporationTaxFormData = z.infer<typeof corporationTaxFormSchema>;

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

  const form = useForm<CorporationTaxFormData>({
    resolver: zodResolver(corporationTaxFormSchema),
    defaultValues: {
      taxYear: currentYear.toString(),
      companyType: "regular",
      grossIncome: undefined,
      allowableDeductions: 0,
      otherIncome: 0,
      lossCarriedForward: 0,
      businessLevyPaid: 0,
      taxCreditsClaimed: 0,
    },
  });

  const chargeableIncomeAutoCalculated = React.useMemo(() => {
    const gross = form.watch("grossIncome") || 0;
    const deductions = form.watch("allowableDeductions") || 0;
    return Math.max(0, gross - deductions);
  }, [form.watch("grossIncome"), form.watch("allowableDeductions")]);

  const onSubmit: SubmitHandler<CorporationTaxFormData> = (data) => {
    const selectedCompanyType = companyTypeOptions.find(opt => opt.value === data.companyType);
    if (!selectedCompanyType) {
      toast({ title: "Error", description: "Invalid company type selected.", variant: "destructive" });
      return;
    }

    let taxRate = selectedCompanyType.rate;
    // Special logic for life insurance could be more complex, this is simplified
    if (data.companyType === "insurance_life") {
      // Assuming otherIncome represents net investment income for simplicity here.
      // Realistically, profits other than net investment income would be 0% taxed.
      // This simplification taxes *all* adjusted chargeable income at 15%.
      taxRate = 0.15; 
    }

    const initialChargeable = chargeableIncomeAutoCalculated;
    const finalChargeable = Math.max(0, initialChargeable + data.otherIncome - data.lossCarriedForward);
    const taxBeforeOffsetsAndCredits = finalChargeable * taxRate;
    
    // Business Levy can be offset against Corporation Tax.
    // The offset is limited to the amount of Corporation Tax liability *before* this offset.
    const blOffset = Math.min(data.businessLevyPaid, taxBeforeOffsetsAndCredits);
    const taxAfterBLOffset = taxBeforeOffsetsAndCredits - blOffset;

    // Tax credits are applied after BL offset.
    // Tax credits cannot result in a refund beyond tax paid (liability cannot be negative).
    const creditsApplied = Math.min(data.taxCreditsClaimed, taxAfterBLOffset);
    const finalTax = Math.max(0, taxAfterBLOffset - creditsApplied);

    setCalculationResults({
      chargeableIncomeBeforeAdjustments: initialChargeable,
      finalChargeableIncome: finalChargeable,
      taxRateApplied: taxRate,
      corporationTaxBeforeOffsets: taxBeforeOffsetsAndCredits,
      businessLevyOffsetApplied: blOffset,
      taxCreditsApplied: creditsApplied,
      finalCorporationTaxDue: finalTax,
    });

    toast({ title: "Corporation Tax Calculated", description: "Review the estimated tax liability below." });
  };

  const handleExportSummary = () => {
    // Placeholder for export logic
    console.log("Export Summary Clicked. Data:", form.getValues(), "Results:", calculationResults);
    toast({ title: "Export (Simulated)", description: "Summary export feature to be implemented." });
  };
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const faqItems = [
    {
      value: "item-1",
      trigger: "Who Pays Corporation Tax?",
      content: "Corporation Tax is generally paid by companies resident in Trinidad and Tobago on their worldwide profits, and by non-resident companies on profits accruing in or derived from Trinidad and Tobago. This includes limited liability companies, unincorporated associations, and other bodies corporate.",
    },
    {
      value: "item-2",
      trigger: "Latest Tax Rates (Simplified)",
      content: "General Rate: 30%. Commercial Banks: 35%. Petroleum Companies (Exploration & Production): 35% (can be up to 55% for deepwater). Petroleum Companies (Refining & Marketing): 35%. Life Insurance Companies: 15% on net investment income, 0% on other profits. General Insurance: 30%. Rates can change with new Finance Acts.",
    },
    {
      value: "item-3",
      trigger: "Filing Deadlines",
      content: "Corporation Tax returns are typically due by April 30th of the year following the income year (for companies with a December 31st year-end). Quarterly installment payments are due by March 31, June 30, September 30, and December 31. Always verify specific deadlines with the IRD.",
    },
     {
      value: "item-4",
      trigger: "Important Links & Disclaimer",
      content: (<>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li><a href="https://www.ird.gov.tt/corporations" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">IRD - Corporation Tax Information</a></li>
          <li><a href="https://www.finance.gov.tt/wp-content/uploads/2014/08/The-Corporation-Tax-Act.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">The Corporation Tax Act (finance.gov.tt)</a></li>
        </ul>
        This calculator provides an estimate and does not cover all scenarios (e.g., specific industry incentives, detailed capital allowance rules, group relief).
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
            Estimate your company's Corporation Tax liability for Trinidad and Tobago. This calculator provides an estimate based on standard rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="grossIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Gross Income (TT$)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 500000" {...field} value={field.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="allowableDeductions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><TrendingDown className="mr-2 h-4 w-4 text-muted-foreground" />Allowable Deductions (TT$)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 100000" {...field} value={field.value ?? ""} /></FormControl>
                        <FormDescription>Operating expenses, interest, capital allowances, etc.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="p-3 bg-muted/50 rounded-md">
                    <FormLabel className="flex items-center mb-1 font-semibold">Chargeable Income (Auto-Calculated)</FormLabel>
                    <p className="text-lg font-bold text-primary">${formatCurrency(chargeableIncomeAutoCalculated)}</p>
                    <FormDescription className="mt-1">Gross Income - Allowable Deductions</FormDescription>
                  </div>
                   <FormField
                    control={form.control}
                    name="otherIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Other Income (e.g., Dividends, Royalties) (TT$)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 10000" {...field} value={field.value ?? ""} /></FormControl>
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
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 5000 (optional)" {...field} value={field.value ?? ""} /></FormControl>
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
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 1500 (optional)" {...field} value={field.value ?? ""} /></FormControl>
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
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 1000 (optional)" {...field} value={field.value ?? ""} /></FormControl>
                         <FormDescription>E.g., investment tax credits.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Calculate Corporation Tax</Button>
                </CardContent>
              </Card>
            </form>
          </Form>

          {calculationResults.finalCorporationTaxDue > 0 || calculationResults.chargeableIncomeBeforeAdjustments > 0 || form.formState.isSubmitted ? (
            <Card className="shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Percent className="mr-2 h-5 w-5" /> Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Chargeable Income (Before Adjustments):</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.chargeableIncomeBeforeAdjustments)}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Final Chargeable Income:</span>
                  <span className="font-semibold text-lg">${formatCurrency(calculationResults.finalChargeableIncome)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Tax Rate Applied:</span>
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
              <CardFooter>
                <Button onClick={handleExportSummary} variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export Summary
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
                <span>This calculator provides simplified estimates. Corporation tax laws are complex and include specific provisions for different industries (e.g., petroleum, insurance), various types of income (e.g., capital gains), detailed capital allowance rules, group relief, withholding taxes, and more. Always consult the official Corporation Tax Act of Trinidad and Tobago, IRD guidelines, or a qualified tax professional for definitive advice and precise calculations.</span>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

    