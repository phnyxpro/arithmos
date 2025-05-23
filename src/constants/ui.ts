import { MessageSquare, ShieldCheck, BarChart2, FileText, LifeBuoy, Users } from 'lucide-react';

export const heroContentData = {
    title: "Empowering Your Financial Clarity",
    subtitle: "Your all-in-one platform for tax calculation, financial planning, and compliance. Simplify complex financial tasks with our intuitive tools and expert resources. Designed for individuals, businesses, and financial professionals in Barbados.",
    ctaButton: "Explore Calculators",
    secondaryButton: "Learn More",
  };

  export const benefitsData = [
    {
      icon: MessageSquare,
      title: "Simplified Tax Calculations",
      description: "Navigate Barbados' tax landscape with easy-to-use calculators for income tax, VAT, corporation tax, and more.",
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Compliance",
      description: "Stay up-to-date with the latest tax laws and regulations, ensuring accuracy and peace of mind.",
    },
    {
      icon: BarChart2,
      title: "Informed Financial Planning",
      description: "Utilize tools for mortgage, loan, and investment planning to make sound financial decisions.",
    },
    {
      icon: FileText,
      title: "Comprehensive Resource Hub",
      description: "Access guides, articles, and FAQs on a wide range of tax and financial topics relevant to Barbados.",
    },
    {
      icon: LifeBuoy,
      title: "Business & Trade Tools",
      description: "Calculators for customs duties, shipping, payroll, and other essential business operations.",
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "An intuitive and accessible platform designed for both financial novices and seasoned professionals.",
    },
  ];

  export const resourceGuides = [
    {
      title: "Understanding Income Tax in Barbados",
      description: "A comprehensive guide to personal income tax, allowances, and deductions.",
      link: "/knowledge-base/income-corporation-tax",
      category: "Income Tax"
    },
    {
      title: "VAT Essentials for Businesses",
      description: "Everything you need to know about VAT registration, filing, and compliance.",
      link: "/knowledge-base/vat",
      category: "VAT"
    },
    {
      title: "Corporate Tax Obligations",
      description: "An overview of corporation tax, business levies, and related regulations.",
      link: "/knowledge-base/income-corporation-tax",
      category: "Corporate Tax"
    },
    {
      title: "Property Tax Guide",
      description: "Learn about property valuation, tax rates, and payment procedures.",
      link: "/knowledge-base/property-tax",
      category: "Property Tax"
    },
    {
      title: "Customs & Trade Facilitation",
      description: "Information on import duties, tariffs, and customs procedures.",
      link: "/knowledge-base/aid-to-industry", // Assuming this is the most relevant link
      category: "Trade & Customs"
    },
    {
      title: "Payroll Management Best Practices",
      description: "Tips for accurate payroll processing, NIS, and PAYE calculations.",
      link: "/calculators/payroll", // Link to the payroll calculator page as a resource
      category: "Payroll"
    }
  ];
