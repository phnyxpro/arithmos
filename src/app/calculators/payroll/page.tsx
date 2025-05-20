
"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Briefcase,
  User,
  DollarSign,
  CalendarDays,
  Hourglass,
  Percent,
} from "lucide-react";

const payrollFormSchema = z.object({
  employeeName: z.string().optional(),
  grossMonthlyIncome: z.coerce
    .number({ required_error: "Gross monthly income is required." })
    .min(0, "Income must be a positive number."),
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

export default function PayrollPage() {
  const form = useForm<PayrollFormData>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: {
      employeeName: "",
      grossMonthlyIncome: undefined, // Set to undefined to show placeholder
      paymentFrequency: undefined, // User must select
      overtimeHoursPerWeek: undefined,
      overtimeMultiplier: 1.5,
    },
  });

  const onSubmit: SubmitHandler<PayrollFormData> = (data) => {
    console.log("Payroll Form Data:", data);
    // Placeholder for actual calculation and results display
    // toast({ title: "Calculation Submitted", description: "Payroll details processed." });
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
                        <FormDescription>e.g. Jane Doe</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="grossMonthlyIncome"
                    render={({ field }) => (
                      <FormItem>
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
                          />
                        </FormControl>
                         <FormDescription>e.g. 10000.00</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Calculate Payroll
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            This calculator provides estimates based on current general tax
            rules for Trinidad &amp; Tobago. Always consult with a qualified
            tax professional for definitive advice.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
