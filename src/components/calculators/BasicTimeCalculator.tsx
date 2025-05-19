"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock } from 'lucide-react';

// This is a placeholder component.
// You can expand this with actual calculator logic.
export function BasicTimeCalculator() {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [breakMinutes, setBreakMinutes] = React.useState(0);
  const [hourlyRate, setHourlyRate] = React.useState(0);
  const [result, setResult] = React.useState<string | null>(null);

  const calculateTime = () => {
    if (!startTime || !endTime) {
      setResult("Please enter both start and end times.");
      return;
    }

    try {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setResult("Invalid time format. Please use HH:MM.");
        return;
      }
      
      let diffMs = end.getTime() - start.getTime();
      if (diffMs < 0) { // Handles overnight shifts by adding 24 hours
        diffMs += 24 * 60 * 60 * 1000;
      }

      const totalMinutes = diffMs / (1000 * 60);
      const workMinutes = totalMinutes - (Number(breakMinutes) || 0);
      
      if (workMinutes < 0) {
        setResult("Break time cannot exceed total work time.");
        return;
      }

      const hours = Math.floor(workMinutes / 60);
      const minutes = Math.round(workMinutes % 60);
      
      let resultString = `Total Work Time: ${hours} hours and ${minutes} minutes.`;

      if (Number(hourlyRate) > 0) {
        const grossPay = (workMinutes / 60) * Number(hourlyRate);
        resultString += `\nEstimated Gross Pay: $${grossPay.toFixed(2)}`;
      }
      setResult(resultString);

    } catch (error) {
      setResult("Error calculating time. Please check your inputs.");
      console.error(error);
    }
  };


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5 text-primary" /> Basic Time & Pay Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time (HH:MM)</Label>
            <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">End Time (HH:MM)</Label>
            <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="break-minutes">Break (minutes)</Label>
          <Input id="break-minutes" type="number" placeholder="e.g., 30" value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
          <Input id="hourly-rate" type="number" placeholder="e.g., 15.50" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
        </div>
        <Button onClick={calculateTime} className="w-full">Calculate Time & Pay</Button>
        {result && (
          <Alert className="mt-4">
            <AlertTitle>Calculation Result</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">
              {result}
            </AlertDescription>
          </Alert>
        )}
         <Alert variant="default" className="mt-4 text-xs">
            <AlertDescription>
              This is a simplified estimator. Overtime, night premiums, or other specific pay conditions are not included.
            </AlertDescription>
          </Alert>
      </CardContent>
    </Card>
  );
}