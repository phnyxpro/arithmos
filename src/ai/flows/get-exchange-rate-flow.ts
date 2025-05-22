
// src/ai/flows/get-exchange-rate-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow to fetch an indicative exchange rate between two currencies.
 *
 * - getExchangeRate - A function that queries an AI for an exchange rate and converts an amount.
 * - GetExchangeRateInput - The input type for the getExchangeRate function.
 * - GetExchangeRateOutput - The return type for the getExchangeRate function.
 */

import { ai } from '@/ai/genkit';
import { GetExchangeRateInputSchema, GetExchangeRateOutputSchema } from '@/ai/schemas/currency-schemas'; // Import from new schemas file
export type { GetExchangeRateInput, GetExchangeRateOutput } from '@/ai/schemas/currency-schemas'; // Re-export types

const getExchangeRatePrompt = ai.definePrompt({
  name: 'getExchangeRatePrompt',
  input: { schema: GetExchangeRateInputSchema },
  output: { schema: GetExchangeRateOutputSchema },
  prompt: `You are a helpful financial assistant.
Please provide the current indicative exchange rate to convert {{amount}} from {{fromCurrencyCode}} to {{toCurrencyCode}}.
First, determine the exchange rate for 1 unit of {{fromCurrencyCode}} to {{toCurrencyCode}}.
Then, calculate the converted amount.
Include a brief disclaimer that these rates are indicative and for informational purposes only and subject to change.
Ensure the output strictly follows the schema. If a currency is not supported or rate is unavailable, indicate this clearly in the disclaimer and set numeric fields to 0.
Example: If converting 100 USD to EUR and 1 USD = 0.92 EUR, then convertedAmount is 92 and exchangeRate is 0.92.
If unable to find a rate for a specific pair, state that in the aiDisclaimer and return 0 for convertedAmount and exchangeRate.
Supported currencies should include at least: TTD, USD, EUR, GBP, CAD, JMD, BBD.
Do not invent rates. If a rate is not generally available in your knowledge, state that.
`,
});

const getExchangeRateFlow = ai.defineFlow(
  {
    name: 'getExchangeRateFlow',
    inputSchema: GetExchangeRateInputSchema,
    outputSchema: GetExchangeRateOutputSchema,
  },
  async (input) => {
    const { output } = await getExchangeRatePrompt(input);
    if (!output) {
      // This case should ideally be handled by Gemini returning an error structure,
      // but as a fallback:
      return {
        convertedAmount: 0,
        exchangeRate: 0,
        aiDisclaimer: 'Failed to retrieve exchange rate information from the AI.',
      };
    }
     // Ensure a default disclaimer if AI fails to provide one, especially on error or no rate
    if (!output.aiDisclaimer) {
      output.aiDisclaimer = "Rate is indicative and subject to change. Verify with financial institutions.";
    }
    return output;
  }
);

export async function getExchangeRate(input: GetExchangeRateInput): Promise<GetExchangeRateOutput> {
  return getExchangeRateFlow(input);
}
    
