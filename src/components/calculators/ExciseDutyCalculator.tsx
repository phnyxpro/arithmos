
// src/components/calculators/ExciseDutyCalculator.tsx
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
import { Cigarette, Calculator, Copy, Trash2, DollarSign, Package, Percent as PercentIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const productTypes = [
  { value: "alcohol", label: "Alcohol (e.g., Rum, Beer, Wine)" },
  { value: "tobacco", label: "Tobacco Products (e.g., Cigarettes)" },
  { value: "fuel", label: "Fuel (e.g., Gasoline, Diesel)" },
  { value: "other", label: "Other Excisable Goods" },
];

const unitsOfMeasure = [
  { value: "liters", label: "Liters (L)" },
  { value: "milliliters", label: "Milliliters (mL)" },
  { value: "kilograms", label: "Kilograms (kg)" },
  { value: "grams", label: "Grams (g)" },
  { value: "packs", label: "Packs (e.g., pack of 20 cigarettes)" },
  { value: "pieces", label: "Pieces / Units" },
  { value: "gallons", label: "Gallons (US)" },
];

const initialResults = {
  calculatedExciseDuty: "0.00",
  totalValueForDuty: "0.00",
  dutyFromSpecificRate: "0.00",
  dutyFromAdValoremRate: "0.00",
};

export function ExciseDutyCalculator() {
  const { toast } = useToast();

  const [productType, setProductType] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>("");
  const [valuePerUnit, setValuePerUnit] = useState<string>("");
  const [specificRate, setSpecificRate] = useState<string>(""); // Duty per unit
  const [adValoremRate, setAdValoremRate] = useState<string>(""); // Percentage rate
  
  const [calculationResults, setCalculationResults] = useState(initialResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateDuty = useCallback(() => {
    const numQuantity = parseNum(quantity);
    const numValuePerUnit = parseNum(valuePerUnit);
    const numSpecificRate = parseNum(specificRate);
    const numAdValoremRate = parseNum(adValoremRate) / 100; // Convert percentage to decimal

    if (numQuantity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid quantity.",
        variant: "destructive",
      });
      setCalculationResults(initialResults);
      return;
    }

    let dutyFromSpecific = 0;
    if (numSpecificRate > 0) {
      dutyFromSpecific = numQuantity * numSpecificRate;
    }

    let dutyFromAdValorem = 0;
    const totalValue = numQuantity * numValuePerUnit;
    if (numAdValoremRate > 0 && totalValue > 0) {
      dutyFromAdValorem = totalValue * numAdValoremRate;
    }
    
    // Note: Real excise duty can be complex. Some products might have only specific,
    // only ad valorem, or a combination (sometimes the higher of the two).
    // This simplified version sums them if both are provided.
    const totalExciseDuty = dutyFromSpecific + dutyFromAdValorem;

    setCalculationResults({
      calculatedExciseDuty: formatCurrency(totalExciseDuty),
      totalValueForDuty: formatCurrency(totalValue),
      dutyFromSpecificRate: formatCurrency(dutyFromSpecific),
      dutyFromAdValoremRate: formatCurrency(dutyFromAdValorem),
    });

    toast({
      title: "Excise Duty Calculated",
      description: `Estimated duty: TT$ ${formatCurrency(totalExciseDuty)}`,
    });
  }, [quantity, valuePerUnit, specificRate, adValoremRate, toast]);

  const handleClearFields = () => {
    setProductType("");
    setQuantity("");
    setUnitOfMeasure("");
    setValuePerUnit("");
    setSpecificRate("");
    setAdValoremRate("");
    setCalculationResults(initialResults);
    toast({ title: "Fields Cleared", description: "Excise Duty Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.calculatedExciseDuty === "0.00" && calculationResults.totalValueForDuty === "0.00") {
      toast({ title: "No Results", description: "Please calculate duty first.", variant: "default"});
      return;
    }
    const textToCopy = `
Excise Duty Calculation Summary
---------------------------------
Product Type: ${productTypes.find(pt => pt.value === productType)?.label || 'N/A'}
Quantity: ${quantity || 'N/A'} ${unitsOfMeasure.find(um => um.value === unitOfMeasure)?.label || ''}
Value per Unit: TT$ ${formatCurrency(parseNum(valuePerUnit))}
Specific Duty Rate (per unit): TT$ ${formatCurrency(parseNum(specificRate))}
Ad Valorem Duty Rate: ${adValoremRate || '0'}%
---------------------------------
Total Value for Ad Valorem Duty: TT$ ${calculationResults.totalValueForDuty}
Duty from Specific Rate: TT$ ${calculationResults.dutyFromSpecificRate}
Duty from Ad Valorem Rate: TT$ ${calculationResults.dutyFromAdValoremRate}
Calculated Total Excise Duty: TT$ ${calculationResults.calculatedExciseDuty}
---------------------------------
Disclaimer: This is an estimate. Actual excise duties depend on specific product classifications, HS codes, and current official rates.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Excise duty calculation details copied." });
  };
  
  // Trigger calculation when relevant inputs change
  useEffect(() => {
    if (quantity || valuePerUnit || specificRate || adValoremRate) {
      handleCalculateDuty();
    } else {
      setCalculationResults(initialResults);
    }
  }, [quantity, valuePerUnit, specificRate, adValoremRate, handleCalculateDuty]);


  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* DialogTitle and DialogDescription are part of the Dialog component, not this calculator directly */}
          {/* <CardTitle className="text-xl text-primary">Excise Duty Calculator</CardTitle> */}
          <CardDescription>
            Compute excise duties on specific imports like alcohol, tobacco, and fuels. Rates can be specific (per unit) or ad valorem (percentage of value), or both.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="productTypeExcise" className="flex items-center text-sm">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" /> Product Type
              </Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger id="productTypeExcise" className="h-9 text-sm">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map(pt => (
                    <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="quantityExcise" className="flex items-center text-sm">
                 <Calculator className="mr-2 h-4 w-4 text-muted-foreground" /> Quantity
              </Label>
              <Input
                id="quantityExcise"
                type="number"
                placeholder="e.g., 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="unitOfMeasureExcise" className="flex items-center text-sm">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" /> Unit of Measure
              </Label>
              <Select value={unitOfMeasure} onValueChange={setUnitOfMeasure}>
                <SelectTrigger id="unitOfMeasureExcise" className="h-9 text-sm">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {unitsOfMeasure.map(um => (
                    <SelectItem key={um.value} value={um.value}>{um.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-1">
              <Label htmlFor="valuePerUnitExcise" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Value per Unit (TTD)
              </Label>
              <Input
                id="valuePerUnitExcise"
                type="number"
                step="0.01"
                placeholder="e.g., 10.00 (for ad valorem)"
                value={valuePerUnit}
                onChange={(e) => setValuePerUnit(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="specificRateExcise" className="flex items-center text-sm">
                 <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Specific Duty Rate (TTD per Unit)
              </Label>
              <Input
                id="specificRateExcise"
                type="number"
                step="0.01"
                placeholder="e.g., 5.00"
                value={specificRate}
                onChange={(e) => setSpecificRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="adValoremRateExcise" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Ad Valorem Duty Rate (%)
              </Label>
              <Input
                id="adValoremRateExcise"
                type="number"
                step="0.01"
                placeholder="e.g., 15 for 15%"
                value={adValoremRate}
                onChange={(e) => setAdValoremRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          {parseNum(quantity) > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                  <Calculator className="mr-2 h-4 w-4" /> Estimated Duty Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Total Value for Ad Valorem Duty:</span> <strong>TT$ {calculationResults.totalValueForDuty}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Duty from Specific Rate:</span> <strong>TT$ {calculationResults.dutyFromSpecificRate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Duty from Ad Valorem Rate:</span> <strong>TT$ {calculationResults.dutyFromAdValoremRate}</strong>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm">
                  <span>Calculated Total Excise Duty:</span> <strong className="text-primary">TT$ {calculationResults.calculatedExciseDuty}</strong>
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
          Disclaimer: This is a simplified estimator. Actual excise duties are determined by official customs tariffs, product classifications (HS Codes), and prevailing rates which can be specific, ad valorem, or a combination. Consult official Customs and Excise Division resources for definitive information.
        </p>
      </Card>
    </div>
  );
}

    