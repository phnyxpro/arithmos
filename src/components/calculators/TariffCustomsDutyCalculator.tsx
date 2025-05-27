
// src/components/calculators/TariffCustomsDutyCalculator.tsx
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
import { Ship, FileText as FileTextIcon, DollarSign, Percent as PercentIcon, Calculator, Copy, Trash2, CircleHelp, Info, PackageSearch } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialCalculationResults = {
  calculatedImportDutyDisplay: "0.00",
  valueForVatDisplay: "0.00",
  calculatedVatDisplay: "0.00",
  totalDutiesAndTaxesDisplay: "0.00",
  estimatedLandedCostDisplay: "0.00",
};

export default function TariffCustomsDutyCalculator() {
  const { toast } = useToast();

  const [itemDescription, setItemDescription] = useState<string>("");
  const [hsCode, setHsCode] = useState<string>("");
  const [costOfGoods, setCostOfGoods] = useState<string>("");
  const [insuranceCost, setInsuranceCost] = useState<string>("");
  const [freightCost, setFreightCost] = useState<string>("");
  const [cifValueDisplay, setCifValueDisplay] = useState<string>("0.00");

  const [importDutyRate, setImportDutyRate] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("12.5");
  const [exciseDutyAmount, setExciseDutyAmount] = useState<string>("");
  const [otherFees, setOtherFees] = useState<string>("");

  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  // Calculate CIF value automatically
  useEffect(() => {
    const numCost = parseNum(costOfGoods);
    const numInsurance = parseNum(insuranceCost);
    const numFreight = parseNum(freightCost);
    const cif = numCost + numInsurance + numFreight;
    setCifValueDisplay(formatCurrency(cif));
  }, [costOfGoods, insuranceCost, freightCost]);

  const handleCalculateDuties = useCallback(() => {
    const numCost = parseNum(costOfGoods);
    const numInsurance = parseNum(insuranceCost);
    const numFreight = parseNum(freightCost);
    const cif = numCost + numInsurance + numFreight;

    const numImportDutyRate = parseNum(importDutyRate) / 100;
    const numVatRate = parseNum(vatRate) / 100;
    const numExciseDuty = parseNum(exciseDutyAmount);
    const numOtherFees = parseNum(otherFees);

    if (cif <= 0 && numImportDutyRate <= 0 && numVatRate <= 0 && numExciseDuty <= 0 && numOtherFees <= 0) {
        setCalculationResults(initialCalculationResults);
        return;
    }
    
    const calculatedImportDuty = cif * numImportDutyRate;
    const valueForVat = cif + calculatedImportDuty + numExciseDuty; // VAT is often on CIF + Duty + Excise
    const calculatedVat = valueForVat * numVatRate;
    const totalDutiesAndTaxes = calculatedImportDuty + calculatedVat + numExciseDuty + numOtherFees;
    const estimatedLandedCost = cif + totalDutiesAndTaxes;

    setCalculationResults({
      calculatedImportDutyDisplay: formatCurrency(calculatedImportDuty),
      valueForVatDisplay: formatCurrency(valueForVat),
      calculatedVatDisplay: formatCurrency(calculatedVat),
      totalDutiesAndTaxesDisplay: formatCurrency(totalDutiesAndTaxes),
      estimatedLandedCostDisplay: formatCurrency(estimatedLandedCost),
    });
  }, [costOfGoods, insuranceCost, freightCost, importDutyRate, vatRate, exciseDutyAmount, otherFees]);

  // Auto-calculate duties when relevant fields change
  useEffect(() => {
    handleCalculateDuties();
  }, [handleCalculateDuties]);


  const handleClearFields = () => {
    setItemDescription("");
    setHsCode("");
    setCostOfGoods("");
    setInsuranceCost("");
    setFreightCost("");
    // cifValueDisplay will auto-update
    setImportDutyRate("");
    setVatRate("12.5");
    setExciseDutyAmount("");
    setOtherFees("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Customs Duty Calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.estimatedLandedCostDisplay === "0.00") {
      toast({ title: "No Results", description: "Please calculate duties first.", variant: "default"});
      return;
    }
    const textToCopy = `
Customs Duty & Landed Cost Estimation
---------------------------------
Item Description: ${itemDescription || 'N/A'}
HS Code: ${hsCode || 'N/A'}
---------------------------------
Cost Breakdown (TTD):
Cost of Goods (FOB): ${formatCurrency(parseNum(costOfGoods))}
Insurance: ${formatCurrency(parseNum(insuranceCost))}
Freight: ${formatCurrency(parseNum(freightCost))}
Calculated CIF Value: ${cifValueDisplay}
---------------------------------
Duty & Tax Rates Applied:
Import Duty Rate: ${importDutyRate}%
VAT Rate on Import: ${vatRate}%
Excise Duty Amount: TT$ ${formatCurrency(parseNum(exciseDutyAmount))}
Other Fees: TT$ ${formatCurrency(parseNum(otherFees))}
---------------------------------
Calculated Duties & Taxes (TTD):
Import Duty: ${calculationResults.calculatedImportDutyDisplay}
Value for VAT Calculation: ${calculationResults.valueForVatDisplay}
VAT on Import: ${calculationResults.calculatedVatDisplay}
Total Duties & Taxes: ${calculationResults.totalDutiesAndTaxesDisplay}
---------------------------------
Estimated Landed Cost (CIF + Total Duties & Taxes): TT$ ${calculationResults.estimatedLandedCostDisplay}
---------------------------------
Disclaimer: This is an estimate. Actual duties and taxes depend on official customs valuation, classification (HS Code), applicable rates, and other regulations. Consult official Customs & Excise resources or a customs broker.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Estimate import duties and taxes based on user-provided values and rates. This calculator helps understand the landed cost.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-md text-primary flex items-center">
                <PackageSearch className="mr-2 h-4 w-4" /> Item & Value Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="itemDescriptionDuty" className="text-xs">Item Description</Label>
                  <Input id="itemDescriptionDuty" placeholder="e.g., Laptop Computer" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
                <div>
                  <Label htmlFor="hsCodeDuty" className="text-xs">HS Code (if known)</Label>
                  <Input id="hsCodeDuty" placeholder="e.g., 8471.30.00" value={hsCode} onChange={(e) => setHsCode(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="costOfGoodsDuty" className="text-xs">Cost of Goods (FOB, TTD)</Label>
                  <Input id="costOfGoodsDuty" type="number" placeholder="e.g., 5000" value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
                <div>
                  <Label htmlFor="insuranceCostDuty" className="text-xs">Insurance Cost (TTD)</Label>
                  <Input id="insuranceCostDuty" type="number" placeholder="e.g., 100" value={insuranceCost} onChange={(e) => setInsuranceCost(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
                <div>
                  <Label htmlFor="freightCostDuty" className="text-xs">Freight Cost (TTD)</Label>
                  <Input id="freightCostDuty" type="number" placeholder="e.g., 300" value={freightCost} onChange={(e) => setFreightCost(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
              </div>
              <div className="p-2 bg-muted/50 rounded-md text-center border">
                <span className="text-xs font-medium text-muted-foreground">Calculated CIF Value (Cost + Insurance + Freight): </span>
                <strong className="text-sm text-primary">TT$ {cifValueDisplay}</strong>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-md text-primary flex items-center">
                <PercentIcon className="mr-2 h-4 w-4" /> Duty & Tax Rates (User Input)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="importDutyRate" className="text-xs">Import Duty Rate (%)</Label>
                  <Input id="importDutyRate" type="number" placeholder="e.g., 20 for 20%" value={importDutyRate} onChange={(e) => setImportDutyRate(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
                <div>
                  <Label htmlFor="vatRateImport" className="text-xs">VAT Rate on Import (%)</Label>
                  <Input id="vatRateImport" type="number" placeholder="e.g., 12.5" value={vatRate} onChange={(e) => setVatRate(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="exciseDutyAmount" className="text-xs">Excise Duty Amount (TTD, if any)</Label>
                  <Input id="exciseDutyAmount" type="number" placeholder="e.g., 50 (Optional)" value={exciseDutyAmount} onChange={(e) => setExciseDutyAmount(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
                <div>
                  <Label htmlFor="otherFeesDuty" className="text-xs">Other Applicable Fees (TTD, if any)</Label>
                  <Input id="otherFeesDuty" type="number" placeholder="e.g., 25 (Optional)" value={otherFees} onChange={(e) => setOtherFees(e.target.value)} className="h-9 text-xs mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {parseNum(cifValueDisplay.replace(/,/g, '')) > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <Calculator className="mr-2 h-4 w-4" /> Estimated Duties & Landed Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between"><span>Calculated CIF Value:</span> <strong>TT$ {cifValueDisplay}</strong></div>
                <Separator className="my-1" />
                <div className="flex justify-between"><span>Calculated Import Duty:</span> <strong>TT$ {calculationResults.calculatedImportDutyDisplay}</strong></div>
                <div className="flex justify-between"><span>Value for VAT Calculation (CIF + Duty + Excise):</span> <strong>TT$ {calculationResults.valueForVatDisplay}</strong></div>
                <div className="flex justify-between"><span>Calculated VAT on Import:</span> <strong>TT$ {calculationResults.calculatedVatDisplay}</strong></div>
                <div className="flex justify-between"><span>Entered Excise Duty:</span> <strong>TT$ {formatCurrency(parseNum(exciseDutyAmount))}</strong></div>
                <div className="flex justify-between"><span>Entered Other Fees:</span> <strong>TT$ {formatCurrency(parseNum(otherFees))}</strong></div>
                <Separator className="my-1 font-semibold" />
                <div className="flex justify-between font-semibold"><span>Total Estimated Duties & Taxes:</span> <strong className="text-destructive">TT$ {calculationResults.totalDutiesAndTaxesDisplay}</strong></div>
                <Separator className="my-1" />
                <div className="flex justify-between font-bold text-lg text-primary mt-1"><span>Estimated Landed Cost:</span> <strong>TT$ {calculationResults.estimatedLandedCostDisplay}</strong></div>
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
          <Info className="inline-block h-3 w-3 mr-1" />
          Disclaimer: This calculator provides an estimate. Actual duties, taxes, and fees depend on official customs valuation, correct HS Code classification, applicable rates from Customs Tariff, trade agreements, and other specific regulations. This tool assumes user provides correct rates. Always consult official Customs and Excise Division resources or a licensed customs broker for definitive calculations.
        </p>
      </Card>
    </div>
  );
}

    