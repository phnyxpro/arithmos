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
    </div>
  );
}
