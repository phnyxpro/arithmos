import { enableFirebaseTelemetry } from "@genkit-ai/firebase";
import { askArithmos } from "./ai/flows/ask-arithmos-flow";
import { onCall } from "firebase-functions/v1/https"; // 🔄 switched from v2 to v1
import type { CallableRequest } from "firebase-functions/v1/https";

enableFirebaseTelemetry();

/**
 * Callable function for Arithmos AI.
 * @param {CallableRequest<{ question: string }>} request - The incoming function request.
 * @return {Promise<string>} The AI's response.
 */
export const askArithmosFlow = onCall(
  async (request: CallableRequest<{ question: string }>): Promise<string> => {
    const question = request.data.question;

    if (!question || typeof question !== "string") {
      throw new Error("INVALID_ARGUMENT: Missing or invalid question.");
    }

    const answer = await askArithmos(question);
    return answer;
  },
);
