import type { TaxFormData } from '@/types';

// Simplified tax rates and standard deductions (examples, not real tax code)
const TAX_RATE = 0.15; // Flat 15% for simplicity
const STANDARD_DEDUCTION_SINGLE = 13850;
const STANDARD_DEDUCTION_MFJ = 27700;
const STANDARD_DEDUCTION_HOH = 20800;


export function calculateSimplifiedTax(formData: TaxFormData) {
  const { personalInfo, income, expenses } = formData;

  const totalIncome = 
    (income.wages || 0) +
    (income.interestIncome || 0) +
    (income.dividendIncome || 0) +
    (income.otherIncome || 0);

  let standardDeduction = STANDARD_DEDUCTION_SINGLE; // Default
  if (personalInfo.filingStatus === 'married_filing_jointly' || personalInfo.filingStatus === 'widow') {
    standardDeduction = STANDARD_DEDUCTION_MFJ;
  } else if (personalInfo.filingStatus === 'head_of_household') {
    standardDeduction = STANDARD_DEDUCTION_HOH;
  }
  // married_filing_separately also often uses single, but can be complex. Simplified here.


  // For this simplified version, we'll sum up explicitly entered deductions.
  // A real system would compare itemized vs standard deduction and pick the greater.
  // Here, we'll assume user might itemize if they entered values.
  // For simplicity, we just sum what's entered. A more robust version would use standard deduction if itemized is lower.
  const totalEnteredDeductions = (expenses.medicalExpenses || 0) + (expenses.charitableContributions || 0);
  
  // Using standard deduction for this simplified calculation logic
  // A more complex logic would compare itemized vs standard and pick the larger.
  // For this demo, let's just use the standard deduction based on filing status.
  // The AI part is for suggesting *potential* itemized deductions, not for calculation itself in this simplified setup.
  const effectiveDeduction = standardDeduction;


  const taxableIncome = Math.max(0, totalIncome - effectiveDeduction);
  const taxDue = taxableIncome * TAX_RATE;

  return {
    totalIncome,
    standardDeduction,
    totalEnteredDeductions, // For display purposes
    effectiveDeduction, // The deduction amount actually used
    taxableIncome,
    taxDue,
  };
}
