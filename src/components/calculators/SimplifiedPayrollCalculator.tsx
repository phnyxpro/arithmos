
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Users, CalendarDays, DollarSign, CircleCheckBig, Briefcase, Copy, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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

const initialCalculationResults = {
    grossMonthlyIncomeDisplay: "0.00",
    estAnnualIncome: "0.00",
    mondaysInMonth: "0",
    nisClass: "N/A",
    estWeeklyNISEmployee: "0.00",
    estWeeklyNISEmployer: "0.00",
    payeMonthly: "0.00",
    nisMonthlyEmployee: "0.00",
    healthSurchargeMonthly: "0.00",
    totalMonthlyDeductions: "0.00",
    netTakeHomePay: "0.00",
    employerNISMonthly: "0.00",
    monthName: "",
    yearDisplay: "",
};

export function SimplifiedPayrollCalculator() {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("");
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const countMondays = (year: number, month: number): number => {
    let mondays = 0;
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 1) { // 0 is Sunday, 1 is Monday
        mondays++;
      }
      date.setDate(date.getDate() + 1);
    }
    return mondays;
  };

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCalculate = useCallback(() => {
    const gmi = parseFloat(grossMonthlyIncome) || 0;
    const yearNum = parseInt(selectedYear, 10);
    const monthNum = parseInt(selectedMonth, 10);

    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "";
    const mondaysInMonth = countMondays(yearNum, monthNum);

    let foundNisClass: NisClass | undefined = undefined;
    for (const nisClass of nisClassesData) {
      if (gmi >= nisClass.monthlyEarnings.min && (nisClass.monthlyEarnings.max === null || gmi <= nisClass.monthlyEarnings.max)) {
        foundNisClass = nisClass;
        break;
      }
    }

    let nisMonthlyEmployee = 0;
    let employerNISMonthly = 0;
    let nisClassDisplay = "N/A";
    let estWeeklyNISEmployee = 0;
    let estWeeklyNISEmployer = 0;

    if (foundNisClass) {
      nisClassDisplay = foundNisClass.class;
      estWeeklyNISEmployee = foundNisClass.employeeWeekly;
      estWeeklyNISEmployer = foundNisClass.employerWeekly;
      nisMonthlyEmployee = foundNisClass.employeeWeekly * mondaysInMonth;
      employerNISMonthly = foundNisClass.employerWeekly * mondaysInMonth;
    }

    const annualGrossIncome = gmi * 12;
    const personalAllowance = 90000;
    const annualNisEmployee = nisMonthlyEmployee * 12; 
    const chargeableIncome = Math.max(0, annualGrossIncome - personalAllowance - annualNisEmployee);
    
    let annualPAYE = 0;
    if (chargeableIncome <= 72000) {
      annualPAYE = chargeableIncome * 0.25;
    } else {
      annualPAYE = (72000 * 0.25) + ((chargeableIncome - 72000) * 0.30);
    }
    const payeMonthly = annualPAYE / 12;

    const weeklyGrossIncome = gmi / 4.3333; 
    let weeklyHS = 0;
    if (weeklyGrossIncome <= 110) {
      weeklyHS = 4.13;
    } else {
      weeklyHS = 8.25;
    }
    const healthSurchargeMonthly = weeklyHS * mondaysInMonth;

    const totalMonthlyDeductions = payeMonthly + nisMonthlyEmployee + healthSurchargeMonthly;
    const netTakeHomePay = gmi - totalMonthlyDeductions;

    setCalculationResults({
      grossMonthlyIncomeDisplay: formatCurrency(gmi),
      estAnnualIncome: formatCurrency(annualGrossIncome),
      mondaysInMonth: mondaysInMonth.toString(),
      nisClass: nisClassDisplay,
      estWeeklyNISEmployee: formatCurrency(estWeeklyNISEmployee),
      estWeeklyNISEmployer: formatCurrency(estWeeklyNISEmployer),
      payeMonthly: formatCurrency(payeMonthly),
      nisMonthlyEmployee: formatCurrency(nisMonthlyEmployee),
      healthSurchargeMonthly: formatCurrency(healthSurchargeMonthly),
      totalMonthlyDeductions: formatCurrency(totalMonthlyDeductions),
      netTakeHomePay: formatCurrency(netTakeHomePay),
      employerNISMonthly: formatCurrency(employerNISMonthly),
      monthName: monthLabel,
      yearDisplay: selectedYear,
    });
  }, [grossMonthlyIncome, selectedMonth, selectedYear]);
  
  useEffect(() => {
    if (grossMonthlyIncome) { // Only calculate if income is entered
        handleCalculate();
    } else {
        // If income is cleared, reset results
        const currentMonthLabel = months.find(m => m.value === (new Date().getMonth() + 1).toString())?.label || "";
        setCalculationResults({
            ...initialCalculationResults,
            monthName: currentMonthLabel,
            yearDisplay: new Date().getFullYear().toString(),
        });
    }
  }, [grossMonthlyIncome, selectedMonth, selectedYear, handleCalculate]);


  const handleCopyResults = () => {
    const textToCopy = `
    PAYROLL CALCULATION SUMMARY
    Period: ${calculationResults.monthName} ${calculationResults.yearDisplay}
    ---------------------------------
    Gross Monthly Income: TT$ ${calculationResults.grossMonthlyIncomeDisplay}
    Est. Annual Income: TT$ ${calculationResults.estAnnualIncome}
    Mondays in Month: ${calculationResults.mondaysInMonth}
    NIS Class: ${calculationResults.nisClass}
    Est. Weekly NIS (Employee): TT$ ${calculationResults.estWeeklyNISEmployee}
    Est. Weekly NIS (Employer): TT$ ${calculationResults.estWeeklyNISEmployer}
    ---------------------------------
    Monthly Deductions:
    PAYE: TT$ ${calculationResults.payeMonthly}
    NIS (Employee): TT$ ${calculationResults.nisMonthlyEmployee}
    Health Surcharge: TT$ ${calculationResults.healthSurchargeMonthly}
    Total Monthly Deductions: TT$ ${calculationResults.totalMonthlyDeductions}
    Net Take-Home Pay: TT$ ${calculationResults.netTakeHomePay}
    ---------------------------------
    Employer's NIS Contribution (Monthly): TT$ ${calculationResults.employerNISMonthly}
    ---------------------------------
    Note: These are estimates. Consult official guidelines.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Payroll details copied to clipboard." });
  };

  const handleClearFields = () => {
    setSelectedMonth((new Date().getMonth() + 1).toString());
    setSelectedYear(new Date().getFullYear().toString());
    setGrossMonthlyIncome("");
    const currentMonthLabel = months.find(m => m.value === (new Date().getMonth() + 1).toString())?.label || "";
    setCalculationResults({
        ...initialCalculationResults,
        monthName: currentMonthLabel,
        yearDisplay: new Date().getFullYear().toString(),
    });
    toast({ title: "Fields Cleared", description: "Calculator inputs have been reset." });
  };


  return (
    <div className="py-4">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="selectedMonthSimplePayroll" className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              Month
            </Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger id="selectedMonthSimplePayroll" className="h-9 text-sm">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="selectedYearSimplePayroll" className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              Year
            </Label>
             <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger id="selectedYearSimplePayroll" className="h-9 text-sm">
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

        <div className="space-y-1">
          <Label htmlFor="gmiSimplePayrollPopup" className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Gross Monthly Income (TT$)
          </Label>
          <Input
            id="gmiSimplePayrollPopup"
            type="number"
            step="0.01"
            placeholder="e.g., 8000.00"
            value={grossMonthlyIncome}
            onChange={(e) => setGrossMonthlyIncome(e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <Card className="mt-4">
          <CardHeader className="p-4">
            <CardTitle className="text-lg text-primary flex items-center">
              <CircleCheckBig className="mr-2 h-5 w-5" />
              Estimated Monthly Deductions for {calculationResults.monthName} {calculationResults.yearDisplay}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span>Gross Monthly Income:</span> <strong>TT$ {calculationResults.grossMonthlyIncomeDisplay}</strong>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Est. Annual Income:</span> <span>TT$ {calculationResults.estAnnualIncome}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Mondays in selected month:</span> <span>{calculationResults.mondaysInMonth}</span>
            </div>
            
            <Separator className="my-1" />
            <p className="font-medium text-foreground">NIS Details:</p>
            <div className="pl-2 space-y-0.5">
                <div className="flex justify-between">
                    <span>NIS Class:</span> <span className="font-semibold">{calculationResults.nisClass}</span>
                </div>
                <div className="flex justify-between">
                    <span>Est. Weekly NIS (Employee):</span> <span>TT$ {calculationResults.estWeeklyNISEmployee}</span>
                </div>
                <div className="flex justify-between">
                    <span>Est. Weekly NIS (Employer):</span> <span>TT$ {calculationResults.estWeeklyNISEmployer}</span>
                </div>
            </div>

            <Separator className="my-1" />
            <p className="font-medium text-foreground">Employee Deductions (Monthly):</p>
            <div className="pl-2 space-y-0.5">
                <div className="flex justify-between">
                    <span>PAYE:</span> <span>TT$ {calculationResults.payeMonthly}</span>
                </div>
                <div className="flex justify-between">
                    <span>NIS (Employee):</span> <span>TT$ {calculationResults.nisMonthlyEmployee}</span>
                </div>
                <div className="flex justify-between">
                    <span>Health Surcharge:</span> <span>TT$ {calculationResults.healthSurchargeMonthly}</span>
                </div>
            </div>

            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Total Monthly Deductions:</span><strong className="text-destructive">TT$ {calculationResults.totalMonthlyDeductions}</strong>
            </div>
            <div className="flex justify-between text-base font-bold text-primary mt-1">
              <span>Net Take-Home Pay:</span><span>TT$ {calculationResults.netTakeHomePay}</span>
            </div>

            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                Employer's NIS Contribution (Monthly):
              </span>
              <strong className="text-muted-foreground">TT$ {calculationResults.employerNISMonthly}</strong>
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
        
        <CardFooter className="p-0 pt-2">
            <p className="text-xs text-muted-foreground text-center mt-2">
            Note: Calculations are estimates. PAYE is based on annual income (TT$90,000 personal allowance, 25% on first TT$72,000 chargeable, 30% thereafter). NIS based on NIBTT Earnings Classes. Health Surcharge based on weekly income (TT$4.13/wk up to TT$110/wk, TT$8.25/wk above) & Mondays in month. Employer's NIS is an additional cost to the employer. Always consult official IRD & NIBTT guidelines.
            </p>
        </CardFooter>
      </div>
    </div>
  );
}

    
