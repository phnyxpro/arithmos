import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const IncomeCorporationTaxPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Corporation Tax Act (Chap. 75:02)</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">LAWS OF TRINIDAD AND TOBAGO</h2>
          <p>Act 29 of 1966*</p>
          <p>Amended by</p>
          <p>*SeeNote on page 2</p>
          <p>Current Authorised Pages</p>
          <p>Pages Authorised by L.R.O.</p>
          <p>(inclusive)</p>
          <p>1–4 ..</p>
          <p>5–10 ..</p>
          <p>11–34 ..</p>
          <p>35–65 .. L.R.O.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">CORPORATION TAX ACT CHAPTER 75:02</h2>
          <p>2/1968 14 of 1968 5 of 1969</p>
          <p>13 of 1969 32 of 1969 46 of 1969</p>
          <p>5 of 1970 35 of 1971 22 of 1974</p>
          <p>30 of 1974 14 of 1976 1 of 1979</p>
          <p>203/1979 22 of 1980 11 of 1984</p>
          <p>*14 of 1987 50/1987 3 of 1988</p>
          <p>11 of 1988 12/1988 33/1988</p>
          <p>6 of 1989 18 of 1989 94/1989</p>
          <p>9 of 1990 6 of 1991 65/1991</p>
          <p>4 of 1992 137/1992 6 of 1993</p>
          <p>22 of 1993 3 of 1994 14 of 1994</p>
          <p>22 of 1994 24 of 1994 4 of 1995</p>
          <p>5 of 1995 8 of 1996 9 of 1997</p>
          <p>35 of 1998 37 of 2000 39 of 2000</p>
          <p>50 of 2000 91 of 2000 203/2001</p>
          <p>2 of 2002 5 of 2004 *21 of 2005</p>
          <p>207/2005 2 of 2006 17 of 2007</p>
          <p>30 of 2007 13 of 2010 2 of 2012</p>
          <p>2 of 2013</p>
          <p>UNOFFICIAL VERSION UPDATED TO JUNE 30TH 2013</p>
          <p>MINISTRY OF LEGAL AFFAIRS www.legalaffairs.gov.tt</p>
        </div>
      </div>

      <div className="my-4">
        <p>MINISTRY OF LEGAL AFFAIRS</p>
        <p>2 Chap. 75:02 www.legalaffairs.gov.tt</p>
        <p>Corporation Tax</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Note on Subsidiary Legislation</p>
          <p>This Chapter contains no subsidiary legislation.</p>
          <p>Note on Omissions</p>
          <p>A. Delegation of Functions (Corporation Tax) Orders (LNs 151/1987 and 137/1996) have been omitted.</p>
        </div>
        <div>
          <p>Note on sections 16B(3) and 16C</p>
          <p>B. The following Notices made under the above sections have been omitted:</p>
          <p>(i) Regional Development Areas Notices [made under section 16B(3)] — See LN 103/1990.</p>
          <p>(ii) Approved Activities Notices (made under section 16)— See LN 104/1990.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Note on Act No. 29 of 1966</p>
          <p>Part II of the Finance Act 1966 (Act No. 29 of 1966) dealt with corporation tax. Parts I and III dealt with amendments to the Income Tax Ordinance, Ch. 33.</p>
          <p>No. 1 (1950 Ed.) and other miscellaneous matters. Part II has been detached and published separately in this Chapter under the title “the Corporation Tax Act”.</p>
        </div>
        <div>
          <p>Note on Act No. 14 of 1987</p>
          <p>See Part III of Act No. 14 of 1987 which amends this Act by implication.</p>
          <p>Note on Act No. 21 of 2005</p>
          <p>See section 8 of Act No. 21 of 2005 for validation of acts done by the Board.</p>
        </div>
      </div>

      <div className="my-4">
        <p>UNOFFICIAL VERSION UPDATED TO JUNE 30TH 2013</p>
        <p>MINISTRY OF LEGAL AFFAIRS www.legalaffairs.gov.tt</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="arrangement-of-sections">
          <AccordionTrigger>ARRANGEMENT OF SECTIONS</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>SECTION</p>
                <p>1. Short title.</p>
                <p>PART I</p>
                <p>TAXATION OF COMPANIES</p>
                <p>PRELIMINARY</p>
                <p>2. Interpretation.</p>
                <p>IMPOSITION OF CORPORATION TAX</p>
                <p>3. Charge of corporation tax.</p>
                <p>SME listed company.</p>
                <p>3A. Business levy.</p>
                <p>3B. (Repealed by Act No. 9 of 1997).</p>
                <p>4. General scheme of corporation tax.</p>
                <p>BASIS OF ASSESSMENT AND EXEMPTIONS</p>
                <p>5. Basis of assessment.</p>
                <p>6. Exemptions.</p>
                <p>6A. Market development grants.</p>
              </div>
              <div>
                <p>COMPUTATION OF PROFITS</p>
                <p>7. General rules for computation of income.</p>
                <p>8. to </p>
                <p>9. (Repealed by Act No. 2 of 2002).</p>
                <p>10. Deductions and additions in computations of profits for capital allowances and related charges.</p>
                <p>10A. (Repealed by Act No. 6 of 1989).</p>
                <p>10B. Promotional expenses.</p>
                <p>10C. (Repealed by Act No. 2 of 2006).</p>
                <p>10D. Deductions of contributions to catastrophe reserve fund.</p>
                <p>10E. Expenses incurred in respect of training.</p>
                <p>10F. Bonds, notes, debentures, other debt securities.</p>
                <p>10G. Art and culture allowance.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="arrangement-of-sections-continued">
          <AccordionTrigger>ARRANGEMENT OF SECTIONS (Continued)</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>SECTION</p>
                <p>10H. Scholarship allowance.</p>
                <p>10I. Deduction of expenditure by promoters or sponsors of sporting activities and sportsmen.</p>
                <p>10J. Deduction of expenditure by sponsors for audio, visual or video productions.</p>
                <p>10K. Deduction of expenditure by a production company.</p>
                <p>10L. Assessing chargeable profits.</p>
                <p>10M. Double deductions prohibited.</p>
                <p>10N. Certification by the Minister.</p>
                <p>10O. Covenanted donations.</p>
                <p>10P. Allowance for engagement of energy service companies.</p>
                <p>10Q. Deductions of expenditure for sponsors of fashion industry.</p>
                <p>CLOSE COMPANIES</p>
                <p>11. Power to direct distribution of certain profits.</p>
                <p>12. Deductions for director’s remuneration.</p>
                <p>13. Supplementary provisions about close companies.</p>
                <p>SPECIAL CLASSES OF COMPANIES</p>
                <p>14. Special provisions as to Insurance Companies and Shipping Companies, etc.</p>
                <p>15. Approved mortgage companies, etc.</p>
                <p>16. Deduction for capital expenditure by approved property development company.</p>
              </div>
              <div>
                <p>SECTION</p>
                <p>16A. Reliefs for certain companies.</p>
                <p>16B. Regional development company.</p>
                <p>16C. Classifying of approved activity.</p>
                <p>16D. Registration of companies.</p>
                <p>16E. Cancellation of certificate.</p>
                <p>16F.</p>
                <p>16G. (Repealed by Act No. 2 of 2006).</p>
                <p>16H. Definitions.</p>
                <p>16I. Tax credit on interest paid by mutual funds.</p>
                <p>16J. Tax credit from Export Import Bank.</p>
                <p>17. Application and adaptation of Income Tax Act as to capital allowance and other matters.</p>
                <p>18. Double taxation relief.</p>
                <p>18A. Interpretation.</p>
                <p>18B. Relief for trading losses.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="arrangement-of-sections-continued-2">
          <AccordionTrigger>ARRANGEMENT OF SECTIONS (Continued 2)</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>SECTION</p>
                <p>18C. Group relief available.</p>
                <p>18D. A company not a 100 per cent subsidiary.</p>
                <p>18E. Company not to be treated as a 100 per cent subsidiary.</p>
                <p>18F. Set off of trading loss.</p>
                <p>18G. Claims for giving relief.</p>
                <p>18H. Limit to group relief.</p>
                <p>18I. Corresponding accounting period.</p>
                <p>18J. Denial of group relief.</p>
                <p>18K. Relief obtainable once for the same amount.</p>
                <p>18L. Aggregate of claim.</p>
                <p>18M. Non-application of relief.</p>
                <p>19. Application of certain provisions of the Act.</p>
                <p>19A. Penalty for late filing.</p>
              </div>
              <div>
                <p>SECTION</p>
                <p>MISCELLANEOUS AND GENERAL</p>
                <p>20. Special return.</p>
                <p>21. Nominee share holdings.</p>
                <p>22. Partnerships.</p>
                <p>23. Information as to non-resident companies and trusts.</p>
                <p>24. Valuation.</p>
                <p>25. Priority of tax in bankruptcy.</p>
                <p>PART II</p>
                <p>MISCELLANEOUS</p>
                <p>26. General as to exemption.</p>
                <p>FIRST SCHEDULE—RATE OF CORPORATION TAX.</p>
                <p>SECOND SCHEDULE—(REPEALED BY ACT NO. 2 OF 2002).</p>
                <p>THIRD SCHEDULE—CLOSE COMPANIES.</p>
                <p>FOURTH SCHEDULE—INSURANCE, SHIPPING AND AIR</p>
                <p>NAVIGATION COMPANIES.</p>
                <p>FIFTH SCHEDULE—EXEMPTIONS.</p>
                <p>SIXTH SCHEDULE—COUNTRIES IN RESPECT OF</p>
                <p>WHICH EXPENSES AND GRANTS MAY NOT BE CLAIMED.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-3">
          <AccordionTrigger>Section 3: Imposition of Corporation Tax</AccordionTrigger>
          <AccordionContent>
            (1) Subject to the provisions of this Part, corporation tax shall be payable at the rate specified in the First Schedule for each year of income upon the profits of any company, accruing in or derived from Trinidad and Tobago or elsewhere and whether received in Trinidad and Tobago or not in respect of—
            <ul>
              <li>(a) farming, agriculture, forestry, fishing, or other primary activity;</li>
              <li>(b) the operation of mines or the exploitation of natural or mineral resources;</li>
              <li>(ba) a petroleum marketing business;</li>
              <li>(c) any other trade or business;</li>
              <li>(d) any profession or vocation or management charges or charges for the provision of personal services and technical and managerial skills;</li>
              <li>(e) short-term capital gains;</li>
              <li>(f) interest, discounts, annuities or other annual or periodic payments;</li>
              <li>(g) rents paid for immovable property and royalties from the operation of mines, quarries or other natural resources and the annual value of land and improvements thereon used by or on behalf of the owner or used rent-free by the occupier for the purpose of residence or enjoyment and not for the purpose of gain or profit, the annual value being that assessed in house rates or taxes under the Lands and Buildings Taxes Act or under the Municipal Corporations Act with respect to the City of Port-of-Spain, the City of San Fernando and the Borough of Arima;</li>
              <li>(h) rentals and royalties paid for the use or the right to use—
                <ul>
                  <li>(i) copyright, artistic or scientific work, patents, designs, plans, secret processes or formulae, trade marks, motion picture films, films or tape for radio and television broadcasting, or other like properties or rights; or</li>
                  <li>(ii) information concerning industrial, commercial or scientific knowledge, experience or skill;</li>
                </ul>
              </li>
              <li>(i) premiums, commissions, fees and licence charges;</li>
              <li>(j) dividends and other income received from non-resident companies, out of profits not derived from or accruing in Trinidad and Tobago, and from persons (including a partnership) not being companies;</li>
              <li>(k) preference dividends;</li>
              <li>(l) profits or amounts deemed to be profits of a company under this Part;</li>
              <li>(m) any annual profits not falling under any of the foregoing paragraphs.</li>
            </ul>
            <br/>
            (2) In the case of a SME listed company, the rate of tax shall be ten per cent for the first five years from listing on the Trinidad and Tobago Stock Exchange and thereafter at the rate of tax specified in paragraph 1 of the First Schedule where—
            <ul>
              <li>(a) a minimum of twenty-five shareholders own a total of at least thirty per cent of the issued share capital of the company; and</li>
              <li>(b) capital is raised with the issuance of an initial public offering to be followed by a listing on the Trinidad and Tobago Stock Exchange no more than sixty days after allotment of the issue.</li>
            </ul>
            <br/>
            (3) In subsection (2), “SME listed company” means a Small and Medium Enterprise company listed on the Trinidad and Tobago Stock Exchange, namely a company whose—
            <ul>
              <li>(a) minimum capital base comprising its issued share capital, retained earnings and amounts transferred from such issued share capital or retained earnings to a reserve account, is five million dollars;</li>
              <li>(b) maximum capital base comprising its issued share capital, retained earnings and amounts transferred from such issued share capital or retained earnings to a reserve account, is fifty million dollars; and</li>
              <li>(c) minimum number of shareholders is twenty-five members.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-3A">
          <AccordionTrigger>Section 3A: Business Levy</AccordionTrigger>
          <AccordionContent>
          (1) There shall be levied and paid to the Board a tax to be known as business levy on the gross sales or receipts of a company for each year of income at the rate of 0.2 per cent.
          <br/>
          (2)  Subsection (1) does not apply to—
              <ul>
                <li>(a) companies during the first twelve months following their registration;</li>
                <li>(b) companies or statutory corporations exempt from corporation tax under any Act;</li>
                <li>(c) the gross sales or receipts of a company which give rise to profits exempt from corporation tax under any Act;</li>
                <li>(d) the Deposit Insurance Corporation, the Agricultural Development Bank, the Public Transport Service Corporation and public utilities under the jurisdiction of the Public Utilities Commission or exempted by Order of the President;</li>
                <li>(e) companies that are subject to tax under the Petroleum Taxes Act;</li>
                <li>(f) the gross sales or receipts of a company whose gross sales or receipts in the preceding year of income do not exceed the sum of three hundred and sixty thousand dollars, unless there are reasonable grounds to believe that the gross sales or receipts of the company in the particular year will exceed that sum;</li>
                <li>(g) (Repealed by Act No. 2 of 2006).</li>
              </ul>
              (2A) The President may, by Order subject to negative resolution of Parliament, amend subsection (2)(d) by exempting other public utilities from the business levy.
              <br/>
              (3) A company is entitled to a tax credit against its business levy liability for a year of income of any payment made in respect of its corporation tax liability for that year of income up to a maximum of its business levy liability.
              <br/>
              (5) The business levy shall be payable on the gross sales or receipts of each quarter ending on 31st March, 30th June, 30th September and 31st December, in each year of income and the provisions of section 79 of the Income Tax Act shall apply mutatis mutandis to this subsection.
              <br/>
              (6) Where the Board is satisfied that a company is unable to determine, by the due date for payment in any quarter, the gross sales or receipts for any day in that quarter, the company may, with the approval of the Board, estimate its gross sales or receipts for that day.
              <br/>
              (7) Where a company which estimates its gross sales or receipts for any day in a quarter, determines that its actual sales or receipts for that day are more than the estimated sales or receipts,
              <br/>
              (8) Where a company to which subsection (6) applies, pays business levy in any quarter amounting to less than ninety per cent of the business levy liability for that quarter, the difference between ninety per cent of the business levy liability and the amount paid by the end of the quarter in which the levy liability arose, shall be subject to interest from the day following the end  of that quarter to the date of payment at the rate of fifteen per cent per annum.
              <br/>
              (9) For the removal of doubt, it is hereby declared that in ascertaining the chargeable profits of a company, no deduction or allowance shall be made of, or on account of, the levy imposed by this section.
              <br/>
              (10) The business levy shall be under the care and management of the Board of Inland Revenue and the provisions of the Income Tax Act in the Table below shall apply in relation to the business levy as they apply in relation to income tax chargeable under the Income Tax Act but subject to any necessary modification and adaptations.
              <br/>
              (11) Notwithstanding anything in subsection (1), from 1st January 1999 the business levy shall not be levied earlier than the date of expiry of three years from the date of registration of a Corporation which is registered after the aforesaid date.
              <br/>
              TABLE
              INCOME  TAX  PROVISIONS  APPLIED  TO  THE BUSINESS  LEVY
              <ul>
                <li>Section 2 (Interpretation).</li>
                <li>Sections 3 and 4 (Administration).</li>
                <li>Sections 59 to 65 (Trustees, agents, etc.).</li>
                <li>Section 66 (Deceased persons).</li>
                <li>Sections  76, 77 (Returns).</li>
                <li>Sections 79 to 82 (Payment of tax by instalments).</li>
                <li>Section 82A (Relief from payment of tax).</li>
                <li>Sections 83 and 84 (Assessments).</li>
                <li>Section 85 (Assessment lists, etc.).</li>
                <li>Section 86 (Notices of Assessment).</li>
                <li>Section 87 (Appeals).</li>
                <li>Sections 88 and 89 (Errors in assessments and additional assessments).</li>
                <li>Section 90(1) and (3) (Repayment of Tax).</li>
                <li>Section 92 (Refunds).</li>
                <li>Section 93 (Relief from double taxation).</li>
                <li>Section 94 (Certain income deemed to be income for the purposes of the Income Tax Act).</li>
                <li>Section 103 (Interest for non-payment of tax).</li>
                <li>Sections 104 to 108 (Collection).</li>
                <li>Sections 109 to 112 (Recovery).</li>
                <li>Sections 113 and 114 (Notices).</li>
                <li>Section 115 (Imprisonment of defaulters).</li>
                <li>Sections 116, 117, 118 to 124 (General Provisions).</li>
                <li>Section 125 (Regulations).</li>
                <li>Sections 130, 131, 132 (Miscellaneous powers of Board).</li>
                <li>The Sixth Schedule.</li>
              </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-4">
          <AccordionTrigger>Section 4: General scheme of corporation tax</AccordionTrigger>
          <AccordionContent>
          (1) Subject to any exceptions provided for by this Part, a resident company shall be chargeable to corporation tax on all its profits wherever arising.
          <br/>
          (2) Where a non-resident company is carrying on a trade or business in Trinidad and Tobago, the profits thereof that are chargeable to corporation tax shall be any income directly or indirectly accruing in or derived from Trinidad and Tobago.
          <br/>
          (3) Notwithstanding anything in this Act or any other rule of law to the contrary, where profits arise to a company from any activities on the continental shelf (this expression here having the same meaning as in the Continental Shelf Act) such profits shall for all the purposes of this Act be deemed to have accrued in or to have been derived from Trinidad and Tobago.
          <br/>
          (4) A company shall be chargeable to corporation tax on profits accruing for its benefit under any trust or arising under any partnership in any case in which it would be so chargeable if the profits accrue to it directly; and a company shall be chargeable to corporation tax on profits arising in the winding up of the company, but shall not otherwise be chargeable to corporation tax on profits accruing to it in a fiduciary or representative capacity except as respects its own beneficial interest, if any, in those profits.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-5">
          <AccordionTrigger>Section 5: Basis of assessment</AccordionTrigger>
          <AccordionContent>
          (1) Corporation tax shall be charged for each year of income upon the chargeable profits of the company arising in that year; so, however, that the provisions of this Part shall be read and construed as imposing the charge to corporation tax on the profits of the company for the year of income 1966 and subsequent years in respect of the profits of the accounting period ending within that year and so for subsequent years of income.
          <br/>
          (2) Except as otherwise provided by this Part, corporation tax shall be assessed upon the full amount of the profits accruing or arising, whether or not received in Trinidad and Tobago, in the year of income without any other deduction than is authorised by this Act.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-6">
          <AccordionTrigger>Section 6: Exemptions</AccordionTrigger>
          <AccordionContent>
          (1) There shall be exempt from corporation tax—
              <ul>
                <li>(a) distributions, other than preference dividends, received by a company from a resident company;</li>
                <li>(aa) distributions received by a resident company from the Export Import Bank over a period of ten years commencing from the date of the initial injection of private sector funds into the Export Import Bank;</li>
                <li>(b) profits of an investment company;</li>
                <li>(bb) gains and profits of an approved tourism project in accordance with the Order made under section 16(1) of the Tourism Development Act;</li>
                <li>(c) (Repealed by Act No. 2 of 2006);</li>
                <li>(d) profits arising from a trade or business carried on by a co-operative society so registered under any written law in force in Trinidad and Tobago;</li>
                <li>(e) the profits of any sporting body of persons, that are approved by the President by writing under his hand, derived from public or private subscriptions or donations, whether by deed or covenant or otherwise, or derived from charges for admission to witness sporting events, or from the provision of refreshments to patrons who witness sporting events;</li>
                <li>(f) the profits of a trade union registered under the Trade Unions Act, being a trade union which is precluded by its Rules from assuring to any person a gross sum exceeding nine hundred and sixty dollars or an annuity exceeding two hundred and forty dollars per annum, in so far as such profits are applicable and is applied solely for the purpose of  provident benefits, and for the purposes of  this paragraph the expression “provident benefits” shall be taken to include any payment expressly authorised by the Rules of the trade union, which is made to a member during sickness or incapacity from personal injury or while out of work or to an aged member by way of superannuation, or to a member who has met with an accident, or has lost his tools by fire or theft, and includes a payment in discharge or aid of funeral expenses on the death of a member, or the wife of a member, or as provision for the children of a deceased member;</li>
                <li>(g) profits of any ecclesiastical, charitable or educational institution of a public character, approved by the President by writing under his hand, in so far as such profits are not derived from a trade or business carried on by the institution;</li>
                <li>(h) profits of the Post Office Savings Bank and any other institution established for the encouragement of thrift which the President may declare to be exempt;</li>
                <li>(i) profits arising from investment of any fund or scheme approved by the President under section 27(1)(c) of the Income Tax Act;</li>
                <li>(j) profits of any statutory or registered building or friendly society;</li>
                <li>(k) interest receivable on any loan charged on the public revenue declared by the President by Order to be so exempt;</li>
                <li>(ka) (Repealed by Act No. 2 of 2006);</li>
                <li>(l) profits arising from investment of the Employment Injury Benefit Fund, the Short Term Benefits Fund and the Long Term Benefits Fund established under the National Insurance Act;</li>
                <li>(m) market development grants within the meaning of the Trinidad and Tobago Export Development Corporation Act;</li>
                <li>(n) profits of the Trinidad and Tobago Development Finance Company Limited;</li>
                <li>(na) profits of the Caribbean Microfinance Limited;</li>
                <li>(o) profits of the National Insurance Property Development Company Limited;</li>
                <li>(p) profits of the Trinidad and Tobago Bureau of Standards;</li>
                <li>(q) interest payable on bonds known as TTDFC Industrial Bonds that are issued by the Trinidad and Tobago Development Finance Company Limited;</li>
                <li>(qa) with effect from, 1st October 1998, interest payable on bonds issued by the Trinidad and Tobago Mortgage Finance Company Limited for the purpose of providing loans to first-time home owners;</li>
                <li>(r) profits of the Small Business Development Company Limited;</li>
                <li>(s) (Repealed by Act No. 2 of 2006);</li>
                <li>(sa) interest accruing on loans granted in furtherance of the University Students (Guarantee Fund) Act, by financial institutions;</li>
                <li>(t) (Repealed by Act No. 2 of 2006);</li>
                <li>(u) profits accruing to a venture capital company;</li>
                <li>(v) short-term capital gains accruing to venture capital company;</li>
                <li>(w) with effect from the 1st January 1994 profits accruing to a trust in respect of its Unit Trust business, being business of a financial nature as defined in the Financial Institutions Act, where the trustee is a financial institution licensed under the Financial Institutions Act or to such other trust approved by the President where such trust sells shares representing interests in the assets of the trust to beneficiaries under the trust;</li>
                <li>(x) the profits of BWIA International Airways Limited for the period 1st January 1995, to 31st December 2001;</li>
                <li>(y) the amount or value of the dividends or other distributions paid to a resident company—
                    <ul>
                      <li>(i) by a trust operated by a financial institution carrying on Unit Trust business under the Financial Institutions Act, or by such other trust approved by the President where the profits of such trust are exempt from corporation tax;</li>
                      <li>(ii) under the First and Second Unit Schemes of the Trinidad and Tobago Unit Trust Corporation established by the Unit Trust Corporation of Trinidad and Tobago Act;</li>
                    </ul>
                </li>
                <li>(z) profits of the Export Import Bank for a period of ten years or until its capital reserves and retained earnings equal its initial capital investment of thirty-one and one-half million dollars whichever is the lesser, commencing from the date of the initial injection of private sector funds into the Export Import Bank;</li>
                <li>(za) the profits of the CLICO Investment Fund (CIF); and</li>
                <li>(zb) the income or dividends distributed to resident unitholders of the CLICO Investment Fund (CIF).</li>
              </ul>
              (2) For the purposes of subsection (1)(e)—
              <br/>
              (3) For the purposes of this section—

          </AccordionContent>
        </AccordionItem>


      </Accordion>
    </div>
  );
};

export default IncomeCorporationTaxPage;