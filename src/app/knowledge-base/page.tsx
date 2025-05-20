
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

export default function KnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Knowledge Base
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
            A summary of key sections of The Property Tax Act of Trinidad & Tobago. This is not legal advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="part1" id="property-tax-interpretation">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part I: Preliminary & Interpretation
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Key Definitions:</strong> Includes terms like "annual rental value (ARV)", "land", "owner", "building". ARV is the rent the property might reasonably fetch annually if let, with the tenant paying outgoings.</p>
                    <p><strong>Application:</strong> Outlines the scope and application of the Act to various types of properties within Trinidad and Tobago.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part2" id="property-tax-imposition">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part II: Imposition & Incidence of Tax
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Charge of Tax:</strong> Property tax is levied on all land in Trinidad and Tobago, subject to exemptions.</p>
                    <p><strong>Annual Taxable Value (ATV):</strong> Calculated as 90% of the Annual Rental Value (ARV). This 10% deduction accounts for voids and repairs.</p>
                    <p><strong>Rate of Tax:</strong> The tax rate applied to the ATV is 3% for most property types (unless specified otherwise for particular categories).</p>
                     <p><strong>Liability:</strong> The owner of the land is generally liable for the tax.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part3" id="property-tax-exemptions">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part III: Exemptions & Reliefs
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Exempt Properties:</strong> Certain properties are exempt, such as:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Land owned and occupied by the State or state-owned enterprises for public purposes.</li>
                      <li>Buildings used exclusively for public religious worship.</li>
                      <li>School buildings, universities, and colleges.</li>
                      <li>Hospitals and public dispensaries.</li>
                      <li>Cemeteries and burial grounds.</li>
                      <li>Land used for specific agricultural purposes may have special provisions or rates.</li>
                    </ul>
                    <p>Details conditions and specific criteria for these exemptions.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="part4" id="property-tax-valuation">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part IV: Valuation of Land
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Valuation Roll:</strong> The Commissioner of Valuations is responsible for preparing and maintaining a Valuation Roll listing all properties and their assessed ARVs.</p>
                    <p><strong>Notice of Valuation:</strong> Owners are served with a notice of valuation. Revaluations occur periodically.</p>
                    <p><strong>Powers of Entry:</strong> Authorized persons have the power to enter land for valuation purposes after giving notice.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part5" id="property-tax-collection">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part V: Assessment & Collection
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Tax Due Date:</strong> Property tax is typically due and payable by a specified date annually (e.g., March 31st), or as determined by the Board of Inland Revenue (BIR).</p>
                    <p><strong>Payment:</strong> Can be made to the BIR. Penalties and interest apply for late payments.</p>
                    <p><strong>Recovery:</strong> The Act outlines procedures for the recovery of unpaid taxes, which can include legal action or sale of the property.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="part6" id="property-tax-objections">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VI: Objections & Appeals
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Grounds for Objection:</strong> Owners can object to a valuation on grounds such as incorrect ARV, incorrect owner details, or improper inclusion/omission from the roll.</p>
                    <p><strong>Objection Process:</strong> Objections must be made in writing to the Commissioner of Valuations within a specified time after receiving the notice of valuation.</p>
                    <p><strong>Appeals:</strong> If dissatisfied with the Commissioner's decision on an objection, an appeal can be made to the Tax Appeal Board.</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="part7" id="property-tax-miscellaneous">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VII: Miscellaneous
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Service of Notices:</strong> Details how notices under the Act are to be served.</p>
                    <p><strong>Regulations:</strong> The Minister may make regulations for carrying out the provisions of the Act.</p>
                    <p><strong>Offences and Penalties:</strong> Specifies penalties for non-compliance, obstruction, or providing false information.</p>
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
