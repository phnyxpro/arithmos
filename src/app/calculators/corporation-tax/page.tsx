
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
import { Building, FileText, CalendarDays, DollarSign, TrendingDown, Percent, Download, Info, AlertCircle, Receipt, Users, Megaphone, Home, Palette, School, Briefcase as BriefcaseIcon, Archive, Sigma } from "lucide-react";
import { getYear } from 'date-fns';

const currentYear = getYear(new Date());
const taxYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

const companyTypeOptions = [
  { value: "ordinary", label: "Ordinary Company", rate: 0.30 },
  { value: "banking_petrochemical", label: "Banking / Petrochemical Co.", rate: 0.35 },
  { value: "life_insurance", label: "Life Insurance Co.", rate: 0.15 },
  { value: "general_insurance", label: "General Insurance Co.", rate: 0.30 },
  { value: "petroleum_production_std", label: "Petroleum Production (Standard PPT)", rate: 0.50 },
  { value: "petroleum_production_deep_sea", label: "Petroleum Production (Deep Sea)", rate: 0.30 },
  { value: "sme_listed", label: "SME (Listed on Stock Exchange)", rate: 0.10 }, 
  { value: "sez_company", label: "Special Economic Zone Co.", rate: 0.01 },
];

const operatingExpensesSchema = z.object({
  bankServiceCharges: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  salaries: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  advertisingAndPromotion: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  rent: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  creativeSubscriptions: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  training: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  officeExpenses: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  administrativeExpenses: z.coerce.number().min(0, "Must be positive.").optional().default(0),
  depreciation: z.coerce.number().min(0, "Must be positive.").optional().default(0),
});

