
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Landmark, Users, DollarSign, ArrowRight, Info } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Import simplified calculators
import SimplifiedLevyCalculator from '@/components/calculators/SimplifiedLevyCalculator';
import SimplifiedPayrollCalculator from '@/components/calculators/SimplifiedPayrollCalculator';
import CorporationTaxPage from '../calculators/corporation-tax/page';

export default function TaxTtPage() {
  const levyAccordionItems = [
    "Purpose", "Must be paid at a rate of 0.6% on gross sales", "By Persons & Companies", 
    "Quarterly", "But may be exempt", "If underpaid", "If overpaid", 
    "If not paid", "Fun details", "Related forms", "How to pay?"
  ];
  
  const greenFundAccordionItems = [ 
    "Purpose", "Must be paid at a rate of 0.3% on gross sales", "By Companies", 
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
                     The Business Levy is a tax on businesses in Trinidad and Tobago that helps fund public services and support the national economy.
                    </p>
                    <p className="pt-2">
                    The Green Fund Levy supports environmental projects like clean-ups, reforestation, and education, ensuring businesses contribute to environmental protection.
                    </p>
                    <p className="pt-2">
                    Together, these levies promote both economic stability and environmental responsibility.
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
                            {item === "Purpose" && (
                              <>
                                The Business Levy is a tax paid to the Board of Inland Revenue on the gross sales or receipts of a company or individual for each year of income. It excludes income from employment (emoluments) for individuals. Legally, it is defined under the Miscellaneous Taxes Act as the tax imposed under section 3A of the Corporation Tax Act.
                                </>
                            )}
                            {item === "Must be paid at a rate of 0.6% on gross sales" && (
                              <>
                                The sources present different rates for the business levy. Some sources state the rate is <strong>0.6 per cent</strong> on the gross sales or receipts of a company [15, Ch. 75:02, pg 11] and a person [3, Ch. 75:01, pg 21]. These references are associated with later Act numbers like 30 of 2007, 1 of 2016, and 7 of 2016. Other sources state the rate is 0.2 per cent on the gross sales or receipts of a company [19, Ch. 75:02, pg 12] and a person [26, Income Tax Act, pg 4]. These references are associated with earlier Act numbers like 6 of 1993, 22 of 1993, 3 of 1994, 5 of 1995, 8 of 1996, 9 of 1997, 35 of 1998, 91 of 2000, 21 of 2005, 2 of 2006, 30 of 2007 (note the overlap in citation lists but different rates stated), and Finance Acts of 1994, 1995, 1996, 1997, 1998, and Act 91 of 2000. Based on the sources, the rate of <strong>0.6% is stated in more recent references, while 0.2% is stated in references citing earlier legislation.</strong>
                              </>
                            )}
                            {item === "By Persons & Companies" && (
                              <>
                                The business levy is levied on the gross sales or receipts of a person and a company. The sources also indicate that for the purposes of the Environmental Levy Part, where business levy is referenced, "company" includes a partnership [51, Miscellaneous Taxes Act, pg 158]. The Income Tax Act provisions applied to the business levy include Section 2 (Interpretation), which would define "person" in that context, but that specific definition is not provided in these excerpts.
                              </>
                            )}
                            {item === "Quarterly" && (
                              <>
                                The business levy shall be payable on the gross sales or receipts of each quarter. The quarters end on 31st March, 30th June, 30th September and 31st December, in each year of income. The provisions of section 79 of the Income Tax Act, which relates to payment of tax by instalments, shall apply mutatis mutandis to this quarterly payment requirement for companies.
                              </>
                            )}
                            {item === "But may be exempt" && (
                              <>
                                Exemptions from the business levy are provided for both companies and persons:
                                <ul>
                                  <li>For companies, subsection (1) does not apply to companies during the first twelve months following their registration [15, 20, Ch. 75:02, pg 11].</li>
                                  <li>Companies or statutory corporations exempt from corporation tax under any Act are exempt [15, 20, Ch. 75:02, pg 11].</li>
                                  <li>The gross sales or receipts of a company which give rise to profits exempt from corporation tax under any Act are also exempt [20, Ch. 75:02, pg 12].</li>
                                  <li>The President may, by Order subject to negative resolution of Parliament, amend the relevant subsection to exempt other public utilities from the business levy [16, 21, 38, Ch. 75:02, pg 11-12].</li>
                                  <li>Notwithstanding the general levy rule, from 1st January 1999, the business levy shall not be levied earlier than the date of expiry of three years from the date of registration of a Corporation which is registered after that date [17, 22, Ch. 75:02, pg 13].</li>
                                  <li>Subsection 3A(2)(g) for companies was repealed by Act No. 2 of 2006 [16, 21, Ch. 75:02, pg 11-12].</li>
                                  <li>For persons, subsection (1) does not apply to the gross sales or receipts which give rise to income exempt from income tax under any Act [26, Income Tax Act, pg 4].</li>
                                  <li>The income of a person whose emolument income under section 100 exceeds seventy-five percent of his total income is exempt [26, Income Tax Act, pg 4].</li>
                                  <li>The gross sales or receipts of a person whose gross sales or receipts in the preceding year of income does not exceed the sum of two hundred and fifty thousand dollars, are exempt, unless there are reasonable grounds to believe that the gross sales or receipts in the particular year of income will exceed that sum [4, Ch. 75:01, pg 22].</li>
                                  <li>The gross sales or receipts of the business of a person for a period of three years following the commencement of the business are exempt [4, Ch. 75:01, pg 22].</li>
                                </ul>
                              </>
                            )}
                            {item === "If underpaid" && (
                              <>
                                Where a person [5, Ch. 75:01, pg 23] or a company [17, 22, 41, Ch. 75:02, pg 13] estimates their gross sales or receipts for any day in a quarter and pays business levy amounting to less than ninety per cent of the business levy liability for that quarter, the difference between ninety per cent of the business levy liability and the amount paid by the end of the quarter in which the levy liability arose, shall be subject to interest from the day following the end of that quarter to the date of payment. This interest is calculated at the rate of fifteen per cent per annum [5, 28, 17, 22, 41, Ch. 75:01, pg 23 & Ch. 75:02, pg 13]. If a person or company estimates sales/receipts and the actual amount is higher, they must pay the levy on the difference no later than the last day of the quarter following the quarter in which the sales/receipts were estimated [5, 28, 17, 22, 40, Ch. 75:01, pg 22-23 & Ch. 75:02, pg 13].
                              </>
                            )}
                            {item === "If overpaid" && (
                              <>
                                The provisions of the Income Tax Act relating to Repayment of Tax (Section 90(1) and (3)) and Refunds (Section 92) apply in relation to the business levy [24, Corporation Tax Act, pg 148]. Based on these applied sections, the Board of Inland Revenue may, upon serving the notice of assessment, refund any overpayment without application [9, 32, Income Tax Act, pg 146-147]. The Board shall make a refund after serving the assessment notice if a written application is made within twelve months from the date of overpayment or service of the assessment notice [9, 32, Income Tax Act, pg 146-147]. Instead of a refund, the Board may apply the amount of the overpayment to another liability under the Income Tax Act, or any other written law administered by the Board [9, 32, Income Tax Act, pg 147]. Where an amount is refunded or applied, interest at the rate of four per cent a year shall be paid or applied thereon [9, Income Tax Act, pg 147].
                              </>
                            )}
                            {item === "If not paid" && (
                              <>
                                The business levy is under the care and management of the Board of Inland Revenue [5, 29, 17, 22, 40, Ch. 75:01, pg 23 & Ch. 75:02, pg 13]. Various provisions of the Income Tax Act apply in relation to the business levy, including those concerning collection, recovery, interest for non-payment, offences, and penalties [5, 29, 17, 22, 40, 24, Ch. 75:01, pg 23 & Ch. 75:02, pg 13]. Specifically applied sections from the Income Tax Act include:
                                <ul>
                                  <li>Interest for non-payment of tax (Section 103) [24, Corporation Tax Act, pg 148].</li>
                                  <li>Collection (Sections 104 to 108) [24, Corporation Tax Act, pg 148].</li>
                                  <li>Recovery (Sections 109 to 112) [24, Corporation Tax Act, pg 148]. This can involve distress and sale of goods [34, Income Tax Act, pg 128] or recovery as a civil debt before a Magistrate [35, Income Tax Act, pg 128-129].</li>
                                  <li>Garnishment provisions also apply (Sections 113 and 114) [24, 10, 11, 36, Corporation Tax Act, pg 148 & Income Tax Act, pg 147-148]. Failure to comply with a garnishment requirement makes a person liable to pay the Board the amount discharged or required, whichever is less, as a debt due to the State [11, 36, Income Tax Act, pg 147-148].</li>
                                  <li>Imprisonment of defaulters (Section 115) [24, Corporation Tax Act, pg 148].</li>
                                  <li>Failure to deliver any required return, account, or certificate may result in a fine of seventy-five dollars for every day the failure continues [33, Income Tax Act, pg 118].</li>
                                </ul>
                              </>
                            )}
                             {item === "Fun details" && (
                              <>
                                <ul>
                                  <li>A person [4, Ch. 75:01, pg 22] or a company [16, 21, 38, Ch. 75:02, pg 11-12] is entitled to a tax credit against its business levy liability for a year of income equal to any payment made in respect of its income tax liability (for a person) or corporation tax liability (for a company) for that year, up to a maximum of its business levy liability.</li>
                                  <li>For the avoidance or removal of doubt, it is declared that in ascertaining the chargeable income of a person [5, 29, Ch. 75:01, pg 23] or the chargeable profits of a company [17, 22, 41, Ch. 75:02, pg 13], no deduction or allowance shall be made of, or on account of, the business levy imposed.</li>
                                  <li>Where the Board is satisfied that a person [4, 27, Ch. 75:01, pg 22] or a company [16, 21, 39, Ch. 75:02, pg 11] is unable to determine gross sales or receipts by the due date, they may, with Board approval, estimate the sales or receipts for that day. If actual sales/receipts are more than estimated, the levy on the difference is payable no later than the end of the following quarter [5, 28, 17, 22, 40, Ch. 75:01, pg 22-23 & Ch. 75:02, pg 13].</li>
                                  <li>Certain administrative provisions of the business levy (estimation, underpayment interest, non-deductibility, care and management) apply mutatis mutandis in relation to the Green Fund levy [53, Miscellaneous Taxes Act, pg 159]. The Green Fund levy itself is at a rate of 0.1 per cent on the gross sales or receipts of a company, effective 1st January 2001, and is payable quarterly [52, Miscellaneous Taxes Act, pg 158-159].</li>
                                </ul>
                              </>
                            )}
                             {item === "Related forms" && (
                              <>
                                The provisions of the Income Tax Act relating to Returns (Sections 76 and 77) apply in relation to the business levy [6, 29, 23, Ch. 75:01, pg 24 & Ch. 75:02, pg 13 & Income Tax Act, pg 60]. These sections require persons and companies liable to tax to file returns, but the specific name or nature of the form used for the business levy itself is not explicitly detailed in the provided sources.
                              </>
                            )}
                            {item === "How to pay?" && (
                              <>
                                The business levy is payable to the Board of Inland Revenue. It is payable on the gross sales or receipts of each quarter ending on 31st March, 30th June, 30th September and 31st December. Section 79 of the Income Tax Act applies mutatis mutandis, which relates to the payment of tax by instalments. The specific methods of payment (e.g., online, mail, in person) are not specified in the provided sources. However, as the levy is under the care and management of the Board of Inland Revenue, payment would be made through the processes established by the Board for tax collection.
                              </>
                            )}
                           </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">The Green Fund Levy</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {greenFundAccordionItems.map((item, index) => {
                        let content = `Placeholder content for ${item.toLowerCase()} regarding Green Fund Levy. Official information should be sourced from IRD and relevant legislation (Miscellaneous Taxes Act, Ch 77:01).`;
                        if (item === "Must be paid at a rate of 0.3% on gross sales") {
                          content = "A tax of 0.3% on gross sales or receipts that is paid to the Board of the Inland Revenue (BIR). You can use our calculator to help calculate the amount.";
                        } else if (item === "By Companies") {
                          content = "This levy is to be paid by registered companies*. Please note that companies in this instance includes partnerships, non-profit companies, charitable organizations & sports groups. Excludes sole traders.";
                        } else if (item === "Quarterly") {
                          content = "Green Fund Levy must be paid by the end of each quarter on 31st March, 30th June, 30th September and 31st December in each year of sales. If you are paying before the deadline date, you may not know the accurate sales figure for the entire period, you can estimate the amount of sales that you have to pay tax on for the remaining days for the period.";
                        }
                        return (
                         <AccordionItem value={`gfl-item-${index}`} key={`gfl-item-${index}`}>
                          <AccordionTrigger>{item.startsWith("Must be paid at a rate of") ? "Must be paid at a rate of 0.3% on gross sales" : item}</AccordionTrigger>
                          <AccordionContent>
                          {item === "Purpose" && (
 <>
 The purpose of the Green Fund is to financially assist organisations and community groups that are engaged in activities related to the remediation, reforestation, environmental education and public awareness of environmental issues and conservation of the environment. An activity is defined in the Green Fund Regulations as any activity, programme or project which is primarily engaged in remediation, reforestation and conservation of the environment. The Minister shall only consider applications in respect of an activity that is related to the remediation, reforestation and conservation of the environment. The Fund is established for the purposes of Part XIV of the Miscellaneous Taxes Act. The Minister shall disburse monies from the Fund to finance activities certified by the Minister with responsibility for the environment as being for the purposes referred to in section 64.
 </>
 )}
 {item === "Must be paid at a rate of 0.3% on gross sales" && (
 <>
 There shall be levied and paid to the Board a tax at the rate of <strong>0.3 per cent</strong>. This tax is known as a Green Fund Levy. The levy is imposed on the gross sales or receipts of a company carrying on business in Trinidad and Tobago. "Gross sales or receipts" means the gross revenue, sales or receipts of a company. Miscellaneous Taxes Act, Chap. 77:01, Section 62(1), Page 30.
 </>
 )}
 {item === "By Companies" && (
 <>
 The Green Fund Levy is levied and paid on the gross sales or receipts of a company carrying on business in Trinidad and Tobago. For the purpose of Part XIV (Green Fund Levy), "company" means a body corporate or an unincorporated association and includes a partnership. Miscellaneous Taxes Act, Chap. 77:01, Section 62(1), Page 30; Section 61, Page 30.
                              </>
                            )}
                            {item === "Quarterly" && (
                              <>
 The levy shall be payable by a company in each quarter. The quarters end on 31st March, 30th June, 30th September and 31st December in each year of income. The provisions of section 79 of the Income Tax Act apply mutatis mutandis to this requirement. Miscellaneous Taxes Act, Chap. 77:01, Section 62(2), Page 30.
                              </>
                            )}
                            {item === "But may be exempt" && (
                              <>
 The Green Fund Levy is levied and paid by a company carrying on business in Trinidad and Tobago, whether or not such company is exempt from the business levy. The provided excerpts for Part XIV of the Miscellaneous Taxes Act and the Green Fund Regulations do not explicitly list exemptions from the requirement to pay the Green Fund levy based on other criteria. Miscellaneous Taxes Act, Chap. 77:01, Section 62(1), Page 30.
                              </>
                            )}
                            {item === "If underpaid" && (
                              <>
 The provisions of section 3A(6), (7), (8), (9) and (10) of the Corporation Tax Act apply mutatis mutandis (with the necessary modifications) in relation to the Green Fund levy. Section 62A of the Miscellaneous Taxes Act states that Section 103A of the Income Tax Act shall apply as if references therein to taxes and interest under that Act included references to taxes and interest under the Miscellaneous Taxes Act. While the full text of the cross-referenced sections (Corporation Tax Act s. 3A(6)-(10) and Income Tax Act s. 103A) is not provided, the application of these sections and the general powers of the Board suggest that underpayments may be subject to interest. For context within the Miscellaneous Taxes Act itself, section 40(5) provides an example (for a different tax) where paying less than ninety per cent of the liability for a quarter results in the difference being subject to interest. The Board of Inland Revenue has all the powers it has in relation to income tax under the Income Tax Act for the collection and recovery of the levy. Miscellaneous Taxes Act, Chap. 77:01, Section 62(3), Page 30; Section 62A, Page 30; Section 62(4), Page 30. (Also see Section 40(5), Page 18 for context within the Act, noting it applies to a different tax).
                              </>
                            )}
                            {item === "If overpaid" && (
                              <>
 Where it is proved to the satisfaction of the Board that a company has, in any quarter, paid levy in excess of the amount properly chargeable, that company shall be entitled to have the levy so paid in excess, refunded to it. Every claim for such a refund must be made within one year from the end of the quarter to which the claim relates. Instead of making a refund, the Board may apply the amount to be refunded against another liability the company has under the Miscellaneous Taxes Act or any other written law administered by the Board. The Board shall notify the company accordingly in such cases. Miscellaneous Taxes Act, Chap. 77:01, Section 63(1), Page 30; Section 63(2), Page 30; Section 63(3), Page 31.
                              </>
                            )}
                            {item === "If not paid" && (
                              <>
 For the collection and recovery of the Green Fund levy, the Board of Inland Revenue shall have all the powers as it has in relation to income tax under the Income Tax Act. Section 62A applies Income Tax Act section 103A relating to taxes and interest to the levy. Additionally, an offence under the Miscellaneous Taxes Act or a penalty imposed by it, in relation to a tax administered by the Board, may be prosecuted, sued for or recovered summarily. Sums payable may be recovered and enforced in the manner prescribed by the Summary Courts Act. A person authorised by the Board may prosecute and conduct proceedings under the Act. General penalties under the Act include liability on summary conviction to a fine of three thousand dollars and to imprisonment for two years for certain offences. Failure to collect the tax or make remittance (in the case of a financial institution for a different tax under the Act) results in an additional amount of twenty-five per cent of the tax plus interest at fifteen per cent per annum. While this specific penalty applies to a different tax, it illustrates the types of consequences for non-payment within the Miscellaneous Taxes Act, powers which the Board has for the Green Fund Levy. The Minister with responsibility for finance may recover amounts disbursed from the Fund as a debt due and owing to the State in cases of misapplication or misuse. Failure to comply with conditions of a disbursement can result in immediate cessation of funding, debt recovery proceedings, and exclusion from future funding consideration. Miscellaneous Taxes Act, Chap. 77:01, Section 62(4), Page 30; Section 62A, Page 30; Section 30A(1), (2), Page 30. (Also see Section 30A(4), Page 30 and Section 40(2), Page 18 for general powers/penalties under the Act).
                              </>
                            )}
                             {item === "Fun details" && (
                              <>
 The provided sources are legal documents (an Act and Regulations) detailing the structure, purpose, and administration of the Green Fund Levy and the Green Fund. They focus on legal and administrative procedures for taxation and fund management and do not contain information typically described as "fun details".
                              </>
                            )}
                             {item === "Related forms" && (
                              <>
 The Minister may make Regulations for, among other things, the accounts, books and forms, to be used in the management of the Green Fund. The application for certification of an activity for the purposes of receiving funds from the Green Fund shall be in the form determined by the Minister and must be accompanied by specific documentation such as proof of incorporation or registration. These forms relate to the process of applying for and managing funds from the Green Fund, not explicitly the forms required by the Board of Inland Revenue for paying the levy to the Fund. Since the Board administers the levy using its income tax powers, standard tax forms or processes may be involved for payment, but the sources do not specify which forms are used for paying the Green Fund Levy itself. Miscellaneous Taxes Act, Chap. 77:01, Section 69(b), Page 33; Green Fund Regulations, Regulation 4(1), Page 48.
                              </>
                            )}
                            {item === "How to pay?" && (
                              <>
 The Green Fund Levy shall be levied and paid to the Board (Board of Inland Revenue). The Board is required to pay into the Green Fund the levy received by it within fourteen days from the end of each quarter. For the collection and recovery of the levy, the Board has all the powers it has in relation to income tax under the Income Tax Act. The sources describe who is paid (the Board) and the Board's powers, but do not specify the particular methods (e.g., online, in person, mail) by which companies must make these payments to the Board. Miscellaneous Taxes Act, Chap. 77:01, Section 62(1), Page 30; Section 62(4), Page 30; Section 66(1), Page 32.
                              </>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                       );
                      })}
                    </Accordion>
                  </div>
                </CardContent>
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
              <CorporationTaxPage />
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
