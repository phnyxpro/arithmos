
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"; // Added this import
import { FileText as FileTextIcon, CircleUser, CalendarDays, DollarSign, TrendingDown, Percent, Download, Info, AlertCircle } from "lucide-react";
import { getYear } from 'date-fns';

const currentYear = getYear(new Date());
const taxYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

// Simplified NIS and Health Surcharge constants for annual estimation
const NIS_MAX_ANNUAL_EARNINGS_FOR_CALC = 13600 * 12; // Max monthly insurable earnings annualized
const NIS_EMPLOYEE_RATE = 0.056; // Example rate (5.6%) - NIBTT actual is class-based
const HEALTH_SURCHARGE_RATE_LOW_ANNUAL = 4.13 * 52; // $4.13/wk * 52 weeks
const HEALTH_SURCHARGE_RATE_HIGH_ANNUAL = 8.25 * 52; // $8.25/wk * 52 weeks
const HEALTH_SURCHARGE_THRESHOLD_WEEKLY = 110;
const HEALTH_SURCHARGE_THRESHOLD_ANNUAL = HEALTH_SURCHARGE_THRESHOLD_WEEKLY * 52;

const PERSONAL_ALLOWANCE = 90000;
const PAYE_BRACKET_1_LIMIT = 72000;
const PAYE_RATE_1 = 0.25;
const PAYE_RATE_2 = 0.30;


const incomeTaxFormSchema = z.object({
  taxYear: z.string({ required_error: "Income year is required." }),
  grossAnnualIncome: z.coerce
    .number({ required_error: "Gross annual income is required." })
    .min(0, "Income must be positive."),
  otherAllowableDeductions: z.coerce
    .number()
    .min(0, "Deductions must be positive.")
    .optional()
    .default(0),
});

type IncomeTaxFormData = z.infer<typeof incomeTaxFormSchema>;

