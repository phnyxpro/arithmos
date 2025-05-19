import { z } from 'zod';
import type { LucideIcon } from 'lucide-react';

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  filingStatus: z.enum(["single", "married_filing_jointly", "married_filing_separately", "head_of_household", "widow"], {
    required_error: "Filing status is required.",
  }),
});
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const incomeSchema = z.object({
  wages: z.coerce.number().min(0, "Wages must be non-negative").optional().default(0),
  interestIncome: z.coerce.number().min(0, "Interest income must be non-negative").optional().default(0),
  dividendIncome: z.coerce.number().min(0, "Dividend income must be non-negative").optional().default(0),
  otherIncome: z.coerce.number().min(0, "Other income must be non-negative").optional().default(0),
});
export type IncomeFormData = z.infer<typeof incomeSchema>;

export const expensesSchema = z.object({
  medicalExpenses: z.coerce.number().min(0).optional().default(0),
  charitableContributions: z.coerce.number().min(0).optional().default(0),
  homeOfficeExpenses: z.string().optional().default(''), // Description for AI
  otherExpenseDetails: z.string().optional().default(''), // General expense description for AI
});
export type ExpensesFormData = z.infer<typeof expensesSchema>;

export const taxFormSchema = z.object({
  personalInfo: personalInfoSchema,
  income: incomeSchema,
  expenses: expensesSchema,
});
export type TaxFormData = z.infer<typeof taxFormSchema>;

export interface Step {
  id: string;
  name: string;
  Icon: LucideIcon;
  fields?: (keyof PersonalInfoFormData | keyof IncomeFormData | keyof ExpensesFormData)[]; // For step validation
  component: React.FC<StepProps>;
}

export interface StepProps {
  form: any; // UseFormReturn<TaxFormData> would be ideal, but any for simplicity here
  onNext: () => void;
  onPrevious?: () => void;
  isSubmitting?: boolean;
}

export interface DeductionSuggestion {
  id: string;
  title: string;
  description: string;
  estimatedSavings?: string;
}
