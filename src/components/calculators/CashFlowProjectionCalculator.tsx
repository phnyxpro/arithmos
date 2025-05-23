
// src/components/calculators/CashFlowProjectionCalculator.tsx
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
import { AreaChart, DollarSign, CalendarDays, Repeat, Calculator as CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CashFlowEntry {
  period: number;
  openingBalanceDisplay: string;
  inflowsDisplay: string;
  outflowsDisplay: string;
  netCashFlowDisplay: string;
  closingBalanceDisplay: string;
}

const initialProjectionData: CashFlowEntry[] = [];

const initialCalculationSummary = {
  finalClosingBalanceDisplay: "0.00",
  totalInflowsDisplay: "0.00",
  totalOutflowsDisplay: "0.00",
  overallNetCashFlowDisplay: "0.00",
};

export function CashFlowProjectionCalculator() {
  const { toast } = useToast();

  const [openingBalance, setOpeningBalance] = useState<string>("");
  const [averagePeriodicInflows, setAveragePeriodicInflows] = useState<string>("");
  const [averagePeriodicOutflows, setAveragePeriodicOutflows] = useState<string>("");
  const [projectionPeriodUnit, setProjectionPeriodUnit] = useState<string>("monthly");
  const [numberOfPeriods, setNumberOfPeriods] = useState<string>("12");
  
  const [projectionData, setProjectionData] = useState<CashFlowEntry[]>(initialProjectionData);
  const [calculationSummary, setCalculationSummary] = useState(initialCalculationSummary);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleGenerateProjection = useCallback(() => {
    const numOpeningBalance = parseNum(openingBalance);
    const numAvgInflows = parseNum(averagePeriodicInflows);
    const numAvgOutflows = parseNum(averagePeriodicOutflows);
    const numPeriods = parseInt(numberOfPeriods, 10);

    if (numPeriods <= 0) {
      toast({ title: "Invalid Input", description: "Number of periods must be greater than zero.", variant: "destructive" });
      setProjectionData(initialProjectionData);
      setCalculationSummary(initialCalculationSummary);
      return;
    }

    const newProjectionData: CashFlowEntry[] = [];
    let currentOpeningBalance = numOpeningBalance;
    let totalInflows = 0;
    let totalOutflows = 0;

    for (let i = 1; i <= numPeriods; i++) {
      const inflowsThisPeriod = numAvgInflows;
      const outflowsThisPeriod = numAvgOutflows;
      const netCashFlowThisPeriod = inflowsThisPeriod - outflowsThisPeriod;
      const closingBalanceThisPeriod = currentOpeningBalance + netCashFlowThisPeriod;

      newProjectionData.push({
        period: i,
        openingBalanceDisplay: formatCurrency(currentOpeningBalance),
        inflowsDisplay: formatCurrency(inflowsThisPeriod),
        outflowsDisplay: formatCurrency(outflowsThisPeriod),
        netCashFlowDisplay: formatCurrency(netCashFlowThisPeriod),
        closingBalanceDisplay: formatCurrency(closingBalanceThisPeriod),
      });
      currentOpeningBalance = closingBalanceThisPeriod;
      totalInflows += inflowsThisPeriod;
      totalOutflows += outflowsThisPeriod;
    }

    setProjectionData(newProjectionData);
    setCalculationSummary({
      finalClosingBalanceDisplay: formatCurrency(currentOpeningBalance),
      totalInflowsDisplay: formatCurrency(totalInflows),
      totalOutflowsDisplay: formatCurrency(totalOutflows),
      overallNetCashFlowDisplay: formatCurrency(totalInflows - totalOutflows),
    });

    toast({
      title: "Projection Generated",
      description: `Cash flow projected for ${numPeriods} ${projectionPeriodUnit === "monthly" ? "months" : "quarters"}.`,
    });
  }, [openingBalance, averagePeriodicInflows, averagePeriodicOutflows, numberOfPeriods, projectionPeriodUnit, toast]);

  const handleClearFields = () => {
    setOpeningBalance("");
    setAveragePeriodicInflows("");
    setAveragePeriodicOutflows("");
    setProjectionPeriodUnit("monthly");
    setNumberOfPeriods("12");
    setProjectionData(initialProjectionData);
    setCalculationSummary(initialCalculationSummary);
    toast({ title: "Fields Cleared", description: "Cash flow projection inputs reset." });
  };

  const handleCopyResults = () => {
    if (projectionData.length === 0) {
        toast({ title: "No Results to Copy", description: "Please generate a projection first.", variant: "default"});
        return;
    }
    let textToCopy = `
Cash Flow Projection Summary
---------------------------------
Inputs:
Opening Balance: TT$ ${formatCurrency(parseNum(openingBalance))}
Average ${projectionPeriodUnit === "monthly" ? "Monthly" : "Quarterly"} Inflows: TT$ ${formatCurrency(parseNum(averagePeriodicInflows))}
Average ${projectionPeriodUnit === "monthly" ? "Monthly" : "Quarterly"} Outflows: TT$ ${formatCurrency(parseNum(averagePeriodicOutflows))}
Number of ${projectionPeriodUnit === "monthly" ? "Months" : "Quarters"}: ${numberOfPeriods}
---------------------------------
Projection Summary:
Total Inflows: TT$ ${calculationSummary.totalInflowsDisplay}
Total Outflows: TT$ ${calculationSummary.totalOutflowsDisplay}
Overall Net Cash Flow: TT$ ${calculationSummary.overallNetCashFlowDisplay}
Final Closing Balance: TT$ ${calculationSummary.finalClosingBalanceDisplay}
---------------------------------
Detailed Projection:
Period | Opening Balance | Inflows | Outflows | Net Flow | Closing Balance
`;
    projectionData.forEach(entry => {
        textToCopy += `${entry.period} | ${entry.openingBalanceDisplay} | ${entry.inflowsDisplay} | ${entry.outflowsDisplay} | ${entry.netCashFlowDisplay} | ${entry.closingBalanceDisplay}\n`;
    });
    textToCopy += `---------------------------------
Disclaimer: This projection is based on average figures and does not account for unexpected variations.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Cash flow projection details copied." });
  };


  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Forecast your cash flow by providing opening balance, average inflows/outflows, and projection duration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="openingBalance" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Opening Balance (TTD)
              </Label>
              <Input
                id="openingBalance" type="number" step="0.01" placeholder="e.g., 10000"
                value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="numberOfPeriods" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Number of Periods
              </Label>
              <Input
                id="numberOfPeriods" type="number" step="1" placeholder="e.g., 12"
                value={numberOfPeriods} onChange={(e) => setNumberOfPeriods(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="averagePeriodicInflows" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Avg. Periodic Inflows (TTD)
              </Label>
              <Input
                id="averagePeriodicInflows" type="number" step="0.01" placeholder="e.g., 5000"
                value={averagePeriodicInflows} onChange={(e) => setAveragePeriodicInflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="averagePeriodicOutflows" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Avg. Periodic Outflows (TTD)
              </Label>
              <Input
                id="averagePeriodicOutflows" type="number" step="0.01" placeholder="e.g., 3000"
                value={averagePeriodicOutflows} onChange={(e) => setAveragePeriodicOutflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
             <div className="space-y-1 md:col-span-1">
              <Label htmlFor="projectionPeriodUnit" className="flex items-center text-sm">
                <Repeat className="mr-2 h-4 w-4 text-muted-foreground" /> Period Unit
              </Label>
              <Select value={projectionPeriodUnit} onValueChange={setProjectionPeriodUnit}>
                <SelectTrigger id="projectionPeriodUnit" className="h-9 text-sm">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleGenerateProjection} className="w-full mt-4 bg-primary hover:bg-primary/90 text-sm h-9">
            <CalculatorIcon className="mr-2 h-4 w-4" /> Generate Projection
          </Button>

          {projectionData.length > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Cash Flow Projection for {numberOfPeriods} {projectionPeriodUnit}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-2">
                 <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2 text-foreground">
                    <div>Total Inflows: <strong>TT$ {calculationSummary.totalInflowsDisplay}</strong></div>
                    <div>Total Outflows: <strong>TT$ {calculationSummary.totalOutflowsDisplay}</strong></div>
                    <div>Overall Net Cash Flow: <strong>TT$ {calculationSummary.overallNetCashFlowDisplay}</strong></div>
                    <div>Final Closing Balance: <strong className="text-primary">TT$ {calculationSummary.finalClosingBalanceDisplay}</strong></div>
                 </div>
                <ScrollArea className="h-[200px] w-full border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-muted">
                      <TableRow>
                        <TableHead className="w-[50px] text-[10px] p-1.5">Period</TableHead>
                        <TableHead className="text-[10px] p-1.5">Opening</TableHead>
                        <TableHead className="text-[10px] p-1.5">Inflows</TableHead>
                        <TableHead className="text-[10px] p-1.5">Outflows</TableHead>
                        <TableHead className="text-[10px] p-1.5">Net Flow</TableHead>
                        <TableHead className="text-right text-[10px] p-1.5">Closing</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectionData.map((entry) => (
                        <TableRow key={entry.period} className="text-[10px]">
                          <TableCell className="font-medium p-1.5">{entry.period}</TableCell>
                          <TableCell className="p-1.5">{entry.openingBalanceDisplay}</TableCell>
                          <TableCell className="p-1.5 text-green-600 dark:text-green-500">{entry.inflowsDisplay}</TableCell>
                          <TableCell className="p-1.5 text-red-600 dark:text-red-500">{entry.outflowsDisplay}</TableCell>
                          <TableCell className={`p-1.5 font-medium ${parseNum(entry.netCashFlowDisplay) >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{entry.netCashFlowDisplay}</TableCell>
                          <TableCell className="text-right p-1.5 font-semibold">{entry.closingBalanceDisplay}</TableCell>
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
          Disclaimer: This calculator provides a simplified cash flow projection based on average periodic inflows and outflows. Actual cash flow can be more complex and variable. This tool is for illustrative purposes only.
        </p>
      </Card>
    </div>
  );
}
