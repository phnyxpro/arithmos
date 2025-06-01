import { configureGenkit, defineFlow, definePrompt } from 'genkit';
import { firebasePlugin } from '@genkit-ai/firebase';
import { googleAIPlugin } from '@genkit-ai/googleai';

configureGenkit({
  plugins: [
    firebasePlugin(),
    googleAIPlugin(),
  ],
  logLevel: 'debug',
});

const askArithmosPrompt = definePrompt(
  {
    name: 'askArithmosPrompt',
    inputSchema: 'string',
  },
  async (question: string) => ({
    messages: [{
      role: 'user',
      content: `You are Arithmos AI... ${question}`,
    }],
    config: { temperature: 0.3 },
  })
);

const askArithmosFlow = defineFlow(
  {
    name: 'askArithmosFlow',
    inputSchema: 'string',
    outputSchema: 'string',
  },
  async (question: string) => {
    const response = await askArithmosPrompt({ input: question });
    return response.text() ?? "I couldn't generate a response.";
  }
);

/**
 * Calls the Arithmos flow to answer a question.
 * @param {string} question - The question to ask.
 * @returns {Promise<string>} The AI's response.
 */
export async function askArithmos(question: string): Promise<string> {
  return askArithmosFlow(question);
}
