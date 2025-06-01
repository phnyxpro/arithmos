import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { askArithmos } from './ai/flows/ask-arithmos-flow';
import { onCall } from 'firebase-functions/v2/https';
import type { CallableRequest } from 'firebase-functions/v2/https';

enableFirebaseTelemetry();

/**
 * Callable Cloud Function to invoke Arithmos AI.
 *
 * @param {CallableRequest<{ question: string }>} request - The callable function request with the user's question.
 * @returns {Promise<string>} The AI's answer.
 */
export const askArithmosFlow = onCall<{ question: string }, string>(
  async (request: CallableRequest<{ question: string }>): Promise<string> => {
    const question = request.data.question;

    if (!question || typeof question !== 'string') {
      throw new Error('INVALID_ARGUMENT: Missing or invalid question.');
    }

    const answer = await askArithmos(question);
    return answer;
  }
);
