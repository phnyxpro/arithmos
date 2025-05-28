
// src/components/calculators/SimpleInterestCalculator.tsx
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { PercentCircle, DollarSign, CalendarDays, CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const timePeriodUnitOptions = [
  { value: "years", label: "Years" },
  { value: "months", label: "Months" },
  { value: "days", label: "Days" },
];

const initialCalculationResults = {
  interestEarnedDisplay: "0.00",
  totalAmountDisplay: "0.00",
};

export default function SimpleInterestCalculator() {
  const { toast } = useToast();

  const [principalAmount, setPrincipalAmount] = useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [timePeriodUnit, setTimePeriodUnit] = useState<string>("years");
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateSimpleInterest = useCallback(() => {
    const P = parseNum(principalAmount);
    const R_annual_percent = parseNum(annualInterestRate);
    const T_input = parseNum(timePeriod);

    if (P <= 0 || R_annual_percent < 0 || T_input <= 0) {
      setCalculationResults(initialCalculationResults);
      // Optionally show a toast if inputs are missing/invalid for calculation
      if (P > 0 || R_annual_percent > 0 || T_input > 0) { // only if some attempt was made
           toast({
            title: "Calculation Incomplete",
            description: "Please ensure Principal, Rate, and Time Period are valid positive numbers.",
            variant: "default"
        });
      }
      return;
    }

    let T_years = 0;
    if (timePeriodUnit === "years") {
      T_years = T_input;
    } else if (timePeriodUnit === "months") {
      T_years = T_input / 12;
    } else if (timePeriodUnit === "days") {
      T_years = T_input / 365; // Using 365 days for a year
    }

    const R_decimal = R_annual_percent / 100;
    const interest = P * R_decimal * T_years;
    const totalAmount = P + interest;

    setCalculationResults({
      interestEarnedDisplay: formatCurrency(interest),
      totalAmountDisplay: formatCurrency(totalAmount),
    });

    toast({
      title: "Simple Interest Calculated",
      description: `Total Interest: TT$ ${formatCurrency(interest)}`,
    });
  }, [principalAmount, annualInterestRate, timePeriod, timePeriodUnit, toast]);
  
  // Auto-calculate when inputs change
  useEffect(() => {
    if (principalAmount && annualInterestRate && timePeriod) {
      handleCalculateSimpleInterest();
    } else {
      setCalculationResults(initialCalculationResults);
    }
  }, [principalAmount, annualInterestRate, timePeriod, timePeriodUnit, handleCalculateSimpleInterest]);


  const handleClearFields = () => {
    setPrincipalAmount("");
    setAnnualInterestRate("");
    setTimePeriod("");
    setTimePeriodUnit("years");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Simple Interest Calculator inputs reset." });
  };

  const handleCopyResults = () => {
     if (calculationResults.interestEarnedDisplay === "0.00" && calculationResults.totalAmountDisplay === "0.00") {
      toast({ title: "No Results to Copy", description: "Please calculate interest first.", variant: "default"});
      return;
    }
    const textToCopy = `
Simple Interest Calculation Summary
---------------------------------
Inputs:
Principal Amount: TT$ ${formatCurrency(parseNum(principalAmount))}
Annual Interest Rate: ${annualInterestRate}%
Time Period: ${timePeriod} ${timePeriodUnitOptions.find(opt => opt.value === timePeriodUnit)?.label || timePeriodUnit}
---------------------------------
Results:
Interest Earned: TT$ ${calculationResults.interestEarnedDisplay}
Total Amount (Principal + Interest): TT$ ${calculationResults.totalAmountDisplay}
---------------------------------
Disclaimer: This is a simple interest calculation.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Simple interest calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Quickly calculate simple interest amounts for short-term loans or deposits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="principalAmountSimple" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Principal Amount (TTD)
              </Label>
              <Input
                id="principalAmountSimple" type="number" step="0.01" placeholder="e.g., 10000"
                value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="annualInterestRateSimple" className="flex items-center text-sm">
                <PercentCircle className="mr-2 h-4 w-4 text-muted-foreground" /> Annual Interest Rate (%)
              </Label>
              <Input
                id="annualInterestRateSimple" type="number" step="0.01" placeholder="e.g., 5"
                value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1">
              <Label htmlFor="timePeriodSimple" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Time Period
              </Label>
              <Input
                id="timePeriodSimple" type="number" step="1" placeholder="e.g., 3"
                value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="timePeriodUnitSimple" className="text-sm sr-only">Time Period Unit</Label>
              <Select value={timePeriodUnit} onValueChange={setTimePeriodUnit}>
                <SelectTrigger id="timePeriodUnitSimple" className="h-9 text-sm">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {timePeriodUnitOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(parseNum(principalAmount) > 0 && parseNum(annualInterestRate) >= 0 && parseNum(timePeriod) > 0) && (
             <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Interest Earned:</span> <strong className="text-primary">TT$ {calculationResults.interestEarnedDisplay}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount (Principal + Interest):</span> <strong>TT$ {calculationResults.totalAmountDisplay}</strong>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 mt-6 p-0">
          <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
            <Copy className="mr-2 h-4 w-4" /> Copy Results
          </Button>
          <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
          </Button>
        </CardFooter>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Disclaimer: This calculator computes simple interest (I = P * R * T). It does not account for compounding interest, fees, or taxes that might apply.
        </p>
      </Card>
    </div>
  );
}
