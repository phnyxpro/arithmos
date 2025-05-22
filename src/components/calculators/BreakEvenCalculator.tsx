// src/components/calculators/BreakEvenCalculator.tsx
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
import { Separator } from '@/components/ui/separator';
import { LineChart, DollarSign, Calculator as CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialCalculationResults = {
  contributionMarginPerUnitDisplay: "0.00",
  breakEvenUnitsDisplay: "0",
  breakEvenRevenueDisplay: "0.00",
};

export function BreakEvenCalculator() {
  const { toast } = useToast();

  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("");
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatUnits = (num: number) => Math.ceil(num).toLocaleString(undefined, { maximumFractionDigits: 0 }); // Units should typically be whole numbers
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateBreakEven = useCallback(() => {
    const numFixedCosts = parseNum(fixedCosts);
    const numVariableCostPerUnit = parseNum(variableCostPerUnit);
    const numSellingPricePerUnit = parseNum(sellingPricePerUnit);

    if (numFixedCosts <= 0) {
      toast({ title: "Invalid Input", description: "Fixed costs must be greater than zero.", variant: "destructive" });
      setCalculationResults(initialCalculationResults);
      return;
    }
    if (numSellingPricePerUnit <= 0) {
      toast({ title: "Invalid Input", description: "Selling price per unit must be greater than zero.", variant: "destructive" });
      setCalculationResults(initialCalculationResults);
      return;
    }

    if (numSellingPricePerUnit <= numVariableCostPerUnit) {
      toast({
        title: "Calculation Error",
        description: "Selling price per unit must be greater than variable cost per unit to break even.",
        variant: "destructive",
      });
      setCalculationResults({
        contributionMarginPerUnitDisplay: formatCurrency(numSellingPricePerUnit - numVariableCostPerUnit),
        breakEvenUnitsDisplay: "N/A (Price ≤ Var. Cost)",
        breakEvenRevenueDisplay: "N/A",
      });
      return;
    }

    const contributionMarginPerUnit = numSellingPricePerUnit - numVariableCostPerUnit;
    const breakEvenUnits = numFixedCosts / contributionMarginPerUnit;
    const breakEvenRevenue = breakEvenUnits * numSellingPricePerUnit;

    setCalculationResults({
      contributionMarginPerUnitDisplay: formatCurrency(contributionMarginPerUnit),
      breakEvenUnitsDisplay: formatUnits(breakEvenUnits),
      breakEvenRevenueDisplay: formatCurrency(breakEvenRevenue),
    });

    toast({
      title: "Break-Even Calculated",
      description: "Results updated below.",
    });
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit, toast]);

  const handleClearFields = () => {
    setFixedCosts("");
    setVariableCostPerUnit("");
    setSellingPricePerUnit("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Break-even calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.breakEvenRevenueDisplay === "0.00" && calculationResults.breakEvenUnitsDisplay === "0") {
      toast({ title: "No Results", description: "Please calculate first.", variant: "default"});
      return;
    }
    const textToCopy = `
Break-Even Analysis Summary
---------------------------------
Inputs:
Total Fixed Costs: TT$ ${formatCurrency(parseNum(fixedCosts))}
Variable Cost Per Unit: TT$ ${formatCurrency(parseNum(variableCostPerUnit))}
Selling Price Per Unit: TT$ ${formatCurrency(parseNum(sellingPricePerUnit))}
---------------------------------
Results:
Contribution Margin Per Unit: TT$ ${calculationResults.contributionMarginPerUnitDisplay}
Break-Even Point (Units): ${calculationResults.breakEvenUnitsDisplay} units
Break-Even Point (Revenue): TT$ ${calculationResults.breakEvenRevenueDisplay}
---------------------------------
Disclaimer: This calculation is based on the inputs provided.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Break-even analysis details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* DialogTitle and DialogDescription are part of the parent Dialog */}
          <CardDescription>
            Determine the sales volume (units and revenue) needed to cover all fixed and variable costs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-1">
            <Label htmlFor="fixedCosts" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Total Fixed Costs (TTD)
            </Label>
            <Input
              id="fixedCosts" type="number" step="0.01" placeholder="e.g., 50000"
              value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="variableCostPerUnit" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Variable Cost Per Unit (TTD)
            </Label>
            <Input
              id="variableCostPerUnit" type="number" step="0.01" placeholder="e.g., 50"
              value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="sellingPricePerUnit" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Selling Price Per Unit (TTD)
            </Label>
            <Input
              id="sellingPricePerUnit" type="number" step="0.01" placeholder="e.g., 100"
              value={sellingPricePerUnit} onChange={(e) => setSellingPricePerUnit(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          <Button onClick={handleCalculateBreakEven} className="w-full mt-4 bg-primary hover:bg-primary/90 text-sm h-9">
            <CalculatorIcon className="mr-2 h-4 w-4" /> Calculate Break-Even
          </Button>

          {(calculationResults.breakEvenRevenueDisplay !== "0.00" || calculationResults.breakEvenUnitsDisplay !== "0" || calculationResults.contributionMarginPerUnitDisplay !== "0.00") && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Break-Even Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Contribution Margin Per Unit:</span> <strong>TT$ {calculationResults.contributionMarginPerUnitDisplay}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm">
                  <span>Break-Even Point (Units):</span> <strong className="text-primary">{calculationResults.breakEvenUnitsDisplay} units</strong>
                </div>
                <div className="flex justify-between font-semibold text-sm">
                  <span>Break-Even Point (Revenue):</span> <strong className="text-primary">TT$ {calculationResults.breakEvenRevenueDisplay}</strong>
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
          Disclaimer: This calculator provides a basic break-even analysis. It does not account for taxes, changes in costs or prices over time, or other business complexities.
        </p>
      </Card>
    </div>
  );
}
