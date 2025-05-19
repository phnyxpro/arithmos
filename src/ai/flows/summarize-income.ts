// SummarizeIncome.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing income statements to pre-fill tax forms.
 *
 * - summarizeIncome - A function that takes an income statement data URI and returns a summary of income for tax form pre-filling.
 * - SummarizeIncomeInput - The input type for the summarizeIncome function, which includes the income statement data URI.
 * - SummarizeIncomeOutput - The output type for the summarizeIncome function, which includes a summary of income information.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIncomeInputSchema = z.object({
  incomeStatementDataUri: z
    .string()
    .describe(
      "The income statement as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeIncomeInput = z.infer<typeof SummarizeIncomeInputSchema>;

const SummarizeIncomeOutputSchema = z.object({
  incomeSummary: z.string().describe('A summary of the income derived from the income statement.'),
  prefillSuggestions: z
    .record(z.string(), z.string())
    .describe(
      'A set of suggestions of tax form fields to prefill, where the key is the form field name and the value is the suggested value.'
    ),
});
export type SummarizeIncomeOutput = z.infer<typeof SummarizeIncomeOutputSchema>;

export async function summarizeIncome(input: SummarizeIncomeInput): Promise<SummarizeIncomeOutput> {
  return summarizeIncomeFlow(input);
}

const summarizeIncomePrompt = ai.definePrompt({
  name: 'summarizeIncomePrompt',
  input: {schema: SummarizeIncomeInputSchema},
  output: {schema: SummarizeIncomeOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing income statements for tax form pre-filling.
  Your goal is to extract key income information from the provided income statement and suggest tax form fields that can be pre-filled with the extracted information.

  Analyze the income statement provided and provide a summary of the income. Then, identify specific fields in a tax form that could be pre-filled based on the extracted income information. Provide these as key-value pairs.

  Income Statement:
  {{media url=incomeStatementDataUri}}

  Respond in a structured format that includes a summary of income and a list of pre-fill suggestions for the tax form.
`,
});

const summarizeIncomeFlow = ai.defineFlow(
  {
    name: 'summarizeIncomeFlow',
    inputSchema: SummarizeIncomeInputSchema,
    outputSchema: SummarizeIncomeOutputSchema,
  },
  async input => {
    const {output} = await summarizeIncomePrompt(input);
    return output!;
  }
);
