
// src/components/calculators/CurrencyExchangeCalculator.tsx
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Coins, ArrowRightLeft, DollarSign, Info, Copy, Trash2, Loader2, AlertTriangle, RefreshCw, LineChart as LineChartIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getExchangeRate, type GetExchangeRateInput } from '@/ai/flows/get-exchange-rate-flow';
import { getPopularExchangeRates, type GetPopularExchangeRatesOutput, type PopularRate } from '@/ai/flows/get-popular-exchange-rates-flow';
import { getHistoricalExchangeRateMarkers, type GetHistoricalExchangeRateMarkersInput, type GetHistoricalExchangeRateMarkersOutput, type HistoricalRateMarker } from '@/ai/flows/get-historical-exchange-rate-markers-flow';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"; // Removed Tooltip, Legend from here as they are used via Chart components
import type { ChartConfig } from "@/components/ui/chart";


const currencyOptions = [
  { value: "TTD", label: "TTD - Trinidad & Tobago Dollar" },
  { value: "USD", label: "USD - United States Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound Sterling" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "JMD", label: "JMD - Jamaican Dollar" },
  { value: "BBD", label: "BBD - Barbadian Dollar" },
];

const initialConversionResults = {
  convertedAmountDisplay: "0.00",
  exchangeRateUsedDisplay: "N/A",
  conversionDisclaimer: "",
};

const chartConfig = {
  USD: { label: "USD", color: "hsl(var(--chart-1))" },
  EUR: { label: "EUR", color: "hsl(var(--chart-2))" },
  GBP: { label: "GBP", color: "hsl(var(--chart-3))" },
  CAD: { label: "CAD", color: "hsl(var(--chart-4))" }, // Added for consistency if needed
  JMD: { label: "JMD", color: "hsl(var(--chart-5))" }, // Added for consistency if needed
} satisfies ChartConfig;


