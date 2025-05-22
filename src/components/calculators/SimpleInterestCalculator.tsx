// src/components/calculators/SimpleInterestCalculator.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SimpleInterestCalculator() {
  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Simple Interest Calculator</CardTitle>
          <CardDescription>
            Quickly calculate simple interest amounts for short-term loans or deposits.
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
