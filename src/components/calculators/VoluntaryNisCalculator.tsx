
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DollarSign, ListChecks, Copy, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface VoluntaryNisClass {
  class: string;
  monthlyEarnings: { min: number; max: number | null }; // max can be null for "and over"
  assumedAverageWeekly: number;
  voluntaryWeekly: number;
  voluntaryMonthly: number;
  voluntaryQuarterly: number;
}

const voluntaryNisClassesData: VoluntaryNisClass[] = [
  { class: "I", monthlyEarnings: { min: 520.00, max: 866.99 }, assumedAverageWeekly: 160.00, voluntaryWeekly: 18.24, voluntaryMonthly: 79.04, voluntaryQuarterly: 237.12 },
  { class: "II", monthlyEarnings: { min: 867.00, max: 1169.99 }, assumedAverageWeekly: 235.00, voluntaryWeekly: 26.79, voluntaryMonthly: 116.09, voluntaryQuarterly: 348.27 },
  { class: "III", monthlyEarnings: { min: 1170.00, max: 1559.99 }, assumedAverageWeekly: 315.00, voluntaryWeekly: 35.91, voluntaryMonthly: 155.61, voluntaryQuarterly: 466.83 },
  { class: "IV", monthlyEarnings: { min: 1560.00, max: 1949.99 }, assumedAverageWeekly: 405.00, voluntaryWeekly: 46.17, voluntaryMonthly: 200.07, voluntaryQuarterly: 600.21 },
  { class: "V", monthlyEarnings: { min: 1950.00, max: 2382.99 }, assumedAverageWeekly: 500.00, voluntaryWeekly: 57.00, voluntaryMonthly: 247.00, voluntaryQuarterly: 741.00 },
  { class: "VI", monthlyEarnings: { min: 2383.00, max: 2859.99 }, assumedAverageWeekly: 605.00, voluntaryWeekly: 68.97, voluntaryMonthly: 298.87, voluntaryQuarterly: 896.61 },
  { class: "VII", monthlyEarnings: { min: 2860.00, max: 3336.99 }, assumedAverageWeekly: 715.00, voluntaryWeekly: 81.51, voluntaryMonthly: 353.21, voluntaryQuarterly: 1059.63 },
  { class: "VIII", monthlyEarnings: { min: 3337.00, max: 3812.99 }, assumedAverageWeekly: 825.00, voluntaryWeekly: 94.05, voluntaryMonthly: 407.55, voluntaryQuarterly: 1222.65 },
  { class: "IX", monthlyEarnings: { min: 3813.00, max: 4376.99 }, assumedAverageWeekly: 945.00, voluntaryWeekly: 107.73, voluntaryMonthly: 466.83, voluntaryQuarterly: 1400.49 },
  { class: "X", monthlyEarnings: { min: 4377.00, max: 4896.99 }, assumedAverageWeekly: 1070.00, voluntaryWeekly: 121.98, voluntaryMonthly: 528.58, voluntaryQuarterly: 1585.74 },
  { class: "XI", monthlyEarnings: { min: 4897.00, max: 5459.99 }, assumedAverageWeekly: 1195.00, voluntaryWeekly: 136.23, voluntaryMonthly: 590.33, voluntaryQuarterly: 1770.99 },
  { class: "XII", monthlyEarnings: { min: 5460.00, max: 6066.99 }, assumedAverageWeekly: 1330.00, voluntaryWeekly: 151.62, voluntaryMonthly: 657.02, voluntaryQuarterly: 1971.06 },
  { class: "XIII", monthlyEarnings: { min: 6067.00, max: 6716.99 }, assumedAverageWeekly: 1475.00, voluntaryWeekly: 168.15, voluntaryMonthly: 728.65, voluntaryQuarterly: 2185.95 },
  { class: "XIV", monthlyEarnings: { min: 6717.00, max: 7452.99 }, assumedAverageWeekly: 1635.00, voluntaryWeekly: 186.39, voluntaryMonthly: 807.69, voluntaryQuarterly: 2423.07 },
  { class: "XV", monthlyEarnings: { min: 7453.00, max: 8299.99 }, assumedAverageWeekly: 1818.00, voluntaryWeekly: 207.25, voluntaryMonthly: 898.09, voluntaryQuarterly: 2694.28 },
  { class: "XVI", monthlyEarnings: { min: 8300.00, max: null }, assumedAverageWeekly: 1915.00, voluntaryWeekly: 218.31, voluntaryMonthly: 946.01, voluntaryQuarterly: 2838.03 },
];

