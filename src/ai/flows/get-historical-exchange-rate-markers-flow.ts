
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
  HistoricalRateMarkerSchema,
} from '@/ai/schemas/currency-schemas';

export type { GetHistoricalExchangeRateMarkersInput, GetHistoricalExchangeRateMarkersOutput, HistoricalRateMarker } from '@/ai/schemas/currency-schemas';

const getHistoricalMarkersPrompt = ai.definePrompt({
  name: 'getHistoricalMarkersPrompt',
  input: { schema: GetHistoricalExchangeRateMarkersInputSchema },
  output: { schema: GetHistoricalExchangeRateMarkersOutputSchema },
  prompt: `You are a financial data assistant.
Please provide indicative historical exchange rate markers for {{baseCurrency}} against the following target currencies: {{#each targetCurrencies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
Provide these markers for approximately the start of each year, going back for the last {{numberOfYears}} years from the current year.
For example, if it's early 2025 and {{numberOfYears}} is 3, provide markers for early 2025, early 2024, and early 2023.
The date should be in YYYY-MM-DD format (e.g., "2023-01-15" for early January 2023).
For each date marker, provide the exchange rates as "1 unit of {{baseCurrency}} = X units of target currency".

Return the data as a list of objects, each conforming to the HistoricalRateMarker schema.
Include a general disclaimer that these rates are indicative, AI-generated estimates for illustrative purposes only, not precise historical financial data, and subject to limitations of AI knowledge.
If data for a specific currency or year is unavailable, omit it from the results or use a reasonable placeholder like 0 if the schema requires it, and note the limitation in the disclaimer.
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
