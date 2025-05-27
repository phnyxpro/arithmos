
// src/components/calculators/BonusCommissionCalculator.tsx
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Gift, DollarSign, CalendarDays, Calculator, Copy, Trash2, CircleCheckBig, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// --- Constants and Helper Data (same as SimplifiedPayrollCalculator for consistency) ---
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear + 5 - i).toString()).reverse();
const months = [
  { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
  { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];

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
// ----------------------------------------------------------------------------------

const initialCalculationResults = {
  regularSalaryDisplay: "0.00",
  bonusDisplay: "0.00",
  commissionDisplay: "0.00",
  totalGrossForPeriodDisplay: "0.00",
  
  payeOnSalaryMonthly: "0.00",
  nisOnSalaryMonthly: "0.00",
  hsOnSalaryMonthly: "0.00",
  nisClassSalary: "N/A",

  payeOnTotalMonthly: "0.00",
  nisOnTotalMonthly: "0.00",
  hsOnTotalMonthly: "0.00",
  nisClassTotal: "N/A",

  additionalPaye: "0.00",
  additionalNis: "0.00",
  additionalHs: "0.00",
  totalAdditionalDeductions: "0.00",
  
  netBonusCommissionDisplay: "0.00",
  totalNetPayForPeriodDisplay: "0.00",
  monthName: "",
  yearDisplay: "",
};

export default function BonusCommissionCalculator() {
  const { toast } = useToast();
  const [regularMonthlySalary, setRegularMonthlySalary] = useState<string>("");
  const [bonusAmount, setBonusAmount] = useState<string>("");
  const [commissionAmount, setCommissionAmount] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const countMondays = (year: number, month: number): number => {
    let mondaysCount = 0;
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 1) { // Monday is 1 (Sunday is 0)
        mondaysCount++;
      }
      date.setDate(date.getDate() + 1);
    }
    return mondaysCount;
  };

  const calculateDeductionsForIncome = (monthlyIncome: number, mondays: number) => {
    let nisMonthlyEmployee = 0;
    let nisClassDisplay = "N/A";
    
    const foundNisClass = nisClassesData.find(
      (nc) => monthlyIncome >= nc.monthlyEarnings.min && (nc.monthlyEarnings.max === null || monthlyIncome <= nc.monthlyEarnings.max)
    );

    if (foundNisClass) {
      nisClassDisplay = foundNisClass.class;
      nisMonthlyEmployee = foundNisClass.employeeWeekly * mondays;
    }

    const annualIncome = monthlyIncome * 12;
    const annualNisEmployee = nisMonthlyEmployee * 12;
    const chargeableIncome = Math.max(0, annualIncome - PERSONAL_ALLOWANCE - annualNisEmployee);
    
    let annualPAYE = 0;
    if (chargeableIncome <= PAYE_BRACKET_1_LIMIT) {
      annualPAYE = chargeableIncome * PAYE_RATE_1;
    } else {
      annualPAYE = (PAYE_BRACKET_1_LIMIT * PAYE_RATE_1) + 
                   ((chargeableIncome - PAYE_BRACKET_1_LIMIT) * PAYE_RATE_2);
    }
    const payeMonthly = annualPAYE / 12;

    const weeklyIncome = monthlyIncome / mondays; // More accurate to use mondays than fixed 4.33
    let weeklyHS = 0;
    if (weeklyIncome <= 110) {
      weeklyHS = 4.13;
    } else {
      weeklyHS = 8.25;
    }
    const healthSurchargeMonthly = weeklyHS * mondays;

    return { payeMonthly, nisMonthlyEmployee, healthSurchargeMonthly, nisClassDisplay };
  };

  const handleCalculate = useCallback(() => {
    const salary = parseNum(regularMonthlySalary);
    const bonus = parseNum(bonusAmount);
    const commission = parseNum(commissionAmount);
    const yearNum = parseInt(selectedYear, 10);
    const monthNum = parseInt(selectedMonth, 10);

    if (salary <= 0 && bonus <= 0 && commission <= 0) {
      setCalculationResults(initialCalculationResults); // Reset if no income
      return;
    }
    
    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "";
    const mondays = countMondays(yearNum, monthNum);

    const deductionsOnSalary = calculateDeductionsForIncome(salary, mondays);
    
    const totalGrossForPeriod = salary + bonus + commission;
    const deductionsOnTotal = calculateDeductionsForIncome(totalGrossForPeriod, mondays);

    const additionalPaye = Math.max(0, deductionsOnTotal.payeMonthly - deductionsOnSalary.payeMonthly);
    const additionalNis = Math.max(0, deductionsOnTotal.nisMonthlyEmployee - deductionsOnSalary.nisMonthlyEmployee);
    const additionalHs = Math.max(0, deductionsOnTotal.healthSurchargeMonthly - deductionsOnSalary.hsOnSalaryMonthly);
    const totalAdditionalDeductions = additionalPaye + additionalNis + additionalHs;
    
    const netBonusCommission = (bonus + commission) - totalAdditionalDeductions;
    const totalNetPayForPeriod = totalGrossForPeriod - (deductionsOnTotal.payeMonthly + deductionsOnTotal.nisMonthlyEmployee + deductionsOnTotal.healthSurchargeMonthly);

    setCalculationResults({
      regularSalaryDisplay: formatCurrency(salary),
      bonusDisplay: formatCurrency(bonus),
      commissionDisplay: formatCurrency(commission),
      totalGrossForPeriodDisplay: formatCurrency(totalGrossForPeriod),
      
      payeOnSalaryMonthly: formatCurrency(deductionsOnSalary.payeMonthly),
      nisOnSalaryMonthly: formatCurrency(deductionsOnSalary.nisMonthlyEmployee),
      hsOnSalaryMonthly: formatCurrency(deductionsOnSalary.healthSurchargeMonthly),
      nisClassSalary: deductionsOnSalary.nisClassDisplay,

      payeOnTotalMonthly: formatCurrency(deductionsOnTotal.payeMonthly),
      nisOnTotalMonthly: formatCurrency(deductionsOnTotal.nisMonthlyEmployee),
      hsOnTotalMonthly: formatCurrency(deductionsOnTotal.healthSurchargeMonthly),
      nisClassTotal: deductionsOnTotal.nisClassDisplay,

      additionalPaye: formatCurrency(additionalPaye),
      additionalNis: formatCurrency(additionalNis),
      additionalHs: formatCurrency(additionalHs),
      totalAdditionalDeductions: formatCurrency(totalAdditionalDeductions),
      
      netBonusCommissionDisplay: formatCurrency(netBonusCommission),
      totalNetPayForPeriodDisplay: formatCurrency(totalNetPayForPeriod),
      monthName: monthLabel,
      yearDisplay: selectedYear,
    });

  }, [regularMonthlySalary, bonusAmount, commissionAmount, selectedMonth, selectedYear]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);


  const handleClearFields = () => {
    setRegularMonthlySalary("");
    setBonusAmount("");
    setCommissionAmount("");
    setSelectedMonth((new Date().getMonth() + 1).toString());
    setSelectedYear(currentYear.toString());
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Bonus & Commission calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.totalGrossForPeriodDisplay === "0.00") {
        toast({ title: "No Results to Copy", description: "Please calculate first.", variant: "default"});
        return;
    }
    const textToCopy = `
Bonus & Commission Tax Impact Summary
Period: ${calculationResults.monthName} ${calculationResults.yearDisplay}
---------------------------------
Inputs:
Regular Monthly Salary: TT$ ${calculationResults.regularSalaryDisplay}
Bonus Amount: TT$ ${calculationResults.bonusDisplay}
Commission Amount: TT$ ${calculationResults.commissionDisplay}
Total Gross Income for Period: TT$ ${calculationResults.totalGrossForPeriodDisplay}
---------------------------------
Deductions on Salary Only:
PAYE (Monthly): TT$ ${calculationResults.payeOnSalaryMonthly}
NIS (Employee, Monthly, Class ${calculationResults.nisClassSalary}): TT$ ${calculationResults.nisOnSalaryMonthly}
Health Surcharge (Monthly): TT$ ${calculationResults.hsOnSalaryMonthly}
---------------------------------
Deductions on Total Income (Salary + Bonus + Commission):
PAYE (Monthly): TT$ ${calculationResults.payeOnTotalMonthly}
NIS (Employee, Monthly, Class ${calculationResults.nisClassTotal}): TT$ ${calculationResults.nisOnTotalMonthly}
Health Surcharge (Monthly): TT$ ${calculationResults.hsOnTotalMonthly}
---------------------------------
Additional Impact of Bonus/Commission:
Additional PAYE: TT$ ${calculationResults.additionalPaye}
Additional NIS: TT$ ${calculationResults.additionalNis}
Additional Health Surcharge: TT$ ${calculationResults.additionalHs}
Total Additional Deductions on Bonus/Commission: TT$ ${calculationResults.totalAdditionalDeductions}
Net Bonus/Commission after Additional Deductions: TT$ ${calculationResults.netBonusCommissionDisplay}
---------------------------------
Overall Net Pay for Period: TT$ ${calculationResults.totalNetPayForPeriodDisplay}
---------------------------------
Disclaimer: Estimates based on standard T&T tax rules. Consult official IRD & NIBTT guidelines.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Bonus & Commission details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Estimate the tax impact (PAYE, NIS, HS) of any bonus or commission amounts in addition to regular salary.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="regularSalaryBonus" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Regular Monthly Salary (TTD)
              </Label>
              <Input
                id="regularSalaryBonus" type="number" step="0.01" placeholder="e.g., 7500.00"
                value={regularMonthlySalary} onChange={(e) => setRegularMonthlySalary(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
             <div className="space-y-1"> {/* Placeholder for grid balance or future field */} </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="bonusAmount" className="flex items-center text-sm">
                <Gift className="mr-2 h-4 w-4 text-muted-foreground" /> Bonus Amount (TTD)
              </Label>
              <Input
                id="bonusAmount" type="number" step="0.01" placeholder="e.g., 5000.00 (optional)"
                value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="commissionAmount" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Commission Amount (TTD)
              </Label>
              <Input
                id="commissionAmount" type="number" step="0.01" placeholder="e.g., 2000.00 (optional)"
                value={commissionAmount} onChange={(e) => setCommissionAmount(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="paymentMonthBonus" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Payment Month
              </Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="paymentMonthBonus" className="h-9 text-sm">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="paymentYearBonus" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Payment Year
              </Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="paymentYearBonus" className="h-9 text-sm">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(parseNum(regularMonthlySalary) > 0 || parseNum(bonusAmount) > 0 || parseNum(commissionAmount) > 0) && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                  <CircleCheckBig className="mr-2 h-4 w-4" /> Tax Impact Summary for {calculationResults.monthName} {calculationResults.yearDisplay}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between"><span>Regular Salary:</span> <strong>TT$ {calculationResults.regularSalaryDisplay}</strong></div>
                <div className="flex justify-between"><span>Bonus:</span> <strong>TT$ {calculationResults.bonusDisplay}</strong></div>
                <div className="flex justify-between"><span>Commission:</span> <strong>TT$ {calculationResults.commissionDisplay}</strong></div>
                <div className="flex justify-between font-semibold"><span>Total Gross for Period:</span> <strong className="text-primary">TT$ {calculationResults.totalGrossForPeriodDisplay}</strong></div>
                
                <Separator className="my-1.5" />
                <div className="font-medium text-foreground">Deductions on Regular Salary Only:</div>
                <div className="flex justify-between pl-2"><span>PAYE:</span> <span>TT$ {calculationResults.payeOnSalaryMonthly}</span></div>
                <div className="flex justify-between pl-2"><span>NIS (Class {calculationResults.nisClassSalary}):</span> <span>TT$ {calculationResults.nisOnSalaryMonthly}</span></div>
                <div className="flex justify-between pl-2"><span>Health Surcharge:</span> <span>TT$ {calculationResults.hsOnSalaryMonthly}</span></div>
                
                <Separator className="my-1.5" />
                <div className="font-medium text-foreground">Additional Deductions on Bonus/Commission:</div>
                <div className="flex justify-between pl-2"><span>Additional PAYE:</span> <span>TT$ {calculationResults.additionalPaye}</span></div>
                <div className="flex justify-between pl-2"><span>Additional NIS (if applicable to total):</span> <span>TT$ {calculationResults.additionalNis}</span></div>
                <div className="flex justify-between pl-2"><span>Additional Health Surcharge:</span> <span>TT$ {calculationResults.additionalHs}</span></div>
                <div className="flex justify-between font-semibold text-destructive"><span>Total Additional Deductions:</span> <strong>TT$ {calculationResults.totalAdditionalDeductions}</strong></div>
                
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-primary"><span>Net Bonus/Commission After Tax:</span> <strong className="text-primary">TT$ {calculationResults.netBonusCommissionDisplay}</strong></div>
                <Separator className="my-1.5 border-dashed" />
                 <div className="font-medium text-foreground">Overall for the Period:</div>
                <div className="flex justify-between pl-2"><span>Total PAYE (Salary + Bonus/Comm):</span> <span>TT$ {calculationResults.payeOnTotalMonthly}</span></div>
                <div className="flex justify-between pl-2"><span>Total NIS (Class {calculationResults.nisClassTotal}):</span> <span>TT$ {calculationResults.nisOnTotalMonthly}</span></div>
                <div className="flex justify-between pl-2"><span>Total Health Surcharge:</span> <span>TT$ {calculationResults.hsOnTotalMonthly}</span></div>
                 <Separator className="my-1.5" />
                <div className="flex justify-between font-bold text-lg text-primary"><span>Total Net Pay:</span> <strong className="text-primary">TT$ {calculationResults.totalNetPayForPeriodDisplay}</strong></div>
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
          Disclaimer: This calculator provides an estimate of the tax impact on one-off payments like bonuses or commissions, considering your regular monthly salary. PAYE is calculated annually and then apportioned monthly. NIS and Health Surcharge are based on the total earnings for the month. Assumes standard tax rules for Trinidad & Tobago. Always consult official IRD & NIBTT guidelines and a tax professional for definitive advice.
        </p>
      </Card>
    </div>
  );
}


    