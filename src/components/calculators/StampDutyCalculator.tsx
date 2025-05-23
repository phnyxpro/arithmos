
// src/components/calculators/StampDutyCalculator.tsx
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
import { Stamp, DollarSign, Copy, Trash2, CircleCheckBig, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CalculationResult {
  calculatedStampDutyDisplay: string;
  breakdown: string[];
}

const initialCalculationResults: CalculationResult = {
  calculatedStampDutyDisplay: "0.00",
  breakdown: [],
};

export function StampDutyCalculator() {
  const { toast } = useToast();

  const [propertyValue, setPropertyValue] = useState<string>("");
  const [calculationResults, setCalculationResults] = useState<CalculationResult>(initialCalculationResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateStampDuty = useCallback(() => {
    const value = parseNum(propertyValue);
    if (value <= 0) {
      setCalculationResults(initialCalculationResults);
      return;
    }

    let duty = 0;
    const breakdownSteps: string[] = [];

    const tier1Limit = 850000;
    const tier2Limit = 1250000;
    const tier3Limit = 1750000;

    const rate1 = 0.00; // 0%
    const rate2 = 0.03; // 3%
    const rate3 = 0.05; // 5%
    const rate4 = 0.075; // 7.5%

    if (value <= tier1Limit) {
      duty = 0;
      breakdownSteps.push(`Value up to $${formatCurrency(tier1Limit)}: $0.00 (0%)`);
    } else {
      // Duty for the first tier (which is $0)
      breakdownSteps.push(`On first $${formatCurrency(tier1Limit)}: $0.00 (0%)`);
      
      if (value <= tier2Limit) {
        const taxableInTier2 = value - tier1Limit;
        const dutyInTier2 = taxableInTier2 * rate2;
        duty += dutyInTier2;
        breakdownSteps.push(`On next $${formatCurrency(taxableInTier2)} (up to $${formatCurrency(tier2Limit)}): $${formatCurrency(dutyInTier2)} @ ${rate2 * 100}%`);
      } else {
        const tier2TaxableAmount = tier2Limit - tier1Limit;
        const dutyFromTier2 = tier2TaxableAmount * rate2;
        duty += dutyFromTier2;
        breakdownSteps.push(`On next $${formatCurrency(tier2TaxableAmount)} (from $${formatCurrency(tier1Limit + 0.01)} to $${formatCurrency(tier2Limit)}): $${formatCurrency(dutyFromTier2)} @ ${rate2 * 100}%`);

        if (value <= tier3Limit) {
          const taxableInTier3 = value - tier2Limit;
          const dutyInTier3 = taxableInTier3 * rate3;
          duty += dutyInTier3;
          breakdownSteps.push(`On next $${formatCurrency(taxableInTier3)} (from $${formatCurrency(tier2Limit + 0.01)} to $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyInTier3)} @ ${rate3 * 100}%`);
        } else {
          const tier3TaxableAmount = tier3Limit - tier2Limit;
          const dutyFromTier3 = tier3TaxableAmount * rate3;
          duty += dutyFromTier3;
          breakdownSteps.push(`On next $${formatCurrency(tier3TaxableAmount)} (from $${formatCurrency(tier2Limit + 0.01)} to $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyFromTier3)} @ ${rate3 * 100}%`);
          
          const taxableInTier4 = value - tier3Limit;
          const dutyInTier4 = taxableInTier4 * rate4;
          duty += dutyInTier4;
          breakdownSteps.push(`On remaining $${formatCurrency(taxableInTier4)} (above $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyInTier4)} @ ${rate4 * 100}%`);
        }
      }
    }

    setCalculationResults({
      calculatedStampDutyDisplay: formatCurrency(duty),
      breakdown: breakdownSteps,
    });
  }, [propertyValue]);

  useEffect(() => {
    if (propertyValue) {
      handleCalculateStampDuty();
    } else {
      setCalculationResults(initialCalculationResults);
    }
  }, [propertyValue, handleCalculateStampDuty]);

  const handleClearFields = () => {
    setPropertyValue("");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Stamp Duty Calculator inputs reset." });
  };

  const handleCopyResults = () => {
     if (calculationResults.calculatedStampDutyDisplay === "0.00" && !propertyValue) {
      toast({ title: "No Results to Copy", description: "Please enter a property value first.", variant: "default"});
      return;
    }
    let textToCopy = `
Stamp Duty Calculation Summary (Residential Property)
---------------------------------
Input:
Property Value / Consideration: TT$ ${formatCurrency(parseNum(propertyValue))}
---------------------------------
Results:
Estimated Stamp Duty Payable: TT$ ${calculationResults.calculatedStampDutyDisplay}
`;
    if (calculationResults.breakdown.length > 0) {
        textToCopy += "\nDuty Calculation Breakdown:\n";
        calculationResults.breakdown.forEach(step => {
            textToCopy += `- ${step}\n`;
        });
    }
    textToCopy += `---------------------------------
Disclaimer: This is an estimate based on general tiered rates for residential property conveyances in Trinidad & Tobago. Actual stamp duty can vary based on the specific nature of the instrument, parties involved, and exemptions (e.g., first-time homeowners, gifts). Consult the Stamp Duty Act and official IRD guidelines or seek professional legal advice for accurate determination.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Stamp duty calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Estimate stamp duty payable on residential property transfers based on the value of the property or consideration using common T&T rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-1">
            <Label htmlFor="propertyValueStampDuty" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Property Value / Consideration (TTD)
            </Label>
            <Input
              id="propertyValueStampDuty" type="number" step="0.01" placeholder="e.g., 950000"
              value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {parseNum(propertyValue) > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Estimated Stamp Duty (Residential Property)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="font-medium mb-1">Duty Calculation Breakdown:</div>
                {calculationResults.breakdown.length > 0 ? (
                  calculationResults.breakdown.map((step, index) => (
                    <p key={index} className="text-muted-foreground ml-2">{`- ${step}`}</p>
                  ))
                ) : (
                  <p className="text-muted-foreground ml-2">- Calculation pending or value below first tier.</p>
                )}
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm">
                  <span>Total Estimated Stamp Duty Payable:</span> <strong className="text-primary">TT$ {calculationResults.calculatedStampDutyDisplay}</strong>
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
        <p className="text-xs text-muted-foreground text-center mt-4 flex items-start">
          <AlertCircle size={20} className="mr-1.5 flex-shrink-0" />
          <span>
            Disclaimer: This calculator provides an estimate based on general tiered rates for stamp duty on conveyances or transfers of residential property in Trinidad & Tobago. It does NOT account for specific exemptions (e.g., first-time homeowner relief which has different thresholds and conditions), different rates for non-residential property, mortgages, leases, gifts, or other types of instruments. Actual stamp duty payable can vary significantly. Always consult the official Stamp Duty Act, IRD guidelines, or seek professional legal advice for accurate determination.
          </span>
        </p>
      </Card>
    </div>
  );
}
