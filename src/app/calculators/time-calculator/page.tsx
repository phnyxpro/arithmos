
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Watch, Copy, Trash2, Plus, Minus, User, DollarSign, TrendingDown, Briefcase as BriefcaseIcon } from "lucide-react"; // Added BriefcaseIcon alias
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { parse, isValid } from 'date-fns';

export default function TimeCalculatorPage() {
  const { toast } = useToast();

  // State for "Basic Time Tools - Calculate Duration & Pay"
  const [basicStartTime, setBasicStartTime] = React.useState("09:00");
  const [basicEndTime, setBasicEndTime] = React.useState("17:00");
  const [basicHourlyRate, setBasicHourlyRate] = React.useState("");
  const [basicDurationResult, setBasicDurationResult] = React.useState<string | null>(null);

  // State for "Basic Time Tools - Add / Subtract Time"
  const [baseTime, setBaseTime] = React.useState("10:00");
  const [hoursToModify, setHoursToModify] = React.useState("2");
  const [minutesToModify, setMinutesToModify] = React.useState("30");
  const [addSubtractResult, setAddSubtractResult] = React.useState<string | null>(null);

  // State for "Advanced Pay Calculator"
  const [employeeNameAdv, setEmployeeNameAdv] = React.useState("");
  const [workDateAdv, setWorkDateAdv] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [clockInTimeAdv, setClockInTimeAdv] = React.useState("08:00");
  const [clockOutTimeAdv, setClockOutTimeAdv] = React.useState("17:00");
  const [breakDurationAdv, setBreakDurationAdv] = React.useState("60");
  const [breakUnitAdv, setBreakUnitAdv] = React.useState<"minutes" | "hours">("minutes");

  const [hourlyRateAdv, setHourlyRateAdv] = React.useState("");
  const [overtimeThresholdAdv, setOvertimeThresholdAdv] = React.useState("8");
  const [overtimeMultiplierAdv, setOvertimeMultiplierAdv] = React.useState("1.5");

  const [applyNISAdv, setApplyNISAdv] = React.useState(true);
  const [applyHealthSurchargeAdv, setApplyHealthSurchargeAdv] = React.useState(true);
  const [otherDeductionsAdv, setOtherDeductionsAdv] = React.useState("");

  const [advancedCalcResults, setAdvancedCalcResults] = React.useState<string | null>(null);

  // State for table data
  const [calculationTableData, setCalculationTableData] = React.useState<any[]>([]);


  // Advanced Pay Calculation Logic
  const calculateAdvancedPay = React.useCallback(() => {
    // Ensure essential inputs are available and valid numbers
    const hourlyRate = parseFloat(hourlyRateAdv) || 0;
    const overtimeThreshold = parseFloat(overtimeThresholdAdv) || 0;
    const overtimeMultiplier = parseFloat(overtimeMultiplierAdv) || 1; // Default multiplier is 1
    const otherDeductions = parseFloat(otherDeductionsAdv) || 0;
    const breakDuration = parseFloat(breakDurationAdv) || 0;

    if (!clockInTimeAdv || !clockOutTimeAdv || hourlyRate <= 0) {
      setAdvancedCalcResults(null); // Clear results if essential inputs are missing or invalid
      return;
    }

    // Parse times (assuming HH:mm format)
    const today = format(new Date(), "yyyy-MM-dd"); // Use a consistent date for time parsing
    const start = parse(`${today} ${clockInTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());
    let end = parse(`${today} ${clockOutTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());

    // Handle overnight shifts (if end time is before start time, assume next day)
    if (isValid(start) && isValid(end) && end < start) {
      end = parse(`${format(new Date(today), 'yyyy-MM-dd')} ${clockOutTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());
      end.setDate(end.getDate() + 1); // Add a day
    }

    if (!isValid(start) || !isValid(end)) {
       setAdvancedCalcResults("Invalid time format.");
       return;
    }

    // Calculate total duration in minutes
    const totalDurationMs = end.getTime() - start.getTime();
    const totalDurationMinutes = totalDurationMs / (1000 * 60);

    // Adjust for break duration
    let breakMinutes = breakDuration;
    if (breakUnitAdv === 'hours') {
        breakMinutes = breakDuration * 60;
    }

    const payableMinutes = Math.max(0, totalDurationMinutes - breakMinutes);
    const payableHours = payableMinutes / 60;

    // Calculate regular and overtime hours
    let regularHours = Math.min(payableHours, overtimeThreshold);
    let overtimeHours = Math.max(0, payableHours - overtimeThreshold);

    // Calculate pay
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
    const grossPay = regularPay + overtimePay;

    // Calculate deductions
    const nisDeduction = applyNISAdv ? grossPay * 0.056 : 0; // 5.6% of Gross Pay

    let healthSurchargeDeduction = 0;
    const estimatedDailyIncome = grossPay; // Using gross pay as the basis for daily income estimate
    if (applyHealthSurchargeAdv) {
        if (estimatedDailyIncome > 21.80) { // Estimated daily threshold
            healthSurchargeDeduction = 1.65; // Estimated daily rate
        } else {
            healthSurchargeDeduction = 0.96; // Estimated daily rate
        }
    }

    const totalDeductions = nisDeduction + healthSurchargeDeduction + otherDeductions;
    const netPay = grossPay - totalDeductions;

    // Format results
    const resultsSummary = `
Employee: ${employeeNameAdv || 'N/A'}
Date: ${format(parse(workDateAdv, 'yyyy-MM-dd', new Date()), 'PPP')}
Worked Hours: ${payableHours.toFixed(2)} (${regularHours.toFixed(2)} regular, ${overtimeHours.toFixed(2)} OT)
Gross Pay: TT$${grossPay.toFixed(2)}
NIS Deduction: TT$${nisDeduction.toFixed(2)}
Health Surcharge Deduction: TT$${healthSurchargeDeduction.toFixed(2)}
Other Deductions: TT$${otherDeductions.toFixed(2)}
Total Deductions: TT$${totalDeductions.toFixed(2)}
Net Pay: TT$${netPay.toFixed(2)}
    `.trim();

    setAdvancedCalcResults(resultsSummary);

  }, [
 employeeNameAdv,
    breakDurationAdv,
 breakUnitAdv,
 clockInTimeAdv,
 clockOutTimeAdv,
    hourlyRateAdv,
    workDateAdv,
    clockInTimeAdv,
    clockOutTimeAdv,
    breakDurationAdv,
    breakUnitAdv,
    hourlyRateAdv,
    overtimeThresholdAdv,
    overtimeMultiplierAdv,
    applyNISAdv,
    applyHealthSurchargeAdv,
    otherDeductionsAdv,
  ]);

  // Effect hook to trigger calculation on input changes
  React.useEffect(() => {
    calculateAdvancedPay();
  }, [calculateAdvancedPay]); // Dependency array includes the memoized calculation function

  const handleBasicCalculateDuration = () => {
    if (!basicStartTime || !basicEndTime) {
      toast({ title: "Error", description: "Please enter Start and End times.", variant: "destructive" });
      return;
    }
    // Dummy calculation logic
    const rate = parseFloat(basicHourlyRate) || 0;
    const durationHours = 8; // Placeholder
    const pay = durationHours * rate;
    setBasicDurationResult(`Duration: ${durationHours} hours. Estimated Pay: TT$${pay.toFixed(2)}`);
    toast({ title: "Calculation Complete (Basic)", description: `Duration: ${durationHours} hrs. Pay: TT$${pay.toFixed(2)}` });
  };

  const handleBasicCopyResults = () => {
    if (basicDurationResult) {
      navigator.clipboard.writeText(basicDurationResult);
      toast({ title: "Copied!", description: "Basic time results copied to clipboard." });
    } else {
      toast({ title: "No results", description: "Calculate first to copy results.", variant: "default" });
    }
  };

  const handleBasicClearDurationFields = () => {
    setBasicStartTime("09:00");
    setBasicEndTime("17:00");
    setBasicHourlyRate("");
    setBasicDurationResult(null);
    toast({ title: "Fields Cleared", description: "Basic duration calculator fields have been reset." });
  };
  
  const handleBasicAddTime = () => {
    setAddSubtractResult(`Result of adding time: (New Time)`);
    toast({ title: "Time Added (Basic - Dummy)", description: "Time addition simulated." });
  };

  const handleBasicSubtractTime = () => {
    setAddSubtractResult(`Result of subtracting time: (New Time)`);
    toast({ title: "Time Subtracted (Basic - Dummy)", description: "Time subtraction simulated." });
  };

  const handleAddToTable = () => {
    // Ensure there are results to add
    if (!advancedCalcResults) {
      toast({ title: "Cannot Add", description: "Please calculate first to add to table.", variant: "default" });
      return;
    }

    // Re-calculate values to store in a structured object
    const hourlyRate = parseFloat(hourlyRateAdv) || 0;
    const overtimeThreshold = parseFloat(overtimeThresholdAdv) || 0;
    const overtimeMultiplier = parseFloat(overtimeMultiplierAdv) || 1;
    const otherDeductions = parseFloat(otherDeductionsAdv) || 0;
    const breakDuration = parseFloat(breakDurationAdv) || 0;

    // Recalculate logic (should match the calculateAdvancedPay function's core logic)
    const today = format(new Date(), "yyyy-MM-dd");
    const start = parse(`${today} ${clockInTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());
    let end = parse(`${today} ${clockOutTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());

    if (isValid(start) && isValid(end) && end < start) {
      end = parse(`${format(new Date(today), 'yyyy-MM-dd')} ${clockOutTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());
      end.setDate(end.getDate() + 1);
    }

    if (!isValid(start) || !isValid(end)) {
        toast({ title: "Error", description: "Invalid time format, cannot add to table.", variant: "destructive" });
        return;
    }

    const totalDurationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    let breakMinutes = breakDuration;
    if (breakUnitAdv === 'hours') {
        breakMinutes = breakDuration * 60;
    }
    const payableMinutes = Math.max(0, totalDurationMinutes - breakMinutes);
    const payableHours = payableMinutes / 60;

  };

  const handleCopyAdvancedResults = () => {
    if (advancedCalcResults) {
      navigator.clipboard.writeText(advancedCalcResults);
      toast({ title: "Copied!", description: "Calculation summary copied to clipboard." });
    } else {
      toast({ title: "No results", description: "Calculate first to copy results.", variant: "default" });
    }
  };

  const calculateValuesForTable = () => {
      // Ensure essential inputs are available and valid numbers
      const hourlyRate = parseFloat(hourlyRateAdv) || 0;
      const overtimeThreshold = parseFloat(overtimeThresholdAdv) || 0;
      const overtimeMultiplier = parseFloat(overtimeMultiplierAdv) || 1; // Default multiplier is 1
      const otherDeductions = parseFloat(otherDeductionsAdv) || 0;
      const breakDuration = parseFloat(breakDurationAdv) || 0;

      if (!clockInTimeAdv || !clockOutTimeAdv || hourlyRate <= 0) {
          return null; // Return null if essential inputs are missing or invalid
      }

      // Parse times (assuming HH:mm format)
      const today = format(new Date(), "yyyy-MM-dd"); // Use a consistent date for time parsing
      const start = parse(`${today} ${clockInTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());
      let end = parse(`${today} ${clockOutTimeAdv}`, 'yyyy-MM-dd HH:mm', new Date());

      // Handle overnight shifts (if end time is before start time, assume next day)
      if (isValid(start) && isValid(end) && end < start) {
          end.setDate(end.getDate() + 1); // Add a day
      }

      if (!isValid(start) || !isValid(end)) {
          return null;
      }

      // Calculate total duration in minutes
      const totalDurationMs = end.getTime() - start.getTime();
      const totalDurationMinutes = totalDurationMs / (1000 * 60);

      // Adjust for break duration
      let breakMinutes = breakDuration;
      if (breakUnitAdv === 'hours') {
          breakMinutes = breakDuration * 60;
      }

      const payableMinutes = Math.max(0, totalDurationMinutes - breakMinutes);
      const payableHours = payableMinutes / 60;

      // Calculate regular and overtime hours
      let regularHours = Math.min(payableHours, overtimeThreshold);
      let overtimeHours = Math.max(0, payableHours - overtimeThreshold);

      // Calculate pay
      const regularPay = regularHours * hourlyRate;
      const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
      const grossPay = regularPay + overtimePay;

      // Calculate deductions (simplified for re-use)
      const nisDeduction = applyNISAdv ? grossPay * 0.056 : 0;
      let healthSurchargeDeduction = 0;
      const estimatedDailyIncome = grossPay;
      if (applyHealthSurchargeAdv) {
          if (estimatedDailyIncome > 21.80) {
              healthSurchargeDeduction = 1.65;
          } else {
              healthSurchargeDeduction = 0.96;
          }
      }
      const totalDeductions = nisDeduction + healthSurchargeDeduction + otherDeductions;
      const netPay = grossPay - totalDeductions;

      return {
          employeeNameAdv,
          workDateAdv,
          clockInTimeAdv,
          clockOutTimeAdv,
          breakDurationAdv: `${breakDuration} ${breakUnitAdv}`,
          hourlyRateAdv,
          overtimeThresholdAdv,
          overtimeMultiplierAdv,
          applyNISAdv,
          applyHealthSurchargeAdv,
          otherDeductionsAdv,
          payableHours: payableHours.toFixed(2),
          regularHours: regularHours.toFixed(2),
          overtimeHours: overtimeHours.toFixed(2),
          grossPay: grossPay.toFixed(2),
          nisDeduction: nisDeduction.toFixed(2),
          healthSurchargeDeduction: healthSurchargeDeduction.toFixed(2),
          totalDeductions: totalDeductions.toFixed(2),
          netPay: netPay.toFixed(2),
      };
  };

  const handleAddToTable = () => {
      const calculatedData = calculateValuesForTable();
      if (calculatedData) {
          setCalculationTableData([...calculationTableData, calculatedData]);
          toast({ title: "Added to Table", description: "Calculation added to the table below." });
          // Optionally clear fields after adding:
          // setEmployeeNameAdv("");
          // setWorkDateAdv(format(new Date(), "yyyy-MM-dd"));
          // setClockInTimeAdv("08:00");
          // setClockOutTimeAdv("17:00");
          // setBreakDurationAdv("60");
          // setBreakUnitAdv("minutes");
          // setHourlyRateAdv("");
          // setOtherDeductionsAdv("");
      } else {
          toast({ title: "Cannot Add", description: "Please ensure all required fields are filled correctly to calculate and add.", variant: "destructive" });
      }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl mb-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">Time Calculator</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Switch between basic time tools and advanced pay calculations for a single workday.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Time Tools</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Pay Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-6 space-y-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-primary flex items-center">
                      <Watch className="mr-2 h-5 w-5" /> Calculate Duration &amp; Pay
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                      <div>
                        <Label htmlFor="basicStartTimeDialog" className="text-xs">Start Time (HH:MM)</Label>
                        <Input
                          type="time"
                          id="basicStartTimeDialog"
                          value={basicStartTime}
                          onChange={(e) => setBasicStartTime(e.target.value)}
                          className="h-9 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="basicEndTimeDialog" className="text-xs">End Time (HH:MM)</Label>
                        <Input
                          type="time"
                          id="basicEndTimeDialog"
                          value={basicEndTime}
                          onChange={(e) => setBasicEndTime(e.target.value)}
                          className="h-9 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="basicHourlyRateDialog" className="text-xs">Hourly Rate (TT$)</Label>
                        <Input
                          type="number"
                          id="basicHourlyRateDialog"
                          placeholder="e.g., 50.00"
                          value={basicHourlyRate}
                          onChange={(e) => setBasicHourlyRate(e.target.value)}
                          className="h-9 text-xs mt-1"
                        />
                      </div>
                    </div>
                     <Button onClick={handleBasicCalculateDuration} className="w-full mt-3 text-xs h-9">Calculate</Button>
                     {basicDurationResult && <p className="text-center text-primary font-medium mt-2 p-2 bg-primary/10 rounded-md">{basicDurationResult}</p>}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleBasicCopyResults} className="w-full text-xs h-9 flex-1">
                      <Copy className="mr-2 h-3 w-3" /> Copy Results
                    </Button>
                    <Button variant="outline" onClick={handleBasicClearDurationFields} className="w-full text-xs h-9 flex-1">
                      <Trash2 className="mr-2 h-3 w-3" /> Clear Fields
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-primary flex items-center">
                      <Plus className="mr-1 h-5 w-5" />
                      <Minus className="mr-2 h-5 w-5" /> Add / Subtract Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-sm">
                    <div>
                      <Label htmlFor="basicBaseTimeDialog" className="text-xs">Base Time (HH:MM)</Label>
                      <Input
                        type="time"
                        id="basicBaseTimeDialog"
                        value={baseTime}
                        onChange={(e) => setBaseTime(e.target.value)}
                        className="h-9 text-xs mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="basicHoursToModifyDialog" className="text-xs">Hours to Add/Subtract</Label>
                        <Input
                          type="number"
                          id="basicHoursToModifyDialog"
                          placeholder="e.g., 2"
                          value={hoursToModify}
                          onChange={(e) => setHoursToModify(e.target.value)}
                          className="h-9 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="basicMinutesToModifyDialog" className="text-xs">Minutes to Add/Subtract</Label>
                        <Input
                          type="number"
                          id="basicMinutesToModifyDialog"
                          placeholder="e.g., 30"
                          value={minutesToModify}
                          onChange={(e) => setMinutesToModify(e.target.value)}
                          className="h-9 text-xs mt-1"
                        />
                      </div>
                    </div>
                    {addSubtractResult && <p className="text-center text-primary font-medium mt-2 p-2 bg-primary/10 rounded-md">{addSubtractResult}</p>}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleBasicAddTime} className="w-full text-xs h-9 flex-1">
                      <Plus className="mr-2 h-3 w-3" /> Add Time
                    </Button>
                    <Button variant="outline" onClick={handleBasicSubtractTime} className="w-full text-xs h-9 flex-1">
                      <Minus className="mr-2 h-3 w-3" /> Subtract Time
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="mt-6 space-y-6">
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <User className="mr-2 h-5 w-5" /> Workday Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeNameAdv">Employee Name (Optional)</Label>
                      <Input id="employeeNameAdv" placeholder="e.g., Jane Doe" value={employeeNameAdv} onChange={(e) => setEmployeeNameAdv(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="workDateAdv">Date</Label>
                      <Input id="workDateAdv" type="date" value={workDateAdv} onChange={(e) => setWorkDateAdv(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clockInTimeAdv">Clock In Time</Label>
                      <Input id="clockInTimeAdv" type="time" value={clockInTimeAdv} onChange={(e) => setClockInTimeAdv(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="clockOutTimeAdv">Clock Out Time</Label>
                      <Input id="clockOutTimeAdv" type="time" value={clockOutTimeAdv} onChange={(e) => setClockOutTimeAdv(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <Label htmlFor="breakDurationAdv">Break Duration</Label>
                      <Input id="breakDurationAdv" type="number" placeholder="e.g., 30 or 1" value={breakDurationAdv} onChange={(e) => setBreakDurationAdv(e.target.value)} />
                    </div>
                    <Select value={breakUnitAdv} onValueChange={(value) => setBreakUnitAdv(value as "minutes" | "hours")}>
                      <SelectTrigger id="breakUnitAdv">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" /> Pay Rate &amp; Overtime
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="hourlyRateAdv">Hourly Rate (TT$)</Label>
                      <Input id="hourlyRateAdv" type="number" placeholder="e.g., 50.00" value={hourlyRateAdv} onChange={(e) => setHourlyRateAdv(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="overtimeThresholdAdv">OT Threshold (hours)</Label>
                      <Input id="overtimeThresholdAdv" type="number" placeholder="e.g., 8" value={overtimeThresholdAdv} onChange={(e) => setOvertimeThresholdAdv(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="overtimeMultiplierAdv">OT Multiplier</Label>
                      <Input id="overtimeMultiplierAdv" type="number" placeholder="e.g., 1.5" value={overtimeMultiplierAdv} onChange={(e) => setOvertimeMultiplierAdv(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <TrendingDown className="mr-2 h-5 w-5" /> Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="applyNISAdv" checked={applyNISAdv} onCheckedChange={(checked) => setApplyNISAdv(Boolean(checked))} />
                    <Label htmlFor="applyNISAdv">Apply NIS (5.6% of Gross Pay - daily estimate)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="applyHealthSurchargeAdv" checked={applyHealthSurchargeAdv} onCheckedChange={(checked) => setApplyHealthSurchargeAdv(Boolean(checked))} />
                    <Label htmlFor="applyHealthSurchargeAdv">Apply Health Surcharge (tiered, daily estimate)</Label>
                  </div>
                  <div>
                    <Label htmlFor="otherDeductionsAdv">Other Deductions (TT$)</Label>
                    <Input id="otherDeductionsAdv" type="number" placeholder="e.g., 20.00" value={otherDeductionsAdv} onChange={(e) => setOtherDeductionsAdv(e.target.value)} />
                  </div>
                </CardContent>
              </Card>
              
              {advancedCalcResults && (
                <Card className="mt-4 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">Calculation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{advancedCalcResults}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2 justify-end">
                      {/* Buttons for Add to Table, Copy, Export */}
                      <Button variant="secondary" className="text-xs h-9 flex-1" onClick={handleAddToTable}>
                         Add to Table
                      </Button>
                      <Button variant="outline" onClick={handleCopyAdvancedResults} className="text-xs h-9 flex-1">
                        <Copy className="mr-2 h-3 w-3" /> Copy Results
                      </Button>
                      <Button variant="outline" disabled className="text-xs h-9 flex-1">
                         Export (PDF/CSV)
                      </Button>
                    </CardContent>
                </Card>
              )}

            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl shadow-xl rounded-xl mt-8 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Understanding Time Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is time duration calculated?</AccordionTrigger>
              <AccordionContent>
                The duration is calculated from the Start Time to the End Time. If the End Time is earlier than the Start Time, it assumes an overnight shift (crossing midnight). Pay is estimated by multiplying this duration (in hours) by the Hourly Rate you provide. This is a basic calculation and does not include overtime, breaks (unless manually adjusted in times), or other specific pay conditions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What about time zones?</AccordionTrigger>
              <AccordionContent>
                This calculator uses the local time settings of your device or browser. It does not perform time zone conversions. All times entered should be for the same local time zone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>NIS and Health Surcharge Estimates</AccordionTrigger>
              <AccordionContent>
                The basic time and pay calculator here does not automatically estimate NIS or Health Surcharge. For detailed statutory deductions, please use our dedicated "PAYE, NIS & HS (Payroll)" calculator. This tool focuses on gross pay based on hours worked. The Advanced Pay Calculator tab on this page provides daily estimates for NIS and Health Surcharge for illustrative purposes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Table to display added calculations */}
      {calculationTableData.length > 0 && (
        <Card className="w-full max-w-3xl shadow-xl rounded-xl mt-8 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <BriefcaseIcon className="mr-2 h-5 w-5" /> Saved Calculations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock In
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock Out
                    </th>
 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hourly Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Payable Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gross Pay
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIS
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Health Surcharge
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Other Deductions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Pay
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {calculationTableData.map((rowData, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rowData.employeeNameAdv || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(parse(rowData.workDateAdv, 'yyyy-MM-dd', new Date()), 'PPP')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rowData.clockInTimeAdv}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rowData.clockOutTimeAdv}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rowData.breakDurationAdv}
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        TT${parseFloat(rowData.hourlyRateAdv).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rowData.payableHours}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        TT${rowData.grossPay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TT${rowData.nisDeduction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TT${rowData.healthSurchargeDeduction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TT${rowData.otherDeductionsAdv}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TT${rowData.netPay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    