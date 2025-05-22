// src/components/calculators/StampDutyCalculator.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function StampDutyCalculator() {
  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Stamp Duty Calculator</CardTitle>
          <CardDescription>
            Determine stamp duty payable on property transfers.
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
