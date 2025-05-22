
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Percent, SquarePen, CircleCheckBig, FileText, Info, Gavel, Trash2, Calculator } from "lucide-react";
import { getYear } from 'date-fns';

const VAT_RATE = 0.125; // 12.5%
const VAT_REGISTRATION_THRESHOLD = 600000;

const currentYear = getYear(new Date());
const taxYearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

const businessTypeOptions = [
  { value: "sole_proprietor", label: "Sole Proprietor" },
  { value: "partnership", label: "Partnership" },
  { value: "company", label: "Company" },
  { value: "other", label: "Other Organization" },
];

export default function VatCalculatorPage() {
  const { toast } = useToast();

  // State for VAT Calculation
  const [taxYear, setTaxYear] = React.useState<string>(currentYear.toString());
  const [priceExcludingVat, setPriceExcludingVat] = React.useState<string>("");
  const [priceIncludingVat, setPriceIncludingVat] = React.useState<string>("");
  const [calculatedVatAmount, setCalculatedVatAmount] = React.useState<string | null>(null);
  const [resultPriceExcludingVat, setResultPriceExcludingVat] = React.useState<string | null>(null);
  const [resultPriceIncludingVat, setResultPriceIncludingVat] = React.useState<string | null>(null);

  // State for VAT Registration Eligibility
  const [businessType, setBusinessType] = React.useState<string>("");
  const [projectedRevenue, setProjectedRevenue] = React.useState<string>("");
  const [eligibilityResult, setEligibilityResult] = React.useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculateFromExcluding = () => {
    const priceExcl = parseFloat(priceExcludingVat);
    if (isNaN(priceExcl) || priceExcl < 0) {
      toast({ title: "Invalid Input", description: "Please enter a valid price excluding VAT.", variant: "destructive" });
      return;
    }
    const vat = priceExcl * VAT_RATE;
    const priceIncl = priceExcl + vat;
    setCalculatedVatAmount(formatCurrency(vat));
    setResultPriceExcludingVat(formatCurrency(priceExcl));
    setResultPriceIncludingVat(formatCurrency(priceIncl));
    setPriceIncludingVat(priceIncl.toFixed(2)); // Optionally update the other input
    toast({ title: "VAT Calculated", description: "Calculated from price excluding VAT." });
  };

  const handleCalculateFromIncluding = () => {
    const priceIncl = parseFloat(priceIncludingVat);
    if (isNaN(priceIncl) || priceIncl < 0) {
      toast({ title: "Invalid Input", description: "Please enter a valid price including VAT.", variant: "destructive" });
      return;
    }
    const priceExcl = priceIncl / (1 + VAT_RATE);
    const vat = priceIncl - priceExcl;
    setCalculatedVatAmount(formatCurrency(vat));
    setResultPriceExcludingVat(formatCurrency(priceExcl));
    setResultPriceIncludingVat(formatCurrency(priceIncl));
    setPriceExcludingVat(priceExcl.toFixed(2)); // Optionally update the other input
    toast({ title: "VAT Calculated", description: "Calculated from price including VAT." });
  };

  const handleClearVatCalcFields = () => {
    setPriceExcludingVat("");
    setPriceIncludingVat("");
    setCalculatedVatAmount(null);
    setResultPriceExcludingVat(null);
    setResultPriceIncludingVat(null);
    toast({ title: "Fields Cleared", description: "VAT calculation inputs and results cleared." });
  };

  const handleCheckEligibility = () => {
    const revenue = parseFloat(projectedRevenue);
    if (isNaN(revenue) || revenue < 0) {
      setEligibilityResult("Please enter a valid projected annual revenue.");
      toast({ title: "Invalid Revenue", description: "Projected revenue must be a valid number.", variant: "destructive" });
      return;
    }
    if (revenue >= VAT_REGISTRATION_THRESHOLD) {
      setEligibilityResult(`Registration Required: Your projected annual revenue of TT$${formatCurrency(revenue)} meets or exceeds the TT$${formatCurrency(VAT_REGISTRATION_THRESHOLD)} threshold.`);
    } else {
      setEligibilityResult(`Registration Not Required (Voluntary Possible): Your projected annual revenue of TT$${formatCurrency(revenue)} is below the TT$${formatCurrency(VAT_REGISTRATION_THRESHOLD)} threshold.`);
    }
    toast({ title: "Eligibility Checked", description: "See result below." });
  };

  const handleClearEligibilityFields = () => {
    setBusinessType("");
    setProjectedRevenue("");
    setEligibilityResult(null);
    toast({ title: "Fields Cleared", description: "Eligibility checker inputs and result cleared." });
  };

  const faqItems = [
    { value: "what-is-vat", trigger: "What is VAT?", content: "Value Added Tax (VAT) is a consumption tax placed on goods and services at each stage of the supply chain, from production to the point of sale. Businesses collect VAT on behalf of the government." },
    { value: "zero-exempt", trigger: "Zero-Rated and Exempt Items", content: "Certain goods and services are zero-rated (VAT is charged at 0%) or exempt (VAT is not charged). Zero-rated items include most basic food items, agricultural supplies, and exports. Exempt items include financial services, education, and healthcare. Refer to Schedules 1 and 2 of the VAT Act for complete lists." },
    { value: "returns-payments", trigger: "VAT Returns and Payments", content: "Registered businesses must file VAT returns and pay any net VAT due typically on a bi-monthly basis. Returns are usually due by the 25th day of the month following the end of the tax period." },
    { value: "educational-resources", trigger: "Educational Resources", content: "The Inland Revenue Division (IRD) website provides numerous guides, public notices, and FAQs regarding VAT. It's recommended to regularly check their website for the latest updates." },
    { value: "support-assistance", trigger: "Support and Assistance", content: "For specific queries or assistance with VAT matters, you can contact the VAT Administration Centre of the IRD or consult with a qualified tax professional." },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Receipt className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">VAT Calculator (T&T)</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Calculate Value Added Tax (VAT) based on prices. Standard VAT rate in Trinidad and Tobago is 12.5%. Explore VAT information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calculate VAT on a Price Card */}
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <Calculator className="mr-2 h-5 w-5" /> Calculate VAT on a Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="vatTaxYear" className="flex items-center mb-1">
                  Tax Year / Period (for reference)
                </Label>
                <Select value={taxYear} onValueChange={setTaxYear}>
                  <SelectTrigger id="vatTaxYear">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxYearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <Label htmlFor="priceExcludingVat" className="flex items-center mb-1">
                    Price Excluding VAT (TT$)
                  </Label>
                  <Input
                    id="priceExcludingVat"
                    type="number"
                    placeholder="e.g., 100.00"
                    value={priceExcludingVat}
                    onChange={(e) => setPriceExcludingVat(e.target.value)}
                  />
                  <Button onClick={handleCalculateFromExcluding} className="w-full mt-2 text-sm bg-accent hover:bg-accent/90">
                    Calculate from Excl. Price
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceIncludingVat" className="flex items-center mb-1">
                    Price Including VAT (TT$)
                  </Label>
                  <Input
                    id="priceIncludingVat"
                    type="number"
                    placeholder="e.g., 112.50"
                    value={priceIncludingVat}
                    onChange={(e) => setPriceIncludingVat(e.target.value)}
                  />
                  <Button onClick={handleCalculateFromIncluding} className="w-full mt-2 text-sm bg-accent hover:bg-accent/90">
                    Calculate from Incl. Price
                  </Button>
                </div>
              </div>
              {(calculatedVatAmount || resultPriceExcludingVat || resultPriceIncludingVat) && (
                <div className="mt-4 p-3 border rounded-md bg-muted/50 space-y-1 text-sm">
                  <div className="flex justify-between"><span>VAT Amount (12.5%):</span> <strong className="text-primary">TT$ {calculatedVatAmount || "0.00"}</strong></div>
                  <div className="flex justify-between"><span>Price Excluding VAT:</span> <strong>TT$ {resultPriceExcludingVat || "0.00"}</strong></div>
                  <div className="flex justify-between"><span>Price Including VAT:</span> <strong>TT$ {resultPriceIncludingVat || "0.00"}</strong></div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleClearVatCalcFields} className="w-full text-sm">
                <Trash2 className="mr-2 h-4 w-4" /> Clear Calculation Fields
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>

      {/* VAT Registration & Deregistration Card */}
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <SquarePen className="mr-2 h-5 w-5" /> VAT Registration & Deregistration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* VAT Registration Eligibility Checker */}
          <div>
            <h4 className="font-semibold text-md mb-2 flex items-center">
              <CircleCheckBig className="mr-2 h-5 w-5 text-primary" />VAT Registration Eligibility Checker
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Determine if you meet the VAT registration threshold (TT$600,000 in a 12-month period).
            </p>
            <div className="space-y-3 p-3 border rounded-md bg-muted/50">
              <div>
                <Label htmlFor="businessType" className="text-sm">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger id="businessType" className="mt-1">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="projectedRevenue" className="text-sm">Projected Annual Revenue (TT$)</Label>
                <Input
                  id="projectedRevenue"
                  type="number"
                  placeholder="e.g., 700000"
                  value={projectedRevenue}
                  onChange={(e) => setProjectedRevenue(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCheckEligibility} className="bg-accent hover:bg-accent/90 flex-1">Check Eligibility</Button>
                <Button variant="outline" onClick={handleClearEligibilityFields} className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
              {eligibilityResult && (
                <div className={`mt-3 p-2 rounded-md text-sm ${eligibilityResult.startsWith("Registration Required") ? "bg-primary/10 text-primary" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                  {eligibilityResult}
                </div>
              )}
            </div>
          </div>
          <Separator />
          {/* VAT Registration Guide */}
          <div className="space-y-2">
            <h4 className="font-semibold text-md mb-2 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />VAT Registration Guide
            </h4>
            <h5 className="font-semibold mt-2">Introduction</h5>
            <p className="text-sm">
              The Value Added Tax Act, #37/89 requires most businesses and many organizations in Trinidad and Tobago to:
            </p>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1 text-muted-foreground">
              <li>Register with the VAT Administration Centre.</li>
              <li>Collect tax at twelve and a half per cent (12.5%) on supply of goods and prescribed services.</li>
              <li>Remit the Net VAT collected to the Cashiers Unit, Inland Revenue Division.</li>
              <li>File a VAT return.</li>
            </ul>
            <h5 className="font-semibold mt-3">Do I Need One?</h5>
            <p className="text-sm text-muted-foreground">
              All persons making commercial supplies of $600,000 (as of 1/1/2023) or more in the preceding twelve-month period or having evidence (in the sales forecast) supplies will exceed $600,000 in a twelve (12) month period must apply for VAT Registration.
            </p>
            <h5 className="font-semibold mt-3">What is needed?</h5>
            <p className="text-sm text-muted-foreground">The following, depending on the business type (click to expand):</p>
            <Accordion type="single" collapsible className="w-full mt-1">
              <AccordionItem value="sole-prop">
                <AccordionTrigger>Sole Proprietors</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Completed VAT Application Form.</li>
                    <li>Copy of Board of Inland Revenue (BIR) File Number.</li>
                    <li>Copy of Certificate of Registration of Business Name.</li>
                    <li>Valid form of identification (National ID, Passport, or Driver's Permit).</li>
                    <li>Evidence of $600,000 in commercial supplies or realistic sales forecast.</li>
                    <li>Copy of bank statement or letter from bank.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="company-partnership">
                <AccordionTrigger>Companies/Partnerships/Other Organizations</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                   <ul className="list-disc pl-5 space-y-1">
                    <li>Completed VAT Application Form.</li>
                    <li>Copy of Board of Inland Revenue (BIR) File Number.</li>
                    <li>Copy of Certificate of Incorporation/Continuance and Articles of Incorporation/Continuance (for companies).</li>
                    <li>Copy of Partnership Agreement (for partnerships).</li>
                    <li>Copy of relevant registration documents for other organizations.</li>
                    <li>Valid form of identification for directors/partners/authorized officers.</li>
                    <li>Evidence of $600,000 in commercial supplies or realistic sales forecast.</li>
                    <li>Copy of bank statement or letter from bank.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Separator />
          {/* VAT Deregistration Process */}
          <div>
            <h4 className="font-semibold text-md mb-2 flex items-center">
              <SquarePen className="mr-2 h-5 w-5 text-primary" />VAT Deregistration Process
            </h4>
            <p className="text-sm text-muted-foreground">
              Guidance on how businesses can cancel their VAT registration if they no longer meet the threshold or cease operations. This typically involves submission of relevant forms and documentation to the IRD, including final VAT returns and payments.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Understanding VAT Card */}
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Info className="mr-2 h-5 w-5" /> Understanding VAT in T&T
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map(item => (
              <AccordionItem value={item.value} key={item.value}>
                <AccordionTrigger className="text-lg hover:no-underline">{item.trigger}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Official Resources Card */}
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Gavel className="mr-2 h-5 w-5" /> Official Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">For the most accurate and up-to-date information on VAT in Trinidad and Tobago, please consult:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><a target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" href="https://www.ird.gov.tt/vat/">Inland Revenue Division (IRD) - VAT Information</a></li>
            <li><a target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" href="https://www.finance.gov.tt/wp-content/uploads/2014/08/The-Value-Added-Tax-Act.pdf">The Value Added Tax Act - finance.gov.tt</a></li>
          </ul>
          <p className="text-xs text-muted-foreground pt-2">Disclaimer: Information provided here is for general guidance only. Always consult official sources or a tax professional.</p>
        </CardContent>
      </Card>
    </div>
  );
}

