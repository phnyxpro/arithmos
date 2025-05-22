
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
import { Coins, ArrowRightLeft, DollarSign, Info, Copy, Trash2, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getExchangeRate, type GetExchangeRateInput } from '@/ai/flows/get-exchange-rate-flow';
import { getPopularExchangeRates, type GetPopularExchangeRatesOutput, type PopularRate } from '@/ai/flows/get-popular-exchange-rates-flow';
import { Skeleton } from '@/components/ui/skeleton';

const currencyOptions = [
  { value: "TTD", label: "TTD - Trinidad & Tobago Dollar" },
  { value: "USD", label: "USD - United States Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound Sterling" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CNY", label: "CNY - Chinese Yuan Renminbi" },
  { value: "HKD", label: "HKD - Hong Kong Dollar" },
  { value: "NZD", label: "NZD - New Zealand Dollar" },
  { value: "SEK", label: "SEK - Swedish Krona" },
  { value: "KRW", label: "KRW - South Korean Won" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "NOK", label: "NOK - Norwegian Krone" },
  { value: "MXN", label: "MXN - Mexican Peso" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "RUB", label: "RUB - Russian Ruble" },
  { value: "ZAR", label: "ZAR - South African Rand" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "JMD", label: "JMD - Jamaican Dollar" },
  { value: "BBD", label: "BBD - Barbadian Dollar" },
  { value: "GYD", label: "GYD - Guyanese Dollar" },
  { value: "SRD", label: "SRD - Surinamese Dollar" },
  { value: "XCD", label: "XCD - East Caribbean Dollar" },
  { value: "ANG", label: "ANG - Netherlands Antillean Guilder" },
  { value: "AWG", label: "AWG - Aruban Florin" },
  { value: "KYD", label: "KYD - Cayman Islands Dollar" },
  { value: "BSD", label: "BSD - Bahamian Dollar" },
  { value: "BMD", label: "BMD - Bermudian Dollar" },
  // Add more currencies as needed
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "AFN", label: "AFN - Afghan Afghani" },
  { value: "ALL", label: "ALL - Albanian Lek" },
  { value: "AMD", label: "AMD - Armenian Dram" },
  { value: "AOA", label: "AOA - Angolan Kwanza" },
  { value: "ARS", label: "ARS - Argentine Peso" },
  { value: "AZN", label: "AZN - Azerbaijani Manat" },
  { value: "BAM", label: "BAM - Bosnia-Herzegovina Convertible Mark" },
  { value: "BDT", label: "BDT - Bangladeshi Taka" },
  { value: "BGN", label: "BGN - Bulgarian Lev" },
  { value: "BHD", label: "BHD - Bahraini Dinar" },
  { value: "BIF", label: "BIF - Burundian Franc" },
  { value: "BOB", label: "BOB - Bolivian Boliviano" },
  { value: "BYN", label: "BYN - Belarusian Ruble" },
  { value: "BZD", label: "BZD - Belize Dollar" },
  { value: "CDF", label: "CDF - Congolese Franc" },
  { value: "CLP", label: "CLP - Chilean Peso" },
  { value: "COP", label: "COP - Colombian Peso" },
  { value: "CRC", label: "CRC - Costa Rican Colón" },
  { value: "CUP", label: "CUP - Cuban Peso" },
  { value: "CVE", label: "CVE - Cape Verdean Escudo" },
  { value: "CZK", label: "CZK - Czech Koruna" },
  { value: "DJF", label: "DJF - Djiboutian Franc" },
  { value: "DKK", label: "DKK - Danish Krone" },
  { value: "DOP", label: "DOP - Dominican Peso" },
  { value: "DZD", label: "DZD - Algerian Dinar" },
  { value: "EGP", label: "EGP - Egyptian Pound" },
  { value: "ERN", label: "ERN - Eritrean Nakfa" },
  { value: "ETB", label: "ETB - Ethiopian Birr" },
  { value: "FJD", label: "FJD - Fijian Dollar" },
  { value: "FKP", label: "FKP - Falkland Islands Pound" },
  { value: "GEL", label: "GEL - Georgian Lari" },
  { value: "GHS", label: "GHS - Ghanaian Cedi" },
  { value: "GIP", label: "GIP - Gibraltar Pound" },
  { value: "GMD", label: "GMD - Gambian Dalasi" },
  { value: "GNF", label: "GNF - Guinean Franc" },
  { value: "GTQ", label: "GTQ - Guatemalan Quetzal" },
  { value: "HNL", label: "HNL - Honduran Lempira" },
  { value: "HTG", label: "HTG - Haitian Gourde" },
  { value: "HUF", label: "HUF - Hungarian Forint" },
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "ILS", label: "ILS - Israeli New Shekel" },
  { value: "IQD", label: "IQD - Iraqi Dinar" },
  { value: "IRR", label: "IRR - Iranian Rial" },
  { value: "ISK", label: "ISK - Icelandic Króna" },
  { value: "JOD", label: "JOD - Jordanian Dinar" },
  { value: "KES", label: "KES - Kenyan Shilling" },
  { value: "KGS", label: "KGS - Kyrgystani Som" },
  { value: "KHR", label: "KHR - Cambodian Riel" },
  { value: "KMF", label: "KMF - Comorian Franc" },
  { value: "KWD", label: "KWD - Kuwaiti Dinar" },
  { value: "KZT", label: "KZT - Kazakhstani Tenge" },
  { value: "LAK", label: "LAK - Laotian Kip" },
  { value: "LBP", label: "LBP - Lebanese Pound" },
  { value: "LKR", label: "LKR - Sri Lankan Rupee" },
  { value: "LRD", label: "LRD - Liberian Dollar" },
  { value: "LSL", label: "LSL - Lesotho Loti" },
  { value: "LYD", label: "LYD - Libyan Dinar" },
  { value: "MAD", label: "MAD - Moroccan Dirham" },
  { value: "MDL", label: "MDL - Moldovan Leu" },
  { value: "MGA", label: "MGA - Malagasy Ariary" },
  { value: "MKD", label: "MKD - Macedonian Denar" },
  { value: "MMK", label: "MMK - Myanma Kyat" },
  { value: "MNT", label: "MNT - Mongolian Tugrik" },
  { value: "MOP", label: "MOP - Macanese Pataca" },
  { value: "MRU", label: "MRU - Mauritanian Ouguiya" },
  { value: "MUR", label: "MUR - Mauritian Rupee" },
  { value: "MVR", label: "MVR - Maldivian Rufiyaa" },
  { value: "MWK", label: "MWK - Malawian Kwacha" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" },
  { value: "MZN", label: "MZN - Mozambican Metical" },
  { value: "NAD", label: "NAD - Namibian Dollar" },
  { value: "NGN", label: "NGN - Nigerian Naira" },
  { value: "NIO", label: "NIO - Nicaraguan Córdoba" },
  { value: "NPR", label: "NPR - Nepalese Rupee" },
  { value: "OMR", label: "OMR - Omani Rial" },
  { value: "PAB", label: "PAB - Panamanian Balboa" },
  { value: "PEN", label: "PEN - Peruvian Sol" },
  { value: "PGK", label: "PGK - Papua New Guinean Kina" },
  { value: "PHP", label: "PHP - Philippine Peso" },
  { value: "PKR", label: "PKR - Pakistani Rupee" },
  { value: "PLN", label: "PLN - Polish Zloty" },
  { value: "PYG", label: "PYG - Paraguayan Guarani" },
  { value: "QAR", label: "QAR - Qatari Rial" },
  { value: "RON", label: "RON - Romanian Leu" },
  { value: "RSD", label: "RSD - Serbian Dinar" },
  { value: "RWF", label: "RWF - Rwandan Franc" },
  { value: "SAR", label: "SAR - Saudi Riyal" },
  { value: "SBD", label: "SBD - Solomon Islands Dollar" },
  { value: "SCR", label: "SCR - Seychellois Rupee" },
  { value: "SDG", label: "SDG - Sudanese Pound" },
  { value: "SHP", label: "SHP - Saint Helena Pound" },
  { value: "SLE", label: "SLE - Sierra Leonean Leone" },
  { value: "SOS", label: "SOS - Somali Shilling" },
  { value: "SSP", label: "SSP - South Sudanese Pound" },
  { value: "STN", label: "STN - São Tomé & Príncipe Dobra" },
  { value: "SYP", label: "SYP - Syrian Pound" },
  { value: "SZL", label: "SZL - Swazi Lilangeni" },
  { value: "THB", label: "THB - Thai Baht" },
  { value: "TJS", label: "TJS - Tajikistani Somoni" },
  { value: "TMT", label: "TMT - Turkmenistani Manat" },
  { value: "TND", label: "TND - Tunisian Dinar" },
  { value: "TOP", label: "TOP - Tongan Paʻanga" },
  { value: "TRY", label: "TRY - Turkish Lira" },
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "TZS", label: "TZS - Tanzanian Shilling" },
  { value: "UAH", label: "UAH - Ukrainian Hryvnia" },
  { value: "UGX", label: "UGX - Ugandan Shilling" },
  { value: "UYU", label: "UYU - Uruguayan Peso" },
  { value: "UZS", label: "UZS - Uzbekistan Som" },
  { value: "VES", label: "VES - Venezuelan Bolívar Soberano" },
  { value: "VND", label: "VND - Vietnamese Dong" },
  { value: "VUV", label: "VUV - Vanuatu Vatu" },
  { value: "WST", label: "WST - Samoan Tala" },
  { value: "XAF", label: "XAF - CFA Franc BEAC" },
  { value: "XOF", label: "XOF - CFA Franc BCEAO" },
  { value: "XPF", label: "XPF - CFP Franc" },
  { value: "YER", label: "YER - Yemeni Rial" },
  { value: "ZMW", label: "ZMW - Zambian Kwacha" },
];


const initialConversionResults = {
  convertedAmountDisplay: "0.00",
  exchangeRateUsedDisplay: "N/A",
  conversionDisclaimer: "",
};

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
      // Clear results if inputs are invalid but don't show an error unless an API call failed
      if (!isLoadingConversion) { // Only clear if not already in a loading state
        setConversionResults(initialConversionResults);
        setConversionError(null); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]); // handleConversion removed to prevent re-triggering from its own update


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

  useEffect(() => {
    fetchPopularRates();
  }, [fetchPopularRates]);

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

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader className="p-0 pb-4">
          <CardDescription>
            Get indicative exchange rates using AI. Rates are not real-time and for informational purposes only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
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

          {(!isLoadingConversion && !conversionError && (parseNum(amount) > 0 || conversionResults.conversionDisclaimer === "Same currency selected.")) && (
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
      
      <p className="text-xs text-muted-foreground text-center mt-8">
        Disclaimer: All exchange rates provided by this calculator are indicative and sourced via AI. They are not real-time financial data and are for informational purposes only. Rates fluctuate constantly. Always consult with a financial institution or a professional forex service for actual transaction rates.
      </p>
    </div>
  );
}
