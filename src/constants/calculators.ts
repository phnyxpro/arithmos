import {
    Calculator,
    DollarSign,
    Landmark,
    Receipt,
    PiggyBank,
    Clock,
    Briefcase,
    Building,
    Truck,
    Ship,
    ShieldCheck,
    FileText,
    Users,
    Network,
    BadgePercent,
    ArrowRightLeft,
    CreditCard,
    ShoppingCart,
    BookOpen,
    AlertTriangle,
    BarChart3,
    CheckCircle2,
    ThumbsUp,
    Banknote,
    Scale,
    Home,
    Percent,
    CalculatorIcon,
    UserCheck,
    HandCoins
  } from "lucide-react";

export const detailedCalculatorList = [
    {
      name: "Income Tax Calculator",
      description: "Calculate your income tax liability based on your earnings and deductions. Get a clear breakdown of your tax obligations and plan your finances accordingly.",
      icon: DollarSign,
      category: "Tax",
      path: "/calculators/income-tax",
      stateName: "isIncomeTaxCalcOpen",
      keyName: "incomeTaxCalcKey",
      componentName: "IncomeTaxCalculator"
    },
    {
      name: "Corporation Tax Calculator",
      description: "Determine the corporation tax owed by your business. Understand your corporate tax responsibilities and ensure compliance with tax regulations.",
      icon: Landmark,
      category: "Tax",
      path: "/calculators/corporation-tax",
      stateName: "isCorpTaxCalcOpen",
      keyName: "corpTaxCalcKey",
      componentName: "CorporationTaxCalculator"
    },
    {
      name: "VAT Calculator",
      description: "Easily calculate Value Added Tax for your transactions. Ensure accurate VAT calculations for your sales and purchases, simplifying your accounting processes.",
      icon: Receipt,
      category: "Tax",
      path: "/calculators/vat",
      stateName: "isVatCalcOpen",
      keyName: "vatCalcKey",
      componentName: "SimpleVatCalculator"
    },
    {
      name: "Property Tax Calculator",
      description: "Estimate property taxes based on assessed value and rates. Plan for your property tax expenses and understand the factors influencing your tax liability.",
      icon: Home,
      category: "Tax",
      path: "/calculators/property-tax",
      stateName: "isPropertyTaxCalcOpen",
      keyName: "propertyTaxCalcKey",
      componentName: "PropertyTaxCalculator"
    },
    {
      name: "Business Levy Calculator",
      description: "Calculate the business levy applicable to your enterprise. Stay informed about your business levy obligations and manage your financial planning effectively.",
      icon: Briefcase,
      category: "Tax",
      path: "/calculators/business-levy",
      stateName: "isBusinessLevyCalcOpen",
      keyName: "businessLevyCalcKey",
      componentName: "SimplifiedLevyCalculator"
    },
    {
      name: "Green Fund Levy Calculator",
      description: "Determine the green fund levy for your business operations. Understand your environmental tax contributions and support sustainable initiatives.",
      icon: Building,
      category: "Tax",
      path: "/calculators/green-fund-levy",
      stateName: "isGreenFundLevyCalcOpen",
      keyName: "greenFundLevyCalcKey",
      componentName: "SimplifiedLevyCalculator" // Needs specific Green Fund Levy Calculator if different
    },
    {
      name: "Payroll Calculator",
      description: "Simplify payroll processing with our comprehensive calculator. Accurately calculate salaries, deductions, and net pay for your employees.",
      icon: Users,
      category: "Payroll",
      path: "/calculators/payroll",
      stateName: "isPayrollCalcOpen",
      keyName: "payrollCalcKey",
      componentName: "SimplifiedPayrollCalculator"
    },
    {
      name: "NIS Calculator",
      description: "Calculate National Insurance Scheme contributions. Ensure compliance with social security regulations and manage your NIS payments accurately.",
      icon: ShieldCheck,
      category: "Payroll",
      path: "/calculators/nis", // Assuming a path, adjust if needed
      stateName: "isNisCalcOpen",
      keyName: "nisCalcKey",
      componentName: "VoluntaryNisCalculator"
    },
    {
      name: "PAYE Calculator",
      description: "Estimate Pay As You Earn (PAYE) deductions for employees. Streamline your payroll process with accurate PAYE calculations.",
      icon: FileText,
      category: "Payroll",
      path: "/calculators/paye", // Assuming a path, adjust if needed
      stateName: "isPayeCalcOpen",
      keyName: "payeCalcKey",
      componentName: "GrossToNetSalaryCalculator"
    },
    {
      name: "Overtime Pay Calculator",
      description: "Calculate overtime payments for your employees. Ensure fair and accurate compensation for extra hours worked, complying with labor laws.",
      icon: Clock,
      category: "Payroll",
      path: "/calculators/overtime-pay",
      stateName: "isOvertimeCalcOpen",
      keyName: "overtimeCalcKey",
      componentName: "OvertimePayCalculator"
    },
    {
      name: "Vacation Pay Calculator",
      description: "Determine vacation pay entitlements for your employees. Manage employee benefits effectively and ensure compliance with leave policies.",
      icon: Briefcase,
      category: "Payroll",
      path: "/calculators/vacation-pay",
      stateName: "isVacationCalcOpen",
      keyName: "vacationCalcKey",
      componentName: "VacationPayCalculator"
    },
    {
      name: "Bonus & Commission Calculator",
      description: "Calculate bonuses and commissions for your sales team. Accurately determine incentive payments and motivate your workforce.",
      icon: BadgePercent,
      category: "Payroll",
      path: "/calculators/bonus-commission",
      stateName: "isBonusCommCalcOpen",
      keyName: "bonusCommCalcKey",
      componentName: "BonusCommissionCalculator"
    },
    {
      name: "Time Calculator",
      description: "Perform various time-based calculations for your business. Efficiently manage schedules, projects, and employee hours with our versatile time tools.",
      icon: Clock,
      category: "Business Tools",
      path: "/calculators/time-calculator",
      stateName: "isTimeCalcOpen",
      keyName: "timeCalcKey",
      componentName: "BasicTimeCalculator"
    },
    {
      name: "Loan Amortisation Calculator",
      description: "Generate detailed loan amortisation schedules. Understand your loan repayment structure, including principal and interest components, over time.",
      icon: CreditCard,
      category: "Financial Planning",
      path: "/calculators/loan-amortisation",
      stateName: "isLoanAmortisationCalcOpen",
      keyName: "loanAmortisationCalcKey",
      componentName: "LoanAmortisationCalculator"
    },
    {
      name: "Mortgage Calculator",
      description: "Estimate mortgage payments and explore financing options. Plan your home purchase with a clear understanding of mortgage costs and affordability.",
      icon: Home,
      category: "Financial Planning",
      path: "/calculators/mortgage",
      stateName: "isMortgageCalcOpen",
      keyName: "mortgageCalcKey",
      componentName: "MortgageCalculator"
    },
    {
      name: "Savings & Investment Calculator",
      description: "Project the growth of your savings and investments over time. Make informed financial decisions and plan for your future with our powerful forecasting tools.",
      icon: PiggyBank,
      category: "Financial Planning",
      path: "/calculators/savings-investment",
      stateName: "isSavingsInvestmentCalcOpen",
      keyName: "savingsInvestmentCalcKey",
      componentName: "SavingsInvestmentCalculator"
    },
    {
      name: "Currency Exchange Calculator",
      description: "Convert between different currencies with real-time exchange rates. Simplify international transactions and stay updated on currency values.",
      icon: ArrowRightLeft,
      category: "Business Tools",
      path: "/calculators/currency-exchange",
      stateName: "isCurrencyExchangeCalcOpen",
      keyName: "currencyExchangeCalcKey",
      componentName: "CurrencyExchangeCalculator"
    },
    {
      name: "Markup & Margin Calculator",
      description: "Calculate product markup and profit margins for optimal pricing. Ensure profitability and make strategic pricing decisions for your goods and services.",
      icon: Percent,
      category: "Business Tools",
      path: "/calculators/markup-margin",
      stateName: "isMarkupMarginCalcOpen",
      keyName: "markupMarginCalcKey",
      componentName: "MarkupMarginCalculator"
    },
    {
      name: "Break-Even Point Calculator",
      description: "Determine the point at which your business covers all its costs. Analyze your financial viability and make informed decisions about pricing and expenses.",
      icon: Scale,
      category: "Business Tools",
      path: "/calculators/break-even",
      stateName: "isBreakEvenCalcOpen",
      keyName: "breakEvenCalcKey",
      componentName: "BreakEvenCalculator"
    },
    {
      name: "Depreciation Calculator",
      description: "Calculate asset depreciation using various methods. Accurately track the declining value of your assets for accounting and tax purposes.",
      icon: Building,
      category: "Business Tools",
      path: "/calculators/depreciation",
      stateName: "isDepreciationCalcOpen",
      keyName: "depreciationCalcKey",
      componentName: "DepreciationCalculator"
    },
    {
      name: "Cash Flow Projection Calculator",
      description: "Forecast your business's future cash inflows and outflows. Proactively manage your finances and anticipate potential cash shortages or surpluses.",
      icon: Banknote,
      category: "Financial Planning",
      path: "/calculators/cash-flow-projection",
      stateName: "isCashFlowProjectionCalcOpen",
      keyName: "cashFlowProjectionCalcKey",
      componentName: "CashFlowProjectionCalculator"
    },
    {
      name: "Simple Interest Calculator",
      description: "Calculate simple interest on loans or investments. Understand basic interest calculations for straightforward financial planning.",
      icon: Landmark,
      category: "Financial Planning",
      path: "/calculators/simple-interest",
      stateName: "isSimpleInterestCalcOpen",
      keyName: "simpleInterestCalcKey",
      componentName: "SimpleInterestCalculator"
    },
    {
      name: "Rental Yield Calculator",
      description: "Evaluate the profitability of rental property investments. Assess the return on your property investments and make informed decisions.",
      icon: Home,
      category: "Financial Planning",
      path: "/calculators/rental-yield",
      stateName: "isRentalYieldCalcOpen",
      keyName: "rentalYieldCalcKey",
      componentName: "RentalYieldCalculator"
    },
    {
      name: "Stamp Duty Calculator",
      description: "Calculate stamp duty for property and share transactions. Ensure compliance with stamp duty regulations and accurately determine your liabilities.",
      icon: FileText,
      category: "Tax",
      path: "/calculators/stamp-duty",
      stateName: "isStampDutyCalcOpen",
      keyName: "stampDutyCalcKey",
      componentName: "StampDutyCalculator"
    },
    {
      name: "Customs Duty Calculator",
      description: "Estimate customs duties for imported goods. Navigate international trade regulations and accurately calculate import tariffs.",
      icon: Ship,
      category: "Trade & Customs",
      path: "/calculators/customs-duty",
      stateName: "isCustomsDutyCalcOpen",
      keyName: "customsDutyCalcKey",
      componentName: "TariffCustomsDutyCalculator"
    },
    {
      name: "Excise Duty Calculator",
      description: "Calculate excise duties on specific goods. Understand your obligations for excise taxes on items like alcohol, tobacco, and fuel.",
      icon: ShoppingCart,
      category: "Trade & Customs",
      path: "/calculators/excise-duty",
      stateName: "isExciseDutyCalcOpen",
      keyName: "exciseDutyCalcKey",
      componentName: "ExciseDutyCalculator"
    },
    {
      name: "Freight & Shipping Calculator",
      description: "Estimate freight and shipping costs for your goods. Plan your logistics effectively and manage transportation expenses for domestic and international shipments.",
      icon: Truck,
      category: "Trade & Customs",
      path: "/calculators/freight-shipping",
      stateName: "isFreightShippingCalcOpen",
      keyName: "freightShippingCalcKey",
      componentName: "FreightShippingCalculator"
    },
    {
      name: "CIF Value Calculator",
      description: "Calculate the Cost, Insurance, and Freight (CIF) value for imports. Determine the total value of imported goods for customs and duty purposes.",
      icon: Ship,
      category: "Trade & Customs",
      path: "/calculators/cif-value",
      stateName: "isCifCalcOpen",
      keyName: "cifCalcKey",
      componentName: "CIFCalculator"
    },
    {
      name: "AML Risk Calculator",
      description: "Assess Anti-Money Laundering (AML) risk for your clients. Implement robust compliance measures and identify potential risks in your business relationships.",
      icon: AlertTriangle,
      category: "Compliance",
      path: "/calculators/aml-risk",
      stateName: "isAmlRiskCalcOpen",
      keyName: "amlRiskCalcKey",
      componentName: "AMLRiskCalculator"
    },
    {
      name: "FATCA/CRS Calculator",
      description: "Navigate Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) requirements. Ensure compliance with international tax reporting obligations.",
      icon: Network,
      category: "Compliance",
      path: "/calculators/fatca-crs",
      stateName: "isFatcaCrsCalcOpen",
      keyName: "fatcaCrsCalcKey",
      componentName: "FATCACRSCalculator"
    }
  ];