const corporationTaxFormSchema = z.object({
  taxYear: z.string({ required_error: "Tax year is required." }),
  companyType: z.string({ required_error: "Company type is required." }),
  grossIncome: z.coerce.number({ required_error: "Gross income is required." }).min(0, "Gross income must be positive."),
  operatingExpenses: operatingExpensesSchema.optional(),
  allowableDeductions: z.coerce.number().min(0, "Deductions must be positive.").optional().default(0), // This will be auto-populated
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

const operatingExpenseFields = [
  { name: "bankServiceCharges", label: "Bank Service Charges", icon: Receipt },
  { name: "salaries", label: "Salaries & Wages", icon: Users },
  { name: "advertisingAndPromotion", label: "Advertising & Promotion", icon: Megaphone },
  { name: "rent", label: "Rent Expense", icon: Home },
  { name: "creativeSubscriptions", label: "Creative Subscriptions", icon: Palette },
  { name: "training", label: "Training & Development", icon: School },
  { name: "officeExpenses", label: "Office Supplies & Expenses", icon: BriefcaseIcon },
  { name: "administrativeExpenses", label: "General Administrative Expenses", icon: Archive },
  { name: "depreciation", label: "Depreciation Expense", icon: TrendingDown },
];


export default function CorporationTaxPage() {
  const { toast } = useToast();
  const [calculationResults, setCalculationResults] = React.useState(initialCalculationResults);

  const form = useForm<CorporationTaxFormData>({
    resolver: zodResolver(corporationTaxFormSchema),
    defaultValues: {
      taxYear: currentYear.toString(),
      companyType: "ordinary",
      grossIncome: undefined,
      operatingExpenses: {
        bankServiceCharges: 0,
        salaries: 0,
        advertisingAndPromotion: 0,
        rent: 0,
        creativeSubscriptions: 0,
        training: 0,
        officeExpenses: 0,
        administrativeExpenses: 0,
        depreciation: 0,
      },
      allowableDeductions: 0,
      otherIncome: 0,
      lossCarriedForward: 0,
      businessLevyPaid: 0,
      taxCreditsClaimed: 0,
    },
  });

  const watchedOperatingExpenses = form.watch("operatingExpenses");
  const totalOperatingExpensesDisplay = form.watch("allowableDeductions");

  React.useEffect(() => {
    if (watchedOperatingExpenses) {
      const totalOpEx = Object.values(watchedOperatingExpenses).reduce(
        (sum, val) => sum + (Number(val) || 0), // Robust parsing
        0
      );
      form.setValue("allowableDeductions", totalOpEx, { shouldValidate: true });
    }
  }, [watchedOperatingExpenses, form]);

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
    
    const totalOpEx = data.operatingExpenses 
      ? Object.values(data.operatingExpenses).reduce((sum, val) => sum + (Number(val) || 0), 0)
      : 0;

    const initialChargeable = (data.grossIncome || 0) - totalOpEx;
    const finalChargeable = Math.max(0, initialChargeable + (data.otherIncome || 0) - (data.lossCarriedForward || 0));
    const taxBeforeOffsetsAndCredits = finalChargeable * taxRate;
    
    const blOffset = Math.min(data.businessLevyPaid || 0, taxBeforeOffsetsAndCredits);
    const taxAfterBLOffset = taxBeforeOffsetsAndCredits - blOffset;

    const creditsApplied = Math.min(data.taxCreditsClaimed || 0, taxAfterBLOffset);
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
      value: "item-5",
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
                          <FormDescription className="text-xs">Refer to FAQ for rate details.</FormDescription>
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
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center">
                        <TrendingDown className="mr-2 h-5 w-5" /> Operating Expenses
                    </CardTitle>
                    <CardDescription>Enter your company's operating expenses for the tax year.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {operatingExpenseFields.map(opExField => (
                         <FormField
                            key={opExField.name}
                            control={form.control}
                            name={`operatingExpenses.${opExField.name}` as any}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center text-sm">
                                    {React.createElement(opExField.icon, { className: "mr-2 h-4 w-4 text-muted-foreground" })}
                                    {opExField.label} (TT$)
                                </FormLabel>
                                <FormControl>
                                <Input type="number" step="0.01" placeholder="e.g., 10000" {...field} value={field.value ?? ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    ))}
                    <div className="p-3 bg-muted/50 rounded-md mt-4 border-t pt-4">
                        <FormLabel className="flex items-center mb-1 font-semibold">
                           <Sigma className="mr-2 h-5 w-5 text-primary" /> Total Operating Expenses
                        </FormLabel>
                        <p className="text-lg font-bold text-primary">${formatCurrency(totalOperatingExpensesDisplay || 0)}</p>
                    </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />Adjustments & Offsets
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="allowableDeductions"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center"><TrendingDown className="mr-2 h-4 w-4 text-muted-foreground" />Total Allowable Deductions (TT$)</FormLabel>
                            <FormControl><Input type="number" step="0.01" {...field} value={field.value ?? ""} readOnly className="bg-muted/50" /></FormControl>
                            <FormDescription>Sum of detailed operating expenses. Also includes capital allowances, specific reliefs, etc., not detailed above.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="p-3 bg-muted/50 rounded-md">
                        <FormLabel className="flex items-center mb-1 font-semibold">Chargeable Income (Auto-Calculated)</FormLabel>
                        <p className="text-lg font-bold text-primary">${formatCurrency(chargeableIncomeAutoCalculated)}</p>
                        <FormDescription className="mt-1">Gross Income - Total Allowable Deductions</FormDescription>
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
                </CardContent>
              </Card>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Calculate Corporation Tax</Button>
            </form>
          </Form>

          {calculationResults.finalCorporationTaxDue > 0 || calculationResults.chargeableIncomeBeforeAdjustments > 0 || calculationResults.finalChargeableIncome > 0 || form.formState.isSubmitted ? (
            <Card className="shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Percent className="mr-2 h-5 w-5" /> Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                <span>This calculator provides simplified estimates. Corporation tax laws in Trinidad and Tobago are complex and include specific provisions for different industries (e.g., petroleum, insurance, banking, petrochemicals), various types of income, detailed capital allowance rules, group relief, withholding taxes, and potential penalties or interest for non-compliance. The rates for Life Insurance and SMEs (Listed) are tiered and depend on specific profit thresholds or income types not fully captured by this simplified tool. Always consult the official Corporation Tax Act and Income Tax Act of Trinidad and Tobago, IRD guidelines, or a qualified tax professional for definitive advice and precise calculations.</span>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}


    