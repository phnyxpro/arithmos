import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FaFilePdf } from 'react-icons/fa';
import CorporationTaxGlossary from "@/components/CorporationTaxGlossary";

export default function CorporationTaxActPage() {
  return (
        <div className="container mx-auto py-8 px-4">
      <p className="text-sm text-muted-foreground mb-4">
 The Income Tax Act (Ch. 75:01) provides a common framework for tax administration, collection, and certain substantive rules that are extensively adopted and applied across different tax laws in Trinidad and Tobago, including the Corporation Tax Act (Ch. 75:02), Business Levy, National Recovery Impost, Unemployment Levy, and Green Fund Levy. While the Corporation Tax Act has its own distinct charging provisions and rules for taxing company profits, it heavily relies on the operational machinery and certain principles established in the older Income Tax Act.
      </p>
      <h1 className="text-3xl font-bold mb-2">The Income Tax Act - Chapter 75:01</h1>
      <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Part I</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow md:grid md:grid-cols-2 gap-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="preliminary">
                  <AccordionTrigger>Preliminary</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p className="mb-2">Sections 1-3 cover preliminary matters such as the short title, interpretation of terms, and the appointment of the Board of Inland Revenue.</p>
                    <p className="font-semibold">Section 1 - Short Title</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                      <li>This Act may be cited as the Income Tax Act.</li>
                    </ul>
                    <p className="font-semibold">Section 2 - Interpretation</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                      <li>Subsection (1): This subsection defines various terms used within the Act.</li>
                      <ul className="list-disc list-inside space-y-1 ml-8">
                        <li>"Appeal Board" is defined as the Appeal Board established under The Tax Appeal Board Act. The Tax Appeal Board Act is noted to provide for appeals from assessments to Income Tax, Corporation Tax, and other taxes. The Appeal Board is established as a superior court of record with an official seal.</li>
                        <li>"assessment" includes a re-assessment.</li>
                        <li>"Board of Inland Revenue" or "Board" means the Board of Inland Revenue established by section 3.</li>
                        <li>"body of persons" means any body politic, corporate, or collegiate and any company, fraternity, society or fellowship and persons, whether corporate or not corporate.</li>
                        <li>"chargeable income" means the aggregate amount of the income of any person from the sources specified in section 5, remaining after allowing the appropriate deductions and exemptions under this Act.</li>
                        <li>"child" includes a step-child, an illegitimate child or an adopted child.</li>
                        <li>"close company" has the same meaning as in the Third Schedule of the Corporation Tax Act. The Third Schedule of the Corporation Tax Act defines a "close company" as one which is under the control of five or fewer participators or of participators who are directors, with certain exceptions including a non-resident company, a statutory or registered building or friendly society, or a company controlled by or on behalf of the State.</li>
                        <li>"company" has the meaning assigned to that expression for the purposes of the Corporation Tax Act by section 2(1) thereof. In the Corporation Tax Act, "company" means any body corporate or unincorporated association, but does not include a partnership.</li>
                        <li>"trade" includes a business, and every trade, manufacture, adventure or concern in the nature of a trade or business.</li>
                        <li>"withholding tax" means the tax so referred to in section 50. It is also defined in the Corporation Tax Act with the same meaning as in section 2 of the Income Tax Act. Section 50 relates to tax deducted or withheld from certain payments.</li>
                        <li>"year of income" means the period of twelve months commencing on the lst January, in each year.</li>
                      </ul>
                      <li>Subsection (2): This subsection clarifies the application of the Income Tax Act to companies. It states that for years of income after 1965, the provisions (other than section 50) of the Income Tax Act relating to the charge of income tax shall not apply to the profits or gains accruing or arising to:</li>
                      <ul className="list-disc list-inside space-y-1 ml-8">
                        <li>A resident company.</li>
                        <li>A non-resident company, if the profits or gains are within the charge to corporation tax (as defined by section 2(1) of the Corporation Tax Act) or any other written law administered by the Board.</li>
                      </ul>
                    </ul>
                    <p className="font-semibold">Section 3 - Administration</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>For the purposes of the Income Tax Act, a Board of Inland Revenue is hereby established.</li>
                      <li>The Board consists of five Commissioners whose offices are public offices.</li>
                      <li>The Board of Inland Revenue is responsible for the care and management of corporation tax. It is also the Tax Authority for the collection and recovery of other taxes like the Hotel Accommodation Tax and the Green Fund Levy, and has powers relating to these taxes as it has for income tax. The Unemployment Levy is also under the care and management of the Board, with specific Income Tax Act provisions applied.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="administration-and-charging">
                  <AccordionTrigger>Administration and Charging Provisions</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 4 and 5 detail the administration of the Act by the Board of Inland Revenue and the charging provisions, specifying the sources of income subject to tax.</p>
                    <p className="font-semibold mt-4">Section 4 - Administration</p>
                    <p className="text-sm text-muted-foreground mb-2">Section 4 of the Income Tax Act relates to the administration of the Act. While the full text of Section 4 is not provided in the sources, its purpose is indicated by its heading when listed alongside Section 3, which establishes the Board of Inland Revenue. The Board of Inland Revenue is explicitly established for the purposes of the Income Tax Act by section 3. It consists of five Commissioners whose offices are public offices.</p>
                    <p className="text-sm text-muted-foreground mb-2">The Board of Inland Revenue is the body responsible for the care and management of various taxes, including corporation tax, the business levy, the Green Fund levy, and the Hotel Accommodation Tax. It also has powers relating to the collection and recovery of these taxes similar to its powers for income tax. Sections 3 and 4 of the Income Tax Act, relating to Administration, are specifically applied to the Corporation Tax Act, the business levy, and the Unemployment Levy. Section 131(1) of the Income Tax Act explicitly allows the Board to delegate any of its powers or functions (except the power to delegate) to a Commissioner or other person. This suggests that Section 4 likely details the general administrative powers or framework within which the Board operates under the Act.</p>

                    <p className="font-semibold mt-4">Section 5 - Charging Provisions</p>
                    <p className="text-sm text-muted-foreground mb-2">Section 5 introduces the CHARGING PROVISIONS of the Income Tax Act. It states that, subject to the provisions of the Act, Income Tax shall be payable at the rate or rates specified for each year of income upon the income of any person. A "person" can include an individual, a company, or a "body of persons". Income is subject to tax under this section regardless of whether it is accruing in or derived from Trinidad and Tobago or elsewhere, and whether or not it is received in Trinidad and Tobago. The tax is payable on the chargeable income of every person for that year. "Chargeable income" means the total amount of income from the sources listed in section 5, after relevant deductions and exemptions are allowed under the Act.</p>
                    <p className="font-semibold mt-2">Subsection (1) of Section 5 specifies the sources of income subject to tax:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>(a) gains or profits from farming, agriculture, forestry, fishing or other primary activity;.</li>
                      <li>(b) gains or profits from the operation of mines or the exploitation of natural or mineral resources;.</li>
                      <li>(c) gains or profits from any other trade or business;. A "trade" includes a business, and every trade, manufacture, adventure or concern in the nature of a trade or business.</li>
                      <li>(d) gains or profits from the practice of any profession or vocation or management charges for the provision of personal services and technical and managerial skills;.</li>
                      <li>(e) gains or profits from any employment or office including pensions or emoluments. "Emoluments" are defined as salary, wages, overtime, bonus, remuneration, perquisites (including the value of board and lodging), stipend, commission or other amounts for services, director's fees, retiring allowances or pension, arising, accruing, derived or received in Trinidad and Tobago, which are assessable to income tax. However, this definition specifically excludes any salary or share of profits arising from a trade, business, profession, or vocation carried on by a person individually or in partnership. Employer contributions to an approved fund or scheme or an approved pension fund plan on behalf of an employee are also included in emoluments. The estimated annual value of quarters, board, residence, or any other allowance granted in respect of employment or office, whether in money or otherwise, is also included.</li>
                      <li>(f) short-term capital gains;. "Short-term capital gains" are defined as chargeable gains accruing on the disposal of an asset within twelve months of its acquisition. The rules for computing gains and determining allowable losses are set out in the First Schedule, referred to as the Capital Gains (Supplementary Provisions) Rules.</li>
                      <li>(g) interest, discounts, annuities or other annual or periodic sums;. For a resident individual, interest that accrues, is paid, or credited is subject to a tax at the rate of five percent. This taxed interest is then deemed not to be the income of the individual for other purposes of the Act. The Home Mortgage Bank Act explicitly states that interest paid on bonds issued by the Home Mortgage Bank is exempt from income tax and any other tax, including Unemployment Levy. Persons carrying on a trade or business, especially banking, who pay or credit interest may be required by notice from the Board to provide a return listing the names and addresses of recipients and the amount of interest paid or credited. This requirement does not apply to interest paid or credited to a resident individual, and applies only to money received or retained in Trinidad and Tobago. A deduction for interest paid on borrowed money used in income production is not allowed unless the recipient is chargeable to tax or the interest is exempt in the recipient's hands.</li>
                      <li>(h) rents paid for immovable property and royalties from the operation of mines, quarries or other natural resources and the annual value of land and improvements thereon used by or on behalf of the owner or used rent-free by the occupier for the purposes of residence or enjoyment and not for the purpose of gain or profit, the annual value being that assessed in house rates or taxes under relevant laws like the Lands and Building Taxes Act or various Corporation Ordinances. Sections 42 to 46 of the Income Tax Act provide for income tax exemptions in respect of newly constructed dwelling houses. Premiums and rents from letting certain newly constructed houses may be exempted. The Board may require a certificate from the Minister responsible for Housing as a condition for applying these exemptions. These provisions (Sections 42-46) are applied to approved mortgage and other companies for the purposes of the Corporation Tax Act via the Fifth Schedule of that Act. The income of approved mortgage companies and the Home Mortgage Bank from certain sources (including those related to these houses) may be exempt from corporation tax. Interest paid by these entities on debenture borrowings used to finance activities related to these houses can also be exempt from income or corporation tax in the hands of the debenture holders, provided it is derived from the exempt income.</li>
                      <li>(i) rentals or royalties for the use of copyrights, patents, designs, secret processes or formulae, trade marks, films or tapes for use in connection with television or radio broadcasting, or for the use of industrial, commercial or scientific knowledge, experience or skill;. The definition of "royalty" in the Corporation Tax Act includes payments for the use of copyrights, patents, designs, secret processes, formulae, trade marks, or for information concerning industrial, commercial or scientific knowledge, experience or skill. Section 49(13)(c) refers to rent, royalty or other consideration paid for the use of property other than money. For tangible property or copyrights, only the amount exceeding what the Board deems reasonable consideration is treated as a "distribution".</li>
                      <li>(j) premiums (other than premiums paid to insurance companies and contributions to pension funds and schemes), commissions, fees and licenses;. Certain premiums, commissions, fees, and licenses paid to non-resident persons or companies are subject to withholding tax under section 50. Section 49(i) disallows deductions for payments (likely subject to Section 50) unless withholding tax has been accounted for and paid.</li>
                      <li>(k) dividends or other distributions (except to the extent that such dividends or distributions are shown to the satisfaction of the Board to be paid out of income to which section 6(1)(a) of the Corporation Tax Act applies or which was exempt from income tax in the hands of the company paying the dividends or making the distributions);. A "distribution" is defined with reference to section 49 of the Income Tax Act for Corporation Tax purposes. Section 6(1)(a) of the Corporation Tax Act is a source of potential exemption. However, nothing in Section 6 of the Corporation Tax Act is to be construed to exempt dividends, interest, bonuses, salaries, or wages paid out of such exempt income in the hands of the recipients. Notwithstanding other laws, where an exempt company makes distributions or interest payments to another company that is itself exempt from tax, and that other company distributes an equal sum to its members from a special account, that distributed sum is exempt from income tax in the hands of those members. Preference dividends are also a source of profit for companies subject to corporation tax.</li>
                      <li>(l) profits or amounts deemed to be profits of a company under this Part;. This category covers profits or amounts that are considered profits of a company according to provisions within Part I of the Income Tax Act and are therefore subject to income tax for the person receiving them. Section 94, for instance, states that income, gains, or profits deemed to arise in Trinidad and Tobago under a double taxation arrangement (Section 93) are considered income for all purposes of the Act.</li>
                      <li>(m) any annual profits not falling under any of the foregoing paragraphs.. This serves as a catch-all provision for any other annual income that does not fit into the specific categories listed above.</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">It is important to note that for years of income after 1965, the provisions (other than section 50 relating to withholding tax) of the Income Tax Act regarding the charge of income tax do not apply to the profits or gains of a resident company, or a non-resident company if those profits or gains are within the charge to corporation tax or any other law administered by the Board. This indicates that the primary charging provision for companies' general profits is the Corporation Tax Act (Section 3 of the CTA charges corporation tax on company profits), while Section 5 of the Income Tax Act is primarily for taxing the income of individuals and potentially other non-company "persons" or specific types of income received from companies (like emoluments or certain distributions) in the hands of the recipient.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="basis-of-assessment">
                  <AccordionTrigger>Basis of Assessment</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 6 and 7 outline the basis of assessment for income tax.</p>
                     <p className="font-semibold mt-4">Section 6 - Basis of assessment generally</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Section 6 establishes the general rule for the basis of assessment for income tax.</li>
                       <li>Subsection (1): States that tax shall be charged for each year of income upon the income of any person for that year.</li>
                       <li>This means that the income earned or received by a person within a specific year of income is the basis upon which their income tax liability for that year is calculated.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 7 - Income arising from trade, business, profession or vocation</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Section 7 provides specific rules for the basis of assessment for income arising from a trade, business, profession, or vocation.</li>
                       <li>Subsection (1): States that income from a trade, business, profession, or vocation shall be computed based on the full amount of the gains or profits of the year of income.</li>
                       <li>This confirms that for business and professional income, the assessment is based on the actual profits earned during the year of income, rather than a previous year's income (which was a historical basis of assessment).</li>
                     </ul>
                     <p className="text-sm text-muted-foreground mt-4">For years of income after 1965, the provisions (other than section 50 relating to withholding tax) of the Income Tax Act regarding the charge of income tax do not apply to the profits or gains of a resident company, or a non-resident company if those profits or gains are within the charge to corporation tax or any other law administered by the Board. This means that for companies, the basis of assessment for their general trading or business profits is governed by the Corporation Tax Act, not Sections 6 and 7 of the Income Tax Act. Sections 6 and 7 primarily apply to individuals and potentially other "persons" not subject to corporation tax on their business profits.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ascertainment-of-chargeable-income">
                  <AccordionTrigger>Ascertainment of Chargeable Income</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 8 to 20 cover the rules for ascertaining chargeable income, including deductions and allowances, computation of income, and treatment of trade losses.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rates-of-tax-and-personal-allowances">
                  <AccordionTrigger>Rates of Tax and Personal Allowances</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 21 to 41 detail the rates of income tax, personal allowances, and other deductions for individuals.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="exemptions-from-tax">
                  <AccordionTrigger>Exemptions from Tax</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 42 to 48 provide various exemptions from income tax.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dividends-and-withholding-tax">
                  <AccordionTrigger>Dividends and Withholding Tax</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 49 to 51 cover the definition of dividends and the provisions relating to withholding tax.</p>
                    <p className="font-semibold mt-4">Section 49 - Definition of "distribution"</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (11): Assigns meaning to "new consideration" for the purposes of defining distributions.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 50 - Withholding Tax</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (1): Levies withholding tax at the rate set out in Part II of the Third Schedule of the Income Tax Act on payments specified in that Schedule (which include payments to non-residents like dividends, interest, rents, royalties, management charges, etc.).</li>
                     </ul>
                      <p className="font-semibold mt-4">Section 51</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Mentioned as a section where payments within its meaning are not allowed as deductions in computing income unless withholding tax has been paid on them. This links back to the enforceability of the withholding tax provisions.</li>
                     </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="persons-chargeable-and-assessments">
                  <AccordionTrigger>Persons Chargeable and Assessments</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 52 to 90 detail the persons chargeable to tax, the assessment process, appeals, and repayment of tax.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="imposition-of-income-tax">
                  <AccordionTrigger>Imposition of Income Tax</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 4-7 detail the imposition of income tax, including the charge to tax, the concept of residence, and income subject to tax (e.g., gains or profits, dividends, interest, rent, royalties).</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="exemptions-from-income-tax">
                  <AccordionTrigger>Exemptions from Income Tax</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 8-11 outline various exemptions from income tax, such as official emoluments, income of certain bodies, interest on specific loans, and other exempted income.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ascertainment-of-chargeable-income">
                  <AccordionTrigger>Ascertainment of Chargeable Income</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 12-15 cover the rules for ascertaining chargeable income, including permissible deductions (e.g., expenses, allowances) and prohibited deductions.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rates-of-income-tax-and-personal-allowances">
                  <AccordionTrigger>Rates of Income Tax and Personal Allowances</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 16-20 specify the rates of income tax and the various personal allowances available to individuals (e.g., personal allowance, dependent relative allowance, covenants).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="surtax-on-higher-incomes">
                  <AccordionTrigger>Surtax on Higher Incomes</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 21-23 discuss the application of surtax on higher incomes, including the rates and computation.</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="double-taxation-relief">
                  <AccordionTrigger>Relief from Double Taxation</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 91 to 96 provide provisions for relief from double taxation.</p>
                     <p className="font-semibold mt-4">Section 93 - Relief from double taxation based on arrangements with other countries</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Section 93 provides for relief from double taxation where arrangements have been made with the government of another country. These arrangements typically cover situations where income is taxed in both Trinidad and Tobago and the other country, allowing for a credit against Trinidad and Tobago tax for the tax paid in the other country, or vice versa, as specified in the arrangement.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 94 - Unilateral relief provisions</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Section 94 contains provisions for unilateral relief from double taxation in cases where no double taxation arrangement is in force. It also states that certain income deemed to be income arising in Trinidad and Tobago under a double taxation arrangement shall be treated as income for all purposes of the Income Tax Act.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 95 - Unilateral relief where no double taxation arrangements</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (2): Details the conditions and limits for granting unilateral relief under Section 95, including references to Regulations 5 and 6(1) of the Fifth Schedule of the Income Tax Act, which likely provide the methodology for calculating the relief.</li>
                       <li>Subsection (3): Allows for any necessary assessments or adjustments to be made to give effect to the unilateral relief provisions.</li>
                     </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="general-powers-of-the-board">
                  <AccordionTrigger>General Powers of the Board</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 97 to 101 outline the general powers of the Board of Inland Revenue, including requiring information and the PAYE system.</p>
                     <p className="font-semibold mt-4">Section 97 - General Powers of the Board</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (1): Grants the Board the power to require any person to furnish a schedule containing particulars of their income or any other relevant information.</li>
                       <li>Subsection (2): Makes it an offence for any person to fail to furnish the schedules or information required by the Board under Section 97.</li>
                       <li>Subsection (3): Provides the Board with the power to require information by notice from any person for the purposes of the Act.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 98 - PAYE (Pay As You Earn) system</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (3): Defines "employment" and "office" for the purposes of Section 98 (dealing with the PAYE system) and Section 99 (dealing with the deduction of tax from emoluments).</li>
                     </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="collection-and-recovery">
                  <AccordionTrigger>Collection and Recovery</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 102 to 115 cover the collection and recovery of tax, including penalties for non-payment.</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="general-provisions">
                  <AccordionTrigger>General Provisions</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 116 to 125 contain general provisions regarding the administration and enforcement of the Act.</p>
                     <p className="font-semibold mt-4">Section 118 - Powers of entry</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Subsection (1): Grants officers of the Board the power to enter any premises to audit or examine books, accounts, or property for the purposes of administering and enforcing the Act.</li>
                       <li>Subsection (3): Provides for obtaining a Magistrate's warrant to enter premises, including by force if necessary, for the purposes specified in Section 118.</li>
                     </ul>
                     <p className="font-semibold mt-4">Section 125 - Power to make Regulations</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Section 125 empowers the Minister to make Regulations for the better carrying out of the provisions of the Income Tax Act.</li>
                     </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns">
                  <AccordionTrigger>Returns</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 27-28 outline requirements for filing returns of income.</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="collection">
                  <AccordionTrigger>Collection</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 116 to 125 contain general provisions regarding the administration and enforcement of the Act.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="miscellaneous-powers-of-the-board">
                  <AccordionTrigger>Miscellaneous Powers of the Board</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 130 to 132 contain miscellaneous powers of the Board of Inland Revenue.</p>
                    <p className="font-semibold mt-4">Section 130 - Power to obtain information as to interest paid or credited</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li>Subsection (1): Requires persons carrying on a trade or business (including banks) to furnish returns of interest paid or credited in excess of a prescribed amount.</li>
                      <li>Subsection (1A): Requires banks to obtain the Board of Inland Revenue file number for certain depositors when accounts are opened.</li>
                      <li>Subsection (1B): Requires certain depositors to supply their Board of Inland Revenue file number to banks.</li>
                      <li>Subsection (1C): Makes it an offence for a bank to fail to obtain or enter the file number, with a defence if the failure was not willful.</li>
                      <li>Subsection (8): Limits the application of Section 130 to money received or retained in Trinidad and Tobago.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="directors-expenses-allowance">
                  <AccordionTrigger>Directors' Expenses Allowance</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 133 to 141 cover the provisions relating to expenses allowances for directors and others.</p>
                     <p className="font-semibold mt-4">Section 133</p>
                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                       <li>Applied in relation to a body of persons and partnerships, extending the application of the director's expenses allowance provisions beyond just companies.</li>
                     </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="offences-and-penalties">
                  <AccordionTrigger>Offences and Penalties</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <p>Sections 142 to 148 outline the offences and penalties under the Act.</p>
                  </AccordionContent>
                </AccordionItem>
                </Accordion>
          </CardContent>
        </Card>

 <div className="my-8"></div> {/* Increased space here */}
      <h1 className="text-3xl font-bold mb-2">Corporation Tax Act - Chapter 75:02</h1>
      <h2 className="text-xl text-gray-600 mb-8">
        As updated to June 30th, 2013
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
              <li>
               <a
                 href="https://firebasestorage.googleapis.com/v0/b/taxtt-h5fyu.firebasestorage.app/o/Legal%20Documents%2FCorporation-Tax-Act-75.02.pdf?alt=media&token=ef6998b1-039a-42d9-975e-9b21990192e1"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="ml-2 inline-flex items-center"
               >
                 <FaFilePdf className="inline-block align-middle mr-1" /> Access the full PDF
               </a></li>
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
