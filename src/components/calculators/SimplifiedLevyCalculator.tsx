
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { BarChart3, CalendarDays, DollarSign, Building, Copy, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const appCurrentYear = new Date().getFullYear();
const incorporationYears = Array.from({ length: 30 }, (_, i) => (appCurrentYear - i).toString());
const paymentYears = [
  (appCurrentYear - 1).toString(),
  appCurrentYear.toString(),
  (appCurrentYear + 1).toString(),
];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

const BUSINESS_LEVY_RATE = 0.006; // 0.6%
const GREEN_FUND_LEVY_RATE = 0.003; // 0.3%
const BUSINESS_LEVY_EXEMPTION_YEARS = 3;
const INTEREST_RATE_ON_SHORTFALL = 0.15; // 15%

export function SimplifiedLevyCalculator() {
  const { toast } = useToast();

  const [incomePeriod, setIncomePeriod] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [month1Income, setMonth1Income] = useState<string>("50000");
  const [month2Income, setMonth2Income] = useState<string>("500000");
  const [month3Income, setMonth3Income] = useState<string>("50000");
  const [quarterlyIncome, setQuarterlyIncome] = useState<string>("");
  const [annualDirectIncome, setAnnualDirectIncome] = useState<string>("");
  
  const defaultIncorpYear = incorporationYears.includes((appCurrentYear - 2).toString()) 
    ? (appCurrentYear - 2).toString() 
    : Math.max(...incorporationYears.map(Number)).toString();
  const [yearOfIncorporation, setYearOfIncorporation] = useState<string>(defaultIncorpYear);
  
  const [paymentYear, setPaymentYear] = useState<string>(appCurrentYear.toString());
  const [paymentQuarter, setPaymentQuarter] = useState<string>("Q1");
  const [amountPaidForQuarter, setAmountPaidForQuarter] = useState<string>("");
  const [currentDateOnMount, setCurrentDateOnMount] = useState<string>("");

  useEffect(() => {
    setCurrentDateOnMount(new Date().toLocaleDateString()); // Using a more readable date format
  }, []);

  const initialCalculationResults = {
    annualizedGrossIncome: "0.00",
    businessLevy: "0.00",
    greenFundLevy: "0.00",
    totalEstimatedLevies: "0.00",
    quarterlyLevyDueDisplay: "0.00",
    minimumPaymentThresholdDisplay: "0.00",
    amountPaidDisplay: "0.00",
    actualShortfallDisplay: "0.00",
    estimatedAnnualInterestDisplay: "0.00",
  };
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const parseNum = (val: string) => parseFloat(val) || 0;

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCalculateLevies = useCallback(() => {
    let agi = 0;
    const m1 = parseNum(month1Income);
    const m2 = parseNum(month2Income);
    const m3 = parseNum(month3Income);
    const qIncome = parseNum(quarterlyIncome);
    const annIncome = parseNum(annualDirectIncome);
    
    if (incomePeriod === "monthly") {
      const quarterlyFromMonthly = m1 + m2 + m3;
      agi = quarterlyFromMonthly * 4;
    } else if (incomePeriod === "quarterly") {
      agi = qIncome * 4;
    } else if (incomePeriod === "annual") {
      agi = annIncome;
    }

    const gfl = agi * GREEN_FUND_LEVY_RATE;

    let bl = 0;
    const incorpYearNum = parseInt(yearOfIncorporation, 10);
    const paymentYearNum = parseInt(paymentYear, 10);
    const isExempt = paymentYearNum < incorpYearNum + BUSINESS_LEVY_EXEMPTION_YEARS;

    if (!isExempt) {
      bl = agi * BUSINESS_LEVY_RATE;
    }

    const totalAnnualLevies = bl + gfl;
    const quarterlyLevyDue = totalAnnualLevies / 4;
    const minimumPaymentThreshold = quarterlyLevyDue * 0.90;
    const amountPaidForQuarterNum = parseNum(amountPaidForQuarter);
    const actualShortfall = Math.max(0, quarterlyLevyDue - amountPaidForQuarterNum);
    
    let interestApplicableShortfall = 0;
    if (amountPaidForQuarterNum < minimumPaymentThreshold && actualShortfall > 0) {
      interestApplicableShortfall = actualShortfall;
    }
    const estimatedAnnualInterest = interestApplicableShortfall * INTEREST_RATE_ON_SHORTFALL;

    setCalculationResults({
      annualizedGrossIncome: formatCurrency(agi),
      businessLevy: formatCurrency(bl),
      greenFundLevy: formatCurrency(gfl),
      totalEstimatedLevies: formatCurrency(totalAnnualLevies),
      quarterlyLevyDueDisplay: formatCurrency(quarterlyLevyDue),
      minimumPaymentThresholdDisplay: formatCurrency(minimumPaymentThreshold),
      amountPaidDisplay: formatCurrency(amountPaidForQuarterNum),
      actualShortfallDisplay: formatCurrency(actualShortfall),
      estimatedAnnualInterestDisplay: formatCurrency(estimatedAnnualInterest),
    });
  }, [incomePeriod, month1Income, month2Income, month3Income, quarterlyIncome, annualDirectIncome, yearOfIncorporation, paymentYear, amountPaidForQuarter]);

  useEffect(() => {
    handleCalculateLevies();
  }, [handleCalculateLevies]);

  const handleCopyResults = () => {
    let incomeDetails = `Income Period: ${incomePeriod.charAt(0).toUpperCase() + incomePeriod.slice(1)}\n`;
    if (incomePeriod === "monthly") {
      incomeDetails += `Month 1 Income: $${formatCurrency(parseNum(month1Income))}\n`;
      incomeDetails += `Month 2 Income: $${formatCurrency(parseNum(month2Income))}\n`;
      incomeDetails += `Month 3 Income: $${formatCurrency(parseNum(month3Income))}\n`;
    } else if (incomePeriod === "quarterly") {
      incomeDetails += `Quarterly Income: $${formatCurrency(parseNum(quarterlyIncome))}\n`;
    } else if (incomePeriod === "annual") {
      incomeDetails += `Annual Income: $${formatCurrency(parseNum(annualDirectIncome))}\n`;
    }

    const resultsText = `
LEVY CALCULATOR RESULTS
---------------------------------
Inputs:
${incomeDetails}
Year of Incorporation: ${yearOfIncorporation}
Payment Year: ${paymentYear}
Payment Quarter: ${paymentQuarter}
Amount Paid for ${paymentQuarter} ${paymentYear}: $${formatCurrency(parseNum(amountPaidForQuarter))}
---------------------------------
Calculated Annual Levies:
Annualized Gross Income: $${calculationResults.annualizedGrossIncome}
Business Levy (Annual): $${calculationResults.businessLevy}
Green Fund Levy (Annual): $${calculationResults.greenFundLevy}
Total Estimated Annual Levies: $${calculationResults.totalEstimatedLevies}
---------------------------------
Quarterly Payment & Interest Estimate for ${paymentQuarter} ${paymentYear}:
Quarterly Levy Due (Total / 4): $${calculationResults.quarterlyLevyDueDisplay}
Minimum 90% Payment Required: $${calculationResults.minimumPaymentThresholdDisplay}
Amount Paid This Quarter: $${calculationResults.amountPaidDisplay}
Shortfall for Quarter: $${calculationResults.actualShortfallDisplay}
Estimated Annual Interest on Shortfall (if applicable): $${calculationResults.estimatedAnnualInterestDisplay}
---------------------------------
Calculation Date: ${currentDateOnMount}
Disclaimer: This calculator provides an estimate for illustrative purposes only. Always consult official IRD guidelines and a qualified professional.
    `;
    navigator.clipboard.writeText(resultsText.trim());
    toast({ title: "Results Copied!", description: "Calculation details copied to clipboard." });
  };

  const handleClearFields = () => {
    setIncomePeriod("monthly");
    setMonth1Income(""); 
    setMonth2Income(""); 
    setMonth3Income(""); 
    setQuarterlyIncome("");
    setAnnualDirectIncome("");
    setYearOfIncorporation(defaultIncorpYear);
    setPaymentYear(appCurrentYear.toString());
    setPaymentQuarter("Q1");
    setAmountPaidForQuarter("");
    setCalculationResults(initialCalculationResults); // Reset results too
    toast({ title: "Fields Cleared", description: "Calculator inputs and results have been reset." });
  };

  return (
    <div className="py-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="incomePeriodLevySimple" className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              Income Period for Annualization
            </Label>
            <Select value={incomePeriod} onValueChange={(value: "monthly" | "quarterly" | "annual") => setIncomePeriod(value)}>
              <SelectTrigger id="incomePeriodLevySimple" className="h-9 text-sm">
                <SelectValue placeholder="Select income period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly (Enter 3 Months)</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {incomePeriod === "monthly" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "month1Income", label: "Month 1 Income", value: month1Income, setter: setMonth1Income },
                { id: "month2Income", label: "Month 2 Income", value: month2Income, setter: setMonth2Income },
                { id: "month3Income", label: "Month 3 Income", value: month3Income, setter: setMonth3Income },
              ].map(month => (
                <div key={month.id} className="space-y-1">
                  <Label htmlFor={month.id} className="flex items-center text-sm">
                    <DollarSign className="mr-1 h-3 w-3 text-muted-foreground" /> {month.label}
                  </Label>
                  <Input
                    id={month.id}
                    type="number"
                    step="0.01"
                    placeholder="e.g., 20000"
                    value={month.value}
                    onChange={(e) => month.setter(e.target.value)}
                    className="h-9 text-sm mt-1"
                  />
                </div>
              ))}
            </div>
          )}

          {incomePeriod === "quarterly" && (
            <div className="space-y-1">
              <Label htmlFor="quarterlyIncome" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Quarterly Gross Income (TT$)
              </Label>
              <Input
                id="quarterlyIncome"
                type="number"
                step="0.01"
                placeholder="e.g., 150000"
                value={quarterlyIncome}
                onChange={(e) => setQuarterlyIncome(e.target.value)}
                className="h-9 text-sm mt-1"
              />
            </div>
          )}

          {incomePeriod === "annual" && (
            <div className="space-y-1">
              <Label htmlFor="annualDirectIncome" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Annual Gross Income (TT$)
              </Label>
              <Input
                id="annualDirectIncome"
                type="number"
                step="0.01"
                placeholder="e.g., 600000"
                value={annualDirectIncome}
                onChange={(e) => setAnnualDirectIncome(e.target.value)}
                className="h-9 text-sm mt-1"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="space-y-1">
              <Label htmlFor="yearOfIncorporation" className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                Year of Incorporation
              </Label>
              <Select value={yearOfIncorporation} onValueChange={setYearOfIncorporation}>
                <SelectTrigger id="yearOfIncorporation" className="h-9 text-sm">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {incorporationYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="paymentYear" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                Payment Year
              </Label>
              <Select value={paymentYear} onValueChange={setPaymentYear}>
                <SelectTrigger id="paymentYear" className="h-9 text-sm">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {paymentYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="paymentQuarter" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                Payment Quarter
              </Label>
              <Select value={paymentQuarter} onValueChange={setPaymentQuarter}>
                <SelectTrigger id="paymentQuarter" className="h-9 text-sm">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map(q => (
                    <SelectItem key={q} value={q}>{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

           <div className="space-y-1 pt-2">
              <Label htmlFor="amountPaidForQuarter" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Amount Paid for {paymentQuarter} {paymentYear} (TT$)
              </Label>
              <Input
                id="amountPaidForQuarter"
                type="number"
                step="0.01"
                placeholder="e.g., 10000"
                value={amountPaidForQuarter}
                onChange={(e) => setAmountPaidForQuarter(e.target.value)}
                className="h-9 text-sm mt-1"
              />
            </div>
        </div>

        <Card className="mt-4">
          <CardHeader className="p-4">
            <CardTitle className="text-lg text-primary flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" /> Estimated Levies for {paymentYear} {paymentQuarter}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span>Annualized Gross Income:</span> <strong>${calculationResults.annualizedGrossIncome}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between">
              <span>Business Levy (Annual):</span><strong>${calculationResults.businessLevy}</strong>
            </div>
            <div className="flex justify-between">
              <span>Green Fund Levy (Annual):</span> <strong>${calculationResults.greenFundLevy}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Total Estimated Annual Levies:</span> <strong className="text-primary">${calculationResults.totalEstimatedLevies}</strong>
            </div>
            <Separator className="my-2 border-dashed" />
             <div className="text-xs font-semibold text-foreground mb-1">Quarterly Payment & Interest Estimate:</div>
            <div className="flex justify-between">
              <span>Quarterly Levy Due (Total / 4):</span> <strong>${calculationResults.quarterlyLevyDueDisplay}</strong>
            </div>
            <div className="flex justify-between">
              <span>Minimum 90% Payment Required:</span> <strong>${calculationResults.minimumPaymentThresholdDisplay}</strong>
            </div>
             <div className="flex justify-between">
              <span>Amount Paid This Quarter:</span> <strong>${calculationResults.amountPaidDisplay}</strong>
            </div>
            <div className="flex justify-between">
              <span>Shortfall for Quarter:</span> <strong>${calculationResults.actualShortfallDisplay}</strong>
            </div>
            <div className="flex justify-between items-center text-destructive">
              <span className="flex items-center">
                <AlertCircle className="mr-1 h-3 w-3"/> Estimated Annual Interest on Shortfall:
              </span> 
              <strong>${calculationResults.estimatedAnnualInterestDisplay}</strong>
            </div>
            <Separator className="my-1" />
            <p className="text-xs text-muted-foreground pt-2">
              <strong>Interest Note:</strong> Failure to pay at least 90% of the quarterly business levy liability by the end of the quarter results in interest at 15% per annum on the shortfall.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
            <Copy className="mr-2 h-4 w-4" /> Copy Results
          </Button>
          <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          Note: Business Levy exemption for new companies (first 3 years from registration, based on selected Payment Year) is automatically applied if applicable. Otherwise, Business Levy applies at 0.6% on total annualized gross income. Green Fund Levy applies at 0.3% on total annualized gross income (even exempt income) and cannot be offset against other taxes. These are estimates. If 'Monthly' is selected, provide income for 3 consecutive months; the sum will be treated as quarterly income for annualization. If 'Quarterly' is selected, provide income for one quarter; it will be multiplied by 4 for annualization. Levies are typically paid quarterly.
        </p>
      </div>
    </div>
  );
}

    