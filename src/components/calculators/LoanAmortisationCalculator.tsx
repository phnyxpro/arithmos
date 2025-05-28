
// src/components/calculators/LoanAmortisationCalculator.tsx
"use client";

import React, { useState, useCallback } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Landmark, DollarSign, Percent as PercentIcon, CalendarDays, Calculator, Copy, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AmortizationEntry {
  period: number;
  payment: string;
  principal: string;
  interest: string;
  remainingBalance: string;
}

const initialCalculationResults = {
  periodicPaymentDisplay: "0.00",
  totalPrincipalPaidDisplay: "0.00",
  totalInterestPaidDisplay: "0.00",
  totalCostOfLoanDisplay: "0.00",
};

export default function LoanAmortisationCalculator() {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [loanTermYears, setLoanTermYears] = useState<string>("");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateAmortisation = useCallback(() => {
    const P = parseNum(loanAmount);
    const annualRate = parseNum(annualInterestRate);
    const termYears = parseNum(loanTermYears);

    if (P <= 0 || annualRate <= 0 || termYears <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid loan amount, interest rate, and term.",
        variant: "destructive",
      });
      setCalculationResults(initialCalculationResults);
      setAmortizationSchedule([]);
      return;
    }

    let paymentsPerYear = 12;
    if (paymentFrequency === "quarterly") paymentsPerYear = 4;
    else if (paymentFrequency === "annually") paymentsPerYear = 1;

    const i = annualRate / 100 / paymentsPerYear; // Periodic interest rate
    const n = termYears * paymentsPerYear; // Total number of payments

    let M = 0; // Periodic Payment
    if (i > 0) {
         M = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    } else { // If interest rate is 0
        M = P / n;
    }
    

    const totalCost = M * n;
    const totalInterest = totalCost - P;

    setCalculationResults({
      periodicPaymentDisplay: formatCurrency(M),
      totalPrincipalPaidDisplay: formatCurrency(P),
      totalInterestPaidDisplay: formatCurrency(totalInterest),
      totalCostOfLoanDisplay: formatCurrency(totalCost),
    });

    // Generate Amortization Schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = P;
    for (let period = 1; period <= n; period++) {
      const interestForPeriod = i > 0 ? remainingBalance * i : 0;
      const principalForPeriod = M - interestForPeriod;
      remainingBalance -= principalForPeriod;

      // Ensure remaining balance doesn't go negative due to floating point issues, especially on the last payment
      if (period === n && Math.abs(remainingBalance) < 0.01) {
          remainingBalance = 0;
      }
      
      schedule.push({
        period,
        payment: formatCurrency(M),
        principal: formatCurrency(principalForPeriod),
        interest: formatCurrency(interestForPeriod),
        remainingBalance: formatCurrency(Math.max(0, remainingBalance)), // Ensure it doesn't show negative
      });
       if (remainingBalance <= 0.01 && period < n) { // Stop if balance is effectively zero early
        break;
      }
    }
    setAmortizationSchedule(schedule);

    toast({
      title: "Calculation Complete",
      description: "Loan amortization details calculated.",
    });

  }, [loanAmount, annualInterestRate, loanTermYears, paymentFrequency, toast]);

  const handleClearFields = () => {
    setLoanAmount("");
    setAnnualInterestRate("");
    setLoanTermYears("");
    setPaymentFrequency("monthly");
    setCalculationResults(initialCalculationResults);
    setAmortizationSchedule([]);
    toast({ title: "Fields Cleared", description: "Loan calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.periodicPaymentDisplay === "0.00") {
      toast({ title: "No Results", description: "Please calculate first.", variant: "default"});
      return;
    }
    let textToCopy = `
Loan Amortisation Summary
---------------------------------
Inputs:
Loan Amount: TT$ ${formatCurrency(parseNum(loanAmount))}
Annual Interest Rate: ${annualInterestRate}%
Loan Term: ${loanTermYears} years
Payment Frequency: ${paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)}
---------------------------------
Results:
Periodic Payment: TT$ ${calculationResults.periodicPaymentDisplay}
Total Principal Paid: TT$ ${calculationResults.totalPrincipalPaidDisplay}
Total Interest Paid: TT$ ${calculationResults.totalInterestPaidDisplay}
Total Cost of Loan: TT$ ${calculationResults.totalCostOfLoanDisplay}
`;
    if (amortizationSchedule.length > 0) {
        textToCopy += "\nAmortization Schedule (First 5 periods):\n";
        textToCopy += "Period | Payment | Principal | Interest | Balance\n";
        amortizationSchedule.slice(0, 5).forEach(entry => {
            textToCopy += `${entry.period} | ${entry.payment} | ${entry.principal} | ${entry.interest} | ${entry.remainingBalance}\n`;
        });
    }
    textToCopy += `---------------------------------
Disclaimer: This is an estimate. Actual figures may vary.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Loan details copied." });
  };


  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* Title and Description are typically part of the parent Dialog */}
          <CardDescription>
            Calculate your loan repayments, total interest, and see a detailed amortization schedule.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="loanAmount" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Loan Amount (TTD)
              </Label>
              <Input
                id="loanAmount" type="number" step="0.01" placeholder="e.g., 100000"
                value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="annualInterestRate" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Annual Interest Rate (%)
              </Label>
              <Input
                id="annualInterestRate" type="number" step="0.01" placeholder="e.g., 5.5"
                value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="loanTermYears" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Loan Term (Years)
              </Label>
              <Input
                id="loanTermYears" type="number" step="1" placeholder="e.g., 5"
                value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="paymentFrequency" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Payment Frequency
              </Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger id="paymentFrequency" className="h-9 text-sm">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculateAmortisation} className="w-full mt-4 bg-primary hover:bg-primary/90 text-sm h-9">
            <Calculator className="mr-2 h-4 w-4" /> Calculate Amortisation
          </Button>

          {calculationResults.periodicPaymentDisplay !== "0.00" && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   Loan Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between"><span>Periodic Payment:</span> <strong className="text-primary">TT$ {calculationResults.periodicPaymentDisplay}</strong></div>
                <div className="flex justify-between"><span>Total Principal Paid:</span> <strong>TT$ {calculationResults.totalPrincipalPaidDisplay}</strong></div>
                <div className="flex justify-between"><span>Total Interest Paid:</span> <strong>TT$ {calculationResults.totalInterestPaidDisplay}</strong></div>
                <div className="flex justify-between font-semibold"><span>Total Cost of Loan:</span> <strong>TT$ {calculationResults.totalCostOfLoanDisplay}</strong></div>
              </CardContent>
            </Card>
          )}

          {amortizationSchedule.length > 0 && (
            <Card className="mt-4">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary">Amortization Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableCaption className="pb-2">Full schedule generated. Showing first entries.</TableCaption>
                    <TableHeader className="sticky top-0 bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[60px] text-xs">Period</TableHead>
                        <TableHead className="text-xs">Payment</TableHead>
                        <TableHead className="text-xs">Principal</TableHead>
                        <TableHead className="text-xs">Interest</TableHead>
                        <TableHead className="text-right text-xs">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortizationSchedule.map((entry) => (
                        <TableRow key={entry.period} className="text-xs">
                          <TableCell className="font-medium">{entry.period}</TableCell>
                          <TableCell>{entry.payment}</TableCell>
                          <TableCell>{entry.principal}</TableCell>
                          <TableCell>{entry.interest}</TableCell>
                          <TableCell className="text-right">{entry.remainingBalance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
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
          Disclaimer: This calculator provides an estimate. Actual loan terms, fees, and payment amounts may vary based on your financial institution and specific loan agreement.
        </p>
      </Card>
    </div>
  );
}

