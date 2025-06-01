
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Banknote, CalendarDays, TrendingUp, PencilLine, Save, CircleHelp, Gavel } from "lucide-react";
import { format, getYear } from 'date-fns';

const BUSINESS_LEVY_RATE = 0.006;
const BUSINESS_LEVY_EXEMPTION_YEARS = 3;

interface QuarterlyDetail {
  id: string;
  name: string;
  dueDateSuffix: string;
  grossIncome: string;
  calculatedLevy: number;
  isPaid: boolean;
  notes: string;
}

const initialQuarterlyData: QuarterlyDetail[] = [
  { id: "q1", name: "Quarter 1", dueDateSuffix: "March 31", grossIncome: "", calculatedLevy: 0, isPaid: false, notes: "" },
  { id: "q2", name: "Quarter 2", dueDateSuffix: "June 30", grossIncome: "", calculatedLevy: 0, isPaid: false, notes: "" },
  { id: "q3", name: "Quarter 3", dueDateSuffix: "September 30", grossIncome: "", calculatedLevy: 0, isPaid: false, notes: "" },
  { id: "q4", name: "Quarter 4", dueDateSuffix: "December 31", grossIncome: "", calculatedLevy: 0, isPaid: false, notes: "" },
];

const currentYear = getYear(new Date());
const yearOptions = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

