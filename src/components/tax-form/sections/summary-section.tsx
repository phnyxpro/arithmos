"use client";

import type { StepProps, TaxFormData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateSimplifiedTax } from '@/lib/tax-utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SummarySection({ form }: StepProps) {
  const formData = form.getValues() as TaxFormData;
  const taxCalculation = calculateSimplifiedTax(formData);

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle className="font-semibold">Review Your Information</AlertTitle>
        <AlertDescription>
          Please review your entered information below. If everything is correct, proceed to submit.
          This is a simplified tax calculation for demonstration purposes.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>Full Name:</strong> {formData.personalInfo.fullName}</p>
            <p><strong>Email:</strong> {formData.personalInfo.email}</p>
            <p><strong>Filing Status:</strong> {formData.personalInfo.filingStatus?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>Wages:</strong> ${formData.income.wages?.toLocaleString() || 0}</p>
            <p><strong>Interest Income:</strong> ${formData.income.interestIncome?.toLocaleString() || 0}</p>
            <p><strong>Dividend Income:</strong> ${formData.income.dividendIncome?.toLocaleString() || 0}</p>
            <p><strong>Other Income:</strong> ${formData.income.otherIncome?.toLocaleString() || 0}</p>
            <p className="font-semibold mt-2"><strong>Total Income:</strong> ${taxCalculation.totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Expenses & Deductions Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p><strong>Medical Expenses:</strong> ${formData.expenses.medicalExpenses?.toLocaleString() || 0}</p>
          <p><strong>Charitable Contributions:</strong> ${formData.expenses.charitableContributions?.toLocaleString() || 0}</p>
          {formData.expenses.homeOfficeExpenses && (
            <div>
              <strong>Home Office Details:</strong>
              <ScrollArea className="h-20 mt-1 p-2 border rounded-md bg-muted/50">
                <p className="whitespace-pre-wrap">{formData.expenses.homeOfficeExpenses}</p>
              </ScrollArea>
            </div>
          )}
          {formData.expenses.otherExpenseDetails && (
             <div>
              <strong>Other Expense Details:</strong>
              <ScrollArea className="h-20 mt-1 p-2 border rounded-md bg-muted/50">
                 <p className="whitespace-pre-wrap">{formData.expenses.otherExpenseDetails}</p>
              </ScrollArea>
            </div>
          )}
           <p className="font-semibold mt-2"><strong>Total Itemized Deductions (Entered):</strong> ${taxCalculation.totalEnteredDeductions.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/5 text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Simplified Tax Calculation</CardTitle>
          <CardDescription className="text-primary/80">This is an illustrative calculation.</CardDescription>
        </CardHeader>
        <CardContent className="text-lg space-y-2">
          <p><strong>Taxable Income:</strong> <span className="font-semibold text-primary">${taxCalculation.taxableIncome.toLocaleString()}</span></p>
          <p><strong>Estimated Tax Due:</strong> <span className="font-semibold text-primary">${taxCalculation.taxDue.toLocaleString()}</span></p>
        </CardContent>
      </Card>
    </div>
  );
}
