
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
import { House, DollarSign, Percent, Copy, Trash2, AlertCircle } from "lucide-react";

const propertyTaxFormSchema = z.object({
  rentalValueInput: z.coerce
    .number({ required_error: "Rental value is required." })
    .min(0, "Rental value must be a positive number."),
  rentalValueType: z.enum(["monthly", "annual"], {
    required_error: "Rental value type is required.",
  }),
  propertyType: z.enum(["residential", "commercial", "industrial", "agricultural"], {
    required_error: "Property type is required.",
  }),
});

type PropertyTaxFormData = z.infer<typeof propertyTaxFormSchema>;

const initialCalculationResults = {
  calculatedArv: "0.00",
  statutoryDeduction: "0.00",
  annualTaxableValue: "0.00",
  estimatedPropertyTaxDue: "0.00",
};

type CalculationResults = typeof initialCalculationResults;

export function PropertyTaxPage() {
  const { toast } = useToast();
  const [calculationResults, setCalculationResults] = React.useState<CalculationResults>(initialCalculationResults);

  const form = useForm<PropertyTaxFormData>({
    resolver: zodResolver(propertyTaxFormSchema),
    defaultValues: {
      rentalValueInput: undefined,
      rentalValueType: "monthly",
      propertyType: "residential",
    },
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const onSubmit: SubmitHandler<PropertyTaxFormData> = (data) => {
    let arv = data.rentalValueInput;
    if (data.rentalValueType === "monthly") {
      arv = data.rentalValueInput * 12;
    }

    const deductionAmount = arv * 0.10;
    const taxableValue = arv - deductionAmount;
    const taxDue = taxableValue * 0.03;

    setCalculationResults({
      calculatedArv: formatCurrency(arv),
      statutoryDeduction: formatCurrency(deductionAmount),
      annualTaxableValue: formatCurrency(taxableValue),
      estimatedPropertyTaxDue: formatCurrency(taxDue),
    });

    toast({ title: "Property Tax Calculated", description: "Review the estimated tax below." });
  };

  const handleCopyResults = () => {
    if (calculationResults.calculatedArv === "0.00" && calculationResults.estimatedPropertyTaxDue === "0.00") {
        toast({ title: "No Results to Copy", description: "Please calculate the property tax first.", variant: "default" });
        return;
    }
    const formData = form.getValues();
    const textToCopy = `
Property Tax Estimation Summary
---------------------------------
Inputs:
Estimated ${formData.rentalValueType === "monthly" ? "Monthly" : "Annual"} Rental Value: TT$ ${formatCurrency(formData.rentalValueInput || 0)}
Property Type: ${formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1)}
---------------------------------
Calculation:
Calculated Annual Rental Value (ARV): TT$ ${calculationResults.calculatedArv}
Statutory Deduction (10% of ARV): TT$ ${calculationResults.statutoryDeduction}
Annual Taxable Value (ARV - Deduction): TT$ ${calculationResults.annualTaxableValue}
Estimated Property Tax Due (3% of Taxable Value): TT$ ${calculationResults.estimatedPropertyTaxDue}
---------------------------------
Disclaimer: This is an estimator based on the Property Tax Act (e.g., 10% deduction from ARV, 3% tax rate on taxable value). Official valuations and applicable exemptions by the Commissioner of Valuations are binding. Consult official sources and a qualified professional for definitive advice.
    `;
    navigator.clipboard.writeText(textToCopy.trim());
    toast({ title: "Results Copied!", description: "Property tax estimation copied to clipboard." });
  };

  const handleClearFields = () => {
    form.reset({
      rentalValueInput: undefined,
      rentalValueType: "monthly",
      propertyType: "residential",
    });
    setCalculationResults(initialCalculationResults);
    toast({ title: "Fields Cleared", description: "Property tax calculator inputs have been reset." });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="w-full max-w-2xl shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <House className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">
              Property Tax Estimator
            </CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Estimate property tax based on Annual Rental Value (ARV) as per Trinidad & Tobago's Property Tax Act.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="rentalValueInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      Estimated Rental Value (TT$)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 5000 for monthly"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>Enter the estimated rental value of the property.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rentalValueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                       <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
                      Rental Value Period
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Specify if the entered value is monthly or annual.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                        <House className="mr-2 h-4 w-4 text-muted-foreground" />
                        Property Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the class of property.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Calculate Property Tax
              </Button>
            </form>
          </Form>

          {(calculationResults.calculatedArv !== "0.00" || calculationResults.estimatedPropertyTaxDue !== "0.00") && (
            <Card className="w-full shadow-lg rounded-xl mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                  <DollarSign className="mr-2 h-6 w-6" /> Estimated Property Tax
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Calculated Annual Rental Value (ARV):</span> <strong className="text-foreground">TT$ {calculationResults.calculatedArv}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Statutory Deduction (10% of ARV):</span> <strong className="text-foreground">TT$ {calculationResults.statutoryDeduction}</strong>
                </div>
                 <Separator className="my-2" />
                <div className="flex justify-between">
                  <span>Annual Taxable Value (ARV - Deduction):</span> <strong className="text-foreground">TT$ {calculationResults.annualTaxableValue}</strong>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold text-primary mt-1">
                  <span>Estimated Property Tax Due (3% of Taxable Value):</span><span>TT$ {calculationResults.estimatedPropertyTaxDue}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button variant="outline" onClick={handleCopyResults} className="w-full text-sm h-9 flex-1">
                    <Copy className="mr-2 h-4 w-4" /> Copy Results
                </Button>
                <Button variant="outline" onClick={handleClearFields} className="w-full text-sm h-9 flex-1">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Fields
                </Button>
              </CardFooter>
            </Card>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground text-center w-full max-w-2xl mx-auto my-6 flex items-start">
        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
        <span>
        Disclaimer: This calculator provides an estimate based on the Property Tax Act (e.g., Section 8: 10% deduction from ARV for voids/repairs to get Annual Taxable Value; Section 9: 3% tax rate on Annual Taxable Value). The Annual Rental Value (ARV) used here is an estimate you provide. Official ARV assessments are determined by the Commissioner of Valuations. Various exemptions may apply (refer to Part III of the Act). Always consult official IRD guidelines, the full Property Tax Act, and a qualified professional for definitive advice and precise calculations.
        </span>
      </p>
    </div>
  );
}

    