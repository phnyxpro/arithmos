
'use server';
/**
 * @fileOverview A Genkit flow to answer user questions about Arithmos.
 * - askArithmos - The primary function to interact with the AI.
 * - AskArithmosInputSchema - Zod schema for the input type.
 * - AskArithmosOutputSchema - Zod schema for the output type.
 * - AskArithmosInput - TypeScript type for the input.
 * - AskArithmosOutput - TypeScript type for the output.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const AskArithmosInputSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be empty." }).describe('The user question for Arithmos AI.'),
});
export type AskArithmosInput = z.infer<typeof AskArithmosInputSchema>;

export const AskArithmosOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question.'),
});
export type AskArithmosOutput = z.infer<typeof AskArithmosOutputSchema>;

const arithmosSystemPrompt = `You are Arithmos, a helpful AI assistant specializing in Trinidad and Tobago finance, tax, business regulations, and the features of the Arithmos application itself.
Your primary goal is to provide accurate, concise, and easy-to-understand information.
If a question is outside your expertise or available information, clearly state that you cannot provide an answer rather than speculating.
When discussing Arithmos app features, refer to calculators by their common names (e.g., "VAT Calculator", "PAYE, NIS & HS Payroll Calculator").
Be friendly and professional.`;

const askArithmosGenkitPrompt = ai.definePrompt({
  name: 'askArithmosGenkitPrompt',
  input: { schema: AskArithmosInputSchema },
  output: { schema: AskArithmosOutputSchema },
  system: arithmosSystemPrompt,
  prompt: `The user has the following question: {{{question}}}

Please provide a helpful answer.`,
  config: { temperature: 0.5 }, // Adjusted temperature for a balance of creativity and factualness
});

const askArithmosGenkitFlow = ai.defineFlow(
  {
    name: 'askArithmosGenkitFlow',
    inputSchema: AskArithmosInputSchema,
    outputSchema: AskArithmosOutputSchema,
  },
  async (input) => {
    const { output } = await askArithmosGenkitPrompt(input);
    if (!output) {
      // This case should ideally be handled if Gemini fails to produce output adhering to the schema.
      return { answer: "I couldn't generate a response at this time. Please try rephrasing your question or ask something else." };
    }
    return output;
  }
);

export async function askArithmos(input: AskArithmosInput): Promise<AskArithmosOutput> {
  return askArithmosGenkitFlow(input);
}
