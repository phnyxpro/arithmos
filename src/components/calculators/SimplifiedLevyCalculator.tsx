
"use client";

import React, { useState, useEffect } from 'react';
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
import { BarChart3, CalendarDays, DollarSign, Building, Copy, Trash2 } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Uncomment if toasts are desired

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

const BUSINESS_LEVY_RATE = 0.006; // 0.6%
const GREEN_FUND_LEVY_RATE = 0.003; // 0.3%
const BUSINESS_LEVY_EXEMPTION_YEARS = 3;

export function SimplifiedLevyCalculator() {
  // const { toast } = useToast(); // Uncomment if toasts are desired

  const [incomePeriod, setIncomePeriod] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [month1Income, setMonth1Income] = useState<string>("50000");
  const [month2Income, setMonth2Income] = useState<string>("500000");
  const [month3Income, setMonth3Income] = useState<string>("50000");
  const [quarterlyIncome, setQuarterlyIncome] = useState<string>("");
  const [annualDirectIncome, setAnnualDirectIncome] = useState<string>("");
  const [yearOfIncorporation, setYearOfIncorporation] = useState<string>(Math.max(...years.map(Number)).toString()); // Default to most recent year available

  const [calculationResults, setCalculationResults] = useState({
    annualizedGrossIncome: "0.00",
    businessLevy: "0.00",
    greenFundLevy: "0.00",
    totalEstimatedLevies: "0.00",
  });

  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateLevies = React.useCallback(() => {
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
    const incorpYear = parseInt(yearOfIncorporation, 10);
    const currentYr = new Date().getFullYear();

    if (currentYr >= incorpYear + BUSINESS_LEVY_EXEMPTION_YEARS) {
      // Not exempt by 3-year rule
      bl = agi * BUSINESS_LEVY_RATE;
    }
    // If within 3 years, bl remains 0 (exempt)

    const totalLevies = bl + gfl;

    setCalculationResults({
      annualizedGrossIncome: agi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      businessLevy: bl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      greenFundLevy: gfl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalEstimatedLevies: totalLevies.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    });
    // toast({ title: "Calculation Updated" });
  }, [incomePeriod, month1Income, month2Income, month3Income, quarterlyIncome, annualDirectIncome, yearOfIncorporation]);

  useEffect(() => {
    handleCalculateLevies();
  }, [handleCalculateLevies]);

  const handleCopyResults = () => {
    const resultsText = `
    Annualized Gross Income: $${calculationResults.annualizedGrossIncome}
    Business Levy: $${calculationResults.businessLevy}
    Green Fund Levy: $${calculationResults.greenFundLevy}
    Total Estimated Levies: $${calculationResults.totalEstimatedLevies}
    `;
    navigator.clipboard.writeText(resultsText.trim());
    // toast({ title: "Results Copied!" });
  };

  const handleClearFields = () => {
    setIncomePeriod("monthly");
    setMonth1Income("50000");
    setMonth2Income("500000");
    setMonth3Income("50000");
    setQuarterlyIncome("");
    setAnnualDirectIncome("");
    setYearOfIncorporation(Math.max(...years.map(Number)).toString());
    handleCalculateLevies(); // Recalculate with cleared/default fields
    // toast({ title: "Fields Cleared" });
  };

  return (
    <div className="py-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="incomePeriodLevySimple" className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              Income Period
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
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="mt-4">
          <CardHeader className="p-4">
            <CardTitle className="text-lg text-primary flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" /> Estimated Levies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span>Annualized Gross Income:</span> <strong>${calculationResults.annualizedGrossIncome}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between">
              <span>Business Levy (0.6%):</span><strong>${calculationResults.businessLevy}</strong>
            </div>
            <div className="flex justify-between">
              <span>Green Fund Levy (0.3%):</span> <strong>${calculationResults.greenFundLevy}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold text-sm">
              <span>Total Estimated Levies:</span> <strong className="text-primary">${calculationResults.totalEstimatedLevies}</strong>
            </div>
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
          Note: Business Levy is exempt for companies within their first 3 years of registration. If not exempt, Business Levy applies at 0.6% on the total annualized gross income. Green Fund Levy applies at 0.3% on the total annualized gross income. These are estimates. If 'Monthly' is selected, provide income for 3 consecutive months; the sum will be treated as quarterly income for annualization. If 'Quarterly' is selected, provide income for one quarter; it will be multiplied by 4 for annualization.
        </p>
      </div>
    </div>
  );
}

