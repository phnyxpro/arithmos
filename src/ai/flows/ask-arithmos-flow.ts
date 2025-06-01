import { configureGenkit } from "@genkit-ai/core";
import { firebasePlugin } from "@genkit-ai/firebase";
import { googleAIPlugin } from "@genkit-ai/googleai";

configureGenkit({
  plugins: [firebasePlugin(), googleAIPlugin()],
  logLevel: "debug",
});

export const askArithmosPrompt = definePrompt(
  {
    name: "askArithmosPrompt", // must be exactly the name you reference
    inputSchema: "string",
  },
  async (question: string) => ({
    messages: [
      {
        role: "user",
        content: `... ${question}`,
      },
    ],
    config: { temperature: 0.3 },
  })
);

export const askArithmosFlow = defineFlow(
  {
    name: "askArithmosFlow",
    inputSchema: "string",
    outputSchema: "string",
  },
  async (question: string) => {
    const response = await askArithmosPrompt({ input: question });
    return response.text() ?? "I couldn't generate a response.";
  }
);
