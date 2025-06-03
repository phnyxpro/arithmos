import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CorporationTaxActPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Corporation Tax Act - CHAPTER 75:02</h1>
      <h2 className="text-xl text-gray-600 mb-8">(As updated to June 30th, 2013)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a href="#">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>PART I — TAXATION OF COMPANIES</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Preliminary</AccordionTrigger>
                  <AccordionContent>
                    In this Part—
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>branch or agency</AccordionTrigger>
                  <AccordionContent>
                    means any factorship, agency, receivership, branch or management;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>chargeable profits</AccordionTrigger>
                  <AccordionContent>
                    means the aggregate amount of the profits of any company specified in section 3 remaining after allowing the appropriate deductions and exemptions under this Part;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>company</AccordionTrigger>
                  <AccordionContent>
                    means any body corporate or unincorporated association, but does not include a partnership;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>corporation tax or tax</AccordionTrigger>
                  <AccordionContent>
                    means the tax charged by section 3;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>distribution</AccordionTrigger>
                  <AccordionContent>
                    has the meaning assigned to it by section 49 of the Income Tax Act;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>investment company</AccordionTrigger>
                  <AccordionContent>
                    has the meaning assigned to that expression in section 6(3);
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>marketing licensee</AccordionTrigger>
                  <AccordionContent>
                    means a person carrying on marketing business to whom a marketing licence, within the meaning of regulation 3(1)(h) of the Petroleum Regulations is issued or to be issued under or in accordance with the Petroleum Act;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>new consideration</AccordionTrigger>
                  <AccordionContent>
                    has in other provisions the same meaning as in section 49(11) of the Income Tax Act;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>non-resident company</AccordionTrigger>
                  <AccordionContent>
                    means a company not controlled in Trinidad and Tobago, whether or not the company is—
                    (a) incorporated in Trinidad and Tobago; or
                    (b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-11">
                  <AccordionTrigger>petroleum marketing business</AccordionTrigger>
                  <AccordionContent>
                    means the business of dealing in petroleum and petroleum products by way of an acquisition and a disposal to a marketing licensee or to a consumer in Trinidad and Tobago or to a person in any other prescribed country, and includes bunkering of ships and aircraft by a marketing licensee, but does not include—
                    (a) disposal of petroleum by a person carrying on a production business where the petroleum disposed of is produced by such person; or
                    (b) disposal by a person carrying on refining business of—
                    (i) petroleum products refined by such person;
                    (ii) petroleum products acquired and blended with petroleum products refined by such person,
                    where any such disposal is made to a marketing licensee, or to the refining business of another; or
                    (c) bunkering of ships ex-refinery wharf in international trade by a person carrying on refining business;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-12">
                  <AccordionTrigger>petroleum operations</AccordionTrigger>
                  <AccordionContent>
                    has the meaning assigned to it by section 2(1) of the Petroleum Taxes Act;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-13">
                  <AccordionTrigger>preference dividend</AccordionTrigger>
                  <AccordionContent>
                    means a dividend payable on a preferred share or preferred stock at a fixed gross rate per cent issued by a resident company before 31st January 1966, or, where a dividend is payable on such a preferred share or preferred stock partly at a variable rate, such part of that dividend as is payable at a fixed gross rate per cent;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-14">
                  <AccordionTrigger>profits</AccordionTrigger>
                  <AccordionContent>
                    means income and includes short-term capital gains;
                  </AccordionContent>
                </AccordionItem>
        </Accordion>
      </div>

           <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="expense">
            <AccordionTrigger>Section 10B - Promotional expenses</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p><span className="font-semibold">company:</span> For the purposes of this section, means a company incorporated and resident in Trinidad and Tobago.</p>
              <p><span className="font-semibold">promotional expenses:</span> For the purposes of this section, means expenses incurred in respect of services or goods/agricultural produce manufactured or produced in Trinidad and Tobago for advertising in foreign markets, providing promotional literature overseas, participating in trade fairs/missions, overseas travel for promotion, providing free samples/technical information, inviting buyers to Trinidad and Tobago, recruitment of specialist sales personnel operating in foreign markets (max 2 years), and conducting foreign market surveys.</p>
              <p><span className="font-semibold">petroleum operations:</span> For the purposes of subsection (6), means operations related to the various phases of the petroleum industry and includes exploring for, producing, refining, transporting and marketing petroleum or petroleum products or both and manufacturing and marketing of petroleum-based products and petro-chemicals.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}