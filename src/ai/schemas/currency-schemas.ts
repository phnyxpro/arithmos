
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

