
// src/components/calculators/MarkupMarginCalculator.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
import { Target, DollarSign, Percent as PercentIcon, Copy, Trash2, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function MarkupMarginCalculator() {
  const { toast } = useToast();

  const [cost, setCost] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [markupPercentage, setMarkupPercentage] = useState<string>("");
  const [grossProfitMargin, setGrossProfitMargin] = useState<string>("");
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  const parseNumericInput = (value: string): number => parseFloat(value) || 0;
  const formatCurrency = (num: number): string => isNaN(num) || !isFinite(num) ? "0.00" : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatPercentage = (num: number): string => isNaN(num) || !isFinite(num) ? "0.00" : num.toFixed(2);

  const calculate = useCallback(() => {
    const numCost = parseNumericInput(cost);

    if (numCost <= 0) {
      if (lastChangedField !== 'cost') { // Only reset if cost is not the one being actively changed to 0 or less
        setSellingPrice("");
        setMarkupPercentage("");
        setGrossProfitMargin("");
      }
      return;
    }

    if (lastChangedField === "sellingPrice") {
      const numSellingPrice = parseNumericInput(sellingPrice);
      if (numSellingPrice > 0 && numSellingPrice >= numCost) {
        const profit = numSellingPrice - numCost;
        setMarkupPercentage(formatPercentage((profit / numCost) * 100));
        setGrossProfitMargin(formatPercentage((profit / numSellingPrice) * 100));
      } else if (numSellingPrice > 0 && numSellingPrice < numCost) {
        // Selling at a loss
        const loss = numCost - numSellingPrice;
        setMarkupPercentage(formatPercentage((-loss / numCost) * 100));
        setGrossProfitMargin(formatPercentage((-loss / numSellingPrice) * 100));
      } else {
        setMarkupPercentage("");
        setGrossProfitMargin("");
      }
    } else if (lastChangedField === "markupPercentage") {
      const numMarkup = parseNumericInput(markupPercentage);
      const profit = numCost * (numMarkup / 100);
      const newSellingPrice = numCost + profit;
      setSellingPrice(formatCurrency(newSellingPrice));
      if (newSellingPrice > 0) {
        setGrossProfitMargin(formatPercentage((profit / newSellingPrice) * 100));
      } else {
        setGrossProfitMargin("");
      }
    } else if (lastChangedField === "grossProfitMargin") {
      const numMargin = parseNumericInput(grossProfitMargin);
      if (numMargin < 100) { // Margin cannot be 100% or more if cost is positive
        const newSellingPrice = numCost / (1 - (numMargin / 100));
        setSellingPrice(formatCurrency(newSellingPrice));
        const profit = newSellingPrice - numCost;
        setMarkupPercentage(formatPercentage((profit / numCost) * 100));
      } else {
        setSellingPrice("");
        setMarkupPercentage("");
      }
    } else if (lastChangedField === "cost" ) {
        // If cost is changed, recalculate based on whichever of markup or margin has a value,
        // prioritizing markup if both have values. This is a common approach.
        // Or, if selling price has a value, recalculate markup/margin from that.
        if (sellingPrice) {
            const numSellingPrice = parseNumericInput(sellingPrice);
            if (numSellingPrice > 0 && numSellingPrice >= numCost) {
                const profit = numSellingPrice - numCost;
                setMarkupPercentage(formatPercentage((profit / numCost) * 100));
                setGrossProfitMargin(formatPercentage((profit / numSellingPrice) * 100));
            } else {
                setMarkupPercentage("");
                setGrossProfitMargin("");
            }
        } else if (markupPercentage) {
            const numMarkup = parseNumericInput(markupPercentage);
            const profit = numCost * (numMarkup / 100);
            const newSellingPrice = numCost + profit;
            setSellingPrice(formatCurrency(newSellingPrice));
            if (newSellingPrice > 0) {
                setGrossProfitMargin(formatPercentage((profit / newSellingPrice) * 100));
            } else {
                setGrossProfitMargin("");
            }
        } else if (grossProfitMargin) {
            const numMargin = parseNumericInput(grossProfitMargin);
            if (numMargin < 100) {
                const newSellingPrice = numCost / (1 - (numMargin / 100));
                setSellingPrice(formatCurrency(newSellingPrice));
                const profit = newSellingPrice - numCost;
                setMarkupPercentage(formatPercentage((profit / numCost) * 100));
            } else {
                setSellingPrice("");
                setMarkupPercentage("");
            }
        }
    }
  }, [cost, sellingPrice, markupPercentage, grossProfitMargin, lastChangedField]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setLastChangedField(fieldName);
  };
  
  const handleClearFields = () => {
    setCost("");
    setSellingPrice("");
    setMarkupPercentage("");
    setGrossProfitMargin("");
    setLastChangedField(null);
    toast({ title: "Fields Cleared", description: "Markup & Margin calculator inputs reset." });
  };

  const handleCopyResults = () => {
    const numCost = parseNumericInput(cost);
    const numSellingPrice = parseNumericInput(sellingPrice);
    const numMarkup = parseNumericInput(markupPercentage);
    const numMargin = parseNumericInput(grossProfitMargin);

    if (numCost <= 0) {
        toast({ title: "No Valid Results", description: "Please enter a valid cost and calculate.", variant: "default"});
        return;
    }

    const textToCopy = `
Markup & Margin Calculation Summary
---------------------------------
Cost: TT$ ${formatCurrency(numCost)}
Selling Price: TT$ ${formatCurrency(numSellingPrice)}
Markup: ${formatPercentage(numMarkup)}%
Gross Profit Margin: ${formatPercentage(numMargin)}%
---------------------------------
Note: Markup is based on cost. Gross Profit Margin is based on selling price.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Markup & Margin details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Enter Cost and one other value (Selling Price, Markup %, or Margin %) to calculate the rest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="costMarkupMargin" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Cost (TTD)
              </Label>
              <Input
                id="costMarkupMargin" type="number" step="0.01" placeholder="e.g., 100.00"
                value={cost} onChange={handleInputChange(setCost, "cost")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sellingPriceMarkupMargin" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Selling Price (TTD)
              </Label>
              <Input
                id="sellingPriceMarkupMargin" type="number" step="0.01" placeholder="e.g., 150.00"
                value={sellingPrice} onChange={handleInputChange(setSellingPrice, "sellingPrice")}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="markupPercentage" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Markup (%)
              </Label>
              <Input
                id="markupPercentage" type="number" step="0.01" placeholder="e.g., 50"
                value={markupPercentage} onChange={handleInputChange(setMarkupPercentage, "markupPercentage")}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="grossProfitMargin" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Gross Profit Margin (%)
              </Label>
              <Input
                id="grossProfitMargin" type="number" step="0.01" placeholder="e.g., 33.33"
                value={grossProfitMargin} onChange={handleInputChange(setGrossProfitMargin, "grossProfitMargin")}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <Card className="mt-4 bg-muted/30">
            <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                    <Info className="mr-2 h-4 w-4" /> Key Differences
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-xs space-y-1">
                <p><strong>Markup:</strong> The amount added to the cost of a product to determine the selling price. It's calculated as a percentage of the cost. <br/>Formula: ((Selling Price - Cost) / Cost) * 100%</p>
                <p><strong>Gross Profit Margin:</strong> The percentage of revenue that exceeds the cost of goods sold. It's calculated as a percentage of the selling price. <br/>Formula: ((Selling Price - Cost) / Selling Price) * 100%</p>
            </CardContent>
          </Card>
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
          Enter the Cost and one other value (Selling Price, Markup %, or Gross Profit Margin %). The other fields will be calculated automatically.
        </p>
      </Card>
    </div>
  );
}

    