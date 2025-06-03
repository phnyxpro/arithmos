
"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  User,
  DollarSign,
  CalendarDays,
  Hourglass,
  Percent,
  CircleCheckBig,
  Copy,
  Trash2,
  Save,
  ListChecks,
  Download,
  Mail,
  Eye,
  ChevronDown
} from "lucide-react";


const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear + 5 - i).toString()).reverse();
const months = [
  { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
  { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];

const payrollFormSchema = z.object({
  employeeName: z.string().optional(),
  grossMonthlyIncome: z.coerce
    .number({ required_error: "Gross monthly income is required." })
    .min(0, "Income must be a positive number."),
  selectedMonth: z.string({ required_error: "Month is required."}),
  selectedYear: z.coerce.number({ required_error: "Year is required."}).int().min(currentYear - 5).max(currentYear + 5),
  paymentFrequency: z.enum(["monthly", "fortnightly", "weekly"], {
    required_error: "Payment frequency is required.",
  }),
  overtimeHoursPerWeek: z.coerce
    .number()
    .min(0, "Overtime hours must be positive.")
    .optional(),
  overtimeMultiplier: z.coerce
    .number()
    .min(0, "Multiplier must be positive.")
    .optional()
    .default(1.5),
});

type PayrollFormData = z.infer<typeof payrollFormSchema>;

interface NisClass {
  class: string;
  monthlyEarnings: { min: number; max: number | null };
  weeklyEarnings: { min: number; max: number | null };
  assumedAverageWeekly: number;
  employeeWeekly: number;
  employerWeekly: number;
  totalWeekly: number;
  classZWeekly: number;
}

const nisClassesData: NisClass[] = [
    { class: "I", weeklyEarnings: { min: 200.00, max: 339.99 }, monthlyEarnings: { min: 867.00, max: 1472.99 }, assumedAverageWeekly: 270.00, employeeWeekly: 11.90, employerWeekly: 23.80, totalWeekly: 35.70, classZWeekly: 1.79 },
    { class: "II", weeklyEarnings: { min: 340.00, max: 449.99 }, monthlyEarnings: { min: 1473.00, max: 1949.99 }, assumedAverageWeekly: 395.00, employeeWeekly: 17.40, employerWeekly: 34.80, totalWeekly: 52.20, classZWeekly: 2.61 },
    { class: "III", weeklyEarnings: { min: 450.00, max: 609.99 }, monthlyEarnings: { min: 1950.00, max: 2642.99 }, assumedAverageWeekly: 530.00, employeeWeekly: 23.30, employerWeekly: 46.60, totalWeekly: 69.90, classZWeekly: 3.50 },
    { class: "IV", weeklyEarnings: { min: 610.00, max: 759.99 }, monthlyEarnings: { min: 2643.00, max: 3292.99 }, assumedAverageWeekly: 685.00, employeeWeekly: 30.10, employerWeekly: 60.20, totalWeekly: 90.30, classZWeekly: 4.52 },
    { class: "V", weeklyEarnings: { min: 760.00, max: 929.99 }, monthlyEarnings: { min: 3293.00, max: 4029.99 }, assumedAverageWeekly: 845.00, employeeWeekly: 37.20, employerWeekly: 74.40, totalWeekly: 111.60, classZWeekly: 5.58 },
    { class: "VI", weeklyEarnings: { min: 930.00, max: 1119.99 }, monthlyEarnings: { min: 4030.00, max: 4852.99 }, assumedAverageWeekly: 1025.00, employeeWeekly: 45.10, employerWeekly: 90.20, totalWeekly: 135.30, classZWeekly: 6.77 },
    { class: "VII", weeklyEarnings: { min: 1120.00, max: 1299.99 }, monthlyEarnings: { min: 4853.00, max: 5632.99 }, assumedAverageWeekly: 1210.00, employeeWeekly: 53.20, employerWeekly: 106.40, totalWeekly: 159.60, classZWeekly: 7.98 },
    { class: "VIII", weeklyEarnings: { min: 1300.00, max: 1489.99 }, monthlyEarnings: { min: 5633.00, max: 6456.99 }, assumedAverageWeekly: 1395.00, employeeWeekly: 61.40, employerWeekly: 122.80, totalWeekly: 184.20, classZWeekly: 9.21 },
    { class: "IX", weeklyEarnings: { min: 1490.00, max: 1709.99 }, monthlyEarnings: { min: 6457.00, max: 7409.99 }, assumedAverageWeekly: 1600.00, employeeWeekly: 70.40, employerWeekly: 140.80, totalWeekly: 211.20, classZWeekly: 10.56 },
    { class: "X", weeklyEarnings: { min: 1710.00, max: 1909.99 }, monthlyEarnings: { min: 7410.00, max: 8276.99 }, assumedAverageWeekly: 1810.00, employeeWeekly: 79.60, employerWeekly: 159.20, totalWeekly: 238.80, classZWeekly: 11.94 },
    { class: "XI", weeklyEarnings: { min: 1910.00, max: 2139.99 }, monthlyEarnings: { min: 8277.00, max: 9272.99 }, assumedAverageWeekly: 2025.00, employeeWeekly: 89.10, employerWeekly: 178.20, totalWeekly: 267.30, classZWeekly: 13.37 },
    { class: "XII", weeklyEarnings: { min: 2140.00, max: 2379.99 }, monthlyEarnings: { min: 9273.00, max: 10312.99 }, assumedAverageWeekly: 2260.00, employeeWeekly: 99.40, employerWeekly: 198.80, totalWeekly: 298.20, classZWeekly: 14.91 },
    { class: "XIII", weeklyEarnings: { min: 2380.00, max: 2629.99 }, monthlyEarnings: { min: 10313.00, max: 11396.99 }, assumedAverageWeekly: 2505.00, employeeWeekly: 110.20, employerWeekly: 220.40, totalWeekly: 330.60, classZWeekly: 16.53 },
    { class: "XIV", weeklyEarnings: { min: 2630.00, max: 2919.99 }, monthlyEarnings: { min: 11397.00, max: 12652.99 }, assumedAverageWeekly: 2775.00, employeeWeekly: 122.10, employerWeekly: 244.20, totalWeekly: 366.30, classZWeekly: 18.32 },
    { class: "XV", weeklyEarnings: { min: 2920.00, max: 3137.99 }, monthlyEarnings: { min: 12653.00, max: 13599.99 }, assumedAverageWeekly: 3029.00, employeeWeekly: 133.30, employerWeekly: 266.60, totalWeekly: 399.90, classZWeekly: 20.00 },
    { class: "XVI", weeklyEarnings: { min: 3138.00, max: null }, monthlyEarnings: { min: 13600.00, max: null }, assumedAverageWeekly: 3138.00, employeeWeekly: 138.10, employerWeekly: 276.20, totalWeekly: 414.30, classZWeekly: 20.72 },
];

const initialCalculationResults = {
    employeeNameDisplay: "N/A", // Added for modal and export consistency
    grossMonthlyIncomeDisplay: "0.00",
    estAnnualIncome: "0.00",
    mondaysInMonth: "0",
    nisClass: "N/A",
    estWeeklyNISEmployee: "0.00",
    estWeeklyNISEmployer: "0.00",
    payeMonthly: "0.00",
    nisMonthlyEmployee: "0.00",
    healthSurchargeMonthly: "0.00",
    totalMonthlyDeductions: "0.00",
    netTakeHomePay: "0.00",
    employerNISMonthly: "0.00",
 totalPayrollTaxDisplay: "0.00",
    monthName: "",
    yearDisplay: "",
};

type CalculationResults = typeof initialCalculationResults;

interface SavedPayrollEntry extends CalculationResults {
  id: string;
  timestamp: string;
}


export default function PayrollPage() {
  const { toast } = useToast();
  const [calculationResults, setCalculationResults] = React.useState<CalculationResults>(initialCalculationResults);
  const [savedCalculations, setSavedCalculations] = React.useState<SavedPayrollEntry[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [viewModalData, setViewModalData] = React.useState<SavedPayrollEntry | null>(null);

  const form = useForm<PayrollFormData>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: {
      employeeName: "",
      grossMonthlyIncome: undefined,
      selectedMonth: (new Date().getMonth() + 1).toString(),
      selectedYear: new Date().getFullYear(),
      paymentFrequency: "monthly",
      overtimeHoursPerWeek: undefined,
      overtimeMultiplier: 1.5,
    },
  });

  const countMondays = (year: number, month: number): number => {
    let mondays = 0;
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 1) { // 0 is Sunday, 1 is Monday
        mondays++;
      }
      date.setDate(date.getDate() + 1);
    }
    return mondays;
  };

  const onSubmit: SubmitHandler<PayrollFormData> = (data) => {
    const gmi = data.grossMonthlyIncome;
    const year = data.selectedYear;
    const month = parseInt(data.selectedMonth, 10);

    const mondaysInMonth = countMondays(year, month);
    const monthLabel = months.find(m => m.value === data.selectedMonth)?.label || "";

    let foundNisClass: NisClass | undefined = undefined;
    for (const nisClass of nisClassesData) {
      if (gmi >= nisClass.monthlyEarnings.min && (nisClass.monthlyEarnings.max === null || gmi <= nisClass.monthlyEarnings.max)) {
        foundNisClass = nisClass;
        break;
      }
    }

    let nisMonthlyEmployee = 0;
    let employerNISMonthly = 0;
    let nisClassDisplay = "N/A";
    let estWeeklyNISEmployee = 0;
    let estWeeklyNISEmployer = 0;

    if (foundNisClass) {
      nisClassDisplay = foundNisClass.class;
      estWeeklyNISEmployee = foundNisClass.employeeWeekly;
      estWeeklyNISEmployer = foundNisClass.employerWeekly;
      nisMonthlyEmployee = foundNisClass.employeeWeekly * mondaysInMonth;
      employerNISMonthly = foundNisClass.employerWeekly * mondaysInMonth;
    }

    const annualGrossIncome = gmi * 12;
    const personalAllowance = 90000;
    const annualNisEmployee = nisMonthlyEmployee * 12; 
    const chargeableIncome = Math.max(0, annualGrossIncome - personalAllowance - annualNisEmployee);
    
    let annualPAYE = 0;
    if (chargeableIncome <= 72000) {
      annualPAYE = chargeableIncome * 0.25;
    } else {
      annualPAYE = (72000 * 0.25) + ((chargeableIncome - 72000) * 0.30);
    }
    const payeMonthly = annualPAYE / 12;

    const weeklyGrossIncome = gmi / 4.3333; 
    let weeklyHS = 0;
    if (weeklyGrossIncome <= 110) {
      weeklyHS = 4.13;
    } else {
      weeklyHS = 8.25;
    }
    const healthSurchargeMonthly = weeklyHS * mondaysInMonth;

    const totalMonthlyDeductions = payeMonthly + nisMonthlyEmployee + healthSurchargeMonthly;
    const netTakeHomePay = gmi - totalMonthlyDeductions;
    const totalPayrollTax = totalMonthlyDeductions + employerNISMonthly;

    setCalculationResults({
      employeeNameDisplay: data.employeeName || "N/A",
      grossMonthlyIncomeDisplay: gmi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      estAnnualIncome: annualGrossIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      mondaysInMonth: mondaysInMonth.toString(),
      nisClass: nisClassDisplay,
      estWeeklyNISEmployee: estWeeklyNISEmployee.toFixed(2),
      estWeeklyNISEmployer: estWeeklyNISEmployer.toFixed(2),
      payeMonthly: payeMonthly.toFixed(2),
      nisMonthlyEmployee: nisMonthlyEmployee.toFixed(2),
      healthSurchargeMonthly: healthSurchargeMonthly.toFixed(2),
      totalMonthlyDeductions: totalMonthlyDeductions.toFixed(2),
      netTakeHomePay: netTakeHomePay.toFixed(2),
      employerNISMonthly: employerNISMonthly.toFixed(2),
      totalPayrollTaxDisplay: totalPayrollTax.toFixed(2),
      monthName: monthLabel,
      yearDisplay: year.toString(),
    });

    toast({ title: "Payroll Calculated", description: "Review the estimated deductions below." });
  };

  const handleCopyResults = () => {
    const textToCopy = `
Payroll Calculation Summary for ${calculationResults.employeeNameDisplay}
Period: ${calculationResults.monthName} ${calculationResults.yearDisplay}
---------------------------------
Gross Monthly Income: TT$ ${calculationResults.grossMonthlyIncomeDisplay}
Est. Annual Income: TT$ ${calculationResults.estAnnualIncome}
Mondays in Month: ${calculationResults.mondaysInMonth}
NIS Class: ${calculationResults.nisClass}
Est. Weekly NIS (Employee): TT$ ${calculationResults.estWeeklyNISEmployee}
Est. Weekly NIS (Employer): TT$ ${calculationResults.estWeeklyNISEmployer}
---------------------------------
Monthly Deductions:
PAYE: TT$ ${calculationResults.payeMonthly}
NIS (Employee): TT$ ${calculationResults.nisMonthlyEmployee}
Health Surcharge: TT$ ${calculationResults.healthSurchargeMonthly}
Total Monthly Deductions: TT$ ${calculationResults.totalMonthlyDeductions}
Net Take-Home Pay: TT$ ${calculationResults.netTakeHomePay}
    ---------------------------------
 Total Payroll Tax (Employee Deductions + Employer NIS): TT$ ${calculationResults.totalPayrollTaxDisplay}
---------------------------------
Employer's NIS Contribution (Monthly): TT$ ${calculationResults.employerNISMonthly}
---------------------------------
Note: These are estimates. Consult official guidelines.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Payroll details copied to clipboard." });
  };

  const handleClearFields = () => {
    form.reset({
      employeeName: "",
      grossMonthlyIncome: undefined,
      selectedMonth: (new Date().getMonth() + 1).toString(),
      selectedYear: new Date().getFullYear(),
      paymentFrequency: "monthly",
      overtimeHoursPerWeek: undefined,
      overtimeMultiplier: 1.5,
    });
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Payroll calculator inputs have been reset." });
  };

  const handleSaveCalculation = () => {
    if (!calculationResults.monthName) {
      toast({ title: "No Calculation to Save", description: "Please calculate payroll first.", variant: "destructive" });
      return;
    }
    const newEntry: SavedPayrollEntry = {
      id: crypto.randomUUID(),
      ...calculationResults, // Spread all current calculation results
      timestamp: new Date().toLocaleString(),
    };
    setSavedCalculations(prev => [newEntry, ...prev.slice(0, 9)]); // Keep max 10 saved
    toast({ title: "Calculation Saved", description: "The payroll summary has been added to the list below." });
  };

  const handleRemoveCalculation = (id: string) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
    toast({ title: "Calculation Removed", description: "The entry has been removed." });
  };

  const handleViewCalculation = (calc: SavedPayrollEntry) => {
    setViewModalData(calc);
    setIsViewModalOpen(true);
  };

  const handleExportCSV = () => {
    if (savedCalculations.length === 0) {
      toast({ title: "No Data to Export", description: "Please save some calculations first.", variant: "default" });
      return;
    }
    const headers = [
      "ID", "Employee Name", "Period", "Timestamp",
      "Gross Monthly Income (TT$)", "Est. Annual Income (TT$)", "Mondays in Month",
      "NIS Class", "Est. Weekly NIS Employee (TT$)", "Est. Weekly NIS Employer (TT$)",
      "PAYE Monthly (TT$)", "NIS Monthly Employee (TT$)", "Health Surcharge Monthly (TT$)",
      "Total Monthly Deductions (Employee) (TT$)", "Net Take-Home Pay (TT$)",
      "Employer NIS Monthly (TT$)", "Total Payroll Tax (TT$)"
    ];
    const rows = savedCalculations.map(calc => [
      `"${calc.id}"`,
      `"${calc.employeeNameDisplay}"`,
      `"${calc.monthName} ${calc.yearDisplay}"`,
      `"${calc.timestamp}"`,
      `"${calc.grossMonthlyIncomeDisplay}"`,
      `"${calc.estAnnualIncome}"`,
      `"${calc.mondaysInMonth}"`,
      `"${calc.nisClass}"`,
      `"${calc.estWeeklyNISEmployee}"`,
      `"${calc.estWeeklyNISEmployer}"`,
      `"${calc.payeMonthly}"`,
      `"${calc.nisMonthlyEmployee}"`,
      `"${calc.healthSurchargeMonthly}"`,
      `"${calc.totalMonthlyDeductions}"`,
      `"${calc.netTakeHomePay}"`,
      `"${calc.employerNISMonthly}"`,
      `"${calc.totalPayrollTaxDisplay}"`,
    ].join(","));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `payroll_summaries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "CSV Exported", description: "Payroll summaries downloaded as CSV." });
  };

  const handleExportXLSX = () => {
     toast({ title: "XLSX Export (Coming Soon)", description: "This feature will be implemented in a future update." });
  };

  const handleExportPDF = () => {
     toast({ title: "PDF Export (Coming Soon)", description: "This feature will be implemented in a future update." });
  };

  const handleShareViaEmail = () => {
    if (savedCalculations.length === 0) {
      toast({ title: "No Data to Share", description: "Please save some calculations first.", variant: "default" });
      return;
    }
    let emailBody = "Payroll Summaries:\n\n";
    savedCalculations.forEach((calc, index) => {
      emailBody += `Calculation ${index + 1}:\n`;
      emailBody += `Employee: ${calc.employeeNameDisplay}\n`;
      emailBody += `Period: ${calc.monthName} ${calc.yearDisplay}\n`;
      emailBody += `Gross Income: TT$ ${calc.grossMonthlyIncomeDisplay}\n`;
      emailBody += `Total Deductions: TT$ ${calc.totalMonthlyDeductions}\n`;
      emailBody += `Net Pay: TT$ ${calc.netTakeHomePay}\n`;
      emailBody += `Timestamp: ${calc.timestamp}\n\n`;
    });
    const mailtoLink = `mailto:?subject=Payroll Calculation Summaries&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    toast({ title: "Sharing via Email", description: "Opening your email client..." });
  };

  const handleClearAllCalculations = () => {
    setSavedCalculations([]);
    toast({ title: "All Saved Cleared", description: "All saved payroll summaries have been removed." });
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">
              Payroll Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Calculate employee payroll including PAYE, NIS, and Health
            Surcharge for Trinidad &amp; Tobago.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Card className="w-full shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                <User className="mr-2 h-6 w-6" /> Employee Payroll Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="employeeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          Employee Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Jane Doe" {...field} />
                        </FormControl>
                        <FormDescription>Optional. e.g. Jane Doe</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="grossMonthlyIncome"
                        render={({ field }) => (
                        <FormItem className="md:col-span-1">
                            <FormLabel className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                            Gross Monthly Income (TT$)
                            </FormLabel>
                            <FormControl>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="e.g. 10000.00"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                            </FormControl>
                            <FormDescription>e.g. 10000.00</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="selectedMonth"
                        render={({ field }) => (
                        <FormItem className="md:col-span-1">
                            <FormLabel className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                            Month
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {months.map(month => (
                                <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="selectedYear"
                        render={({ field }) => (
                        <FormItem className="md:col-span-1">
                            <FormLabel className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                            Year
                            </FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {years.map(year => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          Payment Frequency
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="fortnightly">
                              Fortnightly
                            </SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overtimeHoursPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Hourglass className="mr-2 h-4 w-4 text-muted-foreground" />
                          Overtime Hours per Week
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 5.0"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Optional. e.g. 5.0</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overtimeMultiplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
                          Overtime Multiplier
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="e.g. 1.5"
                            {...field}
                             value={field.value ?? ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional. Defaults to 1.5. e.g. 1.5
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Calculate Payroll
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {calculationResults.monthName && (
            <Card className="w-full shadow-lg rounded-xl mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                  <CircleCheckBig className="mr-2 h-6 w-6" /> Estimated Deductions for {calculationResults.employeeNameDisplay} ({calculationResults.monthName} {calculationResults.yearDisplay})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Monthly Income:</span> <strong className="text-foreground">TT$ {calculationResults.grossMonthlyIncomeDisplay}</strong>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Est. Annual Income:</span> <span>TT$ {calculationResults.estAnnualIncome}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <span>Mondays in selected month:</span> <span>{calculationResults.mondaysInMonth}</span>
                </div>
                
                <Separator className="my-2" />
                <p className="font-medium text-foreground">NIS Details:</p>
                <div className="pl-4 space-y-1">
                    <div className="flex justify-between">
                        <span>NIS Class:</span> <span className="text-foreground">{calculationResults.nisClass}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Est. Weekly NIS (Employee):</span> <span className="text-foreground">TT$ {calculationResults.estWeeklyNISEmployee}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Est. Weekly NIS (Employer):</span> <span className="text-foreground">TT$ {calculationResults.estWeeklyNISEmployer}</span>
                    </div>
                </div>

                <Separator className="my-2" />
                <p className="font-medium text-foreground">Employee Deductions (Monthly):</p>
                <div className="pl-4 space-y-1">
                    <div className="flex justify-between">
                    <span>PAYE:</span> <span className="text-foreground">TT$ {calculationResults.payeMonthly}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>NIS (Employee):</span> <span className="text-foreground">TT$ {calculationResults.nisMonthlyEmployee}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Health Surcharge:</span> <span className="text-foreground">TT$ {calculationResults.healthSurchargeMonthly}</span>
                    </div>
                </div>
                
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly Deductions (Employee):</span><strong className="text-destructive">TT$ {calculationResults.totalMonthlyDeductions}</strong>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary mt-1">
                  <span>Net Take-Home Pay:</span><span>TT$ {calculationResults.netTakeHomePay}</span>
                </div>

                <Separator className="my-2" />
 <div className="flex justify-between text-m font-bold text-primd
 ary mt-1">
 <span>Total Payroll Tax (Employee Deductions + Employer NIS):</span><span>TT$ {calculationResults.totalPayrollTaxDisplay}</span>
 </div>

 <div className="flex justify-between items-center mt-2"> {/* Adjusted spacing */}
 <span className="text-muted-foreground flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Employer's NIS Contribution (Monthly):
                  </span>
                  <strong className="text-muted-foreground">TT$ {calculationResults.employerNISMonthly}</strong>
                </div>
              </CardContent>
               <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
                    <Copy className="mr-2 h-4 w-4" /> Copy Results
                </Button>
                <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
                </Button>
                 <Button variant="outline" onClick={handleSaveCalculation} className="w-full text-sm h-9 flex-1">
                    <Save className="mr-2 h-4 w-4" /> Save Calculation
                </Button>
              </CardFooter>
            </Card>
          )}
        </CardContent>
      </Card>
        
      <p className="text-xs text-muted-foreground text-center w-full max-w-3xl mx-auto my-6">
        This calculator provides estimates based on current general tax
        rules for Trinidad &amp; Tobago. Always consult with a qualified
        tax professional for definitive advice. PAYE is based on annual income (TT$90,000 personal allowance, 25% on first TT$72,000 chargeable, 30% thereafter). NIS based on NIBTT Earnings Classes. Health Surcharge based on weekly income (TT$4.13/wk up to TT$110/wk, TT$8.25/wk above) &amp; Mondays in month.
      </p>

      {savedCalculations.length > 0 && (
        <Card className="w-full max-w-3xl shadow-lg rounded-xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <ListChecks className="mr-2 h-6 w-6" /> Saved Payroll Summaries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCalculations.map((calc) => (
                <Card key={calc.id} className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{calc.employeeNameDisplay}</p>
                        <p className="text-xs text-muted-foreground">{calc.monthName} {calc.yearDisplay}</p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewCalculation(calc)} className="h-7 w-7 mr-1">
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveCalculation(calc.id)} className="h-7 w-7">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-xs pt-1">
                      Saved: {calc.timestamp}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1 pt-0">
                    <div className="flex justify-between"><span>Gross Income:</span> <span className="font-medium">TT$ {calc.grossMonthlyIncomeDisplay}</span></div>
                    <div className="flex justify-between"><span>Total Deductions:</span> <span className="font-medium">TT$ {calc.totalMonthlyDeductions}</span></div>
                    <div className="flex justify-between"><span>Net Pay:</span> <strong className="text-primary">TT$ {calc.netTakeHomePay}</strong></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-6 border-t mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full text-sm h-9 flex-1">
                  <Download className="mr-2 h-4 w-4" /> Export Data <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={handleExportCSV}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportXLSX}>Export as XLSX (Coming Soon)</DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF}>Export as PDF (Coming Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={handleShareViaEmail} className="w-full text-sm h-9 flex-1">
              <Mail className="mr-2 h-4 w-4" /> Share via Email
            </Button>
            <Button variant="destructive" onClick={handleClearAllCalculations} className="w-full text-sm h-9 flex-1">
              <Trash2 className="mr-2 h-4 w-4" /> Clear All Saved
            </Button>
          </CardFooter>
        </Card>
      )}

      {viewModalData && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-primary flex items-center">
                <CircleCheckBig className="mr-2 h-6 w-6" /> Payroll Details for {viewModalData.employeeNameDisplay}
              </DialogTitle>
              <DialogDescription>
                Calculation from {viewModalData.monthName} {viewModalData.yearDisplay} (Saved: {viewModalData.timestamp})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm py-4 max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between"><span>Gross Monthly Income:</span> <strong className="text-foreground">TT$ {viewModalData.grossMonthlyIncomeDisplay}</strong></div>
              <div className="flex justify-between text-muted-foreground"><span>Est. Annual Income:</span> <span>TT$ {viewModalData.estAnnualIncome}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Mondays in selected month:</span> <span>{viewModalData.mondaysInMonth}</span></div>
              <Separator className="my-2" />
              <p className="font-medium text-foreground">NIS Details:</p>
              <div className="pl-4 space-y-1">
                <div className="flex justify-between"><span>NIS Class:</span> <span className="text-foreground">{viewModalData.nisClass}</span></div>
                <div className="flex justify-between"><span>Est. Weekly NIS (Employee):</span> <span className="text-foreground">TT$ {viewModalData.estWeeklyNISEmployee}</span></div>
                <div className="flex justify-between"><span>Est. Weekly NIS (Employer):</span> <span className="text-foreground">TT$ {viewModalData.estWeeklyNISEmployer}</span></div>
              </div>
              <Separator className="my-2" />
              <p className="font-medium text-foreground">Employee Deductions (Monthly):</p>
              <div className="pl-4 space-y-1">
                <div className="flex justify-between"><span>PAYE:</span> <span className="text-foreground">TT$ {viewModalData.payeMonthly}</span></div>
                <div className="flex justify-between"><span>NIS (Employee):</span> <span className="text-foreground">TT$ {viewModalData.nisMonthlyEmployee}</span></div>
                <div className="flex justify-between"><span>Health Surcharge:</span> <span className="text-foreground">TT$ {viewModalData.healthSurchargeMonthly}</span></div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold"><span>Total Monthly Deductions (Employee):</span><strong className="text-destructive">TT$ {viewModalData.totalMonthlyDeductions}</strong></div>
              <div className="flex justify-between text-lg font-bold text-primary mt-1"><span>Net Take-Home Pay:</span><span>TT$ {viewModalData.netTakeHomePay}</span></div>
              <Separator className="my-2" />
 <div className="flex justify-between text-lg font-bold text-primary mt-1">
 <span>Total Payroll Tax (Employee Deductions + Employer NIS):</span><span>TT$ {viewModalData.totalPayrollTaxDisplay}</span>
 </div>

 <div className="flex justify-between items-center mt-2"> {/* Adjusted spacing */}
 <span className="text-muted-foreground flex items-center"><Briefcase className="mr-2 h-4 w-4" />Employer's NIS Contribution (Monthly):</span>
                <strong className="text-muted-foreground">TT$ {viewModalData.employerNISMonthly}</strong>
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="mt-4 w-full">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

