
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

const initialCalculationResults = {
  calculatedStampDutyDisplay: "0.00",
  breakdown: [] as string[],
};

export function StampDutyCalculator() {
  const { toast } = useToast();

  const [propertyValue, setPropertyValue] = useState<string>("");
  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

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

    // Tiered rates for general conveyances (residential property, non-first-time buyer simplified)
    // These tiers and rates are illustrative examples for Trinidad & Tobago and should be verified.
    // Actual laws are more complex.
    const tier1Limit = 450000;
    const tier2Limit = 850000;
    const tier3Limit = 1250000;

    const tier1Rate = 0.00; // 0%
    const tier2Rate = 0.02; // 2%
    const tier3Rate = 0.05; // 5%
    const tier4Rate = 0.075; // 7.5%
    
    let remainingValue = value;

    if (value <= tier1Limit) {
      // No duty
      duty = 0;
      breakdownSteps.push(`Value up to $${formatCurrency(tier1Limit)}: $0.00 (0%)`);
    } else {
      // Value exceeds tier 1 limit
      breakdownSteps.push(`Value up to $${formatCurrency(tier1Limit)}: $0.00 (0%)`);
      
      if (value <= tier2Limit) {
        const taxableInTier2 = value - tier1Limit;
        const dutyInTier2 = taxableInTier2 * tier2Rate;
        duty += dutyInTier2;
        breakdownSteps.push(`On next $${formatCurrency(taxableInTier2)} (up to $${formatCurrency(tier2Limit)}): $${formatCurrency(dutyInTier2)} (${tier2Rate*100}%)`);
      } else {
        // Max duty from tier 2
        const tier2TaxableAmount = tier2Limit - tier1Limit;
        const dutyFromTier2 = tier2TaxableAmount * tier2Rate;
        duty += dutyFromTier2;
        breakdownSteps.push(`On next $${formatCurrency(tier2TaxableAmount)} (up to $${formatCurrency(tier2Limit)}): $${formatCurrency(dutyFromTier2)} (${tier2Rate*100}%)`);

        if (value <= tier3Limit) {
          const taxableInTier3 = value - tier2Limit;
          const dutyInTier3 = taxableInTier3 * tier3Rate;
          duty += dutyInTier3;
          breakdownSteps.push(`On next $${formatCurrency(taxableInTier3)} (up to $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyInTier3)} (${tier3Rate*100}%)`);
        } else {
          // Max duty from tier 3
          const tier3TaxableAmount = tier3Limit - tier2Limit;
          const dutyFromTier3 = tier3TaxableAmount * tier3Rate;
          duty += dutyFromTier3;
          breakdownSteps.push(`On next $${formatCurrency(tier3TaxableAmount)} (up to $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyFromTier3)} (${tier3Rate*100}%)`);
          
          // Remaining value for tier 4
          const taxableInTier4 = value - tier3Limit;
          const dutyInTier4 = taxableInTier4 * tier4Rate;
          duty += dutyInTier4;
          breakdownSteps.push(`On remaining $${formatCurrency(taxableInTier4)} (above $${formatCurrency(tier3Limit)}): $${formatCurrency(dutyInTier4)} (${tier4Rate*100}%)`);
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
Stamp Duty Calculation Summary
---------------------------------
Input:
Property Value / Consideration: TT$ ${formatCurrency(parseNum(propertyValue))}
---------------------------------
Results:
Estimated Stamp Duty Payable: TT$ ${calculationResults.calculatedStampDutyDisplay}
`;
    if (calculationResults.breakdown.length > 0) {
        textToCopy += "\nBreakdown:\n";
        calculationResults.breakdown.forEach(step => {
            textToCopy += `- ${step}\n`;
        });
    }
    textToCopy += `---------------------------------
Disclaimer: This is an estimate based on general tiered rates for conveyances. Actual stamp duty can vary based on the specific nature of the instrument, parties involved, and exemptions (e.g., first-time homeowners). Consult the Stamp Duty Act and official IRD guidelines.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Stamp duty calculation details copied." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          {/* DialogTitle and DialogDescription are typically part of the parent Dialog component */}
          {/* <CardTitle className="text-xl text-primary">Stamp Duty Calculator</CardTitle> */}
          <CardDescription>
            Estimate stamp duty payable on property transfers based on the value of the property or consideration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="space-y-1">
            <Label htmlFor="propertyValueStampDuty" className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Property Value / Consideration (TTD)
            </Label>
            <Input
              id="propertyValueStampDuty" type="number" step="0.01" placeholder="e.g., 750000"
              value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {parseNum(propertyValue) > 0 && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <CircleCheckBig className="mr-2 h-4 w-4" /> Estimated Stamp Duty
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                {calculationResults.breakdown.map((step, index) => (
                  <p key={index} className="text-muted-foreground">{step}</p>
                ))}
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
          <span>Disclaimer: This calculator provides an estimate based on a general tiered structure for stamp duty on conveyances or transfers of residential property in Trinidad & Tobago. Actual stamp duty payable can vary significantly based on the specific type of instrument (e.g., mortgage, lease, gift), the parties involved, applicable exemptions (like for first-time homeowners up to certain values), and any amendments to the Stamp Duty Act. Always consult the official Stamp Duty Act, IRD guidelines, or seek professional legal advice for accurate determination.</span>
        </p>
      </Card>
    </div>
  );
}

