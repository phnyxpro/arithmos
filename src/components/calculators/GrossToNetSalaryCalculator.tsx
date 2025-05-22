
// src/components/calculators/GrossToNetSalaryCalculator.tsx
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
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingDown, Calculator, Copy, Trash2, CircleCheckBig, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// NIS Classes Data (same as SimplifiedPayrollCalculator for consistency)
interface NisClass {
  class: string;
  monthlyEarnings: { min: number; max: number | null };
  weeklyEarnings: { min: number; max: number | null };
  assumedAverageWeekly: number;
  employeeWeekly: number;
  employerWeekly: number;
  totalWeekly: number;
  classZWeekly: number;
}

const nisClassesData: NisClass[] = [
    { class: "I", weeklyEarnings: { min: 200.00, max: 339.99 }, monthlyEarnings: { min: 867.00, max: 1472.99 }, assumedAverageWeekly: 270.00, employeeWeekly: 11.90, employerWeekly: 23.80, totalWeekly: 35.70, classZWeekly: 1.79 },
    { class: "II", weeklyEarnings: { min: 340.00, max: 449.99 }, monthlyEarnings: { min: 1473.00, max: 1949.99 }, assumedAverageWeekly: 395.00, employeeWeekly: 17.40, employerWeekly: 34.80, totalWeekly: 52.20, classZWeekly: 2.61 },
    { class: "III", weeklyEarnings: { min: 450.00, max: 609.99 }, monthlyEarnings: { min: 1950.00, max: 2642.99 }, assumedAverageWeekly: 530.00, employeeWeekly: 23.30, employerWeekly: 46.60, totalWeekly: 69.90, classZWeekly: 3.50 },
    { class: "IV", weeklyEarnings: { min: 610.00, max: 759.99 }, monthlyEarnings: { min: 2643.00, max: 3292.99 }, assumedAverageWeekly: 685.00, employeeWeekly: 30.10, employerWeekly: 60.20, totalWeekly: 90.30, classZWeekly: 4.52 },
    { class: "V", weeklyEarnings: { min: 760.00, max: 929.99 }, monthlyEarnings: { min: 3293.00, max: 4029.99 }, assumedAverageWeekly: 845.00, employeeWeekly: 37.20, employerWeekly: 74.40, totalWeekly: 111.60, classZWeekly: 5.58 },
    { class: "VI", weeklyEarnings: { min: 930.00, max: 1119.99 }, monthlyEarnings: { min: 4030.00, max: 4852.99 }, assumedAverageWeekly: 1025.00, employeeWeekly: 45.10, employerWeekly: 90.20, totalWeekly: 135.30, classZWeekly: 6.77 },
    { class: "VII", weeklyEarnings: { min: 1120.00, max: 1299.99 }, monthlyEarnings: { min: 4853.00, max: 5632.99 }, assumedAverageWeekly: 1210.00, employeeWeekly: 53.20, employerWeekly: 106.40, totalWeekly: 159.60, classZWeekly: 7.98 },
    { class: "VIII", weeklyEarnings: { min: 1300.00, max: 1489.99 }, monthlyEarnings: { min: 5633.00, max: 6456.99 }, assumedAverageWeekly: 1395.00, employeeWeekly: 61.40, employerWeekly: 122.80, totalWeekly: 184.20, classZWeekly: 9.21 },
    { class: "IX", weeklyEarnings: { min: 1490.00, max: 1709.99 }, monthlyEarnings: { min: 6457.00, max: 7409.99 }, assumedAverageWeekly: 1600.00, employeeWeekly: 70.40, employerWeekly: 140.80, totalWeekly: 211.20, classZWeekly: 10.56 },
    { class: "X", weeklyEarnings: { min: 1710.00, max: 1909.99 }, monthlyEarnings: { min: 7410.00, max: 8276.99 }, assumedAverageWeekly: 1810.00, employeeWeekly: 79.60, employerWeekly: 159.20, totalWeekly: 238.80, classZWeekly: 11.94 },
    { class: "XI", weeklyEarnings: { min: 1910.00, max: 2139.99 }, monthlyEarnings: { min: 8277.00, max: 9272.99 }, assumedAverageWeekly: 2025.00, employeeWeekly: 89.10, employerWeekly: 178.20, totalWeekly: 267.30, classZWeekly: 13.37 },
    { class: "XII", weeklyEarnings: { min: 2140.00, max: 2379.99 }, monthlyEarnings: { min: 9273.00, max: 10312.99 }, assumedAverageWeekly: 2260.00, employeeWeekly: 99.40, employerWeekly: 198.80, totalWeekly: 298.20, classZWeekly: 14.91 },
    { class: "XIII", weeklyEarnings: { min: 2380.00, max: 2629.99 }, monthlyEarnings: { min: 10313.00, max: 11396.99 }, assumedAverageWeekly: 2505.00, employeeWeekly: 110.20, employerWeekly: 220.40, totalWeekly: 330.60, classZWeekly: 16.53 },
    { class: "XIV", weeklyEarnings: { min: 2630.00, max: 2919.99 }, monthlyEarnings: { min: 11397.00, max: 12652.99 }, assumedAverageWeekly: 2775.00, employeeWeekly: 122.10, employerWeekly: 244.20, totalWeekly: 366.30, classZWeekly: 18.32 },
    { class: "XV", weeklyEarnings: { min: 2920.00, max: 3137.99 }, monthlyEarnings: { min: 12653.00, max: 13599.99 }, assumedAverageWeekly: 3029.00, employeeWeekly: 133.30, employerWeekly: 266.60, totalWeekly: 399.90, classZWeekly: 20.00 },
    { class: "XVI", weeklyEarnings: { min: 3138.00, max: null }, monthlyEarnings: { min: 13600.00, max: null }, assumedAverageWeekly: 3138.00, employeeWeekly: 138.10, employerWeekly: 276.20, totalWeekly: 414.30, classZWeekly: 20.72 },
];