const initialCalculationResults = {
  displayGrossAnnualIncome: "0.00",
  displayTotalAllowancesDeductions: formatCurrency(PERSONAL_ALLOWANCE),
  displayTaxableIncomePAYE: "0.00",
  displayPayeAnnual: "0.00",
  displayNisAnnual: "0.00",
  displayHealthSurchargeAnnual: "0.00",
  displayTotalEstimatedDeductionsAnnual: "0.00",
  displayNetAnnualIncome: "0.00",
  displayNetMonthlyIncome: "0.00",
  selectedTaxYearDisplay: currentYear.toString(),
};

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function IncomeTaxPage() {
  const { toast } = useToast();
  const [calculationResults, setCalculationResults] = React.useState(initialCalculationResults);

  const form = useForm<IncomeTaxFormData>({
    resolver: zodResolver(incomeTaxFormSchema),
    defaultValues: {
      taxYear: currentYear.toString(),
      grossAnnualIncome: undefined, // Start with undefined for placeholder to show
      otherAllowableDeductions: 0,
    },
    mode: "onChange",
  });

  const watchedGrossAnnualIncome = form.watch("grossAnnualIncome");
  const watchedOtherAllowableDeductions = form.watch("otherAllowableDeductions");
  const watchedTaxYear = form.watch("taxYear");

  React.useEffect(() => {
    const grossIncome = Number(watchedGrossAnnualIncome) || 0;
    const otherDeductions = Number(watchedOtherAllowableDeductions) || 0;

    // Simplified Annual NIS Calculation
    const nisPayableIncome = Math.min(grossIncome, NIS_MAX_ANNUAL_EARNINGS_FOR_CALC);
    const nisAnnual = nisPayableIncome * NIS_EMPLOYEE_RATE;

    // Simplified Annual Health Surcharge
    const healthSurchargeAnnual = grossIncome > HEALTH_SURCHARGE_THRESHOLD_ANNUAL
        ? HEALTH_SURCHARGE_RATE_HIGH_ANNUAL
        : HEALTH_SURCHARGE_RATE_LOW_ANNUAL;
    
    // PAYE Calculation
    const totalDeductionsForPAYE = PERSONAL_ALLOWANCE + nisAnnual + otherDeductions;
    const taxableIncomePAYE = Math.max(0, grossIncome - totalDeductionsForPAYE);
    
    let payeAnnual = 0;
    if (taxableIncomePAYE <= PAYE_BRACKET_1_LIMIT) {
        payeAnnual = taxableIncomePAYE * PAYE_RATE_1;
    } else {
        payeAnnual = (PAYE_BRACKET_1_LIMIT * PAYE_RATE_1) + 
                     ((taxableIncomePAYE - PAYE_BRACKET_1_LIMIT) * PAYE_RATE_2);
    }

    const totalEstimatedDeductionsAnnual = payeAnnual + nisAnnual + healthSurchargeAnnual;
    const netAnnualIncome = Math.max(0, grossIncome - totalEstimatedDeductionsAnnual);
    const netMonthlyIncome = netAnnualIncome / 12;

    const newResults = {
      displayGrossAnnualIncome: formatCurrency(grossIncome),
      displayTotalAllowancesDeductions: formatCurrency(totalDeductionsForPAYE),
      displayTaxableIncomePAYE: formatCurrency(taxableIncomePAYE),
      displayPayeAnnual: formatCurrency(payeAnnual),
      displayNisAnnual: formatCurrency(nisAnnual),
      displayHealthSurchargeAnnual: formatCurrency(healthSurchargeAnnual),
      displayTotalEstimatedDeductionsAnnual: formatCurrency(totalEstimatedDeductionsAnnual),
      displayNetAnnualIncome: formatCurrency(netAnnualIncome),
      displayNetMonthlyIncome: formatCurrency(netMonthlyIncome),
      selectedTaxYearDisplay: watchedTaxYear || currentYear.toString(),
    };
    
    if (JSON.stringify(newResults) !== JSON.stringify(calculationResults)) {
        setCalculationResults(newResults);
    }

  }, [watchedGrossAnnualIncome, watchedOtherAllowableDeductions, watchedTaxYear, calculationResults]);


  const handleExportSummary = () => {
    toast({
      title: "Export Feature Coming Soon",
      description: "The ability to export a summary will be available in a future update.",
    });
  };
  
  const faqItems = [
    { value: "who-pays", trigger: "Who Pays Income Tax in T&T?", content: "Generally, individuals resident in Trinidad and Tobago are liable to income tax on their worldwide income. Non-residents are typically taxed on income arising or accruing in Trinidad and Tobago. Income Tax is administered under the Income Tax Act, Chap. 75:01." },
    { value: "what-is-paye", trigger: "What is PAYE?", content: "PAYE (Pay As You Earn) is the system used to collect Income Tax from employment income. Employers deduct tax from employees' salaries and wages each pay period and remit it to the Board of Inland Revenue (BIR)." },
    { value: "personal-allowance", trigger: "What is the Personal Allowance?", content: "The Personal Allowance is a fixed amount (currently TT$90,000 per annum for resident individuals) that can be deducted from your total income before calculating taxable income. This means the first $90,000 of your annual income is generally tax-free." },
    { value: "tax-rates", trigger: "What are the Income Tax Rates?", content: "For resident individuals, after deducting the Personal Allowance and other allowable deductions, the taxable income is subject to rates of 25% on the first TT$72,000 of chargeable income per annum, and 30% on the excess of chargeable income over TT$72,000 per annum. (Rates as of latest general knowledge; always verify with official IRD sources for the specific income year)." },
    { value: "nis-hs", trigger: "What about NIS and Health Surcharge?", content: "National Insurance Scheme (NIS) contributions and Health Surcharge are also deducted from income. NIS contributions are based on earnings classes and provide benefits like sickness, maternity, and retirement pensions. Health Surcharge is a weekly contribution towards public healthcare. Both are allowable deductions for Income Tax (PAYE) purposes." },
    { value: "links-disclaimer", trigger: "Important Links & Disclaimer", content: (
      <>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li><a href="https://www.ird.gov.tt/individuals" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">IRD - Individuals Information</a></li>
          <li><a href="http://rgd.legalaffairs.gov.tt/Laws2/Alphabetical_List/lawspdfs/75.01.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Income Tax Act (Chap. 75:01) (legalaffairs.gov.tt)</a></li>
        </ul>
        This calculator provides simplified estimates for PAYE, NIS, and Health Surcharge. Actual liabilities can be affected by numerous factors including specific types of income, detailed rules for deductions and allowances (e.g., limits on tertiary education, mortgage interest, first-time homeowner allowance), tax credits, residency status, and changes in tax law or NIBTT rates. The NIS and Health Surcharge estimations are simplified for annual calculation. Always consult the official Income Tax Act, NIBTT guidelines, or a qualified tax professional for definitive advice and precise calculations.
      </>)
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FileTextIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">Personal Income Tax Calculator (T&amp;T)</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Estimate your annual Income Tax (PAYE), NIS, and Health Surcharge. This calculator provides an estimate based on simplified standard rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form> {/* No onSubmit needed here as calculations are live via useEffect */}
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <CircleUser className="mr-2 h-5 w-5" /> Input Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Income Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select income year" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {taxYearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div></div> {/* Empty div for grid layout balance */}
                  </div>
                   <FormField
                    control={form.control}
                    name="grossAnnualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center mb-1"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Gross Annual Income (TT$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 120000" {...field} 
                           onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                           value={field.value === undefined ? "" : field.value}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">Total income from all sources before any deductions.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="p-3 bg-muted/50 rounded-md">
                      <Label className="flex items-center mb-1 font-semibold">Personal Allowance (Fixed)</Label>
                      <p className="text-lg font-bold text-primary">${formatCurrency(PERSONAL_ALLOWANCE)}</p>
                      <FormDescription className="text-xs mt-1">Standard deduction for all resident individuals.</FormDescription>
                  </div>
                  <FormField
                    control={form.control}
                    name="otherAllowableDeductions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center mb-1"><TrendingDown className="mr-2 h-4 w-4 text-muted-foreground" />Other Allowable Deductions (TT$)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 5000 (optional)" {...field}
                             onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                             value={field.value === undefined ? "0" : field.value}
                           />
                        </FormControl>
                        <FormDescription className="text-xs">E.g., Contributions to approved pension funds, tertiary education (up to limits), first-time homeowner allowance (up to limits). Sum all applicable.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Percent className="mr-2 h-5 w-5" /> Estimated Tax &amp; Net Income for {calculationResults.selectedTaxYearDisplay}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Gross Annual Income:</span><span className="font-semibold text-lg">${calculationResults.displayGrossAnnualIncome}</span></div>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Total Allowances &amp; Deductions:</span><span className="font-semibold text-lg">${calculationResults.displayTotalAllowancesDeductions}</span></div>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Taxable Income (for PAYE):</span><span className="font-semibold text-lg">${calculationResults.displayTaxableIncomePAYE}</span></div>
                    <Separator className="my-3"/>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Estimated PAYE (Annual):</span><span className="font-semibold text-lg text-destructive">${calculationResults.displayPayeAnnual}</span></div>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Estimated NIS (Annual):</span><span className="font-semibold text-lg text-destructive">${calculationResults.displayNisAnnual}</span></div>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Estimated Health Surcharge (Annual):</span><span className="font-semibold text-lg text-destructive">${calculationResults.displayHealthSurchargeAnnual}</span></div>
                    <Separator className="my-3"/>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Total Estimated Deductions (Annual):</span><span className="font-semibold text-lg text-destructive">${calculationResults.displayTotalEstimatedDeductionsAnnual}</span></div>
                    <div className="flex justify-between items-center border-t pt-3 mt-3"><span className="font-bold text-xl text-primary">Est. Net Annual Income:</span><span className="font-bold text-xl text-primary">${calculationResults.displayNetAnnualIncome}</span></div>
                    <div className="flex justify-between items-center"><span className="font-medium text-muted-foreground">Est. Net Monthly Income:</span><span className="font-semibold text-lg">${calculationResults.displayNetMonthlyIncome}</span></div>
                </CardContent>
                <CardFooter className="items-center p-6 flex gap-2 pt-4">
                    <Button type="button" onClick={handleExportSummary}>
                        <Download className="mr-2 h-4 w-4"/> Export Summary (Soon)
                    </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl shadow-xl rounded-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Info className="mr-2 h-5 w-5" />Income Tax Information &amp; Resources (T&amp;T)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map(item => (
              <AccordionItem value={item.value} key={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-1">
                    {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
         <CardFooter className="items-center p-6 pt-0">
            <p className="text-xs text-muted-foreground">
              All calculations are estimates. Always consult official BIR TT guides or a tax professional for definitive advice.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

