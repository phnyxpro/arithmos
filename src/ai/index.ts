
import { enableFirebaseTelemetry } from "@genkit-ai/firebase";
import { askArithmos, type AskArithmosInput, type AskArithmosOutput } from '@/ai/flows/ask-arithmos-flow'; // Correct import
import { onCall, HttpsError } from "firebase-functions/v1/https"; // Import HttpsError
import type { CallableRequest } from "firebase-functions/v1/https";

enableFirebaseTelemetry();

/**
 * Callable function for Arithmos AI.
 * @param {CallableRequest<{ question: string }>} request - The incoming function request.
 * @return {Promise<string>} The AI's response text.
 */
export const askArithmosFlow = onCall(
  async (request: CallableRequest<{ question: string }>): Promise<string> => { // Return type string for simple text response
    const question = request.data.question;

    if (!question || typeof question !== "string" || question.trim() === "") {
      throw new HttpsError("invalid-argument", "Missing or invalid question. Question must be a non-empty string.");
    }

    try {
      const input: AskArithmosInput = { question };
      const result: AskArithmosOutput = await askArithmos(input); // Call the Genkit flow
      return result.answer; // Return only the answer string
    } catch (error) {
      console.error("Error calling askArithmos Genkit flow:", error);
      if (error instanceof HttpsError) { // Re-throw HttpsError
          throw error;
      }
      // For other errors, throw a generic internal error
      throw new HttpsError("internal", "An unexpected error occurred while processing your request.");
    }
  }
);
