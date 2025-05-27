// src/components/calculators/PropertyTaxDialogCalculator.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PropertyTaxDialogCalculator() {
 return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Property Tax Calculator (Dialog)</CardTitle>
          <CardDescription>
            Estimate annual property tax obligations.
            (Placeholder - Full functionality to be implemented)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This calculator is under construction. Full version available <a href="/calculators/property-tax" className="text-accent hover:underline">here</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
