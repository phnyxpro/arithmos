"use client";

import React, { useState } from 'react';
import type { StepProps, DeductionSuggestion } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { handleSuggestDeductions } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export default function ExpensesSection({ form }: StepProps) {
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const { toast } = useToast();

  const getAISuggestions = async () => {
    setIsFetchingSuggestions(true);
    setAiSuggestions(null);
    try {
      const incomeValues = form.getValues('income');
      const totalIncome = (incomeValues.wages || 0) + (incomeValues.interestIncome || 0) + (incomeValues.dividendIncome || 0) + (incomeValues.otherIncome || 0);
      
      const expenseValues = form.getValues('expenses');
      let expenseDetails = `Medical Expenses: $${expenseValues.medicalExpenses || 0}\nCharitable Contributions: $${expenseValues.charitableContributions || 0}\n`;
      if (expenseValues.homeOfficeExpenses) {
        expenseDetails += `Home Office Details: ${expenseValues.homeOfficeExpenses}\n`;
      }
      if (expenseValues.otherExpenseDetails) {
        expenseDetails += `Other Expenses: ${expenseValues.otherExpenseDetails}`;
      }

      if (totalIncome <= 0 && !expenseDetails.trim()) {
         toast({
          title: "Input Required",
          description: "Please provide some income or expense details for AI suggestions.",
          variant: "default",
        });
        setIsFetchingSuggestions(false);
        return;
      }

      const result = await handleSuggestDeductions({
        income: totalIncome,
        expenses: expenseDetails || "No specific expenses provided.",
      });
      
      setAiSuggestions(result.suggestedDeductions + "\n\n" + result.disclaimer);
      toast({
        title: "AI Suggestions Ready",
        description: "Potential deductions have been identified.",
      });
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      toast({
        title: "AI Suggestion Error",
        description: "Could not fetch AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="expenses.medicalExpenses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Expenses (if itemizing)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 1200" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expenses.charitableContributions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cash Charitable Contributions (if itemizing)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 300" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expenses.homeOfficeExpenses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Home Office Expense Details (for AI)</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe your home office setup and usage (e.g., square footage, type of work)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expenses.otherExpenseDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Expense Details (for AI)</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe any other potentially deductible expenses (e.g., education, business expenses)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card className="mt-6 bg-secondary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent" />
            AI Deduction Helper
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Based on your income and entered expenses, our AI can suggest potential deductions.
            Provide details above for more accurate suggestions.
          </p>
          <Button type="button" onClick={getAISuggestions} disabled={isFetchingSuggestions} variant="outline">
            {isFetchingSuggestions ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Get AI Suggestions
          </Button>
          {aiSuggestions && (
            <Alert variant="default" className="mt-4">
              <AlertTitle className="font-semibold">AI Suggested Deductions</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap text-sm">
                {aiSuggestions}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
