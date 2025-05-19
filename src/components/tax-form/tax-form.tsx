
"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCircle2, Landmark, ReceiptText, CheckCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
// Intentionally removing Card imports for this diagnostic step
// import { Card as RenamedCard, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; 
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
    console.log('Final Tax Form Data:', data);
    toast({
      title: "Form Submitted (Simulated)",
      description: "Your tax information has been processed.",
    });
    setIsSubmittingOverall(false);
  };

  // const ActiveStepComponent = steps[currentStep].component; // Commented out as it's not used in the simplified return
  // const progressValue = ((currentStep + 1) / steps.length) * 100; // Commented out

  return (
    <div>Hello</div> // DIAGNOSTIC: Extremely simplified JSX
  );
}
