/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Import the askArithmos flow and wrap it in a callable function
import { askArithmos } from "./ai/flows/ask-arithmos-flow";
import { onCall } from "firebase-functions/v2/https";

export const askArithmosFlow = onCall<{ question: string }, string>(async (request) => {
  // Ensure the request data contains the question
  if (!request.data || typeof request.data.question !== 'string') {
    // Use standard Error with code for callable functions errors
    throw new Error('INVALID_ARGUMENT: Missing or invalid question parameter.');
  }

  const question = request.data.question;

  try {
    const answer = await askArithmos(question);
    return answer; // Callable functions return the data directly
  } catch (error) {
    console.error("Error in askArithmosFlow callable function:", error);
    // Re-throw the error as a callable functions error with appropriate code
    if (error instanceof Error) {
       throw new Error(`INTERNAL: Error processing request: ${error.message}`);
    } else {
       throw new Error('INTERNAL: An unknown error occurred.');
    }
  }
});
