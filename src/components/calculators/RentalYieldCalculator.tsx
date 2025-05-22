// src/components/calculators/RentalYieldCalculator.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function RentalYieldCalculator() {
  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Rental Yield Calculator</CardTitle>
          <CardDescription>
            Calculate returns on rental property investments.
            (Placeholder - Full functionality to be implemented)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This calculator is under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
