
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
import { Library, Factory } from "lucide-react";

export default function AidToIndustryKnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Aid to Industry Act Knowledge Base
      </h1>
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Factory className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Aid to Industry Act Highlights
            </CardTitle>
          </div>
          <CardDescription>
            A summary of key sections of The Aid to Industry Act of Trinidad & Tobago. This is not legal advice. References are illustrative and should be verified with the official Act.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="aid-part1" id="aid-preliminary">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part I: Preliminary
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Interpretation:</strong> Defines key terms such as "approved industry", "approved enterprise", "pioneer product". (Refer to Part I, Section 2, Page X of the Act).</p>
                    <p><strong>Objectives of the Act:</strong> Aims to encourage the establishment and development of industries. (Refer to Part I, Section Y, Page Z of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="aid-part2" id="aid-approved-enterprises">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part II: Approved Industries & Enterprises
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Declaration of Approved Industry:</strong> Process by which an industry may be declared approved. (Refer to Part II, Section A, Page B of the Act).</p>
                    <p><strong>Application for Approved Status:</strong> How an enterprise can apply to be an "approved enterprise". (Refer to Part II, Section C, Page D of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                 <AccordionItem value="aid-part3" id="aid-concessions">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part III: Concessions and Benefits
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Tax Holidays:</strong> Exemption from income tax and corporation tax for a specified period. (Refer to Part III, Section X, Page Y of the Act).</p>
                    <p><strong>Duty Exemptions:</strong> Relief from customs duties on imported plant, machinery, raw materials. (Refer to Part III, Section Z, Page A of the Act).</p>
                     <p><strong>Initial Allowances:</strong> Accelerated depreciation allowances. (Refer to Part III, Section B, Page C of the Act).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="aid-part4" id="aid-application-process">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part IV: Application and Approval Process
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Submission of Applications:</strong> Details on how to submit applications for concessions. (Refer to Part IV, Section X, Page Y of the Act).</p>
                    <p><strong>Consideration by Minister:</strong> Role of the Minister in granting approvals. (Refer to Part IV, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="aid-part5" id="aid-conditions">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part V: Conditions & Obligations
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Conditions for Beneficiaries:</strong> Obligations placed on approved enterprises (e.g., employment, investment levels). (Refer to Part V, Section X, Page Y of the Act).</p>
                    <p><strong>Reporting Requirements:</strong> Need to submit regular reports. (Refer to Part V, Section Z, Page A of the Act).</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="aid-part6" id="aid-revocation">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Part VI: Revocation or Variation of Benefits
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                    <p><strong>Grounds for Revocation:</strong> Circumstances under which concessions can be withdrawn. (Refer to Part VI, Section X, Page Y of the Act).</p>
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

    