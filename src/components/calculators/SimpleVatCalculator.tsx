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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Percent, Copy, Trash2, Calculator } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VAT_RATE = 0.125; // 12.5%

export default function SimpleVatCalculator() {
  const { toast } = useToast();

  const [amount, setAmount] = useState<string>("");
  const [calculationType, setCalculationType] = useState<"exclusive" | "inclusive">("exclusive");
  
  const initialResults = {
    priceExcludingVat: "0.00",
    vatAmount: "0.00",
    priceIncludingVat: "0.00",
  };
  const [results, setResults] = useState(initialResults);

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleCalculateVat = useCallback(() => {
    const numAmount = parseNum(amount);
    if (numAmount <= 0) {
      setResults(initialResults);
      return;
    }

    let excl = 0;
    let vat = 0;
    let incl = 0;

    if (calculationType === "exclusive") {
      excl = numAmount;
      vat = excl * VAT_RATE;
      incl = excl + vat;
    } else { // inclusive
      incl = numAmount;
      excl = incl / (1 + VAT_RATE);
      vat = incl - excl;
    }

    setResults({
      priceExcludingVat: formatCurrency(excl),
      vatAmount: formatCurrency(vat),
      priceIncludingVat: formatCurrency(incl),
    });
  }, [amount, calculationType]);

  useEffect(() => {
    // Auto-calculate when amount or type changes if amount is not empty
    if (amount) {
      handleCalculateVat();
    } else {
      setResults(initialResults);
    }
  }, [amount, calculationType, handleCalculateVat]);

  const handleClearFields = () => {
    setAmount("");
    setResults(initialResults);
    toast({ title: "Fields Cleared", description: "VAT calculator inputs and results cleared." });
  };

  const handleCopyResults = () => {
    const textToCopy = `
VAT Calculation Summary
-----------------------------
Input Amount: TT$ ${formatCurrency(parseNum(amount))} (${calculationType === 'exclusive' ? 'Excluding VAT' : 'Including VAT'})
Price Excluding VAT: TT$ ${results.priceExcludingVat}
VAT Amount (12.5%): TT$ ${results.vatAmount}
Price Including VAT: TT$ ${results.priceIncludingVat}
-----------------------------
Note: Standard VAT rate of 12.5% applied.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "VAT calculation details copied to clipboard." });
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardContent className="space-y-4 p-0">
          <div className="space-y-2">
            <Label htmlFor="amount-vat" className="flex items-center text-sm">
              <Calculator className="mr-2 h-4 w-4 text-muted-foreground" />
              Amount (TT$)
            </Label>
            <Input
              id="amount-vat"
              type="number"
              placeholder="e.g., 100.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="calculationType-vat" className="flex items-center text-sm">
              <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
              Entered Amount Is
            </Label>
            <Select value={calculationType} onValueChange={(value: "exclusive" | "inclusive") => setCalculationType(value)}>
              <SelectTrigger id="calculationType-vat" className="h-10 text-sm">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">Price Excluding VAT</SelectItem>
                <SelectItem value="inclusive">Price Including VAT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {parseNum(amount) > 0 && (
            <div className="mt-4 p-3 border rounded-md bg-muted/50 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Price Excluding VAT:</span> <strong>TT$ {results.priceExcludingVat}</strong>
              </div>
              <div className="flex justify-between">
                <span>VAT Amount (12.5%):</span> <strong className="text-primary">TT$ {results.vatAmount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Price Including VAT:</span> <strong>TT$ {results.priceIncludingVat}</strong>
              </div>
            </div>
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
          This is a simplified calculator using the standard VAT rate of 12.5%.
        </p>
      </Card>
    </div>
  );
}