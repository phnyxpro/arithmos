// src/ai/schemas/mortgage-schemas.ts
import { z } from 'genkit';

// Schema definition for a single mortgage rate entry
export const MortgageRateInfoSchema = z.object({
  institution: z.string().describe('The name of the financial institution.'),
  rateRange: z.string().describe('The indicative mortgage interest rate range (e.g., "3.00% - 5.50%"). Include the % symbol.'),
  notes: z.string().optional().describe('Any brief, important notes or disclaimers for the rate (e.g., "Subject to credit approval", "Promotional rate", "Variable rate").'),
});
export type MortgageRateInfo = z.infer<typeof MortgageRateInfoSchema>;

// Schema definition for the output of the flow
export const IndicativeMortgageRatesOutputSchema = z.object({
  rates: z.array(MortgageRateInfoSchema).describe('A list of indicative mortgage rates from various institutions. Aim for 3-5 major institutions.'),
  aiDisclaimer: z.string().default("These rates are indicative, based on generally available information, and subject to change without notice. Please verify directly with financial institutions for the most current and precise details.").describe('A general disclaimer stating that these rates are indicative, subject to change, and users should verify with institutions.'),
});
export type IndicativeMortgageRatesOutput = z.infer<typeof IndicativeMortgageRatesOutputSchema>;
