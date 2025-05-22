// src/components/calculators/GrossToNetSalaryCalculator.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function GrossToNetSalaryCalculator() {
  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Gross to Net Salary Calculator</CardTitle>
          <CardDescription>
            Quickly calculate net take-home pay after PAYE, NIS, and Health Surcharge deductions.
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
