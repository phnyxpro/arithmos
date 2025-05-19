
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCircle2, Landmark, ReceiptText, CheckCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

import type { TaxFormData, Step } from '@/types';
import { taxFormSchema } from '@/types';

import PersonalInfoSection from './sections/personal-info-section';
import IncomeSection from './sections/income-section';
import ExpensesSection from './sections/expenses-section';
import SummarySection from './sections/summary-section';

const steps: Step[] = [
  { id: 'personal', name: 'Personal Information', Icon: UserCircle2, component: PersonalInfoSection, fields: ['personalInfo.fullName', 'personalInfo.email', 'personalInfo.filingStatus'] as any },
  { id: 'income', name: 'Income Details', Icon: Landmark, component: IncomeSection, fields: ['income.wages', 'income.interestIncome', 'income.dividendIncome', 'income.otherIncome'] as any },
  { id: 'expenses', name: 'Expenses & Deductions', Icon: ReceiptText, component: ExpensesSection, fields: ['expenses.medicalExpenses', 'expenses.charitableContributions', 'expenses.homeOfficeExpenses', 'expenses.otherExpenseDetails'] as any },
  { id: 'summary', name: 'Summary & Calculation', Icon: CheckCircle, component: SummarySection },
];

export default function TaxForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmittingOverall, setIsSubmittingOverall] = useState(false);
  const { toast } = useToast();

  const form = useForm<TaxFormData>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        filingStatus: undefined,
      },
      income: {
        wages: 0,
        interestIncome: 0,
        dividendIncome: 0,
        otherIncome: 0,
      },
      expenses: {
        medicalExpenses: 0,
        charitableContributions: 0,
        homeOfficeExpenses: '',
        otherExpenseDetails: '',
      },
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const { trigger, handleSubmit, getValues } = form;

  const handleNext = async () => {
    const currentStepFields = steps[currentStep].fields;
    let isValid = true;
    if (currentStepFields && currentStepFields.length > 0) {
      isValid = await trigger(currentStepFields as any);
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<TaxFormData> = async (data) => {
    setIsSubmittingOverall(true);
    // In a real app, this would submit to a backend.
    // For now, we just simulate a submission and show the summary.
    console.log('Final Tax Form Data:', data);
    toast({
      title: "Form Submitted (Simulated)",
      description: "Your tax information has been processed.",
    });
    // Potentially move to a "Thank You" or final confirmation page/state.
    // For now, stays on summary.
    setIsSubmittingOverall(false);
  };

  const ActiveStepComponent = steps[currentStep].component;
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <steps[currentStep].Icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">{steps[currentStep].name}</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
        </div>
        <Progress value={progressValue} className="w-full h-2" />
        <CardDescription className="mt-2">
          Please fill out the information for the current section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ActiveStepComponent
            form={form}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isSubmitting={isSubmittingOverall}
          />

          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={isSubmittingOverall}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={handleNext} className="ml-auto" disabled={isSubmittingOverall}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit" className="ml-auto" disabled={isSubmittingOverall}>
                {isSubmittingOverall ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit & Calculate Tax
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