const PERSONAL_ALLOWANCE = 90000;
const PAYE_BRACKET_1_LIMIT = 72000;
const PAYE_RATE_1 = 0.25;
const PAYE_RATE_2 = 0.30;

const WEEKS_IN_MONTH_APPROX = 4.3333; // Approximation for Health Surcharge calculation

export function GrossToNetSalaryCalculator() {
  const { toast } = useToast();
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("");
  
  const initialResults = {
    grossMonthlyIncomeDisplay: "0.00",
    payeMonthly: "0.00",
    nisMonthlyEmployee: "0.00",
    healthSurchargeMonthly: "0.00",
    totalMonthlyDeductions: "0.00",
    netTakeHomePay: "0.00",
    nisClass: "N/A",
  };
  const [calculationResults, setCalculationResults] = useState(initialResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculate = useCallback(() => {
    const gmi = parseNum(grossMonthlyIncome);
    if (gmi <= 0) {
      setCalculationResults(initialResults);
      return;
    }

    // NIS Calculation
    let foundNisClass: NisClass | undefined = undefined;
    for (const nisClass of nisClassesData) {
      if (gmi >= nisClass.monthlyEarnings.min && (nisClass.monthlyEarnings.max === null || gmi <= nisClass.monthlyEarnings.max)) {
        foundNisClass = nisClass;
        break;
      }
    }
    let nisMonthlyEmployee = 0;
    let nisClassDisplay = "N/A";
    if (foundNisClass) {
      nisClassDisplay = foundNisClass.class;
      // For monthly, we use weekly contribution * approx weeks in month
      nisMonthlyEmployee = foundNisClass.employeeWeekly * WEEKS_IN_MONTH_APPROX;
    }

    // PAYE Calculation
    const annualGrossIncome = gmi * 12;
    const annualNisEmployee = nisMonthlyEmployee * 12;
    const chargeableIncome = Math.max(0, annualGrossIncome - PERSONAL_ALLOWANCE - annualNisEmployee);
    
    let annualPAYE = 0;
    if (chargeableIncome <= PAYE_BRACKET_1_LIMIT) {
      annualPAYE = chargeableIncome * PAYE_RATE_1;
    } else {
      annualPAYE = (PAYE_BRACKET_1_LIMIT * PAYE_RATE_1) + 
                   ((chargeableIncome - PAYE_BRACKET_1_LIMIT) * PAYE_RATE_2);
    }
    const payeMonthly = annualPAYE / 12;

    // Health Surcharge Calculation (simplified)
    const weeklyGrossIncome = gmi / WEEKS_IN_MONTH_APPROX;
    let weeklyHS = 0;
    if (weeklyGrossIncome <= 110) { // Based on TT$110/week threshold for HS rates $4.13/$8.25
      weeklyHS = 4.13;
    } else {
      weeklyHS = 8.25;
    }
    const healthSurchargeMonthly = weeklyHS * WEEKS_IN_MONTH_APPROX;

    const totalMonthlyDeductions = payeMonthly + nisMonthlyEmployee + healthSurchargeMonthly;
    const netTakeHomePay = Math.max(0, gmi - totalMonthlyDeductions);

    setCalculationResults({
      grossMonthlyIncomeDisplay: formatCurrency(gmi),
      payeMonthly: formatCurrency(payeMonthly),
      nisMonthlyEmployee: formatCurrency(nisMonthlyEmployee),
      healthSurchargeMonthly: formatCurrency(healthSurchargeMonthly),
      totalMonthlyDeductions: formatCurrency(totalMonthlyDeductions),
      netTakeHomePay: formatCurrency(netTakeHomePay),
      nisClass: nisClassDisplay,
    });

  }, [grossMonthlyIncome]);

  useEffect(() => {
    if (grossMonthlyIncome) {
      handleCalculate();
    } else {
      setCalculationResults(initialResults);
    }
  }, [grossMonthlyIncome, handleCalculate]);

  const handleClearFields = () => {
    setGrossMonthlyIncome("");
    setCalculationResults(initialResults);
    toast({ title: "Fields Cleared", description: "Gross to Net calculator inputs reset." });
  };

  const handleCopyResults = () => {
     if (calculationResults.grossMonthlyIncomeDisplay === "0.00" && calculationResults.netTakeHomePay === "0.00") {
      toast({ title: "No Results to Copy", description: "Please calculate net salary first.", variant: "default" });
      return;
    }
    const textToCopy = `
Gross to Net Salary Calculation Summary
---------------------------------
Input:
Gross Monthly Income: TT$ ${calculationResults.grossMonthlyIncomeDisplay}
---------------------------------
Estimated Monthly Deductions:
NIS Class: ${calculationResults.nisClass}
PAYE: TT$ ${calculationResults.payeMonthly}
NIS (Employee): TT$ ${calculationResults.nisMonthlyEmployee}
Health Surcharge: TT$ ${calculationResults.healthSurchargeMonthly}
Total Monthly Deductions: TT$ ${calculationResults.totalMonthlyDeductions}
---------------------------------
Estimated Net Take-Home Pay: TT$ ${calculationResults.netTakeHomePay}
---------------------------------
Disclaimer: Estimates based on standard T&T tax rules. Consult official sources.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Gross to Net Salary details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Enter your gross monthly salary to estimate your net take-home pay after PAYE, NIS, and Health Surcharge.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-1">
            <Label htmlFor="grossMonthlyIncomeNet" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              Gross Monthly Income (TTD)
            </Label>
            <Input
              id="grossMonthlyIncomeNet"
              type="number"
              placeholder="e.g., 8000.00"
              value={grossMonthlyIncome}
              onChange={(e) => setGrossMonthlyIncome(e.target.value)}
              className="h-10 text-sm"
            />
          </div>
          
          {parseNum(grossMonthlyIncome) > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                  <CircleCheckBig className="mr-2 h-4 w-4" /> Estimated Net Salary Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Gross Monthly Income:</span> <strong>TT$ {calculationResults.grossMonthlyIncomeDisplay}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="font-medium text-foreground">Deductions:</div>
                 <div className="flex justify-between pl-2">
                  <span>NIS Class:</span> <span>{calculationResults.nisClass}</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span>PAYE (Monthly):</span> <span>TT$ {calculationResults.payeMonthly}</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span>NIS (Employee, Monthly):</span> <span>TT$ {calculationResults.nisMonthlyEmployee}</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span>Health Surcharge (Monthly):</span> <span>TT$ {calculationResults.healthSurchargeMonthly}</span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold">
                  <span>Total Estimated Deductions:</span> <strong className="text-destructive">TT$ {calculationResults.totalMonthlyDeductions}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm mt-1">
                  <span className="text-primary">Estimated Net Take-Home Pay:</span> <strong className="text-primary">TT$ {calculationResults.netTakeHomePay}</strong>
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
          Disclaimer: This is an illustrative estimate. PAYE considers a TT$90,000 annual personal allowance and 25%/30% tax brackets. NIS is based on official NIBTT earnings classes (approx. monthly contribution shown). Health Surcharge is estimated based on weekly income thresholds and approx. weeks per month. Does not include other potential deductions (e.g., pension, loan payments). Always consult official guidelines.
        </p>
      </Card>
    </div>
  );
}
