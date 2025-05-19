"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Constants based on typical TT values (examples, always verify with IRD)
const NIS_RATE_EMPLOYEE = 0.056; // 5.6% for employee portion, example
const NIS_MAX_EARNINGS_MONTHLY = 13600; // Example maximum insurable earnings

// Health Surcharge thresholds (example weekly amounts)
const HS_THRESHOLD_1 = 110; // Up to $110/week: $4.13 HS
const HS_THRESHOLD_2 = Infinity; // Over $110/week: $8.25 HS
const HS_AMOUNT_1 = 4.13;
const HS_AMOUNT_2 = 8.25;

// PAYE Personal Allowance (example annual)
const PERSONAL_ALLOWANCE_ANNUAL = 90000;
// PAYE Tax Brackets (example annual chargeable income)
const PAYE_BRACKET_1_LIMIT = 72000; // First $72,000 of chargeable income @ 25%
const PAYE_RATE_1 = 0.25;
const PAYE_RATE_2 = 0.30; // Income over $72,000 @ 30%

export function SimplifiedPayrollCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number | ''>('');
  const [payFrequency, setPayFrequency] = useState<'weekly' | 'monthly'>('monthly');
  const [calculation, setCalculation] = useState<{
    gross: number;
    nis: number;
    healthSurcharge: number;
    paye: number;
    netPay: number;
    notes: string[];
  } | null>(null);

  const calculateDeductions = () => {
    if (grossMonthlyIncome === '' || grossMonthlyIncome <= 0) {
      setCalculation(null);
      alert("Please enter a valid gross monthly income.");
      return;
    }

    const gross = Number(grossMonthlyIncome);
    let notes: string[] = [];

    // NIS Calculation
    const nisApplicableIncome = Math.min(gross, NIS_MAX_EARNINGS_MONTHLY);
    const nisContribution = nisApplicableIncome * NIS_RATE_EMPLOYEE;
    notes.push(`NIS calculated at ${NIS_RATE_EMPLOYEE*100}% on income up to $${NIS_MAX_EARNINGS_MONTHLY.toLocaleString()}/month.`);

    // Health Surcharge Calculation
    const grossWeeklyEquivalent = payFrequency === 'weekly' ? gross : gross / (30/7); // Approx weeks in month
    let healthSurchargeMonthly = 0;
    let hsWeekly = 0;

    if (grossWeeklyEquivalent <= HS_THRESHOLD_1) {
      hsWeekly = HS_AMOUNT_1;
    } else {
      hsWeekly = HS_AMOUNT_2;
    }
    healthSurchargeMonthly = hsWeekly * (30/7); // Convert weekly HS to monthly
    notes.push(`Health Surcharge based on weekly equivalent income of $${grossWeeklyEquivalent.toFixed(2)}. Monthly HS: $${healthSurchargeMonthly.toFixed(2)}.`);
    
    // PAYE Calculation
    // Annualize income and deductions for PAYE calculation
    const annualGrossIncome = gross * 12;
    const annualNis = nisContribution * 12;
    // Annual Health Surcharge - This can be complex as it's often flat weekly. For PAYE, it's usually considered.
    // Let's use the monthly calculated one * 12 for PAYE purposes.
    const annualHealthSurcharge = healthSurchargeMonthly * 12; 

    const totalAnnualDeductionsForPaye = annualNis + annualHealthSurcharge; // Other deductions could be added here
    notes.push(`Annual NIS for PAYE calc: $${annualNis.toFixed(2)}`);
    notes.push(`Annual HS for PAYE calc: $${annualHealthSurcharge.toFixed(2)} (estimated).`);


    const chargeableIncomeAnnual = Math.max(0, annualGrossIncome - PERSONAL_ALLOWANCE_ANNUAL - totalAnnualDeductionsForPaye);
    notes.push(`Annual Personal Allowance: $${PERSONAL_ALLOWANCE_ANNUAL.toLocaleString()}.`);
    notes.push(`Total Annual Deductions (NIS, HS) for PAYE: $${totalAnnualDeductionsForPaye.toFixed(2)}.`);
    notes.push(`Annual Chargeable Income: $${chargeableIncomeAnnual.toFixed(2)}.`);

    let annualPaye = 0;
    if (chargeableIncomeAnnual <= PAYE_BRACKET_1_LIMIT) {
      annualPaye = chargeableIncomeAnnual * PAYE_RATE_1;
      notes.push(`PAYE calculated at ${PAYE_RATE_1*100}% on $${chargeableIncomeAnnual.toFixed(2)}.`);
    } else {
      annualPaye = (PAYE_BRACKET_1_LIMIT * PAYE_RATE_1) + 
                   ((chargeableIncomeAnnual - PAYE_BRACKET_1_LIMIT) * PAYE_RATE_2);
      notes.push(`PAYE: ($${PAYE_BRACKET_1_LIMIT.toFixed(2)} * ${PAYE_RATE_1*100}%) + ($${(chargeableIncomeAnnual - PAYE_BRACKET_1_LIMIT).toFixed(2)} * ${PAYE_RATE_2*100}%).`);
    }
    const monthlyPaye = annualPaye / 12;

    // Net Pay
    const totalMonthlyDeductions = nisContribution + healthSurchargeMonthly + monthlyPaye;
    const netPay = gross - totalMonthlyDeductions;

    setCalculation({
      gross,
      nis: nisContribution,
      healthSurcharge: healthSurchargeMonthly,
      paye: monthlyPaye,
      netPay,
      notes
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary" /> PAYE, NIS & HS Calculator</CardTitle>
        <CardDescription>Estimate monthly statutory deductions for an employee.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gross-monthly-income">Gross Monthly Income (TTD)</Label>
          <Input 
            id="gross-monthly-income" 
            type="number" 
            placeholder="e.g., 10000" 
            value={grossMonthlyIncome}
            onChange={(e) => setGrossMonthlyIncome(e.target.value === '' ? '' : parseFloat(e.target.value))} 
          />
        </div>
         {/* Pay Frequency Selector - Kept simple, affects HS weekly equivalent */}
        {/* <div className="space-y-2">
          <Label htmlFor="pay-frequency">Pay Frequency (for HS reference)</Label>
          <Select 
            value={payFrequency} 
            onValueChange={(value: 'weekly' | 'monthly') => setPayFrequency(value)}
          >
            <SelectTrigger id="pay-frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly (for HS reference if paid weekly)</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <Button onClick={calculateDeductions} className="w-full">Calculate Deductions</Button>

        {calculation && (
          <Alert className="mt-4">
            <AlertTitle className="font-semibold">Estimated Monthly Deductions & Net Pay</AlertTitle>
            <AlertDescription>
              <div className="space-y-1 mt-2 text-sm">
                <p><strong>Gross Income:</strong> ${calculation.gross.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p><strong>NIS Contribution:</strong> ${calculation.nis.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p><strong>Health Surcharge:</strong> ${calculation.healthSurcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p><strong>PAYE (Income Tax):</strong> ${calculation.paye.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <hr className="my-2"/>
                <p className="font-semibold"><strong>Estimated Net Pay:</strong> ${calculation.netPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
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
              This calculator provides an estimate for illustrative purposes only, based on simplified assumptions for Trinidad & Tobago. Rates (NIS: 5.6% employee on max $13,600/mo earnings; HS: $4.13/wk up to $110/wk income, $8.25/wk above; PAYE: $90k personal allowance, 25% on first $72k chargeable, 30% thereafter) are examples and may not be current. Always consult official IRD guidelines and a qualified professional for accurate calculations and financial advice. No other deductions (e.g., pension, loan payments) are included.
            </AlertDescription>
          </Alert>
      </CardContent>
    </Card>
  );
}
