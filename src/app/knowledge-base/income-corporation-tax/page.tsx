import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FaFilePdf } from 'react-icons/fa';
import CorporationTaxGlossary from "@/components/CorporationTaxGlossary";

const CorporationTaxActPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Corporation Tax Act - CHAPTER 75:02</h1>
      <h2 className="text-xl text-gray-600 mb-8">
      (As updated to June 30th, 2013)
       <a href="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/Legal%20Documents%2FCorporation-Tax-Act-75.02.pdf?alt=media&token=ef6998b1-039a-42d9-975e-9b21990192e1" target="_blank" rel="noopener noreferrer" className="ml-2">
       <FaFilePdf className="inline-block align-middle" />
          </a>
        </h2>

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
                    <p><span className="font-semibold">Rate of Corporation Tax:</span>
                    <ul>
                        <li>The <b>standard rate</b> is <b>twenty-five per cent</b> for every dollar of the chargeable profits of a company.</li>
                         <li>An exception exists for the <b>long-term insurance business</b> of an assurance company, where the rate is <b>fifteen per cent</b>.</li>
                       <li>A higher rate of <b>thirty-five per cent</b> per annum is applied to companies engaged in specific activities:</li>
                        <li>Liquefaction of natural gas.</li>
                        <li>Manufacture of petro-chemicals.</li>
                    Interpreting the provided source to provide an overview of Section 26 of the Corporation Tax Act, it states that there are certain cases which have the ability to influence the exemption of distribution or payment of interest from company members even if these organizations are excused from taxation. However, these specific accounts are conditioned to comply with the Inland Revenue Board.</li>
                         </ul>
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

