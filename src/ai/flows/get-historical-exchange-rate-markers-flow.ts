
// src/ai/flows/get-historical-exchange-rate-markers-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow to fetch indicative historical exchange rate markers.
 *
 * - getHistoricalExchangeRateMarkers - A function that queries an AI for historical rate markers.
 * - GetHistoricalExchangeRateMarkersInput - The input type.
 * - GetHistoricalExchangeRateMarkersOutput - The return type.
 */

import { ai } from '@/ai/genkit';
import {
  GetHistoricalExchangeRateMarkersInputSchema,
  GetHistoricalExchangeRateMarkersOutputSchema,
} from '@/ai/schemas/currency-schemas';

// Re-export types for easier consumption by client components
export type { GetHistoricalExchangeRateMarkersInput, GetHistoricalExchangeRateMarkersOutput, HistoricalRateMarker } from '@/ai/schemas/currency-schemas';

const getHistoricalMarkersPrompt = ai.definePrompt({
  name: 'getHistoricalMarkersPrompt',
  input: { schema: GetHistoricalExchangeRateMarkersInputSchema },
  output: { schema: GetHistoricalExchangeRateMarkersOutputSchema },
  prompt: `You are a financial data assistant.
Please provide indicative historical exchange rate markers for {{baseCurrency}} against the target currencies: {{#each targetCurrencies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
Provide these markers for approximately the start of each year, going back for the last {{numberOfYears}} years from the current year.
For example, if it's early 2025 and {{numberOfYears}} is 3, provide markers for early 2025, early 2024, and early 2023.
The date for each marker should be in YYYY-MM-DD format (e.g., "2023-01-15" for early January 2023).

For each marker object, provide the exchange rates as direct properties. For example:
- If USD is a target currency, include a field "usdRate" with the value (1 {{baseCurrency}} = X USD).
- If EUR is a target, include "eurRate".
- If GBP is a target, include "gbpRate".
- If CAD is a target, include "cadRate".
- If AUD is a target, include "audRate".
If a rate for a specific target currency for a given year/marker is not available, omit that specific rate field (e.g., omit 'eurRate' if unavailable for that marker).

Example of a single marker in the 'markers' array:
{
  "date": "2023-01-10",
  "usdRate": 0.148,
  "eurRate": 0.135,
  "gbpRate": 0.120,
  "cadRate": 0.195,
  "audRate": 0.210
}

Return the data as a list of these marker objects.
Include a general disclaimer that these rates are indicative, AI-generated estimates for illustrative purposes only, not precise historical financial data, and subject to limitations of AI knowledge.
Do not invent precise daily rates; broad yearly markers are sufficient.
`,
});

const getHistoricalExchangeRateMarkersFlow = ai.defineFlow(
  {
    name: 'getHistoricalExchangeRateMarkersFlow',
    inputSchema: GetHistoricalExchangeRateMarkersInputSchema,
    outputSchema: GetHistoricalExchangeRateMarkersOutputSchema,
  },
  async (input) => {
    const { output } = await getHistoricalMarkersPrompt(input);
    if (!output) {
      return {
        markers: [],
        aiDisclaimer: 'Failed to retrieve historical exchange rate markers from the AI.',
      };
    }
    if (!output.aiDisclaimer) {
      output.aiDisclaimer = "Historical markers are AI-generated estimates, for illustrative purposes only, and not precise financial data.";
    }
    // Ensure dates are somewhat valid-looking if provided by AI, or filter out bad entries
    output.markers = output.markers.filter(marker => marker.date && /^\d{4}-\d{2}-\d{2}$/.test(marker.date));
    return output;
  }
);

export async function getHistoricalExchangeRateMarkers(input: GetHistoricalExchangeRateMarkersInput): Promise<GetHistoricalExchangeRateMarkersOutput> {
  return getHistoricalExchangeRateMarkersFlow(input);
}
