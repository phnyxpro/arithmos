
// src/components/calculators/CashFlowProjectionCalculator.tsx
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
import { Separator } from '@/components/ui/separator';
import { AreaChart, DollarSign, CalendarDays, Calculator as CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


interface ProjectionEntry {
  period: number;
  openingBalanceDisplay: string;
  inflowsDisplay: string;
  outflowsDisplay: string;
  netCashFlowDisplay: string;
  closingBalanceDisplay: string;
}

const initialCalculationResults = {
  finalClosingBalanceDisplay: "0.00",
};

export function CashFlowProjectionCalculator() {
  const { toast } = useToast();

  const [openingBalance, setOpeningBalance] = useState<string>("");
  const [averagePeriodicInflows, setAveragePeriodicInflows] = useState<string>("");
  const [averagePeriodicOutflows, setAveragePeriodicOutflows] = useState<string>("");
  const [projectionPeriodUnit, setProjectionPeriodUnit] = useState<"monthly" | "quarterly">("monthly");
  const [numberOfPeriods, setNumberOfPeriods] = useState<string>("12");
  
  const [projectionData, setProjectionData] = useState<ProjectionEntry[]>([]);
  const [calculationSummary, setCalculationSummary] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleGenerateProjection = useCallback(() => {
    const numOpeningBalance = parseNum(openingBalance);
    const numAvgInflows = parseNum(averagePeriodicInflows);
    const numAvgOutflows = parseNum(averagePeriodicOutflows);
    const numPeriods = parseInt(numberOfPeriods, 10);

    if (numPeriods <= 0) {
      toast({ title: "Invalid Input", description: "Number of periods must be greater than zero.", variant: "destructive" });
      setProjectionData([]);
      setCalculationSummary(initialCalculationResults);
      return;
    }

    const schedule: ProjectionEntry[] = [];
    let currentBalance = numOpeningBalance;

    for (let i = 1; i <= numPeriods; i++) {
      const netFlow = numAvgInflows - numAvgOutflows;
      const closingBal = currentBalance + netFlow;
      schedule.push({
        period: i,
        openingBalanceDisplay: formatCurrency(currentBalance),
        inflowsDisplay: formatCurrency(numAvgInflows),
        outflowsDisplay: formatCurrency(numAvgOutflows),
        netCashFlowDisplay: formatCurrency(netFlow),
        closingBalanceDisplay: formatCurrency(closingBal),
      });
      currentBalance = closingBal;
    }

    setProjectionData(schedule);
    setCalculationSummary({
      finalClosingBalanceDisplay: formatCurrency(currentBalance),
    });

    toast({
      title: "Projection Generated",
      description: `Cash flow projected for ${numPeriods} ${projectionPeriodUnit}.`,
    });
  }, [openingBalance, averagePeriodicInflows, averagePeriodicOutflows, numberOfPeriods, projectionPeriodUnit, toast]);

  const handleClearFields = () => {
    setOpeningBalance("");
    setAveragePeriodicInflows("");
    setAveragePeriodicOutflows("");
    setProjectionPeriodUnit("monthly");
    setNumberOfPeriods("12");
    setProjectionData([]);
    setCalculationSummary(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Cash Flow Projection inputs reset." });
  };

  const handleCopyResults = () => {
    if (projectionData.length === 0) {
      toast({ title: "No Results", description: "Please generate a projection first.", variant: "default"});
      return;
    }
    let textToCopy = `
Cash Flow Projection Summary
---------------------------------
Inputs:
Opening Balance: TT$ ${formatCurrency(parseNum(openingBalance))}
Average Periodic Inflows: TT$ ${formatCurrency(parseNum(averagePeriodicInflows))}
Average Periodic Outflows: TT$ ${formatCurrency(parseNum(averagePeriodicOutflows))}
Projection Period: ${projectionPeriodUnit}
Number of Periods: ${numberOfPeriods}
---------------------------------
Final Closing Balance after ${numberOfPeriods} ${projectionPeriodUnit}(s): TT$ ${calculationSummary.finalClosingBalanceDisplay}
---------------------------------
Projection Table:
Period | Opening Balance | Inflows | Outflows | Net Cash Flow | Closing Balance
`;
    projectionData.slice(0, 10).forEach(entry => { // Copy first 10 entries for brevity
        textToCopy += `${entry.period} | ${entry.openingBalanceDisplay} | ${entry.inflowsDisplay} | ${entry.outflowsDisplay} | ${entry.netCashFlowDisplay} | ${entry.closingBalanceDisplay}\n`;
    });
     if (projectionData.length > 10) {
        textToCopy += "... and more entries ...\n";
    }
    textToCopy += `---------------------------------
Disclaimer: This is an estimate. Actual cash flows may vary.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Cash flow projection details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Forecast your cash flow over several periods based on average inflows and outflows.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="openingBalanceCF" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Opening Balance (TTD)
              </Label>
              <Input
                id="openingBalanceCF" type="number" step="0.01" placeholder="e.g., 10000"
                value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="numberOfPeriodsCF" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Number of Periods
              </Label>
              <Input
                id="numberOfPeriodsCF" type="number" step="1" placeholder="e.g., 12"
                value={numberOfPeriods} onChange={(e) => setNumberOfPeriods(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="avgPeriodicInflowsCF" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Avg. Periodic Inflows (TTD)
              </Label>
              <Input
                id="avgPeriodicInflowsCF" type="number" step="0.01" placeholder="e.g., 5000"
                value={averagePeriodicInflows} onChange={(e) => setAveragePeriodicInflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="avgPeriodicOutflowsCF" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Avg. Periodic Outflows (TTD)
              </Label>
              <Input
                id="avgPeriodicOutflowsCF" type="number" step="0.01" placeholder="e.g., 3000"
                value={averagePeriodicOutflows} onChange={(e) => setAveragePeriodicOutflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="projectionPeriodUnitCF" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Projection Period Unit
            </Label>
            <Select value={projectionPeriodUnit} onValueChange={(value: "monthly" | "quarterly") => setProjectionPeriodUnit(value)}>
                <SelectTrigger id="projectionPeriodUnitCF" className="h-9 text-sm">
                    <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleGenerateProjection} className="w-full mt-4 bg-primary hover:bg-primary/90 text-sm h-9">
            <CalculatorIcon className="mr-2 h-4 w-4" /> Generate Projection
          </Button>

          {projectionData.length > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Cash Flow Projection
                </CardTitle>
                 <CardDescription className="text-xs">
                    Final Closing Balance after {numberOfPeriods} {projectionPeriodUnit}(s): 
                    <strong className="text-primary"> TT$ {calculationSummary.finalClosingBalanceDisplay}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 text-xs">
                <ScrollArea className="h-[200px] w-full border rounded-md">
                    <Table>
                        <TableCaption className="text-[10px] py-1">Cash Flow Projection Details</TableCaption>
                        <TableHeader className="sticky top-0 bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[50px] text-[10px] p-1.5">Period</TableHead>
                                <TableHead className="text-[10px] p-1.5">Opening Bal.</TableHead>
                                <TableHead className="text-[10px] p-1.5">Inflows</TableHead>
                                <TableHead className="text-[10px] p-1.5">Outflows</TableHead>
                                <TableHead className="text-[10px] p-1.5">Net Flow</TableHead>
                                <TableHead className="text-right text-[10px] p-1.5">Closing Bal.</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {projectionData.map((entry) => (
                            <TableRow key={entry.period} className="text-[10px]">
                                <TableCell className="font-medium p-1.5">{entry.period}</TableCell>
                                <TableCell className="p-1.5">{entry.openingBalanceDisplay}</TableCell>
                                <TableCell className="p-1.5">{entry.inflowsDisplay}</TableCell>
                                <TableCell className="p-1.5">{entry.outflowsDisplay}</TableCell>
                                <TableCell className={cn("p-1.5", parseNum(entry.netCashFlowDisplay.replace(/,/g,'')) < 0 ? "text-destructive" : "text-green-600 dark:text-green-500")}>
                                    {entry.netCashFlowDisplay}
                                </TableCell>
                                <TableCell className="text-right p-1.5">{entry.closingBalanceDisplay}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal"/>
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
          Disclaimer: This calculator provides a simplified cash flow projection based on average periodic figures. Actual cash flow can be affected by many variables and unforeseen events.
        </p>
      </Card>
    </div>
  );
}

    
