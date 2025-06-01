import * as genkit from 'genkit';
import { firebase } from '@genkit-ai/firebase/plugin';
import { googleAI } from '@genkit-ai/googleai';

genkit.configureGenkit({
  plugins: [
    firebase(),
    googleAI(), // Removed projectId here
  ],
  logLevel: 'debug',
  // tfjsDeps:
});

// Define the prompt for the AI model
const askArithmosPrompt = genkit.definePrompt(
  {
    name: 'askArithmosPrompt',
    input: 'string',
  },
  async (question: string) => ({ // Added type annotation
    messages: [{
      role: 'user',
      content: `You are Arithmos AI, a helpful assistant specializing in accounts, finance, business, tax, and legal topics relevant to Trinidad and Tobago. Provide concise and accurate answers based on your knowledge. If you don't know the answer, or if the question is outside your domain (T&T finance, tax, business, legal), politely state that you cannot answer that specific question. Avoid giving personal financial or legal advice. The user is asking:

${question}`,
    }],
    config: { temperature: 0.3 },
  })
);

// Define the Genkit flow
const askArithmosFlow = genkit.defineFlow(
  {
    name: 'askArithmosFlow',
    input: 'string',
    output: 'string',
  },
  async (question: string) => { // Added type annotation
    const response = await askArithmosPrompt({ input: question });
    return response.text() ?? "I couldn't generate a response.";
  }
);

// Exported async function that invokes the flow
export async function askArithmos(question: string): Promise<string> {
  return askArithmosFlow(question);
}
