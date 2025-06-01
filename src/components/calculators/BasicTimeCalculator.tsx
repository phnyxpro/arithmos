
"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox'; // Added Checkbox
import { Watch, Copy, Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; // Uncommented useToast

export default function BasicTimeCalculator() {
  const { toast } = useToast();

  // State for "Calculate Duration & Pay"
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("17:00");
  const [isEndTimeNextDay, setIsEndTimeNextDay] = React.useState(false); // New state for checkbox
  const [hourlyRate, setHourlyRate] = React.useState("");
  const [durationDisplay, setDurationDisplay] = React.useState<string | null>(null);
  const [estimatedPay, setEstimatedPay] = React.useState<string | null>(null);


  // State for "Add / Subtract Time"
  const [baseTime, setBaseTime] = React.useState("10:00");
  const [hoursToModify, setHoursToModify] = React.useState("2");
  const [minutesToModify, setMinutesToModify] = React.useState("30");
  const [addSubtractResult, setAddSubtractResult] = React.useState<string | null>(null);


  const handleCalculateDurationAndPay = useCallback(() => {
    const rate = parseFloat(hourlyRate || "0");
    if (!startTime || !endTime) {
        setDurationDisplay(null);
        setEstimatedPay(null);
        return;
    }

    const [startHourStr, startMinuteStr] = startTime.split(':');
    const [endHourStr, endMinuteStr] = endTime.split(':');

    if (!startHourStr || !startMinuteStr || !endHourStr || !endMinuteStr) {
        setDurationDisplay("Invalid time format");
        setEstimatedPay(null);
        return;
    }

    const startHour = parseInt(startHourStr, 10);
    const startMinute = parseInt(startMinuteStr, 10);
    let endHour = parseInt(endHourStr, 10);
    const endMinute = parseInt(endMinuteStr, 10);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
        setDurationDisplay("Invalid time values");
        setEstimatedPay(null);
        return;
    }

    let startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;

    if (isEndTimeNextDay) {
        endTotalMinutes += 24 * 60; // Add 24 hours in minutes
    }

    if (endTotalMinutes < startTotalMinutes && !isEndTimeNextDay) {
        setDurationDisplay("End time < Start time (same day)");
        setEstimatedPay(null);
        toast({ title: "Invalid Time", description: "End time is before start time for the same day.", variant: "destructive"});
        return;
    }
    
    // If endTotalMinutes is still less (e.g. next day was checked, but start was 23:00 and end was 01:00 *without* next day being checked previously)
    // This specific scenario is tricky if the user toggles the checkbox AFTER setting invalid times.
    // The `isEndTimeNextDay` check above should correctly handle it.

    let diffMinutes = endTotalMinutes - startTotalMinutes;

    if (diffMinutes < 0) { // Should ideally not happen if logic above is sound with checkbox
        diffMinutes = 0; 
    }

    const durationHoursCalc = Math.floor(diffMinutes / 60);
    const durationMinutesCalc = diffMinutes % 60;

    const pay = (durationHoursCalc + durationMinutesCalc / 60) * rate;

    setDurationDisplay(`Duration: ${durationHoursCalc} hours, ${durationMinutesCalc} minutes`);
    setEstimatedPay(rate > 0 && pay > 0 ? `Estimated Pay: TT$${pay.toFixed(2)}` : null);

  }, [startTime, endTime, hourlyRate, isEndTimeNextDay, toast]);

  React.useEffect(() => {
    handleCalculateDurationAndPay();
  }, [startTime, endTime, hourlyRate, isEndTimeNextDay, handleCalculateDurationAndPay]);


  const handleCopyResults = () => {
    if (durationDisplay) {
        let textToCopy = durationDisplay;
        if (estimatedPay) {
            textToCopy += ` - ${estimatedPay}`;
        }
        navigator.clipboard.writeText(textToCopy);
        toast({ title: "Copied!", description: "Time calculation results copied." });
    } else {
        toast({ title: "No results", description: "Calculate first to copy results.", variant: "default" });
    }
  };

  const handleClearFields = () => {
    setStartTime("09:00");
    setEndTime("17:00");
    setIsEndTimeNextDay(false);
    setHourlyRate("");
    setDurationDisplay(null);
    setEstimatedPay(null);
    toast({ title: "Fields Cleared", description: "Duration & Pay calculator reset." });
  };

  const handleAddTime = () => {
    // Placeholder logic for Add Time
    const [baseH, baseM] = baseTime.split(':').map(Number);
    const addH = parseInt(hoursToModify, 10) || 0;
    const addM = parseInt(minutesToModify, 10) || 0;

    let totalMinutes = baseH * 60 + baseM + addH * 60 + addM;
    totalMinutes = (totalMinutes % (24 * 60) + (24*60)) % (24*60); // Ensure positive and within 24h

    const resultH = Math.floor(totalMinutes / 60);
    const resultM = totalMinutes % 60;
    
    setAddSubtractResult(`Result: ${String(resultH).padStart(2, '0')}:${String(resultM).padStart(2, '0')}`);
    toast({ title: "Time Added", description: `New time calculated: ${String(resultH).padStart(2, '0')}:${String(resultM).padStart(2, '0')}` });
  };

  const handleSubtractTime = () => {
    // Placeholder logic for Subtract Time
    const [baseH, baseM] = baseTime.split(':').map(Number);
    const subH = parseInt(hoursToModify, 10) || 0;
    const subM = parseInt(minutesToModify, 10) || 0;

    let totalMinutes = baseH * 60 + baseM - (subH * 60 + subM);
    totalMinutes = (totalMinutes % (24 * 60) + (24*60)) % (24*60); // Ensure positive and within 24h

    const resultH = Math.floor(totalMinutes / 60);
    const resultM = totalMinutes % 60;

    setAddSubtractResult(`Result: ${String(resultH).padStart(2, '0')}:${String(resultM).padStart(2, '0')}`);
    toast({ title: "Time Subtracted", description: `New time calculated: ${String(resultH).padStart(2, '0')}:${String(resultM).padStart(2, '0')}` });
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
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
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="next-day-checkbox"
                checked={isEndTimeNextDay}
                onCheckedChange={(checked) => setIsEndTimeNextDay(Boolean(checked))}
              />
              <Label htmlFor="next-day-checkbox" className="text-xs font-normal">End time is on the next day</Label>
            </div>
            <div className="mt-3">
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
            {(durationDisplay || estimatedPay) && (
              <div className="mt-3 p-2.5 bg-muted/50 rounded-md text-center space-y-1 border">
                {durationDisplay && <p className="text-sm font-semibold text-foreground">{durationDisplay}</p>}
                {estimatedPay && <p className="text-xs text-primary font-medium">{estimatedPay}</p>}
              </div>
            )}
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
            {addSubtractResult && (
              <div className="mt-3 p-2.5 bg-muted/50 rounded-md text-center space-y-1 border">
                <p className="text-sm font-semibold text-foreground">{addSubtractResult}</p>
              </div>
            )}
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
