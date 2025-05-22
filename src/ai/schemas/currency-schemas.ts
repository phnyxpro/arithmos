
// src/ai/schemas/currency-schemas.ts
import { z } from 'genkit';

export const GetExchangeRateInputSchema = z.object({
  amount: z.number().positive('Amount must be positive.'),
  fromCurrencyCode: z.string().length(3, 'From currency code must be 3 characters.'),
  toCurrencyCode: z.string().length(3, 'To currency code must be 3 characters.'),
});
export type GetExchangeRateInput = z.infer<typeof GetExchangeRateInputSchema>;

export const GetExchangeRateOutputSchema = z.object({
  convertedAmount: z.number().describe('The converted amount in the target currency.'),
  exchangeRate: z.number().describe('The exchange rate used for the conversion (1 unit of fromCurrency to toCurrency).'),
  aiDisclaimer: z.string().optional().describe('Disclaimer from the AI about the indicative nature of the rate.'),
});
export type GetExchangeRateOutput = z.infer<typeof GetExchangeRateOutputSchema>;


// Schemas for Popular Exchange Rates Flow
export const PopularRateSchema = z.object({
    targetCurrencyCode: z.string().length(3).describe("The 3-letter code of the target currency (e.g., USD)."),
    targetCurrencyName: z.string().describe("The full name of the target currency (e.g., United States Dollar)."),
    rateAgainstBase: z.number().describe("The exchange rate: 1 unit of base currency = X units of target currency."),
});
export type PopularRate = z.infer<typeof PopularRateSchema>;

export const GetPopularExchangeRatesInputSchema = z.object({
  baseCurrencyCode: z.string().length(3, 'Base currency code must be 3 characters.'),
});
export type GetPopularExchangeRatesInput = z.infer<typeof GetPopularExchangeRatesInputSchema>;

export const GetPopularExchangeRatesOutputSchema = z.object({
  rates: z.array(PopularRateSchema).describe("A list of exchange rates for the base currency against popular target currencies."),
  aiDisclaimer: z.string().optional().describe('Disclaimer from the AI about the indicative nature of the rates.'),
});
export type GetPopularExchangeRatesOutput = z.infer<typeof GetPopularExchangeRatesOutputSchema>;

// Schemas for Historical Exchange Rate Markers Flow
export const HistoricalRateMarkerSchema = z.object({
  date: z.string().describe("The approximate date of the rate marker in YYYY-MM-DD format (e.g., \"2023-01-15\")."),
  usdRate: z.number().optional().describe("Rate for USD, if requested: 1 unit of base currency = X USD."),
  eurRate: z.number().optional().describe("Rate for EUR, if requested: 1 unit of base currency = X EUR."),
  gbpRate: z.number().optional().describe("Rate for GBP, if requested: 1 unit of base currency = X GBP."),
  cadRate: z.number().optional().describe("Rate for CAD, if requested: 1 unit of base currency = X CAD."),
  audRate: z.number().optional().describe("Rate for AUD, if requested: 1 unit of base currency = X AUD."),
  // Add other common currencies if frequently needed, or keep the prompt flexible.
});
export type HistoricalRateMarker = z.infer<typeof HistoricalRateMarkerSchema>;

export const GetHistoricalExchangeRateMarkersInputSchema = z.object({
  baseCurrency: z.string().length(3, 'Base currency code must be 3 characters.'),
  targetCurrencies: z.array(z.string().length(3)).min(1, "At least one target currency is required (e.g., USD, EUR, GBP, CAD, AUD)."),
  numberOfYears: z.number().int().min(1).max(10).describe("Number of years back to get markers for."),
});
export type GetHistoricalExchangeRateMarkersInput = z.infer<typeof GetHistoricalExchangeRateMarkersInputSchema>;

export const GetHistoricalExchangeRateMarkersOutputSchema = z.object({
  markers: z.array(HistoricalRateMarkerSchema).describe("A list of historical exchange rate markers, with rates as direct properties like usdRate, eurRate, gbpRate, cadRate, audRate."),
  aiDisclaimer: z.string().optional().describe('Disclaimer from the AI about the indicative and approximate nature of the historical data.'),
});
export type GetHistoricalExchangeRateMarkersOutput = z.infer<typeof GetHistoricalExchangeRateMarkersOutputSchema>;

