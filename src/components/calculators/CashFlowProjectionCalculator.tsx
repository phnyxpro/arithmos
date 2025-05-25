
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
import { AreaChart, DollarSign, CalendarDays, Copy, Trash2, CircleCheckBig, CalculatorIcon } from 'lucide-react';
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
  totalInflowsDisplay: "0.00",
  totalOutflowsDisplay: "0.00",
  overallNetCashFlowDisplay: "0.00",
};

export function CashFlowProjectionCalculator() {
  const { toast } = useToast();

  const [openingBalance, setOpeningBalance] = useState<string>("10000");
  const [averagePeriodicInflows, setAveragePeriodicInflows] = useState<string>("5000");
  const [averagePeriodicOutflows, setAveragePeriodicOutflows] = useState<string>("3000");
  const [projectionPeriodUnit, setProjectionPeriodUnit] = useState<string>("monthly");
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
    let cumulativeInflows = 0;
    let cumulativeOutflows = 0;

    for (let period = 1; period <= numPeriods; period++) {
      const inflowsThisPeriod = numAvgInflows;
      const outflowsThisPeriod = numAvgOutflows;
      const netCashFlowThisPeriod = inflowsThisPeriod - outflowsThisPeriod;
      const closingBalanceThisPeriod = currentBalance + netCashFlowThisPeriod;

      schedule.push({
        period,
        openingBalanceDisplay: formatCurrency(currentBalance),
        inflowsDisplay: formatCurrency(inflowsThisPeriod),
        outflowsDisplay: formatCurrency(outflowsThisPeriod),
        netCashFlowDisplay: formatCurrency(netCashFlowThisPeriod),
        closingBalanceDisplay: formatCurrency(closingBalanceThisPeriod),
      });
      currentBalance = closingBalanceThisPeriod;
      cumulativeInflows += inflowsThisPeriod;
      cumulativeOutflows += outflowsThisPeriod;
    }

    setProjectionData(schedule);
    setCalculationSummary({
      finalClosingBalanceDisplay: formatCurrency(currentBalance),
      totalInflowsDisplay: formatCurrency(cumulativeInflows),
      totalOutflowsDisplay: formatCurrency(cumulativeOutflows),
      overallNetCashFlowDisplay: formatCurrency(cumulativeInflows - cumulativeOutflows),
    });

    if(schedule.length > 0) {
        toast({ title: "Projection Generated", description: `Cash flow for ${numPeriods} ${projectionPeriodUnit} periods calculated.` });
    }

  }, [openingBalance, averagePeriodicInflows, averagePeriodicOutflows, numberOfPeriods, projectionPeriodUnit, toast]);

  useEffect(() => {
    // Auto-calculate if all relevant fields have some value (or trigger via button if preferred)
    if (openingBalance && averagePeriodicInflows && averagePeriodicOutflows && numberOfPeriods) {
      handleGenerateProjection();
    } else {
      // Reset if essential inputs are missing to avoid showing stale data
      setProjectionData([]);
      setCalculationSummary(initialCalculationResults);
    }
  }, [openingBalance, averagePeriodicInflows, averagePeriodicOutflows, numberOfPeriods, projectionPeriodUnit, handleGenerateProjection]);


  const handleClearFields = () => {
    setOpeningBalance("");
    setAveragePeriodicInflows("");
    setAveragePeriodicOutflows("");
    setProjectionPeriodUnit("monthly");
    setNumberOfPeriods("");
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
Average ${projectionPeriodUnit.charAt(0).toUpperCase() + projectionPeriodUnit.slice(1)} Inflows: TT$ ${formatCurrency(parseNum(averagePeriodicInflows))}
Average ${projectionPeriodUnit.charAt(0).toUpperCase() + projectionPeriodUnit.slice(1)} Outflows: TT$ ${formatCurrency(parseNum(averagePeriodicOutflows))}
Number of Periods: ${numberOfPeriods} ${projectionPeriodUnit}
---------------------------------
Summary Results:
Total Inflows: TT$ ${calculationSummary.totalInflowsDisplay}
Total Outflows: TT$ ${calculationSummary.totalOutflowsDisplay}
Overall Net Cash Flow: TT$ ${calculationSummary.overallNetCashFlowDisplay}
Final Closing Balance: TT$ ${calculationSummary.finalClosingBalanceDisplay}
---------------------------------
Projection Details (First 5 Periods):
Period | Opening Bal. | Inflows | Outflows | Net Flow | Closing Bal.
`;
    projectionData.slice(0, 5).forEach(entry => {
        textToCopy += `${entry.period} | ${entry.openingBalanceDisplay} | ${entry.inflowsDisplay} | ${entry.outflowsDisplay} | ${entry.netCashFlowDisplay} | ${entry.closingBalanceDisplay}\n`;
    });
    if (projectionData.length > 5) {
        textToCopy += "... and more periods ...\n";
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
            Forecast your business's cash inflows and outflows over several periods.
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
              <Label htmlFor="averagePeriodicInflowsCF" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Average Periodic Inflows (TTD)
              </Label>
              <Input
                id="averagePeriodicInflowsCF" type="number" step="0.01" placeholder="e.g., 5000"
                value={averagePeriodicInflows} onChange={(e) => setAveragePeriodicInflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="averagePeriodicOutflowsCF" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Average Periodic Outflows (TTD)
              </Label>
              <Input
                id="averagePeriodicOutflowsCF" type="number" step="0.01" placeholder="e.g., 3000"
                value={averagePeriodicOutflows} onChange={(e) => setAveragePeriodicOutflows(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="projectionPeriodUnitCF" className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Projection Period Unit
            </Label>
            <Select value={projectionPeriodUnit} onValueChange={setProjectionPeriodUnit}>
              <SelectTrigger id="projectionPeriodUnitCF" className="h-9 text-sm">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {projectionData.length > 0 && (
            <Card className="mt-4">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Cash Flow Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-3 text-xs space-y-1 border-b">
                    <div className="flex justify-between"><span>Total Inflows:</span> <strong className="text-green-600 dark:text-green-500">TT$ {calculationSummary.totalInflowsDisplay}</strong></div>
                    <div className="flex justify-between"><span>Total Outflows:</span> <strong className="text-red-600 dark:text-red-500">TT$ {calculationSummary.totalOutflowsDisplay}</strong></div>
                    <div className="flex justify-between"><span>Overall Net Cash Flow:</span> <strong>TT$ {calculationSummary.overallNetCashFlowDisplay}</strong></div>
                    <div className="flex justify-between font-semibold"><span>Final Closing Balance:</span> <strong className="text-primary">TT$ {calculationSummary.finalClosingBalanceDisplay}</strong></div>
                </div>
                <ScrollArea className={cn("h-[250px] w-full", projectionData.length < 5 && "h-auto")}>
                    <Table>
                        <TableCaption className="text-[10px] py-1 mt-0">Detailed {projectionPeriodUnit.charAt(0).toUpperCase() + projectionPeriodUnit.slice(1)} Projection</TableCaption>
                        <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                            <TableRow>
                                <TableHead className="w-[60px] text-[10px] p-1.5 text-center">Period</TableHead>
                                <TableHead className="text-[10px] p-1.5 text-right">Opening Bal.</TableHead>
                                <TableHead className="text-[10px] p-1.5 text-right">Inflows</TableHead>
                                <TableHead className="text-[10px] p-1.5 text-right">Outflows</TableHead>
                                <TableHead className="text-[10px] p-1.5 text-right">Net Flow</TableHead>
                                <TableHead className="text-right text-[10px] p-1.5">Closing Bal.</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {projectionData.map((entry) => (
                            <TableRow key={entry.period} className="text-[10px]">
                                <TableCell className="font-medium p-1.5 text-center">{entry.period}</TableCell>
                                <TableCell className="p-1.5 text-right">{entry.openingBalanceDisplay}</TableCell>
                                <TableCell className="p-1.5 text-right text-green-700 dark:text-green-500">{entry.inflowsDisplay}</TableCell>
                                <TableCell className="p-1.5 text-right text-red-700 dark:text-red-500">{entry.outflowsDisplay}</TableCell>
                                <TableCell className={cn("p-1.5 text-right font-medium", parseNum(entry.netCashFlowDisplay.replace(/,/g, '')) < 0 ? "text-red-700 dark:text-red-500" : "text-green-700 dark:text-green-500")}>{entry.netCashFlowDisplay}</TableCell>
                                <TableCell className="text-right p-1.5 font-semibold">{entry.closingBalanceDisplay}</TableCell>
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
          Disclaimer: This calculator provides a simplified cash flow projection based on average periodic inflows and outflows. Actual cash flow can vary significantly due to timing of payments, seasonality, and unforeseen expenses or income.
        </p>
      </Card>
    </div>
  );
}

    