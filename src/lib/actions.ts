"use server";

import { suggestDeductions, type SuggestDeductionsInput, type SuggestDeductionsOutput } from "@/ai/flows/suggest-deductions";
import { askArithmos } from "@/ai/flows/ask-arithmos-flow";
// import { summarizeIncome, type SummarizeIncomeInput, type SummarizeIncomeOutput } from "@/ai/flows/summarize-income";

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
    const result = await askArithmos(question);
    return result;
  } catch (error) {
    console.error("Error in handleAskArithmos server action:", error);
    throw new Error("Failed to get response from Arithmos AI.");
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
