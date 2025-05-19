// src/ai/flows/suggest-deductions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting tax deductions based on user-provided income and expense information.
 *
 * - suggestDeductions - A function that takes income and expense information and returns AI-powered suggestions for potential tax deductions.
 * - SuggestDeductionsInput - The input type for the suggestDeductions function.
 * - SuggestDeductionsOutput - The return type for the suggestDeductions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDeductionsInputSchema = z.object({
  income: z.number().describe('The user\u2019s total income for the tax year.'),
  expenses: z
    .string()
    .describe(
      'A detailed description of the user\u2019s expenses, including amounts and categories (e.g., medical expenses, home office expenses, charitable donations).'
    ),
});
export type SuggestDeductionsInput = z.infer<typeof SuggestDeductionsInputSchema>;

const SuggestDeductionsOutputSchema = z.object({
  suggestedDeductions: z
    .string()
    .describe(
      'A list of potential tax deductions the user may be eligible for, based on their income and expenses. Include a brief explanation of each deduction and any relevant requirements or limitations.'
    ),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer stating that this information is for informational purposes only and not financial advice, and that the user should consult with a qualified tax professional for personalized advice.'
    ),
});
export type SuggestDeductionsOutput = z.infer<typeof SuggestDeductionsOutputSchema>;

export async function suggestDeductions(input: SuggestDeductionsInput): Promise<SuggestDeductionsOutput> {
  return suggestDeductionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDeductionsPrompt',
  input: {schema: SuggestDeductionsInputSchema},
  output: {schema: SuggestDeductionsOutputSchema},
  prompt: `Based on the following income and expense information, provide a list of potential tax deductions the user may be eligible for. Include a brief explanation of each deduction and any relevant requirements or limitations.

Income: {{{income}}}
Expenses: {{{expenses}}}

Include a disclaimer stating that this information is for informational purposes only and not financial advice, and that the user should consult with a qualified tax professional for personalized advice.`,
});

const suggestDeductionsFlow = ai.defineFlow(
  {
    name: 'suggestDeductionsFlow',
    inputSchema: SuggestDeductionsInputSchema,
    outputSchema: SuggestDeductionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
