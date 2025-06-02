import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const corporationTaxSections = [
  {
    title: "PRELIMINARY",
    description: "Initial provisions of the Corporation Tax Act.",
    icon: "BookOpen", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Short Title",
    description: "Official name of the Act.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "Interpretation",
    description: "Definitions of terms used in the Act.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "PART I — TAXATION OF COMPANIES",
    description: "Provisions related to the taxation of companies.",
    icon: "Briefcase", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "IMPOSITION OF CORPORATION TAX",
    description: "Rules for levying corporation tax.",
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
    title: "3A. Business Levy",
    description: "Provisions for the business levy.",
    icon: "CreditCard", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "3B. [Repealed]",
    description: "Repealed section of the Act.",
    icon: "FileText", // Example icon, replace with appropriate one
    href: "#"
  },
  {
    title: "General Scheme of Corporation Tax",
    description: "Overall framework of corporation tax.",
    icon: "FileText", // Example icon, replace with appropriate one
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
    description: "Rules for calculating taxable profits.",
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