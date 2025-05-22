// src/ai/flows/get-mortgage-rates-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow to fetch indicative mortgage rates.
 *
 * - getIndicativeMortgageRates - A function that queries an AI for current indicative mortgage rates.
 * - MortgageRateInfo - The type for a single mortgage rate entry.
 * - IndicativeMortgageRatesOutput - The return type for the getIndicativeMortgageRates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const MortgageRateInfoSchema = z.object({
  institution: z.string().describe('The name of the financial institution.'),
  rateRange: z.string().describe('The indicative mortgage interest rate range (e.g., "3.00% - 5.50%"). Include the % symbol.'),
  notes: z.string().optional().describe('Any brief, important notes or disclaimers for the rate (e.g., "Subject to credit approval", "Promotional rate", "Variable rate").'),
});
export type MortgageRateInfo = z.infer<typeof MortgageRateInfoSchema>;

const IndicativeMortgageRatesOutputSchema = z.object({
  rates: z.array(MortgageRateInfoSchema).describe('A list of indicative mortgage rates from various institutions. Aim for 3-5 major institutions.'),
  aiDisclaimer: z.string().default("These rates are indicative, based on generally available information, and subject to change without notice. Please verify directly with financial institutions for the most current and precise details.").describe('A general disclaimer stating that these rates are indicative, subject to change, and users should verify with institutions.'),
});
export type IndicativeMortgageRatesOutput = z.infer<typeof IndicativeMortgageRatesOutputSchema>;

export async function getIndicativeMortgageRates(): Promise<IndicativeMortgageRatesOutput> {
  return getIndicativeMortgageRatesFlow();
}

const prompt = ai.definePrompt({
  name: 'getMortgageRatesPrompt',
  output: {schema: IndicativeMortgageRatesOutputSchema},
  prompt: `You are a helpful financial assistant.
Please provide a list of current indicative mortgage interest rate ranges from 3 to 5 major, well-known financial institutions in Trinidad and Tobago.
For each institution, include:
1. The institution's full name.
2. The indicative mortgage interest rate range (e.g., "3.00% - 5.50%"). Ensure the % symbol is included.
3. Any brief, important notes if commonly known (e.g., "Variable rates available", "Subject to creditworthiness", "Special conditions may apply"). Keep notes very concise.

Also, include a general disclaimer: "These rates are indicative, based on generally available information, and subject to change without notice. Please verify directly with financial institutions for the most current and precise details."

Return the data strictly in the format specified by the output schema. Do not provide rates for more than 5 institutions.
`,
});

const getIndicativeMortgageRatesFlow = ai.defineFlow(
  {
    name: 'getIndicativeMortgageRatesFlow',
    outputSchema: IndicativeMortgageRatesOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    // Ensure a default disclaimer if the AI doesn't provide one
    if (output && !output.aiDisclaimer) {
      output.aiDisclaimer = "These rates are indicative, based on generally available information, and subject to change without notice. Please verify directly with financial institutions for the most current and precise details.";
    }
    return output!;
  }
);
