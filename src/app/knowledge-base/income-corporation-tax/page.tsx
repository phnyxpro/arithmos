
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
import { Building } from "lucide-react"; // Using Building icon for Corporation Tax

export default function IncomeCorpTaxKnowledgeBasePage() {
  const amendingActs = [
    "2/1968", "14 of 1968", "5 of 1969", "13 of 1969", "32 of 1969", "46 of 1969", "5 of 1970", "35 of 1971",
    "22 of 1974", "30 of 1974", "14 of 1976", "1 of 1979", "203/1979", "22 of 1980", "11 of 1984", "*14 of 1987",
    "50/1987", "3 of 1988", "11 of 1988", "12/1988", "33/1988", "6 of 1989", "18 of 1989", "94/1989", "9 of 1990",
    "6 of 1991", "65/1991", "4 of 1992", "137/1992", "6 of 1993", "22 of 1993", "3 of 1994", "14 of 1994",
    "22 of 1994", "24 of 1994", "4 of 1995", "5 of 1995", "8 of 1996", "9 of 1997", "35 of 1998", "37 of 2000",
    "39 of 2000", "50 of 2000", "91 of 2000", "203/2001", "2 of 2002", "5 of 2004", "*21 of 2005", "207/2005",
    "2 of 2006", "17 of 2007", "30 of 2007", "13 of 2010", "2 of 2012", "2 of 2013"
  ];

  const arrangementOfSections = {
    "PART I TAXATION OF COMPANIES": {
      "PRELIMINARY": ["2. Interpretation."],
      "IMPOSITION OF CORPORATION TAX": ["3. Charge of corporation tax.", "3A. SME listed company. Business levy.", "3B. (Repealed by Act No. 9 of 1997).", "4. General scheme of corporation tax."],
      "BASIS OF ASSESSMENT AND EXEMPTIONS": ["5. Basis of assessment.", "6. Exemptions.", "6A. Market development grants."],
      "COMPUTATION OF PROFITS": [
        "7. General rules for computation of income.",
        "8. to 9. (Repealed by Act No. 2 of 2002).",
        "10. Deductions and additions in computations of profits for capital allowances and related charges.",
        "10A. (Repealed by Act No. 6 of 1989).",
        "10B. Promotional expenses.",
        "10C. (Repealed by Act No. 2 of 2006).",
        "10D. Deductions of contributions to catastrophe reserve fund.",
        "10E. Expenses incurred in respect of training.",
        "10F. Bonds, notes, debentures, other debt securities.",
        "10G. Art and culture allowance.",
        "10H. Scholarship allowance.",
        "10I. Deduction of expenditure by promoters or sponsors of sporting activities and sportsmen.",
        "10J. Deduction of expenditure by sponsors for audio, visual or video productions.",
        "10K. Deduction of expenditure by a production company.",
        "10L. Assessing chargeable profits.",
        "10M. Double deductions prohibited.",
        "10N. Certification by the Minister.",
        "10O. Covenanted donations.",
        "10P. Allowance for engagement of energy service companies.",
        "10Q. Deductions of expenditure for sponsors of fashion industry."
      ],
      "CLOSE COMPANIES": ["11. Power to direct distribution of certain profits.", "12. Deductions for director’s remuneration.", "13. Supplementary provisions about close companies."],
      "SPECIAL CLASSES OF COMPANIES": [
        "14. Special provisions as to Insurance Companies and Shipping Companies, etc.",
        "15. Approved mortgage companies, etc.",
        "16. Deduction for capital expenditure by approved property development company.",
        "16A. Reliefs for certain companies.",
        "16B. Regional development company.",
        "16C. Classifying of approved activity.",
        "16D. Registration of companies.",
        "16E. Cancellation of certificate.",
        "16F. (Repealed by Act No. 2 of 2006).",
        "16G. Definitions.",
        "16H. Tax credit on interest paid by mutual funds.",
        "16I. Tax credit from Export Import Bank.",
        "16J. Application and adaptation of Income Tax Act as to capital allowance and other matters."
      ],
      "GENERAL": [
        "17. Double taxation relief.",
        "18. Interpretation.",
        "18A. Relief for trading losses.",
        "18B. Group relief available.",
        "18C. A company not a 100 per cent subsidiary.",
        "18D. Company not to be treated as a 100 per cent subsidiary.",
        "18E. Set off of trading loss.",
        "18F. Claims for giving relief.",
        "18G. Limit to group relief.",
        "18H. Corresponding accounting period.",
        "18I. Denial of group relief.",
        "18J. Relief obtainable once for the same amount.",
        "18K. Aggregate of claim.",
        "18L. Non-application of relief."
      ],
      "MISCELLANEOUS AND GENERAL": [
        "19. Application of certain provisions of the Act.",
        "19A. Penalty for late filing.",
        "20. Special return.",
        "21. Nominee share holdings.",
        "22. Partnerships.",
        "23. Information as to non-resident companies and trusts.",
        "24. Valuation.",
        "25. Priority of tax in bankruptcy."
      ]
    },
    "PART II MISCELLANEOUS": ["26. General as to exemption."],
    "SCHEDULES": [
      "FIRST SCHEDULE— RATE OF CORPORATION TAX.",
      "SECOND SCHEDULE—(REPEALED BY ACT NO. 2 OF 2002).",
      "THIRD SCHEDULE—CLOSE COMPANIES.",
      "FOURTH SCHEDULE—INSURANCE, SHIPPING AND AIR NAVIGATION COMPANIES.",
      "FIFTH SCHEDULE—EXEMPTIONS.",
      "SIXTH SCHEDULE—COUNTRIES IN RESPECT OF WHICH EXPENSES AND GRANTS MAY NOT BE CLAIMED."
    ]
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Corporation Tax Act Knowledge Base
      </h1>
      <Card className="w-full shadow-xl rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Corporation Tax Act (Chap. 75:02) Highlights
            </CardTitle>
          </div>
          <CardDescription>
            Excerpts and summaries from the Corporation Tax Act of Trinidad & Tobago. This information is for general guidance and not legal advice. Always consult the official, current version of the Act. Last unofficial version referenced here updated to June 30th, 2013.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="corp-act-overview" id="corp-act-overview">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Corporation Tax Act: Overview & Amending Acts
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                <p><strong>Amending Acts:</strong></p>
                <ul className="list-disc pl-5 space-y-1 text-xs columns-2 sm:columns-3 md:columns-4">
                  {amendingActs.map(act => <li key={act}>{act}</li>)}
                </ul>
                <p className="text-xs italic mt-2">UNOFFICIAL VERSION UPDATED TO JUNE 30TH 2013 - MINISTRY OF LEGAL AFFAIRS www.legalaffairs.gov.tt</p>
                
                <h4 className="font-semibold text-foreground/90 mt-3">Note on Subsidiary Legislation</h4>
                <p>This Chapter contains no subsidiary legislation.</p>

                <h4 className="font-semibold text-foreground/90 mt-2">Note on Omissions</h4>
                <p>A. Delegation of Functions (Corporation Tax) Orders (LNs 151/1987 and 137/1996) have been omitted.</p>
                <p>B. The following Notices made under sections 16B(3) and 16C have been omitted:
                  <ul className="list-roman pl-5 text-xs">
                    <li>(i) Regional Development Areas Notices [made under section 16B(3)] — See LN 103/1990.</li>
                    <li>(ii) Approved Activities Notices (made under section 16)— See LN 104/1990.</li>
                  </ul>
                </p>

                <h4 className="font-semibold text-foreground/90 mt-2">Note on Act No. 29 of 1966</h4>
                <p>Part II of the Finance Act 1966 (Act No. 29 of 1966) dealt with corporation tax. Parts I and III dealt with amendments to the Income Tax Ordinance, Ch. 33. No. 1 (1950 Ed.) and other miscellaneous matters. Part II has been detached and published separately in this Chapter under the title “the Corporation Tax Act”.</p>

                <h4 className="font-semibold text-foreground/90 mt-2">Note on Act No. 14 of 1987</h4>
                <p>See Part III of Act No. 14 of 1987 which amends this Act by implication.</p>
                
                <h4 className="font-semibold text-foreground/90 mt-2">Note on Act No. 21 of 2005</h4>
                <p>See section 8 of Act No. 21 of 2005 for validation of acts done by the Board.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="corp-act-arrangement" id="corp-act-arrangement">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Corporation Tax Act: Arrangement of Sections
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pl-2 border-l-2 border-primary/50 ml-2">
                <h3 className="font-bold text-foreground text-md">CHAPTER 75:02 - CORPORATION TAX ACT</h3>
                <h4 className="font-semibold text-foreground/90 mt-1">ARRANGEMENT OF SECTIONS</h4>
                <p><strong>SECTION</strong></p>
                <p>1. Short title.</p>
                {Object.entries(arrangementOfSections).map(([partTitle, sections]) => (
                  <div key={partTitle} className="mt-2">
                    <h5 className="font-semibold text-foreground/80">{partTitle.startsWith("SCHEDULES") ? partTitle : partTitle.toUpperCase()}</h5>
                    {Array.isArray(sections) ? (
                        <ul className="list-none pl-3 space-y-0.5">
                            {sections.map((sectionItem, index) => (
                                <li key={index} className="text-xs">{sectionItem}</li>
                            ))}
                        </ul>
                    ) : (
                        Object.entries(sections).map(([subTitle, subSections]) => (
                            <div key={subTitle} className="ml-3 mt-1">
                                <h6 className="font-medium text-foreground/70 text-xs">{subTitle.toUpperCase()}</h6>
                                <ul className="list-none pl-3 space-y-0.5">
                                    {(subSections as string[]).map((sectionItem, index) => (
                                        <li key={index} className="text-xs">{sectionItem}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="corp-act-part1-preliminary" id="corp-act-part1-preliminary">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Corporation Tax Act: Part I - Preliminary (Sections 1 & 2)
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pl-2 border-l-2 border-primary/50 ml-2">
                <h3 className="font-bold text-foreground text-md">CHAPTER 75:02 - CORPORATION TAX ACT</h3>
                <p>An Act to provide for the taxation of short-term capital gains and to make better provisions for the taxation of company profits and for matters incidental thereto or consequential thereon.</p>
                <p className="italic">[1ST JANUARY 1966]</p>
                
                <p><strong>1.</strong> This Act may be cited as the Corporation Tax Act.</p>
                
                <h4 className="font-semibold text-foreground/90 mt-2">PART I - TAXATION OF COMPANIES</h4>
                <h5 className="font-medium text-foreground/80">PRELIMINARY</h5>
                <p><strong>2.</strong> (1) In this Part—</p>
                <ul className="list-disc pl-6 space-y-1 text-xs">
                  <li><strong>“branch or agency”</strong> means any factorship, agency, receivership, branch or management;</li>
                  <li><strong>“chargeable profits”</strong> means the aggregate amount of the profits of any company specified in section 3 remaining after allowing the appropriate deductions and exemptions under this Part;</li>
                  <li><strong>“company”</strong> means any body corporate or unincorporated association, but does not include a partnership;</li>
                  <li><strong>“corporation tax”</strong> or <strong>“tax”</strong> means the tax charged by section 3;</li>
                  <li><strong>“distribution”</strong> has the meaning assigned to it by section 49 of the Income Tax Act; <span className="italic text-muted-foreground/80">(Ch. 75:01)</span></li>
                  <li><strong>“investment company”</strong> has the meaning assigned to that expression in section 6(3);</li>
                  <li><strong>“marketing licensee”</strong> means a person carrying on marketing business to whom a marketing licence, within the meaning of regulation 3(1)(h) of the Petroleum Regulations is issued or to be issued under or in accordance with the Petroleum Act; <span className="italic text-muted-foreground/80">(Ch. 62:01)</span></li>
                  <li><strong>“new consideration”</strong> has in other provisions the same meaning as in section 49(11) of the Income Tax Act; <span className="italic text-muted-foreground/80">(Ch. 75:01)</span></li>
                  <li><strong>“non-resident company”</strong> means a company not controlled in Trinidad and Tobago, whether or not the company is—
                    <ul className="list-roman list-inside pl-4">
                      <li>(a) incorporated in Trinidad and Tobago; or</li>
                      <li>(b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago;</li>
                    </ul>
                  </li>
                  <li><strong>“petroleum marketing business”</strong> means the business of dealing in petroleum and petroleum products by way of an acquisition and a disposal to a marketing licensee or to a consumer in Trinidad and Tobago or to a person in any other prescribed country, and includes bunkering of ships and aircraft by a marketing licensee, but does not include—
                    <ul className="list-roman list-inside pl-4">
                        <li>(a) disposal of petroleum by a person carrying on a production business where the petroleum disposed of is produced by such person; or</li>
                        <li>(b) disposal by a person carrying on refining business of—
                            <ul className="list-decimal list-inside pl-4">
                                <li>(i) petroleum products refined by such person;</li>
                                <li>(ii) petroleum products acquired and blended with petroleum products refined by such person,</li>
                            </ul>
                            where any such disposal is made to a marketing licensee, or to the refining business of another; or
                        </li>
                        <li>(c) bunkering of ships ex-refinery wharf in international trade by a person carrying on refining business;</li>
                    </ul>
                  </li>
                  <li><strong>“petroleum operations”</strong> has the meaning assigned to it by section 2(1) of the Petroleum Taxes Act; <span className="italic text-muted-foreground/80">(Ch. 75:04)</span></li>
                  <li><strong>“preference dividend”</strong> means a dividend payable on a preferred share or preferred stock at a fixed gross rate per cent issued by a resident company before 31st January 1966, or, where a dividend is payable on such a preferred share or preferred stock partly at a fixed gross rate per cent and partly at a variable rate, such part of that dividend as is payable at a fixed gross rate per cent;</li>
                  <li><strong>“profits”</strong> means income and includes short-term capital gains;</li>
                  <li><strong>“resident company”</strong> means a company that is controlled in Trinidad and Tobago, whether or not the company is—
                    <ul className="list-roman list-inside pl-4">
                      <li>(a) incorporated in Trinidad and Tobago; or</li>
                      <li>(b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago;</li>
                    </ul>
                  </li>
                  <li><strong>“royalties”</strong> means—
                    <ul className="list-roman list-inside pl-4">
                      <li>(a) amounts paid as consideration for the use of, or the right to use—
                        <ul className="list-decimal list-inside pl-4">
                            <li>(i) copyrights, artistic or scientific works, patents, designs, plans, secret processes or formulae, trade marks, motion picture films, films or tapes for radio or television broadcasting, or other like properties or rights; or</li>
                            <li>(ii) information concerning industrial, commercial or scientific knowledge, experience or skill;</li>
                        </ul>
                      </li>
                      <li>(b) royalties, rentals, or other amounts paid in respect of the operation of mines, quarries or other natural resources;</li>
                    </ul>
                  </li>
                  <li><strong>“short-term capital gains”</strong> means chargeable gains accruing on a disposal of an asset within twelve months of its acquisition;</li>
                  <li><strong>“subsidiary company”</strong> has the meaning provided for the purposes of section 49(1)(d)(iv) of the Income Tax Act by section 49(4) of that Act; <span className="italic text-muted-foreground/80">(Ch. 75:01)</span></li>
                  <li><strong>“withholding tax”</strong> has the same meaning as in section 2 of the Income Tax Act;</li>
                  <li><strong>“a source of income”</strong> is “within the charge to” corporation tax or income tax if that tax is chargeable on the income arising from it or would be so chargeable if there were any such income, and references to a person, or to income being within the charge to tax, shall be similarly construed.</li>
                </ul>
                <p className="mt-1">(2) In this Act and the Income Tax Act and in any Act passed after this Act <strong>“Corporation Tax Acts”</strong>, except so far as the context otherwise requires, means Part I of this Act (including provisions relating to income tax), together with the provisions of the Income Tax Act as far as it applies for the purposes of corporation tax and any written law relating to corporation tax.</p>
                <p className="mt-1">(3) Except as otherwise expressly provided in this Act, the Income Tax Act or any other written law, the provisions of the Income Tax Act shall not apply for the purposes of the Corporation Tax Acts, and the provisions of those Acts shall not, subject to this section, affect the operation of the Income Tax Act as it relates to individuals but the provisions of the Income Tax (In Aid of Industry) Act, the Fiscal Incentives Act and any other written law conferring deductions, allowances and exemptions for the purposes of income tax, shall continue to have effect for such purposes as well as for the purposes of the Corporation Tax Acts.</p>
                <p className="mt-1">(4) Without prejudice to any other case in which a company is engaged in or carrying on trade or business in Trinidad and Tobago, a company shall be deemed to be engaged in or carrying on trade or business in Trinidad and Tobago if it has an office or place of business in Trinidad and Tobago or has a branch or agency therein.</p>
                <p className="mt-1">(5) Except as otherwise provided by this Part and except in so far as the context otherwise requires, expressions used in the Income Tax Act have the same meaning in this Part as in the Income Tax Act but no provision of this Part as to the interpretation of any expression, other than a provision expressed to extend to the use of that expression in the Income Tax Act shall be taken to affect its meaning in the Income Tax Act as it applies for the purposes of corporation tax.</p>
                <p className="mt-1">(6) For all purposes of the Corporation Tax Acts, dividends, including preference dividends, shall be treated as paid on the date when they become due and payable.</p>
                <p className="mt-1">(7) Except as otherwise provided by this Part any appointment to different periods which falls to be made thereunder shall be made on a time basis according to the respective lengths of those periods.</p>
                <p className="mt-1">(8) For the purposes of the definition of “resident company” and “non-resident company”, the place where such a company is to be regarded as controlled is the place where the mind or management of the company is ordinarily situated.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
