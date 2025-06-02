import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const corporationTaxSections = [
  {
    title: "PART I — TAXATION OF COMPANIES",
    description: (
 <>
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
 means a dividend payable on a preferred share or preferred stock at a fixed gross rate per cent issued by a resident company before 31st January 1966, or, where a dividend is payable on such a preferred share or preferred stock partly at a fixed gross rate per cent and partly at a variable rate, such part of that dividend as is payable at a fixed gross rate per cent;
 </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-14">
 <AccordionTrigger>profits</AccordionTrigger>
 <AccordionContent>
 means income and includes short-term capital gains;
 </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-15">
 <AccordionTrigger>resident company</AccordionTrigger>
 <AccordionContent>
 means a company that is controlled in Trinidad and Tobago, whether or not the company is—
 (a) incorporated in Trinidad and Tobago; or
 (b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago;
 </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-16">
 <AccordionTrigger>royalties</AccordionTrigger>
 <AccordionContent>
 means— (a) amounts paid as consideration for the use of, or the right to use— (i) copyrights, artistic or scientific works, patents, designs, plans, secret processes or formulae, trade marks, motion picture films, films or tapes for radio or television broadcasting, or other like properties or rights; or (ii) information concerning industrial, commercial or scientific knowledge, experience or skill; (b) royalties, rentals, or other amounts paid in respect of the operation of mines, quarries or other natural resources;
 </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-17">
 <AccordionTrigger>short-term capital gains</AccordionTrigger>
 <AccordionContent>
 means chargeable gains accruing on a disposal of an asset within twelve months of its acquisition;
 </AccordionContent>
 </AccordionItem>
 </Accordion>
 </>),
 icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "IMPOSITION OF CORPORATION TAX",
    description: (
      <div>
        <h3 className="text-lg font-semibold mb-2">IMPOSITION OF CORPORATION TAX</h3>
        <p className="mb-4">
          Subject to this Part, corporation tax shall be charged for each year of income on the chargeable profits of a company at the rate or rates specified in the First Schedule.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>3A. Business Levy</AccordionTrigger>
            <AccordionContent>
              (1) Notwithstanding anything to the contrary in this Act or in the Income Tax Act, but subject to this section, there shall be assessed and paid in and for the year of income 2012 and every year thereafter, a levy (hereinafter referred to as the "business levy") on the gross revenue of a company or individual carrying on a business, other than a company or individual to whom subsection (2) or (3) applies.
              <br /><br />
              (2) This section does not apply to a company or individual whose gross revenue is less than three hundred and sixty thousand dollars per annum.
              <br /><br />
              (3) This section does not apply to—
              <br />
              (a) a company or individual carrying on the business of petroleum operations;
              <br />
              (b) a company subject to tax under section 65A or 65C of the Income Tax Act;
              <br />
              (c) a company for any year of income during the first three years of its existence.
              <br /><br />
              (4) The business levy shall be—
              <br />
              (a) at the rate of 0.6 per cent of the gross revenue of a company or an individual; and
              <br />
              (b) an allowable deduction in arriving at the chargeable income or total income of a company or an individual.
              <br /><br />
              (5) The business levy shall be paid annually, in the same manner and at the same time as provided for the payment of corporation tax or income tax.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="mb-4">
          3B. [Repealed]
        </p>
        <h3 className="text-lg font-semibold mb-2">General Scheme of Corporation Tax</h3>
        <p className="mb-4">
          (1) Subject to the provisions of this Act, in arriving at the chargeable profits of a company for any year of income, there shall be deducted from the total profits of the company for that year any charges on income paid by the company in that year and any expenses of management incurred by the company in that year.
          <br /><br />
          (2) Subject to the provisions of this Act, in arriving at the total profits of a company for any year of income—
          <br />
          (a) any income from a source within the charge to corporation tax shall be computed in accordance with the provisions of the Income Tax Act applicable to the computation of income of that description for the purposes of that Act; and

          <br />
          (b) all distributions received by the company from resident companies shall be excluded; and
          <br />
          (c) all income from the leasing of assets shall be included; and
          <br />

          (d) income from the holding of or dealing in land or immovable property situate in Trinidad and Tobago shall be included.
        </p>
        <h3 className="text-lg font-semibold mb-2">BASIS OF ASSESSMENT AND EXEMPTIONS</h3>
        <h4 className="text-md font-semibold mb-1">Basis of Assessment</h4>
        <p className="mb-4">
          (1) Corporation tax shall be charged on the chargeable profits of a company for each year of income.
          <br /><br />
          (2) The year of income for a company shall be its accounting period.
        </p>
      </div>
    ),
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Charge of Corporation Tax",
    description: "Details on how corporation tax is charged.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "BASIS OF ASSESSMENT AND EXEMPTIONS",
    description: "Rules for assessment and exemptions.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Basis of Assessment",
    description: "How taxable income is determined.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Exemptions",
    description: "Income and entities exempt from corporation tax.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "6A. Market Development Grants",
    description: "Provisions for market development grants.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "COMPUTATION OF PROFITS",
    description: (
      <div>
        <h3 className="text-lg font-semibold mb-2">COMPUTATION OF PROFITS</h3>
        <h4 className="text-md font-semibold mb-1">General Rules</h4>
        <p className="mb-4">
          7. (1) Except as otherwise provided by this Part, the chargeable profits of a company shall be computed in accordance with the income tax principles relating to the provisions of the Income Tax Act applied by section 19 and all questions as to the amounts which are or are not to be taken into account as profits, or in computing profits, or charged to tax as a person’s profits or as to the time when any such amount is to be treated as arising, being determined in accordance with income tax law as applied by section 19 and practice.
          <br /><br />
          (2) For the purpose of this section “income tax law” means, in relation to any year of income, the law applying, for the year of income, to the charge on individuals of income tax.
          <br /><br />
          (3) Subject to any written law applied by this Part which expressly authorises such an allowance, no allowance shall, subject to subsection (4) and section 10O, be made in ascertaining the chargeable profits—
          <br />
          (a) in respect of distributions; or
          <br />
          (b) in respect of any annuity or other annual payment.
          <br /><br />
          (4) Subsection (3)(a) shall not apply when the company makes a distribution that is a preference dividend, paid on or after 1st January 1966, but so however that—
          <br />
          (a) the deduction that is allowed in ascertaining the chargeable profits shall not exceed the amount of the preference dividend;
          <br />
          (b) the deduction shall be allowed only in the year of income in which the preference dividend has actually been paid.
          <br /><br />
          (5) (Deleted by Act No. 21 of 2005).
          <br /><br />
          (6) Without prejudice to the generality of subsection (1), any provision of the Income Tax Act which confers an exemption from income tax, or which provides for a person to be charged to income tax on any amount (whether expressed to be income or not, and whether an actual amount or not), shall have the like effect for purposes of corporation tax so far as is consistent with this Part.
          <br /><br />
          (7) Where a change in the shareholding of a company has taken place in a year of income, no loss incurred in any year preceding the year of income shall be carried forward and set off, as provided by section 16 of the Income Tax Act, against the profits of the year of income unless—
          <br />
          (a) on the last day of the year of income the shares of the company carrying not less than 51 per cent of the voting power were beneficially held by persons who beneficially held shares of the company carrying not less than 51 per cent of the voting power on the last day of the year or years in which the loss was incurred; or
          <br />
          (b) the Board is satisfied that the change in the shareholding was not effected with a view to avoiding or reducing any liability to tax.
          <br /><br />
          (8) Subject to section (9), where in a year of income a company claims a deduction for wear and tear under section 11(1)(b) of the Income Tax Act, the deduction shall not be allowed unless the company satisfies the Board that the taxes payable in that year of income under the Lands and Buildings Taxes Act and the Municipal Corporations Act have been paid for the year of income to which the claim relates.
          <br /><br />
          (9) to } (Deleted by Act No. 35 of 1998).
        </p>
        <p className="mb-4">
          8–9. (Repealed by Act No. 2 of 2002).
        </p>
      </div>
    ),
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "General Rules",
    description: "Basic rules for profit computation.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "8–9. [Repealed]",
    description: "Repealed sections of the Act.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Capital Allowances and Related Charges",
    description: "Rules for claiming capital allowances.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "10A. [Repealed]",
    description: "Repealed section of the Act.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "10B–10Q. Various deductions",
    description: "Specific deductions allowed for tax purposes.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "CLOSE COMPANIES",
    description: "Provisions specific to close companies.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Power to Direct Distributions",
    description: "Authority to mandate dividend distributions.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Director’s Remuneration",
    description: "Rules regarding director's pay.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Supplementary Provisions",
    description: "Additional rules for close companies.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "SPECIAL CLASSES OF COMPANIES",
    description: "Rules for specific types of companies.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Insurance & Shipping",
    description: "Tax rules for insurance and shipping companies.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Approved Mortgage Companies",
    description: "Tax rules for approved mortgage companies.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "16–16J. Incentives",
    description: "Incentives for property, regional development, mutual funds, and Export-Import Bank.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Application of Income Tax Act",
    description: "How the Income Tax Act applies.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Double Taxation Relief",
    description: "Provisions to avoid double taxation.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "18A–18M. Group Relief and Trading Losses",
    description: "Rules for group relief and trading loss carry-forward.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "MISCELLANEOUS AND GENERAL",
    description: "Various general provisions.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Application of Certain Provisions",
    description: "Applicability of specific sections.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "19A. Penalty for Late Filing",
    description: "Penalties for not filing on time.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Special Return",
    description: "Requirements for special tax returns.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Nominee Shareholdings",
    description: "Rules for shares held by nominees.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Partnerships",
    description: "Tax treatment of partnerships.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Non-Resident Companies and Trusts",
    description: "Tax rules for non-resident entities.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Valuation",
    description: "Methods for valuing assets.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Priority in Bankruptcy",
    description: "Tax claims in bankruptcy.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "PART II — MISCELLANEOUS",
    description: "Additional miscellaneous provisions.",
    icon: "BookOpen", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "General as to Exemption",
    description: "General rules regarding exemptions.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "SCHEDULES",
    description: "Appendices to the Act.",
    icon: "BookOpen", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "First Schedule: Rate of Corporation Tax",
    description: "Specifies the applicable tax rates.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Second Schedule: [Repealed]",
    description: "Repealed schedule.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Third Schedule: Close Companies",
    description: "Detailed rules for close companies.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Fourth Schedule: Insurance, Shipping and Air Navigation",
    description: "Specific rules for these industries.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Fifth Schedule: Exemptions",
    description: "List of exemptions.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Sixth Schedule: Countries for Which Expenses/Grants May Not Be Claimed",
    description: "List of countries impacting expense/grant claims.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
];

export default function CorporationTaxActPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Corporation Tax Act - CHAPTER 75:02</h1>
      <h2 className="text-xl text-gray-600 mb-8">(As updated to June 30th, 2013)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {corporationTaxSections.map((section, index) => (
          <a href={section.href} key={index}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{section.description}</p>
                {/* Add icon here if needed */}
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}