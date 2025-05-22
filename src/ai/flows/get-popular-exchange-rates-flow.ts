
// src/ai/flows/get-popular-exchange-rates-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow to fetch indicative exchange rates for a base currency against popular currencies.
 *
 * - getPopularExchangeRates - A function that queries an AI for popular exchange rates.
 * - GetPopularExchangeRatesInput - The input type.
 * - GetPopularExchangeRatesOutput - The return type.
 */

import { ai } from '@/ai/genkit';
import { GetPopularExchangeRatesInputSchema, GetPopularExchangeRatesOutputSchema } from '@/ai/schemas/currency-schemas'; // Import from new schemas file
export type { GetPopularExchangeRatesInput, GetPopularExchangeRatesOutput, PopularRate } from '@/ai/schemas/currency-schemas'; // Re-export types

const getPopularRatesPrompt = ai.definePrompt({
  name: 'getPopularRatesPrompt',
  input: { schema: GetPopularExchangeRatesInputSchema },
  output: { schema: GetPopularExchangeRatesOutputSchema },
  prompt: `You are a helpful financial assistant.
Please provide current indicative exchange rates for {{baseCurrencyCode}} against the following popular currencies: USD, EUR, GBP, CAD.
For each target currency, provide:
1. The target currency code (e.g., "USD").
2. The full name of the target currency (e.g., "United States Dollar").
3. The exchange rate, expressed as how many units of the target currency are equivalent to 1 unit of the {{baseCurrencyCode}} (e.g., if {{baseCurrencyCode}} is TTD and target is USD, provide rate for 1 TTD = X USD).

Return the data as a list of objects, each object conforming to the PopularRate schema.
Include a general disclaimer that these rates are indicative, for informational purposes only, and subject to change.
If rates for some currencies are unavailable in your knowledge, omit them from the list and note this in the disclaimer.
`,
});

const getPopularExchangeRatesFlow = ai.defineFlow(
  {
    name: 'getPopularExchangeRatesFlow',
    inputSchema: GetPopularExchangeRatesInputSchema,
    outputSchema: GetPopularExchangeRatesOutputSchema,
  },
  async (input) => {
    const { output } = await getPopularRatesPrompt(input);
    if (!output) {
      return {
        rates: [],
        aiDisclaimer: 'Failed to retrieve popular exchange rate information from the AI.',
      };
    }
    // Ensure a default disclaimer if AI fails to provide one
    if (!output.aiDisclaimer) {
      output.aiDisclaimer = "Rates are indicative and subject to change. Verify with financial institutions.";
    }
    return output;
  }
);

export async function getPopularExchangeRates(input: GetPopularExchangeRatesInput): Promise<GetPopularExchangeRatesOutput> {
  return getPopularExchangeRatesFlow(input);
}
    
