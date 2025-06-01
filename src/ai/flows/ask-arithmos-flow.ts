import { configureGenkit, defineFlow, definePrompt } from "@genkit-ai/core";
import { firebasePlugin } from "@genkit-ai/firebase";
import { googleAIPlugin } from "@genkit-ai/googleai";

configureGenkit({
  plugins: [
    firebasePlugin(),
    googleAIPlugin(),
  ],
  logLevel: "debug",
});

const askArithmosPrompt = definePrompt(
  {
    name: "askArithmosPrompt",
    inputSchema: "string",
  },
  async (question: string) => ({
    messages: [
      {
        role: "user",
        content: `You are Arithmos AI, a helpful assistant specializing in accounts, finance, ` +
                 `business, tax, and legal topics relevant to Trinidad and Tobago. ` +
                 `Provide concise and accurate answers based on your knowledge. ` +
                 `If you don't know the answer, or if the question is outside your domain ` +
                 `(T&T finance, tax, business, legal), politely state that you cannot ` +
                 `answer that specific question. Avoid giving personal financial or ` +
                 `legal advice. The user is asking:

${question}`,
      },
    ],
    config: { temperature: 0.3 },
  }),
);

const askArithmosFlow = defineFlow(
  {
    name: "askArithmosFlow", // Reverted flow name to match frontend
    inputSchema: "string",
    outputSchema: "string",
  },
  async (question: string) => {
    const response = await askArithmosPrompt({ input: question });
    return response.text() ?? "I couldn't generate a response.";
  },
);

/**
 * Calls the Arithmos flow to answer a question.
 * @param {string} question - The question to ask.
 * @return {Promise<string>} The AI's response.
 */
export async function askArithmos(question: string): Promise<string> {
  return askArithmosFlow(question);
}
