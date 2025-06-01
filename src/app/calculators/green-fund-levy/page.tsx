
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
import { Leaf, CalendarDays, TrendingUp, PencilLine, Save, CircleHelp, Gavel } from "lucide-react";
import { format, getYear } from 'date-fns';

const GREEN_FUND_LEVY_RATE = 0.003; // 0.3%

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

export default function GreenFundLevyPage() {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = React.useState<string>(currentYear.toString());
  const [inputType, setInputType] = React.useState<"annual" | "quarterly" | "monthly">("annual");
  const [grossIncomeEstimate, setGrossIncomeEstimate] = React.useState<string>("");
  const [quarterlyData, setQuarterlyData] = React.useState<QuarterlyDetail[]>(initialQuarterlyData);

  const calculateLevyForQuarter = React.useCallback((quarterIncome: string) => {
    const income = parseFloat(quarterIncome) || 0;
    if (income === 0) return 0;
    const annualizedIncome = income * 4; // Annualize based on the single quarter's income
    return annualizedIncome * GREEN_FUND_LEVY_RATE / 4; // Quarterly portion of the annual levy
  }, []);

  React.useEffect(() => {
    setQuarterlyData(prevData =>
      prevData.map(q => ({
        ...q,
        calculatedLevy: calculateLevyForQuarter(q.grossIncome),
      }))
    );
  }, [selectedYear, calculateLevyForQuarter]);


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
      incomePerQuarter = estimate; 
    } else { // monthly - assuming estimate is total for 3 months to represent one quarter
      incomePerQuarter = estimate; 
    }
    
    const populatedData = quarterlyData.map(q => ({
      ...q,
      grossIncome: incomePerQuarter.toFixed(2),
      calculatedLevy: calculateLevyForQuarter(incomePerQuarter.toFixed(2)),
    }));
    setQuarterlyData(populatedData);
    toast({ title: "Quarters Populated", description: `Each quarter set to TT$${incomePerQuarter.toFixed(2)} income for Green Fund Levy.` });
  };

  const handleQuarterlyInputChange = (quarterId: string, field: keyof QuarterlyDetail, value: string | boolean) => {
    setQuarterlyData(prevData =>
      prevData.map(q => {
        if (q.id === quarterId) {
          const updatedQuarter = { ...q, [field]: value };
          if (field === "grossIncome") {
            updatedQuarter.calculatedLevy = calculateLevyForQuarter(value as string);
          }
          return updatedQuarter;
        }
        return q;
      })
    );
  };

  const handleSaveData = () => {
    console.log("Saving data:", { selectedYear, inputType, grossIncomeEstimate, quarterlyData });
    toast({ title: "Data Saved (Simulated)", description: "Your Green Fund Levy data has been saved locally." });
  };

  const faqItems = [
    {
      value: "item-1",
      trigger: "What is Green Fund Levy?",
      content: "The Green Fund Levy is a tax imposed on the gross sales or receipts of companies operating in Trinidad and Tobago. It is intended to provide financial assistance for activities related to environmental remediation, reforestation, conservation, and public awareness. The rate is 0.3% of gross sales/receipts.",
    },
    {
      value: "item-2",
      trigger: "Who is required to pay Green Fund Levy?",
      content: "All companies and partnerships carrying on business in Trinidad and Tobago are required to pay the Green Fund Levy. This includes companies that might be exempt from other taxes like Business Levy or Corporation Tax.",
    },
    {
      value: "item-3",
      trigger: "What is the current Green Fund Levy rate and are there exemptions?",
      content: "The Green Fund Levy rate is 0.3% of actual gross sales or receipts. There are no general exemptions from the Green Fund Levy based on years of operation or profitability; it applies to all gross income.",
    },
     {
      value: "item-4",
      trigger: "When are Green Fund Levy payments due?",
      content: "Green Fund Levy is payable in quarterly installments on or before March 31, June 30, September 30, and December 31 each year. A final return is due at the end of the company's accounting year.",
    },
    {
      value: "item-5",
      trigger: "Can Green Fund Levy be offset against other taxes?",
      content: "No, the Green Fund Levy cannot be offset or credited against other tax liabilities such as Corporation Tax or Business Levy.",
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-4xl shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Leaf className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">Green Fund Levy Calculator</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            The purpose of the fund is to financially assist organizations and community groups that are engaged in activities related to the remediation, reforestation, environmental education and public awareness of environmental issues and conservation of the environment.
            <br/><br/>
            Estimate your Green Fund Levy and track quarterly payments for a selected year. Calculations are based on the laws of Trinidad and Tobago (0.3% of gross income).
            <br/>
            See the <a target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" href="https://rgd.legalaffairs.gov.tt/laws2/Alphabetical_List/lawspdfs/77.01.pdf">Miscellaneous Taxes Act (CH. 77:01)</a> for more details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                    <Leaf className="mr-2 h-4 w-4 text-muted-foreground" />Gross Income Estimate (TT$)
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

          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <PencilLine className="mr-2 h-5 w-5" /> Quarterly Details &amp; Payments ({selectedYear})
              </CardTitle>
              <CardDescription>
                Input actual gross income for each quarter for the year {selectedYear}. The Green Fund Levy for each quarter will be calculated based on that quarter's annualized gross income.
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

      <Card className="w-full max-w-4xl shadow-xl rounded-xl mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <CircleHelp className="mr-2 h-5 w-5" />Frequently Asked Questions (FAQ) - Green Fund Levy
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

      <Card className="w-full max-w-4xl shadow-xl rounded-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Gavel className="mr-2 h-5 w-5" />Legal References &amp; Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            For official information and legal details regarding Green Fund Levy in Trinidad and Tobago, please refer to the following:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="https://www.ird.gov.tt/corporations" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Inland Revenue Division (IRD) - Responsibilities of Corporations - Green Fund Levy Information
              </a>
            </li>
            <li>
              <a href="https://www.finance.gov.tt/wp-content/uploads/2014/08/The-Green-Fund-Levy-Miscellaneous-Taxes-Act.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                The Miscellaneous Taxes Act (Part IV - Green Fund Levy) - finance.gov.tt
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

    