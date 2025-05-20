
"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Watch, Copy, Trash2, Plus, Minus } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Uncomment if toasts are desired

export function BasicTimeCalculator() {
  // const { toast } = useToast(); // Uncomment if toasts are desired

  // State for "Calculate Duration & Pay"
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("17:00");
  const [hourlyRate, setHourlyRate] = React.useState("");
  const [durationDisplay, setDurationDisplay] = React.useState("Duration: 8 hours, 0 minutes"); // From HTML example
  // Add state for estimated pay if you plan to calculate and display it
  // const [estimatedPay, setEstimatedPay] = React.useState<string | null>(null);


  // State for "Add / Subtract Time"
  const [baseTime, setBaseTime] = React.useState("10:00");
  const [hoursToModify, setHoursToModify] = React.useState("2");
  const [minutesToModify, setMinutesToModify] = React.useState("30");
  // Add state for add/subtract result if you plan to display it
  // const [addSubtractResult, setAddSubtractResult] = React.useState<string | null>(null);

  const handleCalculateDurationAndPay = () => {
    // Placeholder logic:
    // Parse startTime, endTime, hourlyRate
    // Calculate duration
    // Calculate pay = durationInHours * hourlyRate
    // Update durationDisplay and estimatedPay states
    // For now, just log or show a toast
    console.log("Calculating duration and pay...", { startTime, endTime, hourlyRate });
    // Example:
    // const duration = ... calculate difference between endTime and startTime ...
    // const pay = duration * parseFloat(hourlyRate || "0");
    // setDurationDisplay(`Duration: X hours, Y minutes`);
    // setEstimatedPay(`Estimated Pay: $${pay.toFixed(2)}`);
    // toast({ title: "Calculation Updated (placeholder)" });
  };

  // React.useEffect to recalculate when relevant inputs change for "Calculate Duration & Pay"
  React.useEffect(() => {
    // This is a placeholder for a real calculation function.
    // You would call your actual calculation logic here if you want it to be reactive.
    // For now, it's just an example of how you might trigger it.
    // handleCalculateDurationAndPay(); 
    console.log("Inputs changed, consider recalculating duration/pay if it should be live.");
  }, [startTime, endTime, hourlyRate]);


  const handleCopyResults = () => {
    console.log("Copy Results clicked. Duration:", durationDisplay);
    // Add logic to copy durationDisplay and/or estimatedPay to clipboard
    // navigator.clipboard.writeText(`${durationDisplay}${estimatedPay ? ` - ${estimatedPay}` : ''}`);
    // toast({ title: "Results Copied (placeholder)" });
  };

  const handleClearFields = () => {
    setStartTime("09:00");
    setEndTime("17:00");
    setHourlyRate("");
    setDurationDisplay("Duration: 0 hours, 0 minutes");
    // setEstimatedPay(null);
    console.log("Clear Fields clicked");
    // toast({ title: "Fields Cleared" });
  };

  const handleAddTime = () => {
    console.log("Add Time clicked", { baseTime, hoursToModify, minutesToModify });
    // Add logic to calculate new time
    // setAddSubtractResult("New Time: HH:MM (placeholder)");
    // toast({ title: "Time Added (placeholder)" });
  };

  const handleSubtractTime = () => {
    console.log("Subtract Time clicked", { baseTime, hoursToModify, minutesToModify });
    // Add logic to calculate new time
    // setAddSubtractResult("New Time: HH:MM (placeholder)");
    // toast({ title: "Time Subtracted (placeholder)" });
  };

  return (
    <div className="py-4">
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
                <Label htmlFor="calc-start-time" className="text-xs">Start Time (HH:MM)</Label>
                <Input
                  type="time"
                  id="calc-start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label htmlFor="calc-end-time" className="text-xs">End Time (HH:MM)</Label>
                <Input
                  type="time"
                  id="calc-end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label htmlFor="calc-hourly-rate" className="text-xs">Hourly Rate (TT$)</Label>
                <Input
                  type="number"
                  id="calc-hourly-rate"
                  placeholder="e.g., 50.00"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div className="mt-3 p-2.5 bg-muted/50 rounded-md text-center space-y-1 border">
              <p className="text-sm font-semibold text-foreground">{durationDisplay}</p>
              {/* {estimatedPay && <p className="text-xs text-muted-foreground">{estimatedPay}</p>} */}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCopyResults} className="w-full text-xs h-9 flex-1">
              <Copy className="mr-2 h-3 w-3" /> Copy Results
            </Button>
            <Button variant="outline" onClick={handleClearFields} className="w-full text-xs h-9 flex-1">
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
              <Label htmlFor="addsub-base-time" className="text-xs">Base Time (HH:MM)</Label>
              <Input
                type="time"
                id="addsub-base-time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="addsub-hours" className="text-xs">Hours to Add/Subtract</Label>
                <Input
                  type="number"
                  id="addsub-hours"
                  placeholder="e.g., 2"
                  value={hoursToModify}
                  onChange={(e) => setHoursToModify(e.target.value)}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label htmlFor="addsub-minutes" className="text-xs">Minutes to Add/Subtract</Label>
                <Input
                  type="number"
                  id="addsub-minutes"
                  placeholder="e.g., 30"
                  value={minutesToModify}
                  onChange={(e) => setMinutesToModify(e.target.value)}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            {/* {addSubtractResult && (
              <div className="mt-3 p-2.5 bg-muted/50 rounded-md text-center space-y-1 border">
                <p className="text-sm font-semibold text-foreground">{addSubtractResult}</p>
              </div>
            )} */}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleAddTime} className="w-full text-xs h-9 flex-1">
              <Plus className="mr-2 h-3 w-3" /> Add Time
            </Button>
            <Button variant="outline" onClick={handleSubtractTime} className="w-full text-xs h-9 flex-1">
              <Minus className="mr-2 h-3 w-3" /> Subtract Time
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    