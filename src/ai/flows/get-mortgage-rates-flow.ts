// src/ai/flows/get-mortgage-rates-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow to fetch indicative mortgage rates.
 *
 * - getIndicativeMortgageRates - A function that queries an AI for current indicative mortgage rates.
 * - MortgageRateInfo - The type for a single mortgage rate entry (imported).
 * - IndicativeMortgageRatesOutput - The return type for the getIndicativeMortgageRates function (imported).
 */

import { ai } from '@/ai/genkit';
import {
  MortgageRateInfoSchema, // Imported Zod schema
  IndicativeMortgageRatesOutputSchema, // Imported Zod schema
  type MortgageRateInfo, // Imported type
  type IndicativeMortgageRatesOutput // Imported type
} from '@/ai/schemas/mortgage-schemas';

// Re-export types if they are intended to be part of this flow's public API
export type { MortgageRateInfo, IndicativeMortgageRatesOutput };

// Define the prompt for fetching mortgage rates
const getMortgageRatesPrompt = ai.definePrompt({
  name: 'getMortgageRatesPrompt',
  output: { schema: IndicativeMortgageRatesOutputSchema }, // Use imported schema
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

// Define the Genkit flow
const getIndicativeMortgageRatesFlow = ai.defineFlow(
  {
    name: 'getIndicativeMortgageRatesFlow',
    outputSchema: IndicativeMortgageRatesOutputSchema, // Use imported schema
  },
  async () => {
    const { output } = await getMortgageRatesPrompt({});
    // Ensure a default disclaimer if the AI doesn't provide one
    if (output && !output.aiDisclaimer) {
      output.aiDisclaimer = "These rates are indicative, based on generally available information, and subject to change without notice. Please verify directly with financial institutions for the most current and precise details.";
    }
    return output!;
  }
);

// Exported async function that invokes the flow
export async function getIndicativeMortgageRates(): Promise<IndicativeMortgageRatesOutput> {
  return getIndicativeMortgageRatesFlow();
}
