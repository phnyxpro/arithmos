
// src/components/calculators/DepreciationCalculator.tsx
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
import { TrendingDown, DollarSign, CalendarDays, Percent as PercentIcon, Calculator, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DepreciationScheduleEntry {
  year: number;
  openingBookValue: string;
  depreciationExpense: string;
  accumulatedDepreciation: string;
  closingBookValue: string;
}

const initialSummary = {
  totalDepreciationDisplay: "0.00",
  finalBookValueDisplay: "0.00",
  annualDepreciationSL: "0.00", // For straight-line
};

export default function DepreciationCalculator() {
  const { toast } = useToast();

  const [assetCost, setAssetCost] = useState<string>("");
  const [salvageValue, setSalvageValue] = useState<string>("0");
  const [usefulLife, setUsefulLife] = useState<string>("");
  const [depreciationMethod, setDepreciationMethod] = useState<string>("straight-line");
  const [reducingBalanceRate, setReducingBalanceRate] = useState<string>(""); // Percentage e.g. "20" for 20%
  
  const [depreciationSchedule, setDepreciationSchedule] = useState<DepreciationScheduleEntry[]>([]);
  const [calculationSummary, setCalculationSummary] = useState(initialSummary);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateDepreciation = useCallback(() => {
    const cost = parseNum(assetCost);
    const salvage = parseNum(salvageValue);
    const life = parseInt(usefulLife, 10);
    const rbRatePercent = parseNum(reducingBalanceRate);

    if (cost <= 0 || life <= 0) {
      toast({ title: "Invalid Input", description: "Asset cost and useful life must be positive.", variant: "destructive" });
      setDepreciationSchedule([]);
      setCalculationSummary(initialSummary);
      return;
    }
    if (salvage < 0) {
      toast({ title: "Invalid Input", description: "Salvage value cannot be negative.", variant: "destructive" });
      return;
    }
    if (salvage >= cost) {
        toast({ title: "Input Error", description: "Salvage value must be less than asset cost for depreciation.", variant: "default"});
        // Allow calculation to show zero depreciation or handle as per accounting rules
    }
    if (depreciationMethod === "reducing-balance" && (rbRatePercent <= 0 || rbRatePercent > 100)) {
      toast({ title: "Invalid Rate", description: "Reducing balance rate must be between 1% and 100%.", variant: "destructive" });
      setDepreciationSchedule([]);
      setCalculationSummary(initialSummary);
      return;
    }

    const schedule: DepreciationScheduleEntry[] = [];
    let currentBookValue = cost;
    let accumulatedDep = 0;
    let totalDepreciationCalculated = 0;
    let annualDepSL = 0;

    if (depreciationMethod === "straight-line") {
      const depreciableAmount = Math.max(0, cost - salvage);
      annualDepSL = life > 0 ? depreciableAmount / life : 0;
      for (let year = 1; year <= life; year++) {
        const depExpense = Math.min(annualDepSL, currentBookValue - salvage); // Ensure not to depreciate below salvage
        accumulatedDep += depExpense;
        const closingBookValue = cost - accumulatedDep;
        schedule.push({
          year,
          openingBookValue: formatCurrency(currentBookValue),
          depreciationExpense: formatCurrency(depExpense),
          accumulatedDepreciation: formatCurrency(accumulatedDep),
          closingBookValue: formatCurrency(closingBookValue),
        });
        currentBookValue = closingBookValue;
        totalDepreciationCalculated += depExpense;
      }
    } else if (depreciationMethod === "reducing-balance") {
      const rateDecimal = rbRatePercent / 100;
      for (let year = 1; year <= life; year++) {
        let depExpense = currentBookValue * rateDecimal;
        // Ensure book value does not go below salvage value
        if (currentBookValue - depExpense < salvage) {
          depExpense = Math.max(0, currentBookValue - salvage);
        }
        accumulatedDep += depExpense;
        const closingBookValue = cost - accumulatedDep;
         schedule.push({
          year,
          openingBookValue: formatCurrency(currentBookValue),
          depreciationExpense: formatCurrency(depExpense),
          accumulatedDepreciation: formatCurrency(accumulatedDep),
          closingBookValue: formatCurrency(closingBookValue),
        });
        currentBookValue = closingBookValue;
        totalDepreciationCalculated += depExpense;
        if (currentBookValue <= salvage) break; // Stop if book value reaches salvage
      }
    }

    setDepreciationSchedule(schedule);
    setCalculationSummary({
      totalDepreciationDisplay: formatCurrency(totalDepreciationCalculated),
      finalBookValueDisplay: formatCurrency(currentBookValue),
      annualDepreciationSL: depreciationMethod === "straight-line" ? formatCurrency(annualDepSL) : "N/A",
    });
    toast({ title: "Depreciation Calculated", description: "Schedule updated below." });
  }, [assetCost, salvageValue, usefulLife, depreciationMethod, reducingBalanceRate, toast]);

  const handleClearFields = () => {
    setAssetCost("");
    setSalvageValue("0");
    setUsefulLife("");
    setDepreciationMethod("straight-line");
    setReducingBalanceRate("");
    setDepreciationSchedule([]);
    setCalculationSummary(initialSummary);
    toast({ title: "Fields Cleared", description: "Depreciation calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (depreciationSchedule.length === 0) {
        toast({ title: "No Results", description: "Please calculate depreciation first.", variant: "default"});
        return;
    }
    let textToCopy = `
Depreciation Calculation Summary
---------------------------------
Inputs:
Asset Cost: TT$ ${formatCurrency(parseNum(assetCost))}
Salvage Value: TT$ ${formatCurrency(parseNum(salvageValue))}
Useful Life: ${usefulLife} years
Method: ${depreciationMethod === "straight-line" ? "Straight-Line" : `Reducing Balance (${reducingBalanceRate}%)`}
---------------------------------
Summary Results:
Total Depreciation: TT$ ${calculationSummary.totalDepreciationDisplay}
Final Book Value: TT$ ${calculationSummary.finalBookValueDisplay}
${calculationSummary.annualDepreciationSL !== "N/A" ? `Annual Straight-Line Depreciation: TT$ ${calculationSummary.annualDepreciationSL}` : ''}
---------------------------------
Depreciation Schedule:
Year | Opening BV | Depreciation | Acc. Depreciation | Closing BV
`;
    depreciationSchedule.slice(0, 10).forEach(entry => { // Copy first 10 entries for brevity
        textToCopy += `${entry.year} | ${entry.openingBookValue} | ${entry.depreciationExpense} | ${entry.accumulatedDepreciation} | ${entry.closingBookValue}
`;
    });
    if (depreciationSchedule.length > 10) {
        textToCopy += "... and more entries ...";
    }
    textToCopy += `---------------------------------
Disclaimer: Estimates only. Consult accounting standards and professionals.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Depreciation details copied." });
  };


  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Calculate depreciation using Straight-Line or Reducing Balance methods and view the schedule.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="assetCost" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Asset Cost (TTD)
              </Label>
              <Input
                id="assetCost" type="number" step="0.01" placeholder="e.g., 50000"
                value={assetCost} onChange={(e) => setAssetCost(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="usefulLife" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Useful Life (Years)
              </Label>
              <Input
                id="usefulLife" type="number" step="1" placeholder="e.g., 5"
                value={usefulLife} onChange={(e) => setUsefulLife(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="salvageValue" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Salvage Value (TTD)
              </Label>
              <Input
                id="salvageValue" type="number" step="0.01" placeholder="e.g., 5000"
                value={salvageValue} onChange={(e) => setSalvageValue(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="depreciationMethod" className="flex items-center text-sm">
                <Calculator className="mr-2 h-4 w-4 text-muted-foreground" /> Depreciation Method
              </Label>
              <Select value={depreciationMethod} onValueChange={setDepreciationMethod}>
                <SelectTrigger id="depreciationMethod" className="h-9 text-sm">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Straight-Line</SelectItem>
                  <SelectItem value="reducing-balance">Reducing Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {depreciationMethod === "reducing-balance" && (
            <div className="space-y-1">
              <Label htmlFor="reducingBalanceRate" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Reducing Balance Rate (%)
              </Label>
              <Input
                id="reducingBalanceRate" type="number" step="0.01" placeholder="e.g., 20 for 20%"
                value={reducingBalanceRate} onChange={(e) => setReducingBalanceRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          )}
          
          <Button onClick={handleCalculateDepreciation} className="w-full mt-4 bg-primary hover:bg-primary/90 text-sm h-9">
            <Calculator className="mr-2 h-4 w-4" /> Calculate Depreciation
          </Button>

          {depreciationSchedule.length > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Depreciation Summary & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {calculationSummary.annualDepreciationSL !== "N/A" && (
                        <div>Annual Depreciation (SL): <strong className="text-primary">TT$ {calculationSummary.annualDepreciationSL}</strong></div>
                    )}
                    <div>Total Depreciation: <strong className="text-primary">TT$ {calculationSummary.totalDepreciationDisplay}</strong></div>
                    <div>Final Book Value: <strong>TT$ {calculationSummary.finalBookValueDisplay}</strong></div>
                </div>
                <Separator className="my-2" />
                <ScrollArea className="h-[200px] w-full border rounded-md">
                    <Table>
                        <TableCaption className="text-[10px] py-1">Depreciation Schedule</TableCaption>
                        <TableHeader className="sticky top-0 bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[50px] text-[10px] p-1.5">Year</TableHead>
                                <TableHead className="text-[10px] p-1.5">Opening BV</TableHead>
                                <TableHead className="text-[10px] p-1.5">Depreciation</TableHead>
                                <TableHead className="text-[10px] p-1.5">Acc. Dep.</TableHead>
                                <TableHead className="text-right text-[10px] p-1.5">Closing BV</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {depreciationSchedule.map((entry) => (
                            <TableRow key={entry.year} className="text-[10px]">
                                <TableCell className="font-medium p-1.5">{entry.year}</TableCell>
                                <TableCell className="p-1.5">{entry.openingBookValue}</TableCell>
                                <TableCell className="p-1.5">{entry.depreciationExpense}</TableCell>
                                <TableCell className="p-1.5">{entry.accumulatedDepreciation}</TableCell>
                                <TableCell className="text-right p-1.5">{entry.closingBookValue}</TableCell>
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
          Disclaimer: This calculator provides estimates based on common depreciation methods. Specific tax rules and accounting standards should be consulted for official financial reporting and tax filing purposes.
        </p>
      </Card>
    </div>
  );
}

    