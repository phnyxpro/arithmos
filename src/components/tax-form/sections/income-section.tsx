"use client";

import type { StepProps } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function IncomeSection({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="income.wages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wages, Salaries, Tips, etc.</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 50000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="income.interestIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taxable Interest Income</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 500" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="income.dividendIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ordinary Dividends</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 200" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="income.otherIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Income</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 1000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