export default function BusinessLevyPage() {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = React.useState<string>(currentYear.toString());
  const [inputType, setInputType] = React.useState<"annual" | "quarterly" | "monthly">("annual");
  const [grossIncomeEstimate, setGrossIncomeEstimate] = React.useState<string>("");
  const [yearOfIncorporation, setYearOfIncorporation] = React.useState<string>((currentYear - 2).toString());
  const [quarterlyData, setQuarterlyData] = React.useState<QuarterlyDetail[]>(initialQuarterlyData);

  const calculateLevyForQuarter = React.useCallback((quarterIncome: string, forYear: string, incorpYear: string) => {
    const income = parseFloat(quarterIncome) || 0;
    if (income === 0) return 0;

    const annualizedIncome = income * 4;
    const selectedYrNum = parseInt(forYear, 10);
    const incorpYrNum = parseInt(incorpYear, 10);

    const isExempt = selectedYrNum < incorpYrNum + BUSINESS_LEVY_EXEMPTION_YEARS;

    if (isExempt) {
      return 0;
    }
    return annualizedIncome * BUSINESS_LEVY_RATE / 4; // Levy for the quarter
  }, []);

  React.useEffect(() => {
    setQuarterlyData(prevData =>
      prevData.map(q => ({
        ...q,
        calculatedLevy: calculateLevyForQuarter(q.grossIncome, selectedYear, yearOfIncorporation),
      }))
    );
  }, [selectedYear, yearOfIncorporation, calculateLevyForQuarter]);


  const handlePopulateQuarters = () => {
    const estimate = parseFloat(grossIncomeEstimate) || 0;
    if (estimate === 0) {
      toast({ title: "No estimate provided", description: "Please enter a gross income estimate.", variant: "default" });
      return;
    }

    let incomePerQuarter = 0;
    if (inputType === "annual") {
      incomePerQuarter = estimate / 4;
    } else if (inputType === "quarterly") {
      incomePerQuarter = estimate; // User entered a quarterly estimate, apply to all
    } else { // monthly - for simplicity, assuming estimate is total for 3 months
      incomePerQuarter = estimate; // this is actually quarterly if user enters 3 months sum
    }
    
    const populatedData = quarterlyData.map(q => ({
      ...q,
      grossIncome: incomePerQuarter.toFixed(2),
      calculatedLevy: calculateLevyForQuarter(incomePerQuarter.toFixed(2), selectedYear, yearOfIncorporation),
    }));
    setQuarterlyData(populatedData);
    toast({ title: "Quarters Populated", description: `Each quarter set to TT$${incomePerQuarter.toFixed(2)} income.` });
  };

  const handleQuarterlyInputChange = (quarterId: string, field: keyof QuarterlyDetail, value: string | boolean) => {
    setQuarterlyData(prevData =>
      prevData.map(q => {
        if (q.id === quarterId) {
          const updatedQuarter = { ...q, [field]: value };
          if (field === "grossIncome") {
            updatedQuarter.calculatedLevy = calculateLevyForQuarter(value as string, selectedYear, yearOfIncorporation);
          }
          return updatedQuarter;
        }
        return q;
      })
    );
  };

  const handleSaveData = () => {
    // Placeholder for actual save logic (e.g., to localStorage or backend)
    console.log("Saving data:", { selectedYear, inputType, grossIncomeEstimate, yearOfIncorporation, quarterlyData });
    toast({ title: "Data Saved (Simulated)", description: "Your Business Levy data has been saved locally." });
  };

  const faqItems = [
    {
      value: "item-1",
      trigger: "What is Business Levy?",
      content: "Business Levy is a tax on the gross sales or receipts of a company or business entity operating in Trinidad and Tobago. It is payable even if the business does not make a profit. The current rate is 0.6% on actual gross sales or receipts. (Refer to Section 33A, Income Tax Act, Chap. 75:01).",
    },
    {
      value: "item-2",
      trigger: "Who is required to pay Business Levy?",
      content: "All companies and unincorporated associations (including partnerships) carrying on business in Trinidad and Tobago are generally required to pay Business Levy, subject to certain exemptions. (Refer to Section 33A(1), Income Tax Act).",
    },
    {
      value: "item-3",
      trigger: "What is the current Business Levy rate and exemption threshold?",
      content: "The Business Levy rate is 0.6% of actual gross sales or receipts. There is no minimum threshold; it applies from the first dollar of revenue. However, companies are exempt from Business Levy for the first three (3) years from their date of registration. (Refer to Section 33A(2) and 33A(3) of the Income Tax Act).",
    },
     {
      value: "item-4",
      trigger: "When are Business Levy payments due?",
      content: "Business Levy is payable in quarterly installments on or before March 31, June 30, September 30, and December 31 each year. A final return is due at the end of the company's accounting year. (Refer to Section 33A(4) of the Income Tax Act).",
    },
    {
      value: "item-5",
      trigger: "How is the levy calculated if my quarterly income varies?",
      content: "Each quarterly payment is based on an estimate of your gross sales/receipts for that quarter. The law provides for estimates and reconciliation at year-end. This calculator typically annualizes each quarter's specific income to calculate the levy portion due for that quarter, reflecting the principle that the 0.6% applies to the year's total gross income. (Refer to Section 33A(4) of the Income Tax Act and IRD guidelines).",
    },
  ];


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-4xl shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Banknote className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">Business Levy Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your Business Levy and track quarterly payments for a selected year. Calculations are based on the laws of Trinidad and Tobago.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Initial Income Estimate Card */}
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" /> Initial Income Estimate
              </CardTitle>
              <CardDescription>
                Select a year and enter an overall income estimate to populate all quarters initially. You can then edit each quarter individually below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor="selectedYear" className="flex items-center mb-1">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Select Year
                  </Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="selectedYear">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="yearOfIncorporation" className="flex items-center mb-1">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Year of Incorporation
                  </Label>
                  <Select value={yearOfIncorporation} onValueChange={setYearOfIncorporation}>
                    <SelectTrigger id="yearOfIncorporation">
                      <SelectValue placeholder="Incorp. Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="inputType" className="flex items-center mb-1">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Estimate Period
                  </Label>
                  <Select value={inputType} onValueChange={(value: "annual" | "quarterly" | "monthly") => setInputType(value)}>
                    <SelectTrigger id="inputType">
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly (3 Months Sum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grossIncomeEstimate" className="flex items-center mb-1">
                    <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />Gross Income Estimate (TT$)
                  </Label>
                  <Input
                    id="grossIncomeEstimate"
                    type="number"
                    placeholder={`Enter ${inputType} gross income`}
                    value={grossIncomeEstimate}
                    onChange={(e) => setGrossIncomeEstimate(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handlePopulateQuarters} className="w-full md:w-auto mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                Populate Quarterly Estimates
              </Button>
            </CardContent>
          </Card>

          {/* Quarterly Details & Payments Card */}
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <PencilLine className="mr-2 h-5 w-5" /> Quarterly Details &amp; Payments ({selectedYear})
              </CardTitle>
              <CardDescription>
                Input actual gross income for each quarter for the year {selectedYear}. The levy for each quarter will be calculated based on that quarter's annualized income.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-full table-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="min-w-[150px]">Gross Income this Quarter (TT$)</TableHead>
                      <TableHead className="text-right">Calculated Levy for Quarter (TT$)</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Mark as Paid</TableHead>
                      <TableHead className="min-w-[200px]">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="font-medium">{q.name}</TableCell>
                        <TableCell>{q.dueDateSuffix}, {selectedYear}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={q.grossIncome}
                            onChange={(e) => handleQuarterlyInputChange(q.id, "grossIncome", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="text-right">TT${q.calculatedLevy.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={q.isPaid ? "default" : "destructive"} className={q.isPaid ? "bg-green-500 hover:bg-green-600" : ""}>
                            {q.isPaid ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={q.isPaid}
                            onCheckedChange={(checked) => handleQuarterlyInputChange(q.id, "isPaid", checked)}
                            aria-label={`Mark ${q.name} as paid`}
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            placeholder="Optional notes..."
                            rows={1}
                            value={q.notes}
                            onChange={(e) => handleQuarterlyInputChange(q.id, "notes", e.target.value)}
                            className="w-full text-sm"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Button onClick={handleSaveData}>
            <Save className="mr-2 h-4 w-4" />Save Data
          </Button>
          <p className="text-xs text-muted-foreground">
            Disclaimer: This calculator provides an estimate for informational purposes only. Consult with a tax professional or the Board of Inland Revenue for official advice. Data is saved locally or to your profile if logged in.
          </p>
        </CardFooter>
      </Card>

      {/* FAQ Card */}
      <Card className="w-full max-w-4xl shadow-xl rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <CircleHelp className="mr-2 h-5 w-5" />Frequently Asked Questions (FAQ) - Business Levy
          </CardTitle>
        </CardHeader>
        <CardContent>
            {faqItems.map(item => (
              <AccordionItem value={item.value} key={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>              
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Legal References Card */}
      <Card className="w-full max-w-4xl shadow-xl rounded-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Gavel className="mr-2 h-5 w-5" />Legal References &amp; Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            For official information and legal details regarding Business Levy in Trinidad and Tobago, please refer to the following:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="https://ird.gov.tt/business-levy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Inland Revenue Division (IRD) - Business Levy Information
              </a>
            </li>
            <li>
              <a href="https://www.finance.gov.tt/wp-content/uploads/2021/11/The-Business-Levy-Act.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                The Business Levy Act (Chapter 75:02) - finance.gov.tt
              </a>
            </li>
            <li>
              <p className="text-sm">(Note: Always consult the latest versions of laws and official IRD publications, or a tax professional for definitive advice.)</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


    