
// src/components/calculators/CIFCalculator.tsx
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
import { FileBox, DollarSign, Calculator as CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialCalculationResults = {
  cifValueDisplay: "0.00",
};

export function CIFCalculator() {
  const { toast } = useToast();

  const [costOfGoods, setCostOfGoods] = useState<string>("");
  const [insuranceCost, setInsuranceCost] = useState<string>("");
  const [freightCost, setFreightCost] = useState<string>("");
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateCIF = useCallback(() => {
    const numCostOfGoods = parseNum(costOfGoods);
    const numInsuranceCost = parseNum(insuranceCost);
    const numFreightCost = parseNum(freightCost);

    // Only calculate if at least one value is positive, otherwise reset
    if (numCostOfGoods <= 0 && numInsuranceCost <= 0 && numFreightCost <= 0 && (costOfGoods || insuranceCost || freightCost)) {
        // If all are zero or empty but some input attempt was made, keep showing 0.00 or reset.
        // If no attempt (all fields empty from start or cleared), show 0.00.
        if (!costOfGoods && !insuranceCost && !freightCost) {
            setCalculationResults(initialCalculationResults);
            return;
        }
    }
    
    const cifValue = numCostOfGoods + numInsuranceCost + numFreightCost;

    setCalculationResults({
      cifValueDisplay: formatCurrency(cifValue),
    });
  }, [costOfGoods, insuranceCost, freightCost]);

  useEffect(() => {
    // Auto-calculate when inputs change
    handleCalculateCIF();
  }, [costOfGoods, insuranceCost, freightCost, handleCalculateCIF]);

  const handleClearFields = () => {
    setCostOfGoods("");
    setInsuranceCost("");
    setFreightCost("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "CIF Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.cifValueDisplay === "0.00" && !costOfGoods && !insuranceCost && !freightCost) {
      toast({ title: "No Results", description: "Please enter values to calculate CIF.", variant: "default"});
      return;
    }
    const textToCopy = `
CIF Calculation Summary
---------------------------------
Inputs:
Cost of Goods (FOB): TT$ ${formatCurrency(parseNum(costOfGoods))}
Insurance Cost: TT$ ${formatCurrency(parseNum(insuranceCost))}
Freight Cost: TT$ ${formatCurrency(parseNum(freightCost))}
---------------------------------
Calculated CIF Value: TT$ ${calculationResults.cifValueDisplay}
---------------------------------
Disclaimer: This calculation is Cost + Insurance + Freight. It is a component of the total landed cost.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "CIF calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* DialogTitle and DialogDescription are part of the parent Dialog component */}
          <CardDescription>
            Compute total Cost, Insurance, and Freight (CIF) value for imports. This value is often the basis for calculating customs duties and VAT.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-1">
            <Label htmlFor="costOfGoodsCIF" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Cost of Goods (FOB Value, TTD)
            </Label>
            <Input
              id="costOfGoodsCIF" type="number" step="0.01" placeholder="e.g., 10000"
              value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="insuranceCostCIF" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Insurance Cost (TTD)
            </Label>
            <Input
              id="insuranceCostCIF" type="number" step="0.01" placeholder="e.g., 200"
              value={insuranceCost} onChange={(e) => setInsuranceCost(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="freightCostCIF" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Freight Cost (TTD)
            </Label>
            <Input
              id="freightCostCIF" type="number" step="0.01" placeholder="e.g., 500"
              value={freightCost} onChange={(e) => setFreightCost(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {(calculationResults.cifValueDisplay !== "0.00" || costOfGoods || insuranceCost || freightCost) && ( // Show results card if any input or a non-zero result
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Calculated CIF Value
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-sm">
                  <span>CIF Value (Cost + Insurance + Freight):</span> <strong className="text-primary">TT$ {calculationResults.cifValueDisplay}</strong>
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
          Disclaimer: This calculator provides the CIF value. Other duties, taxes (like VAT), and fees may apply to determine the total landed cost.
        </p>
      </Card>
    </div>
  );
}
