import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FaFilePdf } from 'react-icons/fa';
import CorporationTaxGlossary from "@/components/CorporationTaxGlossary";

export default function CorporationTaxActPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Corporation Tax Act - CHAPTER 75:02</h1>
      <h2 className="text-xl text-gray-600 mb-8">
        (As updated to June 30th, 2013)
        <a
          href="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/Legal%20Documents%2FCorporation-Tax-Act-75.02.pdf?alt=media&token=ef6998b1-039a-42d9-975e-9b21990192e1"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2"
        >
          <FaFilePdf className="inline-block align-middle" />
        </a>
      </h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-left">Quick questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>1. What is the purpose of the Corporation Tax Act?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground text-left">
              The Corporation Tax Act in Trinidad and Tobago provides for the taxation of short-term capital gains and establishes a framework for taxing company profits. It also addresses matters incidental to or consequential upon these taxation provisions. The Act aims to ensure that companies operating within or deriving income from Trinidad and Tobago contribute to the national revenue through corporation tax.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>2. Which types of income and gains are considered "profits" and are therefore subject to corporation tax?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Under the Corporation Tax Act, "profits" encompass a broad range of income sources and gains. These include, but are not limited to, income from trade or business (including petroleum marketing business and other specified activities), professions or vocations, management charges, charges for personal services and technical/managerial skills, short-term capital gains, interest, discounts, annuities, rents, royalties, premiums, commissions, fees, licence charges, and dividends. Essentially, any annual profits not specifically exempted or falling under other categories are also considered profits subject to taxation.
            </AccordionContent>
          </AccordionItem>
 <AccordionItem value="q3">
            <AccordionTrigger>3. What is a "resident company" for the purposes of this Act?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              A "resident company" is defined as a company that is controlled in Trinidad and Tobago. This is the case regardless of whether the company is incorporated in Trinidad and Tobago or is engaged in trade, business, or professional/vocational activities within the country. The location where a company is considered to be controlled is where the "mind or management" of the company is ordinarily situated.
            </AccordionContent>
          </AccordionItem>
 <AccordionItem value="q4">
            <AccordionTrigger>4. How does the Act define "short-term capital gains"?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              "Short-term capital gains" are defined as chargeable gains that accrue on the disposal of an asset within twelve months of its acquisition. This specific timeframe is crucial for determining whether a capital gain falls under the "short-term" classification and is therefore subject to the corporation tax provisions related to such gains.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger>5. Are there any exemptions from corporation tax for certain types of companies or income?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes, the Act provides for several exemptions from corporation tax. These include certain approved small companies, companies operating in regional development areas, approved activity companies (for a specified period), profits of co-operative societies, sporting bodies, profits of the Post Office Savings Bank and other thrift institutions, profits from certain approved funds or schemes, profits of statutory or registered building/friendly societies, interest on specific public revenue loans, profits from investments of certain National Insurance Act funds, market development grants (under specific conditions), profits of certain development and financial institutions, interest on certain bonds and loans related to housing and education, profits of venture capital companies (including short-term capital gains), profits of certain trusts and unit trust businesses, profits of BWIA International Airways Limited for a specific period, and certain dividends and distributions received by resident companies. The President also has the power to amend the list of exemptions.
            </AccordionContent>
          </AccordionItem>
 <AccordionItem value="q6">
            <AccordionTrigger>6. What is the "business levy" and how does it relate to corporation tax?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              The business levy is a separate tax imposed on the gross sales or receipts of a company at a rate of 0.2 per cent. Companies can claim a tax credit against their business levy liability for corporation tax paid, up to the business levy liability. It's payable quarterly and not deductible for corporation tax. Exemptions include new companies in the first 12 months, corporation tax-exempt companies, and those with gross sales/receipts below a threshold in the preceding year.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q7">
            <AccordionTrigger>7. What are some of the specific deductions and allowances available to companies under the Act?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              The Act outlines various deductions and allowances that companies can claim to reduce their chargeable profits. These include deductions for certain promotional expenses aimed at creating or expanding foreign markets for Trinidad and Tobago goods and services (equivalent to 150% of actual expenditure under specific conditions), expenses incurred in respect of training, deductions for contributions to catastrophe reserve funds, allowances for art and culture expenditures (up to a maximum amount), scholarship allowances for non-employee nationals, deductions for promoting or sponsoring sporting activities/events or sportsmen (up to a maximum amount), deductions for sponsoring audio, visual, or video productions for local purposes (150% of actual expenditure up to a maximum amount), deductions for production companies creating their own audio, visual, or video productions (150% of actual expenditure up to a maximum amount), allowances for engaging certified energy service companies for energy-saving systems (150% of expenditure), and deductions for promoting the fashion industry (150% of expenditure up to a maximum amount). There are limitations on the aggregate amount of certain allowances that can be claimed, and double deductions under different sections are prohibited.
            </AccordionContent>
          </AccordionItem>
 <AccordionItem value="q8">
            <AccordionTrigger>8. How are "close companies" treated under the Corporation Tax Act?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              The Act includes specific provisions for "close companies," defined primarily as companies controlled by five or fewer participators or by participators who are also directors, with certain exceptions. The Board of Inland Revenue has the power to direct a close company to distribute as dividends profits that could be distributed without negatively impacting the company's business, with consideration given to current needs and future development requirements. The Act also limits the deduction that can be made for the remuneration of directors in close companies, depending on their role and whether they are whole-time service directors. Supplementary provisions provide detailed definitions of "close company," "associated company," "control," "participator," "associate," and "director" for the purposes of these regulations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Act Information</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
           <div className="md:grid md:grid-cols-2 gap-4">
            <div>
             <p className="text-sm text-muted-foreground">An Act to provide for the taxation of short-term capital gains and make better provisions for the taxation of company profits and related matters.</p>
             </div>
            <div>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
              <li>Enacted by Act 29 of 1966. Part II of the Finance Act 1966 dealt with corporation tax and was detached and published separately as this Chapter.</li>
              <li>Has been amended by various subsequent Acts up to Act 2 of 2013.</li>
              <li>Current Authorised Pages updated to June 30th 2013.</li>
              <li>Administered under the care and management of the Board of Inland Revenue.</li>
              <li>Contains no subsidiary legislation.</li>
              <li>Notes on Omissions: Delegation of Functions Orders and certain Notices made under sections 16B(3) and 16.</li>
            </ul>
             </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Part I: Taxation of Companies</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="md:grid md:grid-cols-2 gap-4">
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="imposition">
                    <AccordionTrigger>Imposition of Corporation Tax</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Charge:</span> Corporation tax is payable at the rate specified in the First Schedule for each year of income upon the profits of any company, accruing in or derived from Trinidad and Tobago or elsewhere and whether received in Trinidad and Tobago or not.</p>
                      <p><span className="font-semibold">Scope of Profits:</span> Includes profits from farming, mining, trade, profession, short-term capital gains, interest, rents, royalties, distributions, premiums, commissions, fees, licence charges, dividends, and other annual profits.</p>
                      <p><span className="font-semibold">Resident vs. Non-Resident:</span> A resident company is chargeable on all its profits wherever arising. A non-resident company carrying on trade or business in Trinidad and Tobago is chargeable on profits directly or indirectly accruing in or derived from Trinidad and Tobago.</p>
                      <p><span className="font-semibold">Continental Shelf:</span> Profits from activities on the continental shelf are deemed to have accrued in or been derived from Trinidad and Tobago.</p>
                      <p><span className="font-semibold">Rate:</span> Generally twenty-five per cent of chargeable profits, with exceptions for long-term insurance business and specific industries (e.g., liquefaction of natural gas, petro-chemicals, etc. at thirty-five per cent). SME listed companies may have a rate of ten per cent for the first five years.</p>
                      <p><span className="font-semibold">Business Levy:</span> A tax levied at a rate of 0.2 per cent on the gross sales or receipts of a company for each year of income. Certain companies and receipts are exempt (e.g., during first 12 months of registration, companies exempt from corporation tax, exempt profits, specific statutory bodies, companies subject to Petroleum Taxes Act, companies with preceding year gross sales not exceeding $360,000). The levy is payable quarterly. A tax credit is available against business levy liability for corporation tax payments for that year, up to the business levy liability. The levy is not deductible in ascertaining chargeable profits. Certain Income Tax Act provisions apply to the business levy.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="basis">
                    <AccordionTrigger>Basis of Assessment and Exemptions</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Basis:</span> Corporation tax is charged for each year of income upon the chargeable profits arising in that year. Assessed on the full amount of profits accruing or arising (whether or not received), without deductions other than those authorised.</p>
                      <p><span className="font-semibold">Chargeable Profits Defined:</span> The aggregate amount of profits after allowing appropriate deductions and exemptions under Part I.</p>
                      <p><span className="font-semibold">Exemptions (Section 6(1)):</span> Includes but is not limited to: Distributions (other than preference dividends) from a resident company; Profits of an investment company meeting specific criteria; Profits of approved tourism projects; Profits of co-operative societies; Approved sporting body profits (defined criteria apply); Profits of registered trade unions applicable for provident benefits; Profits of ecclesiastical, charitable, or educational institutions of a public character (not from trade/business); Profits from investment of National Insurance Act funds; Market development grants meeting criteria (non-prohibited countries); Profits of TTDFC, Caribbean Microfinance Limited, NIPDEC, Trinidad and Tobago Bureau of Standards, Small Business Development Company Limited; Interest on certain public revenue loans and specific bonds/loans; Profits and short-term capital gains of a venture capital company; Profits of certain trusts carrying on Unit Trust business or approved by the President, and dividends/distributions from such trusts or the Unit Trust Corporation to resident companies; Profits of the Export Import Bank for a limited period/amount; Profits of the CLICO Investment Fund (CIF) and income/dividends distributed to resident unitholders of the CIF. The President may amend the list of exemptions by Order.</p>
                      <p><span className="font-semibold">General as to Exemption (Section 26):</span> [Details on exemption rules]</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="computation">
                    <AccordionTrigger>Computation of Profits</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">General Rules:</span> Chargeable profits are computed in accordance with income tax principles relating to applied provisions of the Income Tax Act, and all questions as to amounts and timing are determined based on income tax law and practice as applied by Section 19. Income Tax Act provisions conferring exemption or charging amounts apply for corporation tax purposes where consistent.</p>
                      <p><span className="font-semibold">Deductions and Allowances (Various Sections):</span> The Act specifies various allowable deductions and allowances.</p>
                      <p><span className="font-semibold">Limitations:</span> Aggregate limit on allowances under sections 10G, 10I, 10J, and 10Q (sum not exceeding $3M).</p>
                      <p><span className="font-semibold">Losses:</span> Rules for carrying forward and setting off losses apply, but with restrictions where there is a change in shareholding. Group relief for trading losses is also available.</p>
                      <p><span className="font-semibold">Other:</span> Certain Income Tax Act provisions regarding deductions and allowances apply. Tax credit for shares in Venture Capital Company. Tax credit on interest paid by mutual funds. Tax credit from Export Import Bank investment.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="special">
                    <AccordionTrigger>Special Rules</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Close Companies:</span> Defined as companies under the control of five or fewer participators or participators who are directors, with exceptions.</p>
                      <p><span className="font-semibold">Insurance, Shipping and Air Navigation Companies:</span> Special provisions apply, detailed in the Fourth Schedule.</p>
                      <p><span className="font-semibold">Approved Mortgage Companies and Other Companies:</span> Special tax exemptions apply to income/profits derived from the business related to section 42(2)(b) to (e) of the Income Tax Act.</p>
                      <p><span className="font-semibold">Reliefs for Certain Companies:</span> Approved small companies, approved companies in regional development areas, and approved activity companies may be exempt from corporation tax for five years from 1st January 2006.</p>
                      <p><span className="font-semibold">Double Taxation Relief:</span> Sections 93 and 95 of the Income Tax Act and related laws apply to corporation tax and profits.</p>
                      <p><span className="font-semibold">Group Relief for Trading Losses:</span> Provisions for group relief between companies.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Part II: Miscellaneous and General</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
           <div className="md:grid md:grid-cols-2 gap-4">
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="exemptions">
                    <AccordionTrigger>General as to Exemption (Section 26)</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Section 26 Overview:</span> Section 26 addresses exemptions from income tax or corporation tax concerning distributions or payments of interest made by companies that are themselves exempt from these taxes.</p>
                      <p><span className="font-semibold">Subsection (1):</span>Provides that even if a written law limits the period during which an exempt company may distribute exempt profits, the company can still distribute these exempt profits at any time thereafter. When distributed, these sums are exempt from income tax or corporation tax in the hands of the company's members, provided a special account showing the distributions and interest payments is maintained by the company to the satisfaction of the Board of Inland Revenue.</p>
                      <p><span className="font-semibold">Subsection (2):</span>Deals with cases where a member of an exempt company is another company. In such instances, the other company (the member) is entitled to distribute a sum equivalent to the exempt distributions or interest received by it to its own members at any time. These distributed sums are exempt from income tax or corporation tax for the members of the other company, provided the other company keeps a special account detailing the exempt distributions and interest received from the initial exempt company, to the satisfaction of the Board of Inland Revenue.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="other">
                    <AccordionTrigger>Other Provisions</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Special Return:</span> The Board may require auctioneers or dealers in tangible movable property to return particulars of transactions.</p>
                      <p><span className="font-semibold">Nominee Share Holdings:</span> The Board may require registered shareholders to disclose beneficial ownership and the name/address of the beneficial owner. Penalties apply for non-compliance.</p>
                      <p><span className="font-semibold">Partnerships:</span> Returns must include particulars of disposal and acquisition of partnership property as if the partnership were liable to tax.</p>
                      <p><span className="font-semibold">Information as to Non-Resident Companies and Trusts:</span> The Board may require particulars from persons holding shares/securities or interested in settled property in non-resident entities to determine if they fall under certain Income Tax Act provisions and if chargeable gains accrued.</p>
                      <p><span className="font-semibold">Valuation:</span> The Board may authorise public officers to inspect property to ascertain market value; obstructing such officers is an offence.</p>
                      <p><span className="font-semibold">Priority of Tax in Bankruptcy:</span> Corporation tax has the same priority as income tax in bankruptcy.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Schedules</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
           <div className="md:grid md:grid-cols-2 gap-4">
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="first">
                    <AccordionTrigger>First Schedule - Rate of Corporation Tax</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Rate of Corporation Tax:</span></p>
                      <ul className="list-disc pl-4">
                        <li><b>Standard rate:</b> 25% on every dollar of the chargeable profits of a company.</li>
                        <li><b>Long-term insurance business:</b> 15% for an assurance company.</li>
                        <li><b>Higher rate of 35%</b> applies to companies engaged in:
                          <ul className="list-disc pl-6">
                            <li>Liquefaction of natural gas</li>
                            <li>Manufacture of petro-chemicals</li>
                          </ul>
                        </li>
                      </ul>
                      <p>
                        Section 26 also provides authority to exempt distributions or interest payments even for tax-exempt organisations,
                        conditional upon compliance with the Inland Revenue Board.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="third">
                    <AccordionTrigger>Third Schedule - Close Companies</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Close Companies</span>: This schedule provides supplementary provisions for the interpretation and operation of the sections of the Act relating to close companies.</p>
                      
                    <p><span className="font-semibold"> A "close company"</span> is defined for the purposes of Part I as one under the control of five or fewer participators or of participators who are directors.However, this definition does not apply to: a non-resident company, a statutory or registered building or friendly society, or a company controlled by or on behalf of the State.</p>
                      </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="fourth">
                    <AccordionTrigger>Fourth Schedule - Insurance, Shipping and Air Navigation Companies</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Insurance, Shipping and Air Navigation Companies</span>: For a non-resident shipowner, profits from the shipping business can be calculated based on a certificate from the taxing authority of their principal place of business</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="fifth">
                    <AccordionTrigger>Fifth Schedule - Tax Exemptions for Approved Mortgage Companies and Other Companies</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Tax Exemptions for Approved Mortgage Companies and Other Companies</span>: This schedule provides exemptions from corporation tax for approved mortgage companies and certain other companies.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="sixth">
                    <AccordionTrigger>Sixth Schedule—Countries in Respect of Which Expenses and Grants May Not Be Claimed</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">Countries in Respect of Which Expenses and Grants May Not Be Claimed</span>: This schedule lists countries where tax deductible promotional expenses (under section 10B(6)) and market development grants (under section 6A) cannot be claimed.</p>
                      </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

            </div>

          </CardContent>
        </Card>
        <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Glossary</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CorporationTaxGlossary />
        </CardContent>
      </Card>
    </div>
  
  </div>
  );
}