export function CurrencyExchangeCalculator() {
  const { toast } = useToast();

  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("TTD");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  
  const [conversionResults, setConversionResults] = useState(initialConversionResults);
  const [isLoadingConversion, setIsLoadingConversion] = useState<boolean>(false);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const [popularRates, setPopularRates] = useState<PopularRate[] | null>(null);
  const [isLoadingPopularRates, setIsLoadingPopularRates] = useState<boolean>(false);
  const [popularRatesError, setPopularRatesError] = useState<string | null>(null);
  const [popularRatesDisclaimer, setPopularRatesDisclaimer] = useState<string>("");

  const [historicalMarkersData, setHistoricalMarkersData] = useState<GetHistoricalExchangeRateMarkersOutput['markers']>([]);
  const [isLoadingHistoricalData, setIsLoadingHistoricalData] = useState<boolean>(false);
  const [historicalDataError, setHistoricalDataError] = useState<string | null>(null);
  const [historicalDataDisclaimer, setHistoricalDataDisclaimer] = useState<string>("");


  const formatCurrency = (num: number) => {
    try {
        return num.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 4, 
        });
    } catch (e) {
        return num.toFixed(4);
    }
  };
  const parseNum = (val: string) => parseFloat(val) || 0;

  const handleConversion = useCallback(async () => {
    const numAmount = parseNum(amount);
    if (numAmount <= 0 || !fromCurrency || !toCurrency ) {
      setConversionResults(initialConversionResults);
      setConversionError(null);
      return;
    }
    if (fromCurrency === toCurrency) {
       setConversionResults({
          convertedAmountDisplay: formatCurrency(numAmount),
          exchangeRateUsedDisplay: `1 ${fromCurrency} = 1.0000 ${toCurrency}`,
          conversionDisclaimer: "Same currency selected.",
        });
        setConversionError(null);
      return;
    }

    setIsLoadingConversion(true);
    setConversionError(null);
    
    try {
      const input: GetExchangeRateInput = {
        amount: numAmount,
        fromCurrencyCode: fromCurrency,
        toCurrencyCode: toCurrency,
      };
      const result = await getExchangeRate(input);
      
      if (result && typeof result.convertedAmount === 'number' && typeof result.exchangeRate === 'number') {
        setConversionResults({
          convertedAmountDisplay: formatCurrency(result.convertedAmount),
          exchangeRateUsedDisplay: `1 ${fromCurrency} = ${result.exchangeRate.toFixed(4)} ${toCurrency}`,
          conversionDisclaimer: result.aiDisclaimer || "Rate is indicative. Verify with financial institutions.",
        });
      } else {
        throw new Error("AI did not return data in the expected format.");
      }
    } catch (error: any) {
      console.error("Error during conversion:", error);
      const errorMessage = error?.message?.includes("Unsupported currency") || error?.cause?.message?.includes("Unsupported currency") 
        ? "One of the selected currencies is not supported by the AI for conversion."
        : (error.message || "Failed to get exchange rate. Please try again.");
      setConversionError(errorMessage);
      setConversionResults(initialConversionResults);
    } finally {
      setIsLoadingConversion(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    const numAmount = parseNum(amount);
    if (numAmount > 0 && fromCurrency && toCurrency) {
      const timer = setTimeout(() => { 
        handleConversion();
      }, 500); 
      return () => clearTimeout(timer);
    } else {
      setConversionResults(initialConversionResults);
      setConversionError(null);
    }
  }, [amount, fromCurrency, toCurrency, handleConversion]);


  const fetchPopularRates = useCallback(async () => {
    setIsLoadingPopularRates(true);
    setPopularRatesError(null);
    setPopularRates(null);
    try {
      const result = await getPopularExchangeRates({ baseCurrencyCode: "TTD" });
      if (result && Array.isArray(result.rates)) {
        setPopularRates(result.rates);
        setPopularRatesDisclaimer(result.aiDisclaimer || "Rates are indicative. Verify with institutions.");
      } else {
         setPopularRatesError("AI did not return popular rates in the expected format.");
         setPopularRatesDisclaimer("Could not fetch popular rates. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error fetching popular rates:", error);
      setPopularRatesError(error.message || "Failed to fetch popular exchange rates.");
      setPopularRatesDisclaimer("Could not fetch popular rates. Please try again later.");
    } finally {
      setIsLoadingPopularRates(false);
    }
  }, []);

  const fetchHistoricalMarkersData = useCallback(async () => {
    setIsLoadingHistoricalData(true);
    setHistoricalDataError(null);
    setHistoricalMarkersData([]);
    try {
        const input: GetHistoricalExchangeRateMarkersInput = {
            baseCurrency: "TTD",
            targetCurrencies: ["USD", "EUR", "GBP"],
            numberOfYears: 5,
        };
        const result: GetHistoricalExchangeRateMarkersOutput = await getHistoricalExchangeRateMarkers(input);

        if (result && Array.isArray(result.markers) && result.markers.length > 0) {
            const sortedMarkers = result.markers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setHistoricalMarkersData(sortedMarkers);
            setHistoricalDataDisclaimer(result.aiDisclaimer || "Historical markers are AI-generated estimates.");
        } else {
            setHistoricalDataError("AI did not return historical data in the expected format or data was empty.");
            setHistoricalDataDisclaimer("Could not fetch historical trend data. Please try again later.");
        }
    } catch (error: any) {
        console.error("Error fetching historical rate markers:", error);
        setHistoricalDataError(error.message || "Failed to fetch AI-generated historical trends.");
        setHistoricalDataDisclaimer("Could not fetch historical trend data. Please try again later.");
    } finally {
        setIsLoadingHistoricalData(false);
    }
  }, []);


  useEffect(() => {
    fetchPopularRates();
    fetchHistoricalMarkersData();
  }, [fetchPopularRates, fetchHistoricalMarkersData]);

  const handleClearFields = () => {
    setAmount("100"); 
    setFromCurrency("TTD");
    setToCurrency("USD");
    setConversionResults(initialConversionResults);
    setConversionError(null);
    toast({ title: "Fields Cleared", description: "Currency converter inputs reset." });
  };

  const handleCopyResults = () => {
    if (conversionResults.convertedAmountDisplay === "0.00" && conversionResults.exchangeRateUsedDisplay === "N/A" && conversionResults.conversionDisclaimer !== "Same currency selected.") {
      toast({ title: "No Results", description: "Please perform a conversion first.", variant: "default"});
      return;
    }
    const textToCopy = `
Currency Conversion Summary
---------------------------------
Amount: ${amount} ${fromCurrency}
Converted To: ${conversionResults.convertedAmountDisplay} ${toCurrency}
Exchange Rate Used: ${conversionResults.exchangeRateUsedDisplay}
AI Disclaimer: ${conversionResults.conversionDisclaimer}
---------------------------------
Disclaimer: Exchange rates are indicative and subject to change.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Conversion details copied." });
  };
  
  const handleSwapCurrencies = () => {
    const tempFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempFrom);
  };

  const transformedHistoricalDataForChart = historicalMarkersData.map(marker => ({
    date: new Date(marker.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    USD: marker.rates.USD,
    EUR: marker.rates.EUR,
    GBP: marker.rates.GBP,
  }));


  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Get indicative exchange rates using AI. Rates are not real-time and for informational purposes only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 gap-4 items-end sm:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-1">
              <Label htmlFor="fromCurrency" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> From Currency
              </Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency" className="h-9 text-sm">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="icon" onClick={handleSwapCurrencies} className="h-9 w-9" aria-label="Swap currencies">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="space-y-1">
              <Label htmlFor="toCurrency" className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> To Currency
              </Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency" className="h-9 text-sm">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="amountToConvert" className="flex items-center text-sm">
               Amount to Convert
            </Label>
            <Input
              id="amountToConvert" type="number" step="0.01" placeholder="e.g., 100.00"
              value={amount} onChange={(e) => setAmount(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          
          {isLoadingConversion && (
            <div className="flex items-center justify-center mt-4 p-3 border rounded-md bg-muted/30">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Converting...</span>
            </div>
          )}

          {conversionError && !isLoadingConversion && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Conversion Error</AlertTitle>
              <AlertDescription>{conversionError}</AlertDescription>
            </Alert>
          )}

          {(!isLoadingConversion && !conversionError && (conversionResults.convertedAmountDisplay !== "0.00" || conversionResults.exchangeRateUsedDisplay !== "N/A" || conversionResults.conversionDisclaimer === "Same currency selected.")) && (
            <Card className="mt-4 bg-muted/30">
              <CardHeader className="p-3">
                <CardTitle className="text-md text-primary flex items-center">
                   Conversion Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-1">
                <div className="flex justify-between text-sm">
                    <span>{parseNum(amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} {fromCurrency} =</span> 
                    <strong className="text-primary text-lg">{conversionResults.convertedAmountDisplay} {toCurrency}</strong>
                </div>
                <div className="flex justify-between">
                    <span>Rate Used:</span> <strong>{conversionResults.exchangeRateUsedDisplay}</strong>
                </div>
                {conversionResults.conversionDisclaimer && (
                    <p className="text-muted-foreground pt-1 text-[10px]">
                        {conversionResults.conversionDisclaimer.startsWith("Same currency selected") ? "" : "AI Disclaimer: "}
                        {conversionResults.conversionDisclaimer}
                    </p>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 mt-6 p-0">
          <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
            <Copy className="mr-2 h-4 w-4" /> Copy Result
          </Button>
          <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
          </Button>
        </CardFooter>
      </Card>

      <Separator className="my-8" />

      <Card className="mt-6 w-full border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl text-primary flex items-center justify-between">
            <div className="flex items-center">
                <Coins className="mr-2 h-5 w-5" /> Popular Exchange Rates (Base: TTD)
            </div>
             <Button variant="outline" size="sm" onClick={fetchPopularRates} disabled={isLoadingPopularRates} className="h-8 px-3">
              <RefreshCw className={`mr-2 h-3 w-3 ${isLoadingPopularRates ? 'animate-spin' : ''}`} />
              {isLoadingPopularRates ? 'Refreshing...' : 'Refresh'}
            </Button>
          </CardTitle>
          <CardDescription>
            Indicative rates for TTD against major currencies, provided by AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          {isLoadingPopularRates && (
            <div className="space-y-2">
              {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          )}
          {popularRatesError && !isLoadingPopularRates && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error Fetching Popular Rates</AlertTitle>
              <AlertDescription>{popularRatesError}</AlertDescription>
            </Alert>
          )}
          {!isLoadingPopularRates && !popularRatesError && popularRates && popularRates.length > 0 && (
            popularRates.map((rate) => (
              <div key={rate.targetCurrencyCode} className="p-3 border rounded-md bg-muted/30 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">TTD to {rate.targetCurrencyCode} ({rate.targetCurrencyName})</h4>
                  <p className="text-xs text-primary">1 TTD = {rate.rateAgainstBase.toFixed(4)} {rate.targetCurrencyCode}</p>
                </div>
              </div>
            ))
          )}
           {!isLoadingPopularRates && !popularRatesError && popularRates && popularRates.length === 0 && (
             <p className="text-sm text-muted-foreground">No popular rates available from AI at this time.</p>
           )}
           {popularRatesDisclaimer && (
            <p className="text-xs text-muted-foreground pt-2">AI Disclaimer: {popularRatesDisclaimer}</p>
          )}
        </CardContent>
      </Card>
      
      <Separator className="my-8" />

      <Card className="mt-6 w-full border-none shadow-none">
        <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl text-primary flex items-center justify-between">
              <div className="flex items-center">
                <LineChartIcon className="mr-2 h-5 w-5" /> AI-Generated Indicative Historical Trend (TTD Base)
              </div>
              <Button variant="outline" size="sm" onClick={fetchHistoricalMarkersData} disabled={isLoadingHistoricalData} className="h-8 px-3">
                <RefreshCw className={`mr-2 h-3 w-3 ${isLoadingHistoricalData ? 'animate-spin' : ''}`} />
                {isLoadingHistoricalData ? 'Refreshing...' : 'Refresh Trend'}
              </Button>
            </CardTitle>
            <CardDescription>
                Illustrative graph showing indicative historical exchange rate markers over the past 5 years, as generated by AI. This is not precise financial data.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
            {isLoadingHistoricalData && (
              <div className="space-y-2">
                <Skeleton className="h-[300px] w-full" />
              </div>
            )}
            {historicalDataError && !isLoadingHistoricalData && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error Fetching Historical Data</AlertTitle>
                <AlertDescription>{historicalDataError}</AlertDescription>
              </Alert>
            )}
            {!isLoadingHistoricalData && !historicalDataError && transformedHistoricalDataForChart.length > 0 && (
              <div className="h-[350px] w-full bg-muted/30 rounded-md p-4">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <LineChart data={transformedHistoricalDataForChart} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value} 
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.toFixed(3)}
                      domain={['dataMin - 0.005', 'dataMax + 0.005']} // Adjusted domain for tighter fit
                    />
                    <ChartTooltip 
                      cursor={true} 
                      content={<ChartTooltipContent indicator="line" labelKey="date" />} 
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    {Object.keys(chartConfig).filter(key => transformedHistoricalDataForChart[0]?.[key] !== undefined).map((currencyKey) => (
                        <Line 
                            key={currencyKey}
                            dataKey={currencyKey} 
                            type="monotone" 
                            stroke={`var(--color-${currencyKey})`}
                            strokeWidth={2} 
                            dot={true} 
                            name={(chartConfig as any)[currencyKey]?.label || currencyKey.toUpperCase()}
                        />
                    ))}
                  </LineChart>
                </ChartContainer>
              </div>
            )}
            {!isLoadingHistoricalData && !historicalDataError && transformedHistoricalDataForChart.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">No AI-generated historical data available to display.</p>
            )}
            {historicalDataDisclaimer && (
              <p className="text-xs text-muted-foreground pt-2">AI Disclaimer: {historicalDataDisclaimer}</p>
            )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center mt-8">
        Disclaimer: All exchange rates provided by this calculator are indicative and sourced via AI. They are not real-time financial data and are for informational purposes only. Rates fluctuate constantly. Always consult with a financial institution or a professional forex service for actual transaction rates. AI-generated historical data provides approximate markers and not precise daily/weekly historical figures.
      </p>
    </div>
  );
}