export default function Page() {
  return <CorporationTaxGlossary />;
}
 <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Glossary</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
           <div className="md:grid md:grid-cols-2 gap-4">
           <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="preliminary">
                    <AccordionTrigger>Section 2 - PRELIMINARY</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">branch or agency:</span> Means any factorship, agency, receivership, branch or management.</p>
                      <p><span className="font-semibold">chargeable profits:</span> Means the aggregate amount of the profits of any company specified in section 3 remaining after allowing the appropriate deductions and exemptions under Part I of the Act.</p>
                      <p><span className="font-semibold">company:</span> Means any body corporate or unincorporated association, but does not include a partnership.</p>
                      <p><span className="font-semibold">corporation tax or tax:</span> Means the tax charged by section 3.</p>
                      <p><span className="font-semibold">distribution:</span> Has the meaning assigned to it by section 49 of the Income Tax Act.</p>
                      <p><span className="font-semibold">investment company:</span> Has the meaning assigned to that expression in section 6(3) of the Act.</p>
                      <p><span className="font-semibold">marketing licensee:</span> Means a person carrying on marketing business to whom a marketing licence, within the meaning of regulation 3(1)(h) of the Petroleum Regulations, is issued or to be issued under or in accordance with the Petroleum Act.</p>
                      <p><span className="font-semibold">new consideration:</span> Has in other provisions the same meaning as in section 49(11) of the Income Tax Act.</p>
                      <p><span className="font-semibold">petroleum operations:</span> Has the meaning assigned to it by section 2(1) of the Petroleum Taxes Act.</p>
                      <p><span className="font-semibold">preference dividend:</span> Means a dividend payable on a preferred share or preferred stock at a fixed gross rate per cent issued by a resident company before 31st January 1966, or, where a dividend is payable on such a preferred share or preferred stock partly at a fixed gross rate per cent and partly at a variable rate, such part of that dividend as is payable at a fixed gross rate per cent.</p>
                      <p><span className="font-semibold">profits:</span> Means income and includes short-term capital gains.</p>
                      <p><span className="font-semibold">resident company:</span> Means a company that is controlled in Trinidad and Tobago, whether or not the company is (a) incorporated in Trinidad and Tobago; or (b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago. The place where such a company is regarded as controlled is the place where the mind or management of the company is ordinarily situated.</p>
                      <p><span className="font-semibold">royalties:</span> Means amounts paid as consideration for the use of, or the right to use copyrights, artistic or scientific works, patents, designs, plans, secret processes or formulae, trade marks, motion picture films, films or tapes for radio or television broadcasting, or other like properties or rights, or information concerning industrial, commercial or scientific knowledge, experience or skill. It also includes royalties, rentals, or other amounts paid in respect of the operation of mines, quarries or other natural resources.</p>
                      <p><span className="font-semibold">short-term capital gains:</span> Means chargeable gains accruing on a disposal of an asset within twelve months of its acquisition.</p>
                      <p><span className="font-semibold">subsidiary company:</span> Has the meaning provided for the purposes of section 49(1)(d)(iv) of the Income Tax Act by section 49(4) of that Act.</p>
                      <p><span className="font-semibold">withholding tax:</span> Has the same meaning as in section 2 of the Income Tax Act.</p>
                      <p><span className="font-semibold">a source of income:</span> Is "within the charge to" corporation tax or income tax if that tax is chargeable on the income arising from it or would be so chargeable if there were any such income, and references to a person, or to income being within the charge to tax, shall be similarly construed.</p>
                      <p><span className="font-semibold">Corporation Tax Acts:</span> Means Part I of the Act (including provisions relating to income tax), together with the provisions of the Income Tax Act as far as it applies for the purposes of corporation tax and any written law relating to corporation tax, except so far as the context otherwise requires.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

           <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="imposition">
                    <AccordionTrigger>Section 3 - IMPOSITION OF CORPORATION TAX</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                      <p><span className="font-semibold">SME listed company:</span> Means a Small and Medium Enterprise company listed on the Trinidad and Tobago Stock Exchange, namely a company whose minimum capital base is five million dollars, maximum capital base is fifty million dollars, and minimum number of shareholders is twenty-five members. The capital base comprises issued share capital, retained earnings, and amounts transferred from such to a reserve account.</p>
                      </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
          <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="exemption">
            <AccordionTrigger>Section 6 - Exemptions</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p><span className="font-semibold">sporting body of persons:</span> For the purposes of subsection (1)(e), means a body of persons established for the purpose of promoting or advancing sporting events, to a share in the profits of which no member or person other than another sporting body of persons is entitled, and whose profits are applied wholly to the promotion or advancement of sporting events or to the provision of facilities or amenities for competitors in, or for members of the public who attend, sporting events. It does not cease to be a sporting body of persons solely because a portion of its profits is donated to a charitable or educational institution of a public character.</p>
              <p><span className="font-semibold">sporting events:</span> For the purposes of subsection (1)(e), means athletics, badminton, basketball, billiards, amateur boxing, martial arts, wrestling, cricket, cycling, model aeroplane flying, football, rugby, golf, hockey, netball, baseball, polo, swimming, tennis, weightlifting, yachting, automobile sports, surfing, archery, scrabble, table tennis, body building, taekwondo, billiards/snookers, bridge/other card games, tagby, chess, squash, darts, draughts/checkers, volleyball, equestrian, windsurfing, game fishing, gymnastics, judo, karate, karting, kickboxing, life saving, softball, target archery, pigeon racing, recreational diving, special olympics, powerboat racing, para olympics, rifle shooting, sailing, model car racing, cricket (windball), triathlon, powerlifting and such other activities or events as may be prescribed.</p>
              <p><span className="font-semibold">local authority:</span> For the purposes of this section, means the Port-of-Spain Corporation, the San Fernando Corporation and the Arima Corporation, continued under section 3 of the Municipal Corporations Act.</p>
              <p><span className="font-semibold">investment company:</span> For the purposes of this section, satisfies certain conditions including having 90% or more of its income derived from investments, at least 90% of its gross income derived from sources outside Trinidad and Tobago, not more than 10% of its property consisting of shares, bonds, marketable securities of any one company or debtor (other than Government), having at least fifty shareholders none of whom held more than 25% of shares/capital stock, and distributing 90% or more of its profits (excluding certain investment income) to shareholders within six months of the accounting period end.</p>
              <p><span className="font-semibold">approved agricultural holding:</span> For the purposes of subsection (1)(s) and (t), has the same meaning assigned to it as under section 14(6) of the Income Tax Act. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).</p>
              <p><span className="font-semibold">financial institution:</span> For the purposes of subsection (1)(s) and (t), means a company which carries on all or any aspects of banking business or business of a financial nature. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).</p>
              <p><span className="font-semibold">Minister:</span> For the purposes of subsection (1)(s) and (t), means the Minister to whom responsibility for agriculture is assigned. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).</p>
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
      </div>
          </CardContent>
        </Card>



      </div>
    </div>
  );
}