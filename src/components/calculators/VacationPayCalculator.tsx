
// src/components/calculators/VacationPayCalculator.tsx
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
import { Plane, DollarSign, Hourglass, CalendarDays, Calculator, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const payRateTypeOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const daysPerWeekOptions = [
  { value: "1", label: "1 day" },
  { value: "2", label: "2 days" },
  { value: "3", label: "3 days" },
  { value: "4", label: "4 days" },
  { value: "5", label: "5 days" },
  { value: "6", label: "6 days" },
  { value: "7", label: "7 days" },
];

const AVG_WORKING_DAYS_PER_MONTH = 21.67; // Common approximation

export default function VacationPayCalculator() {
  const { toast } = useToast();
  const [payRateType, setPayRateType] = useState<string>("hourly");
  const [payRateAmount, setPayRateAmount] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("8");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("5");
  const [vacationDays, setVacationDays] = useState<string>("");

  const initialResults = {
    calculatedDailyRateDisplay: "0.00",
    estimatedVacationPayDisplay: "0.00",
  };
  const [calculationResults, setCalculationResults] = useState(initialResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateVacationPay = useCallback(() => {
    const numPayRateAmount = parseNum(payRateAmount);
    const numHoursPerDay = parseNum(hoursPerDay);
    const numDaysPerWeek = parseNum(daysPerWeek);
    const numVacationDays = parseNum(vacationDays);

    if (numPayRateAmount <= 0 || numVacationDays <= 0) {
      setCalculationResults(initialResults);
      return;
    }

    let equivalentDailyRate = 0;
    if (payRateType === "hourly") {
      if (numHoursPerDay <= 0) {
        toast({ title: "Invalid Input", description: "Hours per day must be greater than 0 for hourly rate.", variant: "destructive" });
        setCalculationResults(initialResults);
        return;
      }
      equivalentDailyRate = numPayRateAmount * numHoursPerDay;
    } else if (payRateType === "daily") {
      equivalentDailyRate = numPayRateAmount;
    } else if (payRateType === "weekly") {
      if (numDaysPerWeek <= 0) {
        toast({ title: "Invalid Input", description: "Days per week must be greater than 0 for weekly rate.", variant: "destructive" });
        setCalculationResults(initialResults);
        return;
      }
      equivalentDailyRate = numPayRateAmount / numDaysPerWeek;
    } else if (payRateType === "monthly") {
      equivalentDailyRate = numPayRateAmount / AVG_WORKING_DAYS_PER_MONTH;
    }

    const estimatedVacationPay = equivalentDailyRate * numVacationDays;

    setCalculationResults({
      calculatedDailyRateDisplay: formatCurrency(equivalentDailyRate),
      estimatedVacationPayDisplay: formatCurrency(estimatedVacationPay),
    });
  }, [payRateAmount, hoursPerDay, daysPerWeek, vacationDays, payRateType, toast]);

  useEffect(() => {
    if (payRateAmount || vacationDays) {
      handleCalculateVacationPay();
    } else {
      setCalculationResults(initialResults);
    }
  }, [payRateAmount, vacationDays, hoursPerDay, daysPerWeek, payRateType, handleCalculateVacationPay]);

  const handleClearFields = () => {
    setPayRateType("hourly");
    setPayRateAmount("");
    setHoursPerDay("8");
    setDaysPerWeek("5");
    setVacationDays("");
    setCalculationResults(initialResults);
    toast({ title: "Fields Cleared", description: "Vacation Pay Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.estimatedVacationPayDisplay === "0.00") {
      toast({ title: "No Results", description: "Please calculate pay first.", variant: "default" });
      return;
    }
    let inputsInfo = `Pay Rate Type: ${payRateTypeOptions.find(opt => opt.value === payRateType)?.label}\nPay Rate Amount: TT$ ${formatCurrency(parseNum(payRateAmount))}\n`;
    if (payRateType === "hourly") inputsInfo += `Hours per Day: ${hoursPerDay}\n`;
    if (payRateType === "weekly") inputsInfo += `Working Days per Week: ${daysPerWeek}\n`;
    inputsInfo += `Number of Vacation Days: ${vacationDays}\n`;
    
    const textToCopy = `
Vacation Pay Calculation Summary
---------------------------------
Inputs:
${inputsInfo}
---------------------------------
Results:
Calculated Daily Rate: TT$ ${calculationResults.calculatedDailyRateDisplay}
Estimated Vacation Pay: TT$ ${calculationResults.estimatedVacationPayDisplay}
---------------------------------
Disclaimer: This is an estimate. Actual vacation pay may depend on specific employment contracts, company policies, and statutory requirements.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Vacation pay calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Estimate your accrued vacation pay based on your regular pay rate and number of vacation days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="payRateTypeVacation" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Pay Rate Type
              </Label>
              <Select value={payRateType} onValueChange={setPayRateType}>
                <SelectTrigger id="payRateTypeVacation" className="h-9 text-sm">
                  <SelectValue placeholder="Select pay rate type" />
                </SelectTrigger>
                <SelectContent>
                  {payRateTypeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="payRateAmountVacation" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Pay Rate Amount (TTD)
              </Label>
              <Input
                id="payRateAmountVacation" type="number" step="0.01" placeholder="e.g., 25.00 or 5000.00"
                value={payRateAmount} onChange={(e) => setPayRateAmount(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          {payRateType === "hourly" && (
            <div className="space-y-1">
              <Label htmlFor="hoursPerDayVacation" className="flex items-center text-sm">
                <Hourglass className="mr-2 h-4 w-4 text-muted-foreground" /> Hours per Day
              </Label>
              <Input
                id="hoursPerDayVacation" type="number" step="0.1" placeholder="e.g., 8"
                value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          )}

          {payRateType === "weekly" && (
            <div className="space-y-1">
              <Label htmlFor="daysPerWeekVacation" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Working Days per Week
              </Label>
              <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                <SelectTrigger id="daysPerWeekVacation" className="h-9 text-sm">
                    <SelectValue placeholder="Select working days" />
                </SelectTrigger>
                <SelectContent>
                    {daysPerWeekOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="vacationDays" className="flex items-center text-sm">
              <Plane className="mr-2 h-4 w-4 text-muted-foreground" /> Number of Vacation Days
            </Label>
            <Input
              id="vacationDays" type="number" step="1" placeholder="e.g., 10"
              value={vacationDays} onChange={(e) => setVacationDays(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {(parseNum(payRateAmount) > 0 && parseNum(vacationDays) > 0) && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                  <CircleCheckBig className="mr-2 h-4 w-4" /> Estimated Vacation Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Calculated Equivalent Daily Rate:</span> <strong>TT$ {calculationResults.calculatedDailyRateDisplay}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm">
                  <span>Estimated Total Vacation Pay:</span> <strong className="text-primary">TT$ {calculationResults.estimatedVacationPayDisplay}</strong>
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
          Disclaimer: This calculator provides an estimate of gross vacation pay before any statutory deductions (like PAYE, NIS, Health Surcharge). Actual vacation pay entitlements and calculations can vary based on specific employment contracts, company policies, years of service, and relevant labour laws in Trinidad & Tobago. For monthly salaries, an average of 21.67 working days per month is used for approximation.
        </p>
      </Card>
    </div>
  );
}

    