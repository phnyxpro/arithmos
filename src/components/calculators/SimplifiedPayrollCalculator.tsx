
"use client";

import React, { useState, useEffect } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Users, CalendarDays, DollarSign, CircleCheckBig, Briefcase, Copy, Trash2 } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Uncomment if toasts are desired

const months = [
  { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
  { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];

export function SimplifiedPayrollCalculator() {
  // const { toast } = useToast(); // Uncomment if toasts are desired
  const [selectedMonth, setSelectedMonth] = useState<string>("5"); // May
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("8000");

  // Placeholder for calculation results based on HTML
  const [calculationResults, setCalculationResults] = useState({
    grossMonthlyIncomeDisplay: "8,000.00",
    estAnnualIncome: "96,000.00",
    mondaysInMonth: "4",
    nisClass: "XI",
    estWeeklyNISEmployee: "89.10",
    estWeeklyNISEmployer: "178.20",
    payeMonthly: "125.00",
    nisMonthlyEmployee: "356.40",
    healthSurchargeMonthly: "33.00",
    totalMonthlyDeductions: "514.40",
    netTakeHomePay: "7,485.60",
    employerNISMonthly: "712.80",
    monthName: "May",
    yearDisplay: "2025",
  });

  // Dummy calculate function - replace with actual logic
  const handleCalculate = () => {
    const monthLabel = months.find(m => m.value === selectedMonth)?.label || "";
    // In a real app, you'd perform calculations here based on inputs
    // For now, we'll just update the display based on current state or keep placeholders
    setCalculationResults(prev => ({
      ...prev, // Keep placeholders for now, or derive simply
      grossMonthlyIncomeDisplay: parseFloat(grossMonthlyIncome || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      estAnnualIncome: (parseFloat(grossMonthlyIncome || "0") * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      monthName: monthLabel,
      yearDisplay: selectedYear,
      // Other fields would be recalculated here
    }));
    // toast({ title: "Calculation Updated (Placeholder)" });
  };
  
  useEffect(() => {
    // Trigger calculation when inputs change
    handleCalculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear, grossMonthlyIncome]);


  const handleCopyResults = () => {
    // Logic to format and copy results to clipboard
    const resultsText = `
    Gross Monthly Income: $${calculationResults.grossMonthlyIncomeDisplay}
    PAYE: $${calculationResults.payeMonthly}
    NIS (Employee): $${calculationResults.nisMonthlyEmployee}
    Health Surcharge: $${calculationResults.healthSurchargeMonthly}
    Total Deductions: $${calculationResults.totalMonthlyDeductions}
    Net Pay: $${calculationResults.netTakeHomePay}
    Employer NIS: $${calculationResults.employerNISMonthly}
    `;
    navigator.clipboard.writeText(resultsText.trim());
    // toast({ title: "Results Copied!" });
  };

  const handleClearFields = () => {
    setSelectedMonth("5");
    setSelectedYear("2025");
    setGrossMonthlyIncome("8000");
    // Reset calculationResults to initial/default state if needed
    // toast({ title: "Fields Cleared" });
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
            <Input
              id="selectedYearSimplePayroll"
              type="number"
              placeholder="e.g., 2024"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-9 text-sm"
            />
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
              <span>Gross Monthly Income:</span> <strong>${calculationResults.grossMonthlyIncomeDisplay}</strong>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Est. Annual Income:</span> <span>${calculationResults.estAnnualIncome}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Mondays in selected month:</span> <span>{calculationResults.mondaysInMonth}</span>
            </div>
            
            <Separator className="my-1" />
            <div className="text-muted-foreground">NIS Details:</div>
            <div className="flex justify-between pl-2">
              <span>NIS Class:</span> <span>{calculationResults.nisClass}</span>
            </div>
            <div className="flex justify-between pl-2">
              <span>Est. Weekly NIS (Employee):</span> <span>${calculationResults.estWeeklyNISEmployee}</span>
            </div>
            <div className="flex justify-between pl-2">
              <span>Est. Weekly NIS (Employer):</span> <span>${calculationResults.estWeeklyNISEmployer}</span>
            </div>

            <Separator className="my-1" />
            <div className="text-muted-foreground">Employee Deductions (Monthly):</div>
            <div className="flex justify-between pl-2">
              <span>PAYE:</span> <span>${calculationResults.payeMonthly}</span>
            </div>
            <div className="flex justify-between pl-2">
              <span>NIS (Employee):</span> <span>${calculationResults.nisMonthlyEmployee}</span>
            </div>
            <div className="flex justify-between pl-2">
              <span>Health Surcharge:</span> <span>${calculationResults.healthSurchargeMonthly}</span>
            </div>

            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Total Monthly Deductions:</span><span>${calculationResults.totalMonthlyDeductions}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-primary mt-1">
              <span>Net Take-Home Pay:</span><span>${calculationResults.netTakeHomePay}</span>
            </div>

            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                Employer's NIS Contribution (Monthly):
              </span>
              <strong className="text-muted-foreground">${calculationResults.employerNISMonthly}</strong>
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
          Note: Calculations are estimates. PAYE is based on annual income. NIS is calculated based on NIBTT Earnings Classes for the selected month/year. Health Surcharge is estimated based on the number of Mondays in the selected month and gross monthly income. Employer's NIS is an additional cost to the employer. Always consult official IRD & NIBTT guidelines.
        </p>
      </div>
    </div>
  );
}

    