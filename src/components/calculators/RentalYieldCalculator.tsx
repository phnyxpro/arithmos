// src/components/calculators/RentalYieldCalculator.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

export default function RentalYieldCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<number | ''>('');
  const [propertyValue, setPropertyValue] = useState<number | ''>('');
  const [annualExpenses, setAnnualExpenses] = useState<number | ''>('');
  const [rentalYield, setRentalYield] = useState<number | null>(null);

  const calculateRentalYield = () => {
  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Rental Yield Calculator</CardTitle>
          <CardDescription>
            Calculate returns on rental property investments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="monthlyRent">Monthly Rent</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="monthlyRent"
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(parseFloat(e.target.value) || '')}
                  className="pl-8"
                  min="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="propertyValue">Property Value</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="propertyValue"
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(parseFloat(e.target.value) || '')}
                  className="pl-8"
                  min="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="annualExpenses">Annual Expenses</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="annualExpenses"
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(parseFloat(e.target.value) || '')}
                  className="pl-8"
                  min="0"
                />
              </div>
            </div>
            <Button onClick={calculateRentalYield} disabled={monthlyRent === '' || propertyValue === '' || annualExpenses === ''}>Calculate</Button>
            {rentalYield !== null && propertyValue !== 0 && (
              <div className="mt-4 text-lg font-semibold">
                Rental Yield: {rentalYield.toFixed(2)}%
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

