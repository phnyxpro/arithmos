
"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Library, Building, User } from "lucide-react";

export default function IncomeCorpTaxKnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Income & Corporation Tax Act Knowledge Base
      </h1>
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Income Tax Act & Corporation Tax Act Highlights
            </CardTitle>
          </div>
          <CardDescription>
            A summary of key sections of The Income Tax Act and Corporation Tax Act of Trinidad & Tobago. This is not legal advice. References are illustrative and should be verified with the official Acts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="ictax-part1" id="ictax-preliminary">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part I: Preliminary (Income Tax Act)
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Interpretation:</strong> Defines key terms like "chargeable income", "emoluments", "trade". (Refer to Income Tax Act, Part I, Section 2, Page X).</p>
                    <p><strong>Administration:</strong> Establishes the Board of Inland Revenue's role. (Refer to Income Tax Act, Part I, Section 3, Page Y).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ictax-part2" id="ictax-imposition-income">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part II: Imposition of Income Tax
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge of Income Tax:</strong> Tax is charged on income accruing in or derived from Trinidad and Tobago or elsewhere. (Refer to Income Tax Act, Part II, Section 5, Page A).</p>
                    <p><strong>Basis of Assessment:</strong> Typically the income of the preceding year. (Refer to Income Tax Act, Part II, Section 6, Page B).</p>
                    <p><strong>Specific Income Sources:</strong> Details on gains or profits from trade, employment, dividends, interest, etc. (Refer to Income Tax Act, Part II, Sections X-Y, Page C).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ictax-part3" id="ictax-personal-allowances">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Personal Allowances & Deductions (Income Tax Act)
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Personal Allowance:</strong> Basic allowance for individuals. (Refer to Income Tax Act, Section X, Page Y).</p>
                    <p><strong>Other Allowances:</strong> Deductions for contributions to approved pension funds, mortgage interest, etc. (Refer to Income Tax Act, Sections A-B, Page C).</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="ictax-part4" id="ictax-corp-tax-imposition">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Corporation Tax: Imposition & Rates
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge of Corporation Tax:</strong> Tax on profits of companies. (Refer to Corporation Tax Act, Section X, Page Y).</p>
                    <p><strong>Computation of Profits:</strong> Rules for determining chargeable profits. (Refer to Corporation Tax Act, Section A, Page B).</p>
                     <p><strong>Tax Rates:</strong> Applicable corporation tax rates. (Refer to Corporation Tax Act, Section C, Page D).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="ictax-part5" id="ictax-returns-assessment">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Returns, Assessments & Appeals
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Filing of Returns:</strong> Obligations for individuals and companies to file tax returns. (Refer to Income Tax Act, Part X, Section Y and Corporation Tax Act, Part A, Section B).</p>
                    <p><strong>Assessments:</strong> Power of the Board to make assessments. (Refer to Income Tax Act, Part C, Section D).</p>
                    <p><strong>Objections and Appeals:</strong> Procedures for disputing assessments. (Refer to Income Tax Act, Part E, Section F).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ictax-part6" id="ictax-collection-recovery">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Collection & Recovery
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Due Dates for Payment:</strong> When tax is payable. (Refer to Income Tax Act, Part X, Section Y).</p>
                    <p><strong>Recovery Procedures:</strong> Methods the Board can use to recover unpaid taxes. (Refer to Income Tax Act, Part A, Section B).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ictax-part7" id="ictax-offences-penalties">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Offences and Penalties
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Specific Offences:</strong> E.g., failure to file, incorrect returns. (Refer to Income Tax Act, Part X, Section Y).</p>
                    <p><strong>Penalties:</strong> Fines and other penalties for non-compliance. (Refer to Income Tax Act, Part A, Section B).</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ictax-part8" id="ictax-withholding-tax">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Withholding Tax Provisions
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Payments Subject to Withholding Tax:</strong> Types of payments from which tax must be deducted at source. (Refer to Income Tax Act, Part X, Section Y).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    