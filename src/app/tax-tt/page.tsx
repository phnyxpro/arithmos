
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Landmark, Users, DollarSign, ArrowRight } from 'lucide-react';

// Import simplified calculators
import SimplifiedLevyCalculator from '@/components/calculators/SimplifiedLevyCalculator';
import SimplifiedPayrollCalculator from '@/components/calculators/SimplifiedPayrollCalculator';

export default function TaxTtPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">
              Tax Trinidad and Tobago
            </CardTitle>
          </div>
          <CardDescription className="pt-2">
            Access common tax and payroll calculators for Trinidad & Tobago.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="levy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="levy">Levy</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="corp-tax">Corporation Tax</TabsTrigger>
              <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
            </TabsList>

            <TabsContent value="levy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Landmark className="mr-2 h-5 w-5" /> Levy Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate Business Levy and Green Fund Levy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimplifiedLevyCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Users className="mr-2 h-5 w-5" /> Payroll Deductions Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate PAYE, NIS, and Health Surcharge for an employee.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimplifiedPayrollCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="corp-tax" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Landmark className="mr-2 h-5 w-5" /> Corporation Tax
                  </CardTitle>
                  <CardDescription>
                    The Corporation Tax calculator provides detailed estimation including various income types, deductions, and offsets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This calculator is best viewed on its dedicated page for full functionality and detailed input fields.
                  </p>
                  <Button asChild>
                    <Link href="/calculators/corporation-tax">
                      Go to Full Corporation Tax Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income-tax" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" /> Personal Income Tax
                  </CardTitle>
                  <CardDescription>
                    The Personal Income Tax calculator helps estimate your annual tax liability, including PAYE, NIS, and Health Surcharge.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This calculator is best viewed on its dedicated page for comprehensive inputs and breakdown.
                  </p>
                  <Button asChild>
                    <Link href="/calculators/income-tax">
                      Go to Full Income Tax Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
