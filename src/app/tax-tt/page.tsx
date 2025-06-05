
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Landmark, Users, DollarSign, ArrowRight, Info } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Import simplified calculators
import SimplifiedLevyCalculator from '@/components/calculators/SimplifiedLevyCalculator';
import SimplifiedPayrollCalculator from '@/components/calculators/SimplifiedPayrollCalculator';

export default function TaxTtPage() {
  const levyAccordionItems = [
    "Purpose", "Must be paid at a rate of 0.6% on gross sales", "By Persons & Companies", 
    "Quarterly", "But may be exempt", "If underpaid", "If overpaid", 
    "If not paid", "Fun details", "Related forms", "How to pay?"
  ];
  
  const greenFundAccordionItems = [ // Same items for Green Fund Levy
    "Purpose", "Must be paid at a rate of 0.3% on gross sales", "By Persons & Companies", 
    "Quarterly", "But may be exempt", "If underpaid", "If overpaid", 
    "If not paid", "Fun details", "Related forms", "How to pay?"
  ];


  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-primary">
              Tax Trinidad and Tobago
            </CardTitle>
          </div>
          <CardDescription className="pt-2 text-lg text-muted-foreground">
            Knowledge to help navigate and calculate!
          </CardDescription>
          <CardDescription className="pt-2">
           <p>TAX.TT is here to help you navigate Trinidad & Tobago's tax landscape with simple to use calculators and simplified explanations of current tax legislation.</p> <p className="pt-2">Save time and gain knowledge to navigate and calculate!</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="levy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="levy">Levy</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="corp-tax">Corporation Tax</TabsTrigger>
              <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
            </TabsList>

            <TabsContent value="levy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Landmark className="mr-2 h-5 w-5" /> Levy Calculator
                  </CardTitle>
                  <CardDescription>
                    <p>Estimate Business Levy and Green Fund Levy.</p>
                    <p className="pt-2">
                      The Business Levy is a tax administered by the Government of Trinidad and Tobago. It is a source of revenue for the country’s economy. It is used to fund public services, pay government obligations, and provide goods for citizens.
                    </p>
                    <p className="pt-2">
                      The purpose of the Green Fund is to financially assist organizations and community groups that are engaged in activities related to the remediation, reforestation, environmental education and public awareness of environmental issues and conservation of the environment. 77.01
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimplifiedLevyCalculator />
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Levy Information & Resources
                  </CardTitle>
                  <CardDescription>
                    Find helpful links and information regarding Business Levy and Green Fund Levy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Business Levy</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {levyAccordionItems.map((item, index) => (
                        <AccordionItem value={`bl-item-${index}`} key={`bl-item-${index}`}>
                          <AccordionTrigger>{item}</AccordionTrigger>
                          <AccordionContent>
                            Placeholder content for {item.toLowerCase()} regarding Business Levy. Official information should be sourced from IRD.
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">The Green Fund Levy</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {greenFundAccordionItems.map((item, index) => (
                         <AccordionItem value={`gfl-item-${index}`} key={`gfl-item-${index}`}>
                          <AccordionTrigger>{item.startsWith("Must be paid at a rate of") ? "Must be paid at a rate of 0.3% on gross sales" : item}</AccordionTrigger>
                          <AccordionContent>
                            Placeholder content for {item.toLowerCase()} regarding Green Fund Levy. Official information should be sourced from IRD and relevant legislation (Miscellaneous Taxes Act, Ch 77:01).
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/calculators/business-levy">Go to Full Business Levy Page</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Users className="mr-2 h-5 w-5" /> Payroll Deductions Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate PAYE, NIS, and Health Surcharge for an employee.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimplifiedPayrollCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="corp-tax" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <Landmark className="mr-2 h-5 w-5" /> Corporation Tax
                  </CardTitle>
                  <CardDescription>
                    The Corporation Tax calculator provides detailed estimation including various income types, deductions, and offsets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This calculator is best viewed on its dedicated page for full functionality and detailed input fields.
                  </p>
                  <Button asChild>
                    <Link href="/calculators/corporation-tax">
                      Go to Full Corporation Tax Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income-tax" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" /> Personal Income Tax
                  </CardTitle>
                  <CardDescription>
                    The Personal Income Tax calculator helps estimate your annual tax liability, including PAYE, NIS, and Health Surcharge.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This calculator is best viewed on its dedicated page for comprehensive inputs and breakdown.
                  </p>
                  <Button asChild>
                    <Link href="/calculators/income-tax">
                      Go to Full Income Tax Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
