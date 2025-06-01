import { configureGenkit, definePrompt, defineFlow } from 'genkit';
import { firebasePlugin } from '@genkit-ai/firebase';
import { googleAIPlugin } from '@genkit-ai/googleai';

// Configure Genkit plugins
configureGenkit({
  plugins: [
    firebasePlugin(),
    googleAIPlugin()
  ],
  logLevel: 'debug',
});

// Prompt definition for Arithmos AI
const askArithmosPrompt = definePrompt(
  {
    name: 'askArithmosPrompt',
    inputSchema: 'string', // Schema validation for the prompt input
  },
  async (question: string) => ({
    messages: [
      {
        role: 'user',
        content: `You are Arithmos AI, a helpful assistant specializing in accounts, finance, business, tax, and legal topics relevant to Trinidad and Tobago.

Provide concise and accurate answers based on your knowledge. If you don't know the answer, or if the question is outside your domain (T&T finance, tax, business, legal), politely state that you cannot answer that specific question.

Avoid giving personal financial or legal advice.

The user is asking:

${question}`
      }
    ],
    config: { temperature: 0.3 }
  })
);

// Flow definition for askArithmos
const askArithmosFlow = defineFlow(
  {
    name: 'askArithmosFlow',
    inputSchema: 'string',
    outputSchema: 'string',
  },
  async (question: string) => {
    const response = await askArithmosPrompt({ input: question });
    const output = response.text?.();
    return output ?? "I'm sorry, I couldn't generate a response.";
  }
);

// Exported function to be used in Firebase callable or internal logic
export async function askArithmos(question: string): Promise<string> {
  return await askArithmosFlow(question);
}