export default function VoluntaryNisCalculator() {
  const { toast } = useToast();
  const [monthlyEarnings, setMonthlyEarnings] = useState<string>("");
  const [currentDateOnMount, setCurrentDateOnMount] = useState<string>("");

  useEffect(() => {
    setCurrentDateOnMount(new Date().toLocaleDateString());
  }, []);
  
  const initialCalculationResults = {
    nisClass: "N/A",
    assumedAverageWeekly: "0.00",
    voluntaryWeekly: "0.00",
    voluntaryMonthly: "0.00",
    voluntaryQuarterly: "0.00",
    inputMonthlyEarningsDisplay: "0.00",
  };
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const parseNum = (val: string) => parseFloat(val) || 0;
  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCalculateVoluntaryNis = useCallback(() => {
    const earnings = parseNum(monthlyEarnings);
    let foundClass: VoluntaryNisClass | null = null;

    for (const nisClass of voluntaryNisClassesData) {
      if (earnings >= nisClass.monthlyEarnings.min && (nisClass.monthlyEarnings.max === null || earnings <= nisClass.monthlyEarnings.max)) {
        foundClass = nisClass;
        break;
      }
    }

    if (foundClass) {
      setCalculationResults({
        nisClass: foundClass.class,
        assumedAverageWeekly: formatCurrency(foundClass.assumedAverageWeekly),
        voluntaryWeekly: formatCurrency(foundClass.voluntaryWeekly),
        voluntaryMonthly: formatCurrency(foundClass.voluntaryMonthly),
        voluntaryQuarterly: formatCurrency(foundClass.voluntaryQuarterly),
        inputMonthlyEarningsDisplay: formatCurrency(earnings),
      });
    } else {
      setCalculationResults({
        ...initialCalculationResults,
        inputMonthlyEarningsDisplay: formatCurrency(earnings),
         nisClass: earnings > 0 ? "Outside defined range" : "N/A",
      });
    }
  }, [monthlyEarnings]);

  useEffect(() => {
    handleCalculateVoluntaryNis();
  }, [handleCalculateVoluntaryNis]);

  const handleCopyResults = () => {
    const resultsText = `
VOLUNTARY NIS CONTRIBUTION RESULTS (SELF-EMPLOYED)
---------------------------------
Input:
Monthly Earnings: TT$${calculationResults.inputMonthlyEarningsDisplay}
---------------------------------
Calculated Contributions:
NIS Earnings Class: ${calculationResults.nisClass}
Assumed Average Weekly Earnings: TT$${calculationResults.assumedAverageWeekly}
Voluntary Weekly Contribution: TT$${calculationResults.voluntaryWeekly}
Voluntary Monthly Contribution: TT$${calculationResults.voluntaryMonthly}
Voluntary Quarterly Contribution: TT$${calculationResults.voluntaryQuarterly}
---------------------------------
Calculation Date: ${currentDateOnMount}
Disclaimer: This calculator provides an estimate based on NIBTT rates effective January 02, 2012. Always consult official NIBTT guidelines and a qualified professional.
    `;
    navigator.clipboard.writeText(resultsText.trim());
    toast({ title: "Results Copied!", description: "Voluntary NIS calculation details copied to clipboard." });
  };

  const handleClearFields = () => {
    setMonthlyEarnings("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Calculator inputs and results have been reset." });
  };

  return (
    <div className="py-4">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="monthlyEarningsVoluntaryNis" className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Monthly Earnings (TT$)
          </Label>
          <Input
            id="monthlyEarningsVoluntaryNis"
            type="number"
            step="0.01"
            placeholder="e.g., 3000.00"
            value={monthlyEarnings}
            onChange={(e) => setMonthlyEarnings(e.target.value)}
            className="h-9 text-sm"
          />
           <CardDescription className="text-xs pt-1">Enter your total monthly earnings to determine your NIS class and contributions.</CardDescription>
        </div>

        <Card className="mt-4">
          <CardHeader className="p-4">
            <CardTitle className="text-lg text-primary flex items-center">
              <ListChecks className="mr-2 h-5 w-5" /> Estimated Voluntary NIS Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span>Entered Monthly Earnings:</span> <strong>TT$ {calculationResults.inputMonthlyEarningsDisplay}</strong>
            </div>
             <div className="flex justify-between">
              <span>NIS Earnings Class:</span> <strong>{calculationResults.nisClass}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between">
              <span>Assumed Average Weekly Earnings:</span><strong>TT$ {calculationResults.assumedAverageWeekly}</strong>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Voluntary Weekly Contribution:</span> <strong className="text-primary">TT$ {calculationResults.voluntaryWeekly}</strong>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Voluntary Monthly Contribution:</span> <strong className="text-primary">TT$ {calculationResults.voluntaryMonthly}</strong>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Voluntary Quarterly Contribution:</span> <strong className="text-primary">TT$ {calculationResults.voluntaryQuarterly}</strong>
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
           <AlertCircle className="inline-block h-3 w-3 mr-1" />
          Note: This calculator provides an estimate for self-employed individuals based on NIBTT rates effective from January 02, 2012 (11.4% contribution rate). Rates and earnings classes can change. Always consult official NIBTT guidelines for the most current information and a qualified professional for personalized advice.
        </p>
      </div>
    </div>
  );
}

    