
// src/components/calculators/FreightShippingCalculator.tsx
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
import { Truck, DollarSign, Percent as PercentIcon, Calculator as CalculatorIcon, Copy, Trash2, CircleCheckBig } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialCalculationResults = {
  cifValueDisplay: "0.00",
  importDutyAmountDisplay: "0.00",
  subtotalBeforeVatDisplay: "0.00",
  vatAmountDisplay: "0.00",
  totalTaxesAndDutiesDisplay: "0.00",
  estimatedLandedCostDisplay: "0.00",
};

export default function FreightShippingCalculator() {
  const { toast } = useToast();

  const [productValue, setProductValue] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [insuranceCost, setInsuranceCost] = useState<string>("");
  const [importDutyRate, setImportDutyRate] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("12.5");
  const [otherFees, setOtherFees] = useState<string>("");
  
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateLandedCost = useCallback(() => {
    const numProductValue = parseNum(productValue);
    const numShippingCost = parseNum(shippingCost);
    const numInsuranceCost = parseNum(insuranceCost);
    const numImportDutyRate = parseNum(importDutyRate) / 100;
    const numVatRate = parseNum(vatRate) / 100;
    const numOtherFees = parseNum(otherFees);

    if (numProductValue <= 0 && numShippingCost <= 0 && numInsuranceCost <= 0 && numImportDutyRate <=0 && numVatRate <=0 && numOtherFees <=0) {
        setCalculationResults(initialCalculationResults);
        return;
    }

    const cifValue = numProductValue + numShippingCost + numInsuranceCost;
    const importDutyAmount = cifValue * numImportDutyRate;
    const subtotalBeforeVat = cifValue + importDutyAmount + numOtherFees; // VAT typically on CIF + Duty + Other non-VATable fees
    const vatAmount = subtotalBeforeVat * numVatRate;
    const totalTaxesAndDuties = importDutyAmount + vatAmount + numOtherFees;
    const estimatedLandedCost = cifValue + totalTaxesAndDuties;

    setCalculationResults({
      cifValueDisplay: formatCurrency(cifValue),
      importDutyAmountDisplay: formatCurrency(importDutyAmount),
      subtotalBeforeVatDisplay: formatCurrency(subtotalBeforeVat),
      vatAmountDisplay: formatCurrency(vatAmount),
      totalTaxesAndDutiesDisplay: formatCurrency(totalTaxesAndDuties),
      estimatedLandedCostDisplay: formatCurrency(estimatedLandedCost),
    });
  }, [productValue, shippingCost, insuranceCost, importDutyRate, vatRate, otherFees]);

  useEffect(() => {
    handleCalculateLandedCost();
  }, [handleCalculateLandedCost]);

  const handleClearFields = () => {
    setProductValue("");
    setShippingCost("");
    setInsuranceCost("");
    setImportDutyRate("");
    setVatRate("12.5");
    setOtherFees("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.estimatedLandedCostDisplay === "0.00") {
        toast({ title: "No Results", description: "Please calculate first.", variant: "default"});
        return;
    }
    const textToCopy = `
Freight & Shipping Cost Estimation
---------------------------------
Inputs:
Product Value (FOB): TT$ ${formatCurrency(parseNum(productValue))}
Shipping Cost: TT$ ${formatCurrency(parseNum(shippingCost))}
Insurance Cost: TT$ ${formatCurrency(parseNum(insuranceCost))}
Import Duty Rate: ${importDutyRate}%
VAT Rate: ${vatRate}%
Other Fees: TT$ ${formatCurrency(parseNum(otherFees))}
---------------------------------
Calculations:
CIF Value: TT$ ${calculationResults.cifValueDisplay}
Import Duty Amount: TT$ ${calculationResults.importDutyAmountDisplay}
Subtotal before VAT (CIF + Duty + Other Fees): TT$ ${calculationResults.subtotalBeforeVatDisplay}
VAT Amount: TT$ ${calculationResults.vatAmountDisplay}
Total Taxes & Duties: TT$ ${calculationResults.totalTaxesAndDutiesDisplay}
Estimated Landed Cost: TT$ ${calculationResults.estimatedLandedCostDisplay}
---------------------------------
Disclaimer: This is an estimate. Actual costs may vary.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Estimate total landed costs by inputting product value, shipping, insurance, and applicable duty/tax rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="productValueFreight" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Product Value (FOB, TTD)
              </Label>
              <Input
                id="productValueFreight" type="number" step="0.01" placeholder="e.g., 10000"
                value={productValue} onChange={(e) => setProductValue(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="shippingCostFreight" className="flex items-center text-sm">
                <Truck className="mr-2 h-4 w-4 text-muted-foreground" /> Shipping Cost (TTD)
              </Label>
              <Input
                id="shippingCostFreight" type="number" step="0.01" placeholder="e.g., 500"
                value={shippingCost} onChange={(e) => setShippingCost(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="insuranceCostFreight" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Insurance Cost (TTD)
              </Label>
              <Input
                id="insuranceCostFreight" type="number" step="0.01" placeholder="e.g., 50"
                value={insuranceCost} onChange={(e) => setInsuranceCost(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          <div className="p-2 bg-muted/50 rounded-md text-center border">
            <span className="text-xs font-medium text-muted-foreground">Calculated CIF Value (Cost + Insurance + Freight): </span>
            <strong className="text-sm text-primary">TT$ {calculationResults.cifValueDisplay}</strong>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="importDutyRateFreight" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Import Duty Rate (%)
              </Label>
              <Input
                id="importDutyRateFreight" type="number" step="0.01" placeholder="e.g., 20 for 20%"
                value={importDutyRate} onChange={(e) => setImportDutyRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vatRateFreight" className="flex items-center text-sm">
                <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> VAT Rate (%)
              </Label>
              <Input
                id="vatRateFreight" type="number" step="0.01" placeholder="e.g., 12.5"
                value={vatRate} onChange={(e) => setVatRate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="otherFeesFreight" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Other Fees (TTD)
              </Label>
              <Input
                id="otherFeesFreight" type="number" step="0.01" placeholder="e.g., 100 (handling, etc.)"
                value={otherFees} onChange={(e) => setOtherFees(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          
          {(parseNum(productValue) > 0 || parseNum(shippingCost) > 0 || parseNum(insuranceCost) > 0) && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Estimated Landed Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between"><span>CIF Value:</span> <strong>TT$ {calculationResults.cifValueDisplay}</strong></div>
                <Separator className="my-1.5" />
                <div className="flex justify-between"><span>Import Duty Amount:</span> <strong>TT$ {calculationResults.importDutyAmountDisplay}</strong></div>
                <div className="flex justify-between"><span>Other Fees Entered:</span> <strong>TT$ {formatCurrency(parseNum(otherFees))}</strong></div>
                <div className="flex justify-between"><span>Subtotal before VAT (CIF + Duty + Other Fees):</span> <strong>TT$ {calculationResults.subtotalBeforeVatDisplay}</strong></div>
                <div className="flex justify-between"><span>VAT Amount:</span> <strong>TT$ {calculationResults.vatAmountDisplay}</strong></div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold"><span>Total Taxes & Duties (incl. Other Fees):</span> <strong className="text-destructive">TT$ {calculationResults.totalTaxesAndDutiesDisplay}</strong></div>
                <Separator className="my-1.5 border-dashed" />
                <div className="flex justify-between font-bold text-lg text-primary mt-1"><span>Estimated Landed Cost:</span> <strong className="text-primary">TT$ {calculationResults.estimatedLandedCostDisplay}</strong></div>
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
          Disclaimer: This calculator provides an estimate of landed costs. Actual costs may vary based on precise HS code classifications, customs valuation, specific freight agreements, insurance terms, and applicable government levies or fees not explicitly entered. Always consult official sources and professionals for exact figures.
        </p>
      </Card>
    </div>
  );
}
