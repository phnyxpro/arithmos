import { askArithmos } from "./ai/flows/ask-arithmos-flow";
import { onCall } from "firebase-functions/v2/https";
import type { CallableRequest } from "firebase-functions/v2/https";

export const askArithmosFlow = onCall<{ question: string }, string>(
  async (request: CallableRequest<{ question: string }>): Promise<string> => {
    const question = request.data.question;

    if (!question || typeof question !== 'string') {
      throw new Error('INVALID_ARGUMENT: Missing or invalid question.');
    }

    try {
      const answer = await askArithmos(question);
      return answer;
    } catch (error) {
      console.error("Error in askArithmosFlow:", error);
      throw new Error('INTERNAL: Something went wrong while processing your request.');
    }
  }
);
