
import { config } from 'dotenv';
config();

import '@/ai/flows/ask-arithmos-flow.ts'; // Corrected import filename
import '@/ai/flows/suggest-deductions.ts';
import '@/ai/flows/summarize-income.ts';
import '@/ai/flows/get-mortgage-rates-flow.ts';
import '@/ai/flows/get-exchange-rate-flow.ts';
import '@/ai/flows/get-popular-exchange-rates-flow.ts';
import '@/ai/flows/get-historical-exchange-rate-markers-flow.ts';
