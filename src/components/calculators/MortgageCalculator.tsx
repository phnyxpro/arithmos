
// src/components/calculators/MortgageCalculator.tsx
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Home as HomeIcon, DollarSign, Percent as PercentIcon, CalendarDays, Calculator, Copy, Trash2, Landmark, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getIndicativeMortgageRates, type MortgageRateInfo } from '@/ai/flows/get-mortgage-rates-flow';
import { Skeleton } from '@/components/ui/skeleton';


const initialCalculationResults = {
  loanAmountDisplay: "0.00",
  monthlyPaymentDisplay: "0.00",
  totalInterestPaidDisplay: "0.00",
  totalCostDisplay: "0.00",
};

export default function MortgageCalculator() {
  const { toast } = useToast();

  const [propertyPrice, setPropertyPrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [downPaymentType, setDownPaymentType] = useState<"amount" | "percent">("amount");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("25"); 

  const [calculationResults, setCalculationResults] = useState(initialCalculationResults);

  const [fetchedBankRates, setFetchedBankRates] = useState<MortgageRateInfo[] | null>(null);
  const [isFetchingRates, setIsFetchingRates] = useState<boolean>(false);
  const [fetchRatesError, setFetchRatesError] = useState<string | null>(null);
  const [aiDisclaimer, setAiDisclaimer] = useState<string>("");

  const formatCurrency = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const parseNum = (val: string) => parseFloat(val) || 0;

  const fetchMortgageRatesFromAI = useCallback(async () => {
    setIsFetchingRates(true);
    setFetchRatesError(null);
    setFetchedBankRates(null); // Clear previous rates
    try {
      const result = await getIndicativeMortgageRates();
      if (result && result.rates) {
        setFetchedBankRates(result.rates);
        setAiDisclaimer(result.aiDisclaimer || "Rates are indicative. Verify with institutions.");
      } else {
        setFetchRatesError("AI did not return rates in the expected format.");
         setAiDisclaimer("Could not fetch current indicative rates. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching mortgage rates:", error);
      setFetchRatesError("Failed to fetch indicative mortgage rates. Please try again.");
      setAiDisclaimer("Could not fetch current indicative rates. Please try again later.");
    } finally {
      setIsFetchingRates(false);
    }
  }, []);

  useEffect(() => {
    fetchMortgageRatesFromAI();
  }, [fetchMortgageRatesFromAI]);


  const handleCalculateMortgage = useCallback(() => {
    const numPropertyPrice = parseNum(propertyPrice);
    let numActualDownPayment = parseNum(downPayment);

    if (numPropertyPrice <= 0) {
      setCalculationResults(initialCalculationResults);
      return;
    }

    if (downPaymentType === "percent") {
      numActualDownPayment = numPropertyPrice * (parseNum(downPayment) / 100);
    }
    
    if (numActualDownPayment > numPropertyPrice) {
        toast({
            title: "Warning",
            description: "Down payment cannot exceed property price. Loan amount will be zero.",
            variant: "default"
        });
         setCalculationResults({
            loanAmountDisplay: formatCurrency(0),
            monthlyPaymentDisplay: formatCurrency(0),
            totalInterestPaidDisplay: formatCurrency(0),
            totalCostDisplay: formatCurrency(numPropertyPrice), // Total cost is just the property price
        });
        return;
    }
    
    const numLoanAmount = Math.max(0, numPropertyPrice - numActualDownPayment);
    const numAnnualInterestRate = parseNum(interestRate);
    const numLoanTermYears = parseNum(loanTerm);

    if (numLoanAmount === 0) {
         setCalculationResults({
            loanAmountDisplay: formatCurrency(0),
            monthlyPaymentDisplay: formatCurrency(0),
            totalInterestPaidDisplay: formatCurrency(0),
            totalCostDisplay: formatCurrency(numPropertyPrice), 
        });
        return;
    }
    
    if (numAnnualInterestRate <= 0 || numLoanTermYears <= 0) {
      setCalculationResults(prev => ({ 
        ...initialCalculationResults, 
        loanAmountDisplay: formatCurrency(numLoanAmount),
        totalCostDisplay: formatCurrency(numLoanAmount), // If no interest/term, total cost is loan amount
      }));
      return;
    }

    const monthlyInterestRate = numAnnualInterestRate / 100 / 12;
    const numberOfPayments = numLoanTermYears * 12;

    let monthlyPayment = 0;
    if (monthlyInterestRate > 0) {
        monthlyPayment = numLoanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else { 
        monthlyPayment = numberOfPayments > 0 ? numLoanAmount / numberOfPayments : 0;
    }
    
    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - numLoanAmount;

    setCalculationResults({
      loanAmountDisplay: formatCurrency(numLoanAmount),
      monthlyPaymentDisplay: formatCurrency(monthlyPayment),
      totalInterestPaidDisplay: formatCurrency(totalInterest),
      totalCostDisplay: formatCurrency(numLoanAmount + totalInterest),
    });

  }, [propertyPrice, downPayment, downPaymentType, interestRate, loanTerm, toast]);
  
  useEffect(() => {
    if (propertyPrice || downPayment || interestRate || loanTerm) { // Calculate if any relevant input has a value
      handleCalculateMortgage();
    } else {
      setCalculationResults(initialCalculationResults);
    }
  }, [propertyPrice, downPayment, downPaymentType, interestRate, loanTerm, handleCalculateMortgage]);


  const handleClearFields = () => {
    setPropertyPrice("");
    setDownPayment("");
    setDownPaymentType("amount");
    setInterestRate("");
    setLoanTerm("25");
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Mortgage calculator inputs reset." });
  };

  const handleCopyResults = () => {
    if (calculationResults.monthlyPaymentDisplay === "0.00" && calculationResults.loanAmountDisplay === "0.00") {
        toast({ title: "No Results to Copy", description: "Please calculate mortgage first.", variant: "default"});
        return;
    }
    const textToCopy = `
Mortgage Calculation Summary
---------------------------------
Inputs:
Property Price: TT$ ${formatCurrency(parseNum(propertyPrice))}
Down Payment: ${downPaymentType === 'amount' ? 'TT$ ' : ''}${downPayment}${downPaymentType === 'percent' ? '%' : ''}
Annual Interest Rate: ${interestRate}%
Loan Term: ${loanTerm} years
---------------------------------
Results:
Loan Amount: TT$ ${calculationResults.loanAmountDisplay}
Estimated Monthly Payment (P&I): TT$ ${calculationResults.monthlyPaymentDisplay}
Total Interest Paid: TT$ ${calculationResults.totalInterestPaidDisplay}
Total Cost of Mortgage (Loan Amount + Interest): TT$ ${calculationResults.totalCostDisplay}
---------------------------------
Disclaimer: This is an estimate. Does not include property taxes, insurance (PITI), or other fees.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Mortgage details copied." });
  };

  return (
    <div className="py-4 w-full">
      <Card className="border-none shadow-none">
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="propertyPriceMortgage" className="flex items-center text-sm">
                <HomeIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Property Price (TTD)
              </Label>
              <Input
                id="propertyPriceMortgage" type="number" step="0.01" placeholder="e.g., 1500000"
                value={propertyPrice} onChange={(e) => setPropertyPrice(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="loanTermMortgage" className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Loan Term (Years)
              </Label>
              <Input
                id="loanTermMortgage" type="number" step="1" placeholder="e.g., 25"
                value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1">
              <Label htmlFor="downPaymentMortgage" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Down Payment
              </Label>
              <Input
                id="downPaymentMortgage" type="number" step="0.01" 
                placeholder={downPaymentType === 'amount' ? "e.g., 150000" : "e.g., 10 for 10%"}
                value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="downPaymentTypeMortgage" className="text-sm sr-only">Down Payment Type</Label>
              <Select value={downPaymentType} onValueChange={(value: "amount" | "percent") => setDownPaymentType(value)}>
                <SelectTrigger id="downPaymentTypeMortgage" className="h-9 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount (TTD)</SelectItem>
                  <SelectItem value="percent">Percent (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="interestRateMortgage" className="flex items-center text-sm">
              <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Annual Interest Rate (%)
            </Label>
            <Input
              id="interestRateMortgage" type="number" step="0.01" placeholder="e.g., 3.5"
              value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {(calculationResults.monthlyPaymentDisplay !== "0.00" || calculationResults.loanAmountDisplay !== "0.00") && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   <Calculator className="mr-2 h-4 w-4" /> Mortgage Estimate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between"><span>Loan Amount:</span> <strong>TT$ {calculationResults.loanAmountDisplay}</strong></div>
                <Separator className="my-1.5" />
                <div className="flex justify-between font-semibold text-sm"><span>Monthly Payment (P&I):</span> <strong className="text-primary">TT$ {calculationResults.monthlyPaymentDisplay}</strong></div>
                <Separator className="my-1.5" />
                <div className="flex justify-between"><span>Total Interest Paid:</span> <strong>TT$ {calculationResults.totalInterestPaidDisplay}</strong></div>
                <div className="flex justify-between"><span>Total Cost of Mortgage (Loan + Interest):</span> <strong>TT$ {calculationResults.totalCostDisplay}</strong></div>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 mt-6 p-0">
          <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
            <Copy className="mr-2 h-4 w-4" /> Copy Results
          </Button>
          <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
          </Button>
        </CardFooter>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Disclaimer: This estimate calculates Principal & Interest (P&I) only. It does not include property taxes, insurance (often part of PITI), or other potential closing costs and fees. Rates are for illustrative purposes.
        </p>
      </Card>

      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center justify-between">
            <div className="flex items-center">
              <Landmark className="mr-2 h-5 w-5" /> Indicative Mortgage Rates
            </div>
            <Button variant="outline" size="sm" onClick={fetchMortgageRatesFromAI} disabled={isFetchingRates}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetchingRates ? 'animate-spin' : ''}`} />
              {isFetchingRates ? 'Refreshing...' : 'Refresh Rates'}
            </Button>
          </CardTitle>
          <CardDescription>
            The rates below are indicative and obtained via AI. Please contact financial institutions directly for current rates and terms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isFetchingRates && (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
          {fetchRatesError && !isFetchingRates && (
            <div className="text-destructive p-3 border border-destructive/50 rounded-md flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" /> {fetchRatesError}
            </div>
          )}
          {!isFetchingRates && !fetchRatesError && fetchedBankRates && fetchedBankRates.length > 0 && (
            fetchedBankRates.map((bank, index) => (
              <div key={index} className="p-3 border rounded-md bg-muted/30">
                <h4 className="font-semibold text-sm text-foreground">{bank.institution}</h4>
                <p className="text-xs text-primary">Indicative Rate Range: {bank.rateRange}</p>
                {bank.notes && <p className="text-xs text-muted-foreground mt-0.5">{bank.notes}</p>}
              </div>
            ))
          )}
           {!isFetchingRates && !fetchRatesError && fetchedBankRates && fetchedBankRates.length === 0 && (
            <p className="text-sm text-muted-foreground">No indicative rates were returned by the AI at this time. You can try refreshing.</p>
           )}
          <p className="text-xs text-muted-foreground pt-2 font-semibold">AI Disclaimer: {aiDisclaimer || "Rates are indicative. Verify with institutions."}</p>
          <p className="text-xs text-muted-foreground pt-1">*Our Disclaimer: The rates provided by the AI are for informational purposes only, are not guaranteed to be accurate or current, and are subject to change based on market conditions, individual credit profiles, loan-to-value ratios, and specific bank policies. Always verify directly with the financial institution.</p>
        </CardContent>
      </Card>
    </div>
  );
}
