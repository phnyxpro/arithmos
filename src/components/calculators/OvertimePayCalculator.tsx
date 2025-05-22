
// src/components/calculators/OvertimePayCalculator.tsx
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
import { AlarmClock, DollarSign, Hourglass, Percent as PercentIcon, Copy, Trash2, Calculator } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function OvertimePayCalculator() {
  const { toast } = useToast();
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [regularHours, setRegularHours] = useState<string>("");
  const [overtimeHours, setOvertimeHours] = useState<string>("");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<string>("1.5");

  const initialResults = {
    regularPayDisplay: "0.00",
    overtimePayDisplay: "0.00",
    totalGrossPayDisplay: "0.00",
  };
  const [calculationResults, setCalculationResults] = useState(initialResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateOvertimePay = useCallback(() => {
    const numHourlyRate = parseNum(hourlyRate);
    const numRegularHours = parseNum(regularHours);
    const numOvertimeHours = parseNum(overtimeHours);
    const numOvertimeMultiplier = parseNum(overtimeMultiplier);

    if (numHourlyRate <= 0 && numRegularHours <= 0 && numOvertimeHours <= 0) {
      setCalculationResults(initialResults);
      return;
    }
    
    if (numOvertimeMultiplier <= 0 && numOvertimeHours > 0) {
        toast({
            title: "Invalid Multiplier",
            description: "Overtime multiplier must be greater than 0 if overtime hours are entered.",
            variant: "destructive",
        });
        setCalculationResults(initialResults);
        return;
    }


    const calculatedRegularPay = numHourlyRate * numRegularHours;
    const calculatedOvertimePay = numHourlyRate * numOvertimeMultiplier * numOvertimeHours;
    const calculatedTotalGrossPay = calculatedRegularPay + calculatedOvertimePay;

    setCalculationResults({
      regularPayDisplay: formatCurrency(calculatedRegularPay),
      overtimePayDisplay: formatCurrency(calculatedOvertimePay),
      totalGrossPayDisplay: formatCurrency(calculatedTotalGrossPay),
    });
  }, [hourlyRate, regularHours, overtimeHours, overtimeMultiplier, toast]);

  useEffect(() => {
    if (hourlyRate || regularHours || overtimeHours || overtimeMultiplier ) {
      handleCalculateOvertimePay();
    } else {
      setCalculationResults(initialResults);
    }
  }, [hourlyRate, regularHours, overtimeHours, overtimeMultiplier, handleCalculateOvertimePay]);

  const handleClearFields = () => {
    setHourlyRate("");
    setRegularHours("");
    setOvertimeHours("");
    setOvertimeMultiplier("1.5");
    setCalculationResults(initialResults);
    toast({ title: "Fields Cleared", description: "Overtime Pay Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.totalGrossPayDisplay === "0.00") {
      toast({ title: "No Results", description: "Please calculate pay first.", variant: "default"});
      return;
    }
    const textToCopy = `
Overtime Pay Calculation Summary
---------------------------------
Inputs:
Hourly Rate: TT$ ${formatCurrency(parseNum(hourlyRate))}
Regular Hours Worked: ${regularHours || '0'}
Overtime Hours Worked: ${overtimeHours || '0'}
Overtime Multiplier: ${overtimeMultiplier || 'N/A'}x
---------------------------------
Results:
Regular Pay: TT$ ${calculationResults.regularPayDisplay}
Overtime Pay: TT$ ${calculationResults.overtimePayDisplay}
Total Gross Pay: TT$ ${calculationResults.totalGrossPayDisplay}
---------------------------------
Disclaimer: This is an estimate. Actual pay may vary based on specific employment agreements and statutory deductions.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Overtime pay calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* DialogTitle is part of the parent Dialog */}
          {/* <CardTitle className="text-xl text-primary">Overtime Pay Calculator</CardTitle> */}
          <CardDescription>
            Compute overtime pay accurately for hourly paid workers by entering their regular rate, hours worked, and overtime conditions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="hourlyRateOvertime" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Hourly Rate (TTD)
              </Label>
              <Input
                id="hourlyRateOvertime"
                type="number"
                step="0.01"
                placeholder="e.g., 25.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="regularHoursOvertime" className="flex items-center text-sm">
                <Hourglass className="mr-2 h-4 w-4 text-muted-foreground" /> Regular Hours Worked
              </Label>
              <Input
                id="regularHoursOvertime"
                type="number"
                step="0.1"
                placeholder="e.g., 40"
                value={regularHours}
                onChange={(e) => setRegularHours(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="overtimeHoursOvertime" className="flex items-center text-sm">
                <AlarmClock className="mr-2 h-4 w-4 text-muted-foreground" /> Overtime Hours Worked
              </Label>
              <Input
                id="overtimeHoursOvertime"
                type="number"
                step="0.1"
                placeholder="e.g., 5"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="overtimeMultiplierOvertime" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Overtime Multiplier
              </Label>
              <Input
                id="overtimeMultiplierOvertime"
                type="number"
                step="0.1"
                placeholder="e.g., 1.5"
                value={overtimeMultiplier}
                onChange={(e) => setOvertimeMultiplier(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          {(parseNum(hourlyRate) > 0 || parseNum(regularHours) > 0 || parseNum(overtimeHours) > 0) && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                  <Calculator className="mr-2 h-4 w-4" /> Estimated Pay Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Regular Pay:</span> <strong>TT$ {calculationResults.regularPayDisplay}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Pay:</span> <strong className="text-primary">TT$ {calculationResults.overtimePayDisplay}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm">
                  <span>Total Estimated Gross Pay:</span> <strong className="text-primary">TT$ {calculationResults.totalGrossPayDisplay}</strong>
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
          Disclaimer: This calculator provides an estimate of gross pay before statutory deductions (PAYE, NIS, Health Surcharge). Actual net pay will be lower. Overtime rules can vary by industry and employment contract.
        </p>
      </Card>
    </div>
  );
}
