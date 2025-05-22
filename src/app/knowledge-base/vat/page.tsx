
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReceiptText, CircleCheckBig, FileText as FileTextIcon, SquarePen, Info, Gavel } from "lucide-react"; // Added missing icons

export default function VatKnowledgeBasePage() {
  // Content for the accordion items, including registration requirements
  const registrationRequirements = {
    soleProprietor: [
      "Completed Registration Forms (Form A and Form B)",
      "Original and copy of Certificate of Registration (if using trade name)",
      "Valid form of Identification (National ID or Passport or Driver's Permit & Birth Certificate)",
      "Acceptable evidence where total commercial supplies or anticipated commercial supplies are/will be in excess of $600,000.00 over a 12 month period.",
      "BIR File Number of Owner",
    ],
    partnership: [
      "Complete Registration Forms (Form B and Form C)",
      "Original and copy of Certificate of Registration",
      "Valid form of Identification of each Partner (National ID or Passport or Driver's Permit & Birth Certificate)",
      "Acceptable evidence where total commercial supplies or anticipated commercial supplies are/will be in excess of $600,000.00 over a 12 month period.",
      "BIR File Number of Partnership and Each Partner",
    ],
    limitedCompany: [
      "Complete Registration Forms (Form B and Form C)",
      "Original and copy of Certificate of Incorporation/Continuance and Articles of Incorporation/Continuance",
      "Valid form of Identification of each Director (National ID or Passport or Driver's Permit & Birth Certificate)",
      "Acceptable evidence where total commercial supplies or anticipated commercial supplies are/will be in excess of $600,000.00 over a 12 month period.",
      "BIR File Number of Company and Each Director",
    ],
    commonNotes: [
      "A letter of Authorisation together with proper identification must be produced by anyone (other than the Owner/Partner/Director) who is acting on behalf of the applicant.",
      "All forms and letters must be signed by the Owner/Partner/Director.",
    ]
  };

  const evidenceOfTrading = [
    "Bank Statements for the last three (3) months reflecting the level of Trade Activity;",
    "Copies of Payment Cheques received for goods/services;",
    "Copies of invoices generated to customers;",
    "Copies of Purchase Invoices from suppliers;",
    "Contract/Letter of Award between the applicant and the other party (must be acceptable to the Board of Inland Revenue);",
    "Any other documentation that shows evidence that the VAT registration threshold has been/will be made (subject to acceptance by the Board of Inland Revenue)."
  ];

  const booksAndRecordsGuidelines = [
    "It must be kept in the English language;",
    "In the currency of T&T;",
    "At the principal place of business;",
    "In such form as would enable the BIR to determine the accuracy of the information appearing on the VAT Return."
  ];

  const taxInvoiceRequirements = [
    "The words \"Tax Invoice\"",
    "Identifying serial number and the date it was issued",
    "Name, address, and VAT Registration number of supplier",
    "Name and address of recipient",
    "Complete description of the goods/services sold",
    "VAT exclusive figure",
    "Value of VAT",
    "Total value of the supply"
  ];

  const dosOfVat = [
    "Register for VAT if you make or intend to make commercial supplies in excess of $600,000.00 in a twelve (12) month period.",
    "Account for VAT at the standard rate of 12.5% on standard rated supplies.",
    "Display your VAT Registration Certificate.",
    "Issue TAX Invoices.",
    "Keep proper books and records.",
    "Keep those books and records for a period of six (6) years or three (3) years from the date of filing returns, whichever is later.",
    "File your VAT Returns by the 25th day of the month following the end of your tax period.",
    "Pay VAT liability by the due date, if liable.",
    "Return your VAT registration Certificate upon deregistration."
  ];

  const dontsOfVat = [
    "Don't charge VAT if you have been deregistered.",
    "Don't display a Certificate not issued by the BIR, nor should you display one after deregistration.",
    "Don't submit an unsigned VAT Return.",
    "Don't display a faded, photocopied, or an illegible VAT Registration Certificate.",
    "Don't provide false information to the BIR."
  ];

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
            A summary of key aspects of The Value Added Tax Act of Trinidad & Tobago. This is not legal advice. References are illustrative and should be verified with the official Act.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="vat-part1" id="vat-introduction">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Introduction to Value Added Tax (VAT)
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p>Value Added Tax, or VAT, is applied to both goods and services in Trinidad and Tobago and is included in the final price of the product. VAT is charged at a rate of 12.5%.</p>
                    <p>VAT-registered businesses must collect VAT from customers, submit VAT returns and pay any VAT that they owe to the Inland Revenue Division of the Ministry of Finance.</p>
                    <p>VAT-registered businesses can deduct any VAT that they pay when purchasing goods and services for the business from the VAT that they collect from customers. If the amount of VAT that a business pays is more than they collect, the Inland Revenue Division will refund the balance.</p>
                    <p>(Refer to general provisions of the VAT Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-part2" id="vat-imposition">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Imposition and Rate of Tax
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge to Tax:</strong> VAT is charged on taxable supplies of goods and services made in Trinidad and Tobago and on the importation of goods. (Refer to Part II of the Act).</p>
                    <p><strong>Rate of Tax:</strong> Standard rate of VAT is 12.5%. (Refer to Part II of the Act).</p>
                    
                    <div className="mt-2">
                      <h4 className="font-semibold text-foreground/90">Zero-Rated Supplies:</h4>
                      <p>
                        These are goods and services where VAT is charged at a rate of 0%. For a comprehensive list, refer to the <strong>First Schedule</strong> of the VAT Act and any subsequent amendments. Examples historically include basic food items and agricultural supplies.
                      </p>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-semibold text-foreground/90">Exempt Supplies:</h4>
                      <p className="mb-1">
                        These are goods and services that are not subject to VAT. The list of exempt supplies is found in the <strong>Second Schedule</strong> of the VAT Act. Examples historically include financial services and education.
                      </p>
                      <p className="mb-1">
                        This schedule can be amended by Legal Notices. For example, <a
                          href="https://www.finance.gov.tt/wp-content/uploads/2021/10/Legal-Notice-No.-259-Value-Added-Tax-Amendment-to-Schedule-2-No.-2-Order-2021.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline break-all"
                        >
                          Legal Notice No. 259 of 2021
                        </a> details amendments to the Second Schedule (Exempt Supplies).
                      </p>
                      <p>
                        It is crucial to consult both the original schedules in the VAT Act and all official Legal Notices for the most current and complete lists.
                      </p>
                    </div>
                    <p className="mt-2 text-xs">
                      (Note: Always consult the latest versions of the VAT Act and official IRD publications for definitive information.)
                    </p>
                  </AccordionContent>
                </AccordionItem>

                 <AccordionItem value="vat-part3" id="vat-registration-req">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    VAT Registration Requirements
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Who is Required to be Registered?</strong> Any person who conducts a business activity and makes commercial supplies (sales/receipts) with a gross value in excess of $600,000.00 (as of 1/1/2023) in any twelve (12) month period is required to apply for registration.</p>
                    <p>(Refer to Part III of the Act).</p>
                    <Tabs defaultValue="sole-proprietor" className="w-full mt-2">
                      <TabsList className="grid w-full grid-cols-3 text-xs h-auto">
                        <TabsTrigger value="sole-proprietor">Sole Proprietor</TabsTrigger>
                        <TabsTrigger value="partnership">Partnership</TabsTrigger>
                        <TabsTrigger value="limited-company">Limited Co.</TabsTrigger>
                      </TabsList>
                      <TabsContent value="sole-proprietor" className="mt-2 border p-3 rounded-md bg-muted/30">
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          {registrationRequirements.soleProprietor.map((item, idx) => <li key={`sp-${idx}`}>{item}</li>)}
                        </ul>
                      </TabsContent>
                      <TabsContent value="partnership" className="mt-2 border p-3 rounded-md bg-muted/30">
                         <ul className="list-disc pl-5 space-y-1 text-xs">
                          {registrationRequirements.partnership.map((item, idx) => <li key={`p-${idx}`}>{item}</li>)}
                        </ul>
                      </TabsContent>
                      <TabsContent value="limited-company" className="mt-2 border p-3 rounded-md bg-muted/30">
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          {registrationRequirements.limitedCompany.map((item, idx) => <li key={`lc-${idx}`}>{item}</li>)}
                        </ul>
                      </TabsContent>
                    </Tabs>
                     <p className="text-xs mt-2">{registrationRequirements.commonNotes[0]}</p>
                     <p className="text-xs">{registrationRequirements.commonNotes[1]}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-evidence" id="vat-evidence-trading">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Acceptable Evidence of Trading Activity</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                        <p>A combination of the following documents must be presented as evidence that the VAT registration threshold ($600,000.00 as of 1/1/2023) has/will be made within a twelve (12) month period.</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                            {evidenceOfTrading.map((item, idx) => <li key={`ev-${idx}`}>{item}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="vat-books-records" id="vat-books-records-guide">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Guidelines for Keeping Books and Records</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                        <p>The following are basic guidelines for the keeping of books and records:</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                            {booksAndRecordsGuidelines.map((item, idx) => <li key={`br-${idx}`}>{item}</li>)}
                        </ul>
                        <p className="mt-1 text-xs"><strong>N.B.</strong> When submitting VAT Returns it is not necessary to attach invoices, however proper invoicing requirements must be met for all claims and must be submitted upon request.</p>
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="vat-invoicing" id="vat-tax-invoicing">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Tax Invoicing Requirements</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                        <p>The tax invoice should include:</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                            {taxInvoiceRequirements.map((item, idx) => <li key={`ti-${idx}`}>{item}</li>)}
                        </ul>
                         <p>(Refer to Part IV of the Act).</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-value-time" id="vat-value-time-supply">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">Value and Time of Supply</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                        <h4 className="font-semibold text-foreground/90 text-xs">Value of a Supply</h4>
                        <p className="text-xs"><strong>Arm's Length Transaction:</strong> The VAT charged on a supply is calculated by multiplying the value of the supply by the rate of tax.</p>
                        <p className="text-xs"><strong>Non-Arm's Length Transaction:</strong> Where the transaction is between associated persons, the value of the supply is the open market value. The open market value will also be used on barter transactions.</p>
                        <h4 className="font-semibold text-foreground/90 text-xs mt-1">Time of Supply</h4>
                        <p className="text-xs">The time of a supply identifies the tax period in which a transaction is to be taxed. The tax period is the period for which a registered person is to account for VAT to the Board of Inland Revenue.</p>
                        <p className="text-xs">The general rule is that a supply takes place on the earliest of the following:</p>
                        <ul className="list-disc pl-5 space-y-0.5 text-xs">
                            <li>The date the invoice was issued</li>
                            <li>The date of payment</li>
                            <li>The date when the goods are made available or in the case of services, when the services are supplied</li>
                        </ul>
                        <p>(Refer to relevant sections in Part IV of the Act).</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vat-dos-donts" id="vat-dos-donts-guide">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">DOs and DON'Ts of VAT</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <h4 className="font-semibold text-foreground/90 text-xs">DOs</h4>
                                <ul className="list-disc pl-4 space-y-1 text-xs">
                                    {dosOfVat.map((item, idx) => <li key={`do-${idx}`}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground/90 text-xs">DON'Ts</h4>
                                <ul className="list-disc pl-4 space-y-1 text-xs">
                                    {dontsOfVat.map((item, idx) => <li key={`dont-${idx}`}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
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

    