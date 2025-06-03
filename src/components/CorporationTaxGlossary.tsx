"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Define types for glossary entries
interface GlossaryEntry {
    term: string;
    definition: string;
    section: string;
    topic?: string;
  }

  const glossaryEntries: GlossaryEntry[] = [
   {
    term: "branch or agency",
    definition:
      "Means any factorship, agency, receivership, branch or management.",
    section: "Section 2",
  },
  {
    term: "chargeable profits",
    definition:
      "Means the aggregate amount of the profits of any company specified in section 3 remaining after allowing the appropriate deductions and exemptions under Part I of the Act.",
    section: "Section 2",
  },
  {
    term: "company",
    definition:
      "Means any body corporate or unincorporated association, but does not include a partnership.",
    section: "Section 2",
  },
  {
    term: "corporation tax or tax",
    definition: "Means the tax charged by section 3.",
    section: "Section 2",
  },
  {
    term: "distribution",
    definition:
      "Has the meaning assigned to it by section 49 of the Income Tax Act.",
    section: "Section 2",
  },
  {
    term: "investment company",
    definition:
      "Has the meaning assigned to that expression in section 6(3) of the Act.",
    section: "Section 2",
  },
  {
    term: "marketing licensee",
    definition:
      "Means a person carrying on marketing business to whom a marketing licence, within the meaning of regulation 3(1)(h) of the Petroleum Regulations, is issued or to be issued under or in accordance with the Petroleum Act.",
    section: "Section 2",
  },
  {
    term: "new consideration",
    definition:
      "Has in other provisions the same meaning as in section 49(11) of the Income Tax Act.",
    section: "Section 2",
  },
  {
    term: "petroleum operations",
    definition:
      "Has the meaning assigned to it by section 2(1) of the Petroleum Taxes Act.",
    section: "Section 2",
  },
  {
    term: "preference dividend",
    definition:
      "Means a dividend payable on a preferred share or preferred stock at a fixed gross rate per cent issued by a resident company before 31st January 1966, or, where a dividend is payable on such a preferred share or preferred stock partly at a fixed gross rate per cent and partly at a variable rate, such part of that dividend as is payable at a fixed gross rate per cent.",
    section: "Section 2",
  },
  {
    term: "profits",
    definition: "Means income and includes short-term capital gains.",
    section: "Section 2",
  },
  {
    term: "resident company",
    definition:
      "Means a company that is controlled in Trinidad and Tobago, whether or not the company is (a) incorporated in Trinidad and Tobago; or (b) engaged in trade or business or in the pursuit of professional or vocational activities in Trinidad and Tobago. The place where such a company is regarded as controlled is the place where the mind or management of the company is ordinarily situated.",
    section: "Section 2",
  },
  {
    term: "royalties",
    definition:
      "Means amounts paid as consideration for the use of, or the right to use copyrights, artistic or scientific works, patents, designs, plans, secret processes or formulae, trade marks, motion picture films, films or tapes for radio or television broadcasting, or other like properties or rights, or information concerning industrial, commercial or scientific knowledge, experience or skill. It also includes royalties, rentals, or other amounts paid in respect of the operation of mines, quarries or other natural resources.",
    section: "Section 2",
  },
  {
    term: "short-term capital gains",
    definition:
      "Means chargeable gains accruing on a disposal of an asset within twelve months of its acquisition.",
    section: "Section 2",
  },
  {
    term: "subsidiary company",
    definition:
      "Has the meaning provided for the purposes of section 49(1)(d)(iv) of the Income Tax Act by section 49(4) of that Act.",
    section: "Section 2",
  },
  {
    term: "withholding tax",
    definition:
      "Has the same meaning as in section 2 of the Income Tax Act.",
    section: "Section 2",
  },
  {
    term: "a source of income",
    definition:
      'Is "within the charge to" corporation tax or income tax if that tax is chargeable on the income arising from it or would be so chargeable if there were any such income, and references to a person, or to income being within the charge to tax, shall be similarly construed.',
    section: "Section 2",
  },
  {
    term: "Corporation Tax Acts",
    definition:
      "Means Part I of the Act (including provisions relating to income tax), together with the provisions of the Income Tax Act as far as it applies for the purposes of corporation tax and any written law relating to corporation tax, except so far as the context otherwise requires.",
    section: "Section 2",
  },
  {
    term: "SME listed company",
    definition:
      "Means a Small and Medium Enterprise company listed on the Trinidad and Tobago Stock Exchange, namely a company whose minimum capital base is five million dollars, maximum capital base is fifty million dollars, and minimum number of shareholders is twenty-five members. The capital base comprises issued share capital, retained earnings, and amounts transferred from such to a reserve account.",
    section: "Section 3",
  },
  {
    term: "sporting body of persons",
    definition:
      "For the purposes of subsection (1)(e), means a body of persons established for the purpose of promoting or advancing sporting events, to a share in the profits of which no member or person other than another sporting body of persons is entitled, and whose profits are applied wholly to the promotion or advancement of sporting events or to the provision of facilities or amenities for competitors in, or for members of the public who attend, sporting events. It does not cease to be a sporting body of persons solely because a portion of its profits is donated to a charitable or educational institution of a public character.",
    section: "Section 6",
  },
  {
    term: "sporting events",
    definition:
      "For the purposes of subsection (1)(e), means athletics, badminton, basketball, billiards, amateur boxing, amateur wrestling, cricket, cycling, flying, model aeroplane flying, football, golf, hockey, netball, polo, swimming, tennis, weightlifting, yachting, and such other activities as may be prescribed.",
    section: "Section 6",
  },
  {
    term: "local authority",
    definition:
      "For the purposes of this section, means the Port-of-Spain Corporation, the San Fernando Corporation and the Arima Corporation, continued under section 3 of the Municipal Corporations Act.",
    section: "Section 6",
  },
  {
    term: "investment company (exemptions)",
    definition:
      "For the purposes of this section, satisfies certain conditions including having 90% or more of its income derived from investments, at least 90% of its gross income derived from sources outside Trinidad and Tobago, not more than 10% of its property consisting of shares, bonds, marketable securities of any one company or debtor (other than Government), having at least fifty shareholders none of whom held more than 25% of shares/capital stock, and distributing 90% or more of its profits (excluding certain investment income) to shareholders within six months of the accounting period end.",
    section: "Section 6",
  },
  {
    term: "approved agricultural holding",
    definition:
      "For the purposes of subsection (1)(s) and (t), has the same meaning assigned to it as under section 14(6) of the Income Tax Act. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).",
    section: "Section 6",
  },
  {
    term: "financial institution",
    definition:
      "For the purposes of subsection (1)(s) and (t), means a company which carries on all or any aspects of banking business or business of a financial nature. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).",
    section: "Section 6",
  },
  {
    term: "Minister (agriculture)",
    definition:
      "For the purposes of subsection (1)(s) and (t), means the Minister to whom responsibility for agriculture is assigned. (Note: Subsection (1)(s) and (t) were repealed but continue to have effect under certain conditions).",
    section: "Section 6",
  },
  {
    term: "company for promotional expenses",
    definition:
      "For the purposes of this section, means a company incorporated and resident in Trinidad and Tobago.",
    section: "Section 10B",
  },
  {
    term: "promotional expenses",
    definition:
      "For the purposes of this section, means expenses incurred in respect of services or goods/agricultural produce manufactured or produced in Trinidad and Tobago for advertising in foreign markets, providing promotional literature overseas, participating in trade fairs/missions, overseas travel for promotion, providing free samples/technical information, inviting buyers to Trinidad and Tobago, recruitment of specialist sales personnel operating in foreign markets (max 2 years), and conducting foreign market surveys.",
    section: "Section 10B",
  },
  {
    term: "petroleum operations (section 10B)",
    definition:
      "For the purposes of subsection (6), means operations related to the various phases of the petroleum industry and includes exploring for, producing, refining, transporting and marketing petroleum or petroleum products or both and manufacturing and marketing of petroleum-based products and petro-chemicals.",
    section: "Section 10B",
  },
  {
    term: "catastrophe reserve fund or fund",
    definition:
      "For the purposes of this section, means a fund established by a company under section 49A of the Insurance Act.",
    section: "Section 10D",
  },
  {
    term: "company for insurance act",
    definition:
      "For the purposes of this section, means a company registered under the Insurance Act to carry on property insurance business insuring against catastrophe risks.",
    section: "Section 10D",
  },
  {
    term: "net written premium income",
    definition:
      "For the purposes of this section, means the income of a company from premiums derived from its property insurance business, after deducting reinsurance premiums for catastrophe risk reinsurance.",
    section: "Section 10D",
  },
  {
    term: "property insurance business",
    definition:
      "For the purposes of this section, means the business of effecting and carrying out contracts of insurance against risks of loss of or damage to property, not being risks of such kinds that the business of effecting and carrying out contracts of insurance against them constitutes marine, aviation and transport insurance business or motor insurance business.",
    section: "Section 10D",
  },
  {
    term: "artistic work",
    definition:
      "For the purposes of this section, means any work of art, whether visual or performing.",
    section: "Section 10G",
  },
  {
    term: "associate",
    definition:
      "For the purpose of subsection (1), includes the spouse, parent, child, brother, sister or partner of a person.",
    section: "Section 10H",
  },
  {
    term: "sporting activities or events",
    definition:
      "In this section, means athletics, badminton, basketball, amateur boxing, martial arts, wrestling, cricket, cycling, model aeroplane flying, football, rugby, golf, hockey, netball, baseball, polo, swimming, tennis, weightlifting, yachting, automobile sports, surfing, archery, scrabble, table tennis, body building, taekwondo, billiards/snookers, bridge/other card games, tagby, chess, squash, darts, draughts/checkers, volleyball, equestrian, windsurfing, game fishing, gymnastics, judo, karate, karting, kickboxing, life saving, softball, target archery, pigeon racing, recreational diving, special olympics, powerboat racing, para olympics, rifle shooting, sailing, model car racing, cricket (windball), triathlon, powerlifting and such other activities or events as may be prescribed.",
    section: "Section 10I",
  },
  {
    term: "sportsman",
    definition:
      "For the purposes of this section, means an individual engaged in sporting activities or events.",
    section: "Section 10I",
  },
  {
    term: "covenanted donation to charity",
    definition:
      "For the purposes of this section, means a payment under a deed of covenant or other agreement, made by a company in favour of a sporting body of persons as defined by section 6(2), a charitable or educational institution of a public character approved by the President by writing under his hand, or the Children’s Life Fund established under the Children’s Life Fund Act.",
    section: "Section 10O",
  },
  {
    term: "capital expenditure",
    definition:
      "For the purposes of this section, in relation to the construction of a building, includes expenditure on preparing the site for construction and on constructing or improving roads or utility services for the use of the building, being expenditure on operations carried out in the vicinity of and in connection with the building, and includes expenditure on fixtures and fittings that forms part of or is attached to a building.",
    section: "Section 16",
  },
  {
    term: "commercial or industrial purposes",
    definition:
      "For the purposes of this section, in relation to the use of a building, does not include use for the purposes of a school, college, university, club, hotel, hospital, private hospital or of public entertainment or amusement.",
    section: "Section 16",
  },
  {
    term: "locally owned or controlled",
    definition:
      "For the purposes of this section, in relation to a company, means a company in which nationals beneficially own shares carrying between them, directly or indirectly the right to exercise more than one-half of the voting power, the right to receive more than one-half of any dividend, and the right to receive more than one-half of any capital distribution on winding up or reduction of share capital.",
    section: "Section 16",
  },
  {
    term: "nationals",
    definition:
      "For the purposes of this section, means citizens of Trinidad and Tobago and persons who, under any law relating to immigration are regarded as belonging thereto or having the status of residents, and includes companies controlled by such persons or by companies so controlled as specified in the definition of 'locally owned or controlled', and partnerships the majority share in which and the management of which are owned and controlled by such persons.",
    section: "Section 16",
  },
  {
    term: "Minister",
    definition:
      "For the purposes of sections 16A to 16E inclusive, means the member of the Cabinet to whom responsibility for Industry is assigned.",
    section: "Section 16H",
  },
  {
    term: "accounting period",
    definition: "Means the period in respect of which corporation tax is chargeable.",
    section: "Section 18A",
  },
  {
    term: "claimant company",
    definition: "Means a company which utilises the trading loss of a surrendering company.",
    section: "Section 18A",
  },
  {
    term: "group relief",
    definition: "Means relief that allows the current trading losses of a surrendering company to be set off, by way of relief from corporation tax, against the chargeable profits of a claimant company, whether in whole or in part, where throughout their respective accounting periods, both companies satisfy the provisions of the group test set out in section 18C.",
    section: "Section 18A",
  },
  {
    term: "surrendering company",
    definition: "Means a company which incurs a trading loss and surrenders that loss to another company for the purpose of group relief.",
    section: "Section 18A",
  },
  {
    term: "trading loss",
    definition: "Means a loss referred to in section 16 of the Income Tax Act but does not include capital allowances and expenses payable to a group member and claimed as a deduction if corresponding amounts have not been included in the profit of the other group member for a year of income.",
    section: "Section 18A",
  },
  {
    term: "A",
    definition: "For the purposes of subsection (2), is the length of the period common to the two accounting periods.",
    section: "Section 18I",
  },
  {
    term: "B",
    definition: "For the purposes of subsection (2), is the length of the accounting period of the surrendering company.",
    section: "Section 18I",
  },
  {
    term: "C",
    definition: "For the purposes of subsection (2), is the length of the corresponding accounting period of the claimant company.",
    section: "Section 18I",
  }, 

  // ... (Include the rest of the glossary terms in similar format)
];

export default function CorporationTaxGlossary() {
    const [search, setSearch] = useState("");
  
    const filteredEntries = glossaryEntries.filter(entry =>
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase()) ||
      (entry.topic?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
  
    const groupedByTopic: Record<string, GlossaryEntry[]> = filteredEntries.reduce((acc: Record<string, GlossaryEntry[]>, entry) => {
      const key = entry.topic || "General";
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {});
  
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Corporation Tax Glossary</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Search glossary..."
              className="mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {Object.entries(groupedByTopic).map(([topic, entries]) => (
              <div key={topic} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{topic}</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {entries.map(({ term, definition, section }) => (
                    <li key={term}>
                      <strong>{term}:</strong> {definition}{" "}
                      {section && (
                        <a
                          href={`#${section.replace(/\s+/g, '-')}`}
                          className="text-blue-600 underline ml-1"
                        >
                          [{section}]
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
  