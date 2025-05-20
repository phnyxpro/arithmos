
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
import { Library, ReceiptText } from "lucide-react";

export default function VatKnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        VAT Act Knowledge Base
      </h1>
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <ReceiptText className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Value Added Tax Act Highlights
            </CardTitle>
          </div>
          <CardDescription>
            A summary of key sections of The Value Added Tax Act of Trinidad & Tobago. This is not legal advice. References are illustrative and should be verified with the official Act.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="vat-part1" id="vat-preliminary">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part I: Preliminary
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Interpretation:</strong> Key definitions such as "taxable supply", "input tax", "output tax", "consideration". (Refer to Part I, Section 2, Page X of the Act).</p>
                    <p><strong>Administration:</strong> Details on the administration of VAT by the Board of Inland Revenue. (Refer to Part I, Section Y, Page Z of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-part2" id="vat-imposition">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part II: Imposition and Rate of Tax
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge to Tax:</strong> VAT is charged on taxable supplies of goods and services made in Trinidad and Tobago and on the importation of goods. (Refer to Part II, Section A, Page B of the Act).</p>
                    <p><strong>Rate of Tax:</strong> Standard rate of VAT (e.g., 12.5%). (Refer to Part II, Section C, Page D of the Act).</p>
                    <p><strong>Zero-Rated Supplies:</strong> List of goods and services subject to a 0% VAT rate. (Refer to First Schedule, Page E of the Act).</p>
                    <p><strong>Exempt Supplies:</strong> List of goods and services exempt from VAT. (Refer to Second Schedule, Page F of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                 <AccordionItem value="vat-part3" id="vat-registration">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part III: Registration
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Compulsory Registration:</strong> Thresholds for mandatory VAT registration. (Refer to Part III, Section X, Page Y of the Act).</p>
                    <p><strong>Voluntary Registration:</strong> Conditions for voluntary VAT registration. (Refer to Part III, Section Z, Page A of the Act).</p>
                     <p><strong>Cancellation of Registration:</strong> Procedures for de-registration. (Refer to Part III, Section B, Page C of the Act).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="vat-part4" id="vat-collection">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part IV: Collection and Enforcement
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Tax Invoices:</strong> Requirements for issuing proper VAT invoices. (Refer to Part IV, Section X, Page Y of the Act).</p>
                    <p><strong>Records:</strong> Obligation to keep proper records for VAT purposes. (Refer to Part IV, Section Z, Page A of the Act).</p>
                    <p><strong>Returns and Payments:</strong> Filing frequency and payment due dates for VAT. (Refer to Part IV, Section B, Page C of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-part5" id="vat-objections">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part V: Objections and Appeals
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Objections to Assessments:</strong> Procedure for objecting to VAT assessments. (Refer to Part V, Section X, Page Y of the Act).</p>
                    <p><strong>Appeals to Tax Appeal Board:</strong> Process for appealing decisions. (Refer to Part V, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-part6" id="vat-offences">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VI: Offences and Penalties
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Offences:</strong> Details various offences under the VAT Act. (Refer to Part VI, Section X, Page Y of the Act).</p>
                    <p><strong>Penalties:</strong> Specifies penalties for non-compliance, late filing, etc. (Refer to Part VI, Section Z, Page A of the Act).</p>
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

    