
"use server";

import { suggestDeductions, type SuggestDeductionsInput, type SuggestDeductionsOutput } from "@/ai/flows/suggest-deductions";
// import { summarizeIncome, type SummarizeIncomeInput, type SummarizeIncomeOutput } from "@/ai/flows/summarize-income";

// Import Firebase client SDK
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp, getApps, getApp } from "firebase/app"; // Added getApps, getApp

// Firebase client-side configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  //measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (ensure it's only initialized once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const functions = getFunctions(app);

export async function handleSuggestDeductions(input: SuggestDeductionsInput): Promise<SuggestDeductionsOutput> {
  try {
    const result = await suggestDeductions(input);
    return result;
  } catch (error) {
    console.error("Error in handleSuggestDeductions server action:", error);
    // Consider more specific error handling or re-throwing a custom error
    throw new Error("Failed to get AI deduction suggestions.");
  }
}

export async function handleAskArithmos(question: string): Promise<string> {
  try {
    // Call the Firebase Function, prefixed with the codebase name
    const askArithmosFunction = httpsCallable<{ question: string }, string>(functions, 'arithmos-askArithmosFlow');
    const result = await askArithmosFunction({ question });
    return result.data; // The response is in the 'data' property
  } catch (error: any) {
    console.error("Error in handleAskArithmos server action:", error);
    // Check if the error is a Firebase Functions error
    if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
      console.error(`Firebase Function Error: ${error.code} - ${error.message}`);
       throw new Error(`Failed to get response from Arithmos AI: ${error.message}`);
    } else {
       throw new Error("Failed to get response from Arithmos AI.");
    }
  }
}

/*
// Example for summarizeIncome if needed later
export async function handleSummarizeIncome(input: SummarizeIncomeInput): Promise<SummarizeIncomeOutput> {
  try {
    const result = await summarizeIncome(input);
    return result;
  } catch (error) {
    console.error("Error in handleSummarizeIncome server action:", error);
    throw new Error("Failed to summarize income statement.");
  }
}
*/
