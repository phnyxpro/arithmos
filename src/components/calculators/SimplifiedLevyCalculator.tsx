"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Constants for TT Levies (examples, verify with IRD)
const BUSINESS_LEVY_RATE = 0.006; // 0.6%
const BUSINESS_LEVY_EXEMPTION_ANNUAL = 360000; // $360,000 annual gross sales/receipts
const GREEN_FUND_LEVY_RATE = 0.003; // 0.3%

export function SimplifiedLevyCalculator() {
  const [annualGrossIncome, setAnnualGrossIncome] = useState<number | ''>('');
  const [isNewCompany, setIsNewCompany] = useState(false); // For Business Levy 3-year exemption
  const [calculation, setCalculation] = useState<{
    businessLevy: number;
    greenFundLevy: number;
    totalLevies: number;
    notes: string[];
  } | null>(null);

  const calculateLevies = () => {
    if (annualGrossIncome === '' || Number(annualGrossIncome) < 0) {
      setCalculation(null);
      alert("Please enter a valid annual gross income.");
      return;
    }

    const grossIncome = Number(annualGrossIncome);
    let notes: string[] = [];
    let businessLevy = 0;
    let greenFundLevy = 0;

    // Business Levy Calculation
    if (isNewCompany) {
      businessLevy = 0;
      notes.push("Business Levy: Exempt (company in first 3 years).");
    } else if (grossIncome <= BUSINESS_LEVY_EXEMPTION_ANNUAL) {
      businessLevy = 0;
      notes.push(`Business Levy: Exempt (annual gross income $${grossIncome.toLocaleString()} is not over $${BUSINESS_LEVY_EXEMPTION_ANNUAL.toLocaleString()}).`);
    } else {
      businessLevy = grossIncome * BUSINESS_LEVY_RATE;
      notes.push(`Business Levy: $${grossIncome.toLocaleString()} * ${BUSINESS_LEVY_RATE * 100}% = $${businessLevy.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}.`);
    }
    
    // Green Fund Levy Calculation
    // Generally applicable to all companies on gross sales/receipts.
    greenFundLevy = grossIncome * GREEN_FUND_LEVY_RATE;
    notes.push(`Green Fund Levy: $${grossIncome.toLocaleString()} * ${GREEN_FUND_LEVY_RATE * 100}% = $${greenFundLevy.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}.`);

    const totalLevies = businessLevy + greenFundLevy;

    setCalculation({
      businessLevy,
      greenFundLevy,
      totalLevies,
      notes
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-primary" /> Levy Calculator</CardTitle>
        <CardDescription>Estimate Business Levy and Green Fund Levy.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="annual-gross-income">Annual Gross Income / Sales (TTD)</Label>
          <Input 
            id="annual-gross-income" 
            type="number" 
            placeholder="e.g., 500000" 
            value={annualGrossIncome}
            onChange={(e) => setAnnualGrossIncome(e.target.value === '' ? '' : parseFloat(e.target.value))} 
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is-new-company" 
            checked={isNewCompany}
            onCheckedChange={(checked) => setIsNewCompany(Boolean(checked))}
          />
          <Label htmlFor="is-new-company" className="text-sm font-normal">
            Company incorporated/registered in the last 3 years? (Business Levy exemption)
          </Label>
        </div>

        <Button onClick={calculateLevies} className="w-full">Calculate Levies</Button>

        {calculation && (
          <Alert className="mt-4">
            <AlertTitle className="font-semibold">Estimated Annual Levies</AlertTitle>
            <AlertDescription>
              <div className="space-y-1 mt-2 text-sm">
                <p><strong>Business Levy:</strong> ${calculation.businessLevy.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p><strong>Green Fund Levy:</strong> ${calculation.greenFundLevy.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <hr className="my-2"/>
                <p className="font-semibold"><strong>Total Estimated Levies:</strong> ${calculation.totalLevies.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
            </AlertDescription>
            <AlertTitle className="font-semibold mt-4 text-xs">Calculation Notes:</AlertTitle>
             <AlertDescription className="text-xs mt-1">
                <ul className="list-disc pl-4 space-y-0.5">
                    {calculation.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
             </AlertDescription>
          </Alert>
        )}
         <Alert variant="default" className="mt-4 text-xs">
            <AlertTitle className="font-semibold">Disclaimer</AlertTitle>
            <AlertDescription>
              This calculator provides an estimate for illustrative purposes only for Trinidad & Tobago. Rates (Business Levy: 0.6% on gross income over $360k/yr, exempt first 3 yrs; Green Fund Levy: 0.3% on gross income) are examples and may not be current. Specific rules apply to certain industries (e.g., petroleum). Always consult official IRD guidelines and a qualified professional for accurate calculations and financial advice. Levies are typically paid quarterly.
            </AlertDescription>
          </Alert>
      </CardContent>
    </Card>
  );
}
