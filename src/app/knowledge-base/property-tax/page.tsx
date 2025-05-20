
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
import { Library } from "lucide-react";

export default function PropertyTaxKnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Property Tax Act Knowledge Base
      </h1>
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Library className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Property Tax Act Highlights
            </CardTitle>
          </div>
          <CardDescription>
            A summary of key sections of The Property Tax Act of Trinidad & Tobago. This is not legal advice. References are illustrative and should be verified with the official Act.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="part1-prop" id="property-tax-interpretation">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part I: Preliminary & Interpretation
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Key Definitions:</strong> Includes terms like "annual rental value (ARV)", "land", "owner", "building". ARV is the rent the property might reasonably fetch annually if let, with the tenant paying outgoings. (Refer to Part I, Section 2, Page X of the Act).</p>
                    <p><strong>Application:</strong> Outlines the scope and application of the Act to various types of properties within Trinidad and Tobago. (Refer to Part I, Section 3, Page Y of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part2-prop" id="property-tax-imposition">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part II: Imposition & Incidence of Tax
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge of Tax:</strong> Property tax is levied on all land in Trinidad and Tobago, subject to exemptions. (Refer to Part II, Section X, Page Y of the Act).</p>
                    <p><strong>Annual Taxable Value (ATV):</strong> Calculated as 90% of the Annual Rental Value (ARV). This 10% deduction accounts for voids and repairs. (Refer to Part II, Section 8, Page Z of the Act).</p>
                    <p><strong>Rate of Tax:</strong> The tax rate applied to the ATV is 3% for most property types. (Refer to Part II, Section 9, Page A of the Act).</p>
                     <p><strong>Liability:</strong> The owner of the land is generally liable for the tax. (Refer to Part II, Section B, Page C of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part3-prop" id="property-tax-exemptions">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part III: Exemptions & Reliefs
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Exempt Properties:</strong> Certain properties are exempt, such as land owned by the State, buildings for public religious worship, schools, hospitals, etc. (Refer to Part III, Sections X-Y, Pages A-B of the Act).</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Land owned and occupied by the State or state-owned enterprises for public purposes.</li>
                      <li>Buildings used exclusively for public religious worship.</li>
                      <li>School buildings, universities, and colleges.</li>
                    </ul>
                    <p>Details conditions and specific criteria for these exemptions.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="part4-prop" id="property-tax-valuation">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part IV: Valuation of Land
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Valuation Roll:</strong> The Commissioner of Valuations is responsible for preparing and maintaining a Valuation Roll. (Refer to Part IV, Section X, Page Y of the Act).</p>
                    <p><strong>Notice of Valuation:</strong> Owners are served with a notice of valuation. (Refer to Part IV, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part5-prop" id="property-tax-collection">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part V: Assessment & Collection
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Tax Due Date:</strong> Specifies when property tax is due and payable. (Refer to Part V, Section X, Page Y of the Act).</p>
                    <p><strong>Recovery:</strong> Outlines procedures for the recovery of unpaid taxes. (Refer to Part V, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part6-prop" id="property-tax-objections">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VI: Objections & Appeals
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Grounds for Objection:</strong> Owners can object to a valuation on specific grounds. (Refer to Part VI, Section X, Page Y of the Act).</p>
                    <p><strong>Appeals:</strong> Process for appealing to the Tax Appeal Board. (Refer to Part VI, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="part7-prop" id="property-tax-miscellaneous">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VII: Miscellaneous
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Service of Notices:</strong> Details how notices under the Act are to be served. (Refer to Part VII, Section X, Page Y of the Act).</p>
                    <p><strong>Regulations:</strong> The Minister may make regulations for carrying out the provisions of the Act. (Refer to Part VII, Section Z, Page A of the Act).</p>
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

    