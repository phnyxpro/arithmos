
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
import { Clock, Watch, Copy, Trash2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TimeCalculatorPage() {
  const { toast } = useToast();

  // State for "Calculate Duration & Pay"
  const [basicStartTime, setBasicStartTime] = React.useState("09:00");
  const [basicEndTime, setBasicEndTime] = React.useState("17:00");
  const [basicHourlyRate, setBasicHourlyRate] = React.useState("");
  const [durationResult, setDurationResult] = React.useState<string | null>(null);

  // State for "Add / Subtract Time"
  const [baseTime, setBaseTime] = React.useState("10:00");
  const [hoursToModify, setHoursToModify] = React.useState("2");
  const [minutesToModify, setMinutesToModify] = React.useState("30");
  const [addSubtractResult, setAddSubtractResult] = React.useState<string | null>(null);

  const handleCalculateDuration = () => {
    // Basic validation
    if (!basicStartTime || !basicEndTime) {
      toast({ title: "Error", description: "Please enter Start and End times.", variant: "destructive" });
      return;
    }
    // Dummy calculation logic
    const rate = parseFloat(basicHourlyRate) || 0;
    const durationHours = 8; // Placeholder
    const pay = durationHours * rate;
    setDurationResult(`Duration: ${durationHours} hours. Estimated Pay: TT$${pay.toFixed(2)}`);
    toast({ title: "Calculation Complete", description: `Duration: ${durationHours} hrs. Pay: TT$${pay.toFixed(2)}` });
  };

  const handleCopyResults = () => {
    if (durationResult) {
      navigator.clipboard.writeText(durationResult);
      toast({ title: "Copied!", description: "Results copied to clipboard." });
    } else {
      toast({ title: "No results", description: "Calculate first to copy results.", variant: "default" });
    }
  };

  const handleClearDurationFields = () => {
    setBasicStartTime("09:00");
    setBasicEndTime("17:00");
    setBasicHourlyRate("");
    setDurationResult(null);
    toast({ title: "Fields Cleared", description: "Duration calculator fields have been reset." });
  };
  
  const handleAddTime = () => {
    // Dummy logic
    setAddSubtractResult(`Result of adding time: (New Time)`);
    toast({ title: "Time Added (Dummy)", description: "Time addition simulated." });
  };

  const handleSubtractTime = () => {
    // Dummy logic
    setAddSubtractResult(`Result of subtracting time: (New Time)`);
    toast({ title: "Time Subtracted (Dummy)", description: "Time subtraction simulated." });
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-[90vw] max-w-3xl shadow-xl rounded-xl mb-8">
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
                  <CardHeader>
                    <CardTitle className="text-lg text-primary flex items-center">
                      <Watch className="mr-2 h-5 w-5" /> Calculate Duration &amp; Pay
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
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
                     <Button onClick={handleCalculateDuration} className="w-full mt-3 text-xs h-9">Calculate</Button>
                     {durationResult && <p className="text-center text-primary font-medium mt-2 p-2 bg-primary/10 rounded-md">{durationResult}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleCopyResults} className="w-full text-xs h-9 flex-1">
                      <Copy className="mr-2 h-3 w-3" /> Copy Results
                    </Button>
                    <Button variant="outline" onClick={handleClearDurationFields} className="w-full text-xs h-9 flex-1">
                      <Trash2 className="mr-2 h-3 w-3" /> Clear Fields
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-primary flex items-center">
                      <Plus className="mr-1 h-5 w-5" />
                      <Minus className="mr-2 h-5 w-5" /> Add / Subtract Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
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
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleAddTime} className="w-full text-xs h-9 flex-1">
                      <Plus className="mr-2 h-3 w-3" /> Add Time
                    </Button>
                    <Button variant="outline" onClick={handleSubtractTime} className="w-full text-xs h-9 flex-1">
                      <Minus className="mr-2 h-3 w-3" /> Subtract Time
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="mt-6 space-y-6">
              <p className="text-muted-foreground text-center py-8">
                Advanced Pay Calculator functionality will be implemented here.
              </p>
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
                The basic time and pay calculator here does not automatically estimate NIS or Health Surcharge. For detailed statutory deductions, please use our dedicated "PAYE, NIS & HS (Payroll)" calculator. This tool focuses on gross pay based on hours worked.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

    