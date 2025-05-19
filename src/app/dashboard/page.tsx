
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Settings,
  DollarSign,
  ReceiptText,
  TrendingUp,
  Building,
  Clock,
  Briefcase,
  User,
  Leaf,
  House,
  CalendarDays,
  CircleAlert,
  Bell,
  FileText as FileTextIcon,
  CircleHelp,
  Download,
  MapPin,
  Menu, // Added Menu icon if needed for other parts, though not used in current dashboard content directly
} from "lucide-react";

// Data for the dashboard (static for now)
const userProfile = {
  name: "Guest User",
  avatarFallback: "U",
  businessInfo: "Business Name / Individual",
  fiscalPeriod: "Q2 2024",
  vatRegistered: "N/A",
  businessLevyStatus: "Unpaid",
  corporationTaxStatus: "Pending",
  incomeTaxFiledStatus: "Filed",
};

const financialOverviewCards = [
  {
    title: "Total Estimated Tax Due",
    value: "TT$12,345.67",
    description: "Across all tax types this year",
    icon: DollarSign,
  },
  {
    title: "VAT (Current Period)",
    value: "TT$1,250.00",
    description: "Net VAT for Jul-Aug 2024",
    icon: ReceiptText,
  },
  {
    title: "Business Levy (YTD)",
    value: "TT$800.00",
    description: "Paid: TT$400.00",
    icon: TrendingUp,
  },
];

const taxToolCards = [
  { title: "Corporation Tax", description: "Estimate company corporation tax.", icon: Building, href: "/calculators/corporation-tax" },
  { title: "Business Levy", description: "Calculate your business levy.", icon: DollarSign, href: "/calculators/business-levy" },
  { title: "VAT Tools", description: "VAT calculator and registration info.", icon: ReceiptText, href: "/calculators/vat" },
  { title: "Daily Pay", description: "Advanced time and pay calculations.", icon: Clock, href: "/calculators/time-calculator" },
  { title: "Payroll Summary", description: "Manage employee payroll.", icon: Briefcase, href: "/calculators/payroll" },
  { title: "Income Tax", description: "Personal income tax estimation.", icon: User, href: "/calculators/income-tax" },
  { title: "Green Fund Levy", description: "Calculate Green Fund Levy.", icon: Leaf, href: "/calculators/green-fund-levy" },
  { title: "Property Tax", description: "Estimate property tax.", icon: House, href: "/calculators/property-tax" },
  { title: "Tax Calendar", description: "View important tax deadlines.", icon: CalendarDays, href: "/tax-calendar" }, // Assuming a link
];

const upcomingDeadlines = [
  { name: "VAT Return (Jul-Aug)", dueDate: "September 25, 2024", status: "Pending", statusColor: "border-yellow-500 text-yellow-600" },
  { name: "Business Levy (Q3)", dueDate: "September 30, 2024", status: "Pending", statusColor: "border-yellow-500 text-yellow-600" },
  { name: "Corporation Tax Filing (EOI)", dueDate: "October 31, 2024", status: "Approaching", statusColor: "border-red-500 text-red-600" },
];

const notifications = [
  { title: "VAT Filing Due Soon", description: "Your VAT return for Jul-Aug is due in 5 days.", icon: CircleAlert, colorClass: "border-yellow-500 bg-yellow-500/10 text-yellow-600" },
  { title: "New IRD Update", description: "Check the Knowledge Centre for new tax guidelines.", icon: Bell, colorClass: "border-blue-500 bg-blue-500/10 text-blue-600" },
];

const knowledgeCentreExternalLinks = [
    { text: "Ministry of Finance Trinidad & Tobago", href: "https://www.finance.gov.tt/"},
    { text: "Board of Inland Revenue (IRD)", href: "https://www.ird.gov.tt/"},
    { text: "Ministry of the Attorney General and Legal Affairs", href: "https://www.legalaffairs.gov.tt/"}
];

const knowledgeCentreGuides = [
    { title: "Guide: How to File VAT Returns", description: "A step-by-step overview.", icon: CircleHelp, href: "/knowledge-centre/vat-filing-guide" },
    { title: "Summary: Finance Act 2024 Key Changes", description: "Highlights relevant to businesses and individuals.", icon: FileTextIcon, href: "/knowledge-centre/finance-act-2024" },
];

const exportButtons = [
    { text: "Export Business Levy PDF", icon: Download },
    { text: "Export VAT Summary CSV", icon: Download },
    { text: "Export PAYE Summary PDF", icon: Download },
];

const paymentLocations = {
  irdOffices: [
    { id: "ird-pos", name: "Taxpayer Relations Section (Port of Spain)", details: "IRD Tower, Government Plaza, Port of Spain. Mon-Fri, 8:00 AM - 4:00 PM." },
    { id: "ird-sando", name: "South Regional Office (San Fernando)", details: "Cipero Street, San Fernando. Mon-Fri, 8:00 AM - 3:00 PM." },
    { id: "ird-tobago", name: "Tobago Regional Office (Scarborough)", details: "Main Street, Scarborough, Tobago. Mon-Fri, 8:00 AM - 3:00 PM." },
  ],
  wardenOffices: [
    { id: "warden-chaguanas", name: "Chaguanas Warden's Office", details: "Details for Chaguanas Warden's Office..." },
    { id: "warden-couva", name: "Couva Warden's Office", details: "Details for Couva Warden's Office..." },
    { id: "warden-labrea", name: "La Brea Warden's Office", details: "Details for La Brea Warden's Office..." },
    { id: "warden-mayaro", name: "Mayaro Warden's Office", details: "Details for Mayaro Warden's Office..." },
    { id: "warden-pointfortin", name: "Point Fortin Warden's Office", details: "Details for Point Fortin Warden's Office..." },
    { id: "warden-princestown", name: "Princes Town Warden's Office", details: "Details for Princes Town Warden's Office..." },
    { id: "warden-rioclaro", name: "Rio Claro Warden's Office", details: "Details for Rio Claro Warden's Office..." },
    { id: "warden-roxborough", name: "Roxborough Warden's Office", details: "Details for Roxborough Warden's Office..." },
    { id: "warden-sando-cipero", name: "San Fernando - Cipero Street Warden's Office", details: "Details for San Fernando - Cipero Street..." },
    { id: "warden-sando-independence", name: "San Fernando - Independence Avenue Warden's Office", details: "Details for San Fernando - Independence Ave..." },
    { id: "warden-sangregrande", name: "Sangre Grande Warden's Office", details: "Details for Sangre Grande Warden's Office..." },
    { id: "warden-scarborough-wilson", name: "Scarborough Warden's Office (Wilson Road)", details: "Details for Scarborough - Wilson Road..." },
    { id: "warden-siparia", name: "Siparia Warden's Office", details: "Details for Siparia Warden's Office..." },
    { id: "warden-tunapuna", name: "Tunapuna Warden's Office", details: "Details for Tunapuna Warden's Office..." },
  ],
};


export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pt-10">
      {/* Welcome Banner */}
      <Card className="mb-8 shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://placehold.co/64x64.png?text=${userProfile.avatarFallback}`} alt={userProfile.name} data-ai-hint="user avatar" />
              <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Welcome, {userProfile.name}!</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {userProfile.businessInfo} | Current Fiscal Period: {userProfile.fiscalPeriod}
              </CardDescription>
            </div>
          </div>
          <Link href="/profile">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 text-sm">
            <div>VAT Registered: <Badge variant="secondary">{userProfile.vatRegistered}</Badge></div>
            <div>Business Levy: <Badge variant={userProfile.businessLevyStatus === "Unpaid" ? "destructive" : "secondary"}>{userProfile.businessLevyStatus}</Badge></div>
            <div>Corporation Tax: <Badge variant="outline">{userProfile.corporationTaxStatus}</Badge></div>
            <div>Income Tax Filed: <Badge className={userProfile.incomeTaxFiledStatus === "Filed" ? "bg-green-500 hover:bg-green-600 text-primary-foreground" : "bg-secondary"}>{userProfile.incomeTaxFiledStatus}</Badge></div>
          </div>
        </CardContent>
      </Card>

      {/* Key Financial Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Key Financial Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {financialOverviewCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tax Tools & Calculators */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Tax Tools &amp; Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {taxToolCards.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block h-full">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <tool.icon className="h-7 w-7 text-accent" />
                    <CardTitle className="text-lg text-primary">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-0">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Upcoming Deadlines</h2>
          <Card>
            <CardContent className="pt-6 space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-semibold">{deadline.name}</p>
                    <p className="text-sm text-muted-foreground">Due: {deadline.dueDate}</p>
                  </div>
                  <Badge variant="outline" className={deadline.statusColor}>{deadline.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Notifications & Alerts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Notifications &amp; Alerts</h2>
          <Card>
            <CardContent className="pt-6 space-y-3">
              {notifications.map((notification) => (
                <div key={notification.title} className={`flex items-start p-3 border-l-4 ${notification.colorClass} rounded-r-md`}>
                  <notification.icon className={`h-5 w-5 mr-3 mt-1 flex-shrink-0`} />
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

       <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Recent Activity</h2>
            <Card>
                <CardContent className="pt-6 space-y-3">
                <p className="text-sm text-muted-foreground text-center">No recent activity.</p>
                </CardContent>
            </Card>
        </section>

        {/* Knowledge Centre */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Knowledge Centre</h2>
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="p-3 border rounded-md bg-muted/10">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            <CircleAlert className="h-5 w-5 mr-2 text-primary" /> Stay Updated
                        </h4>
                        <p className="text-sm text-muted-foreground">Tax laws and regulations can change. For the most current information, always refer to the official government sources:</p>
                        <ul className="list-disc list-inside pl-5 mt-2 space-y-1 text-sm">
                            {knowledgeCentreExternalLinks.map(link => (
                                <li key={link.href}>
                                    <a target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" href={link.href}>
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h4 className="text-lg font-semibold text-primary pt-2">Featured Guides &amp; Articles</h4>
                    {knowledgeCentreGuides.map(guide => (
                        <div key={guide.title} className="p-3 border rounded-md hover:shadow-sm transition-shadow">
                            <h5 className="font-medium text-foreground flex items-center">
                                <guide.icon className="h-5 w-5 mr-2 text-muted-foreground" /> {guide.title}
                            </h5>
                            <p className="text-xs text-muted-foreground mt-1">
                                {guide.description} <Link href={guide.href} className="text-primary underline-offset-4 hover:underline">Read more</Link>
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>
      </div>

      {/* Export & Share */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Export &amp; Share</h2>
        <Card>
            <CardContent className="pt-6 flex flex-wrap gap-2">
                {exportButtons.map(button => (
                    <Button key={button.text} variant="outline">
                        <button.icon className="mr-2 h-4 w-4" /> {button.text}
                    </Button>
                ))}
            </CardContent>
        </Card>
      </section>

      {/* Important Payment Locations */}
      <section className="mb-8">
        <Card className="w-full shadow-lg rounded-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center">
                    <MapPin className="h-7 w-7 mr-3"/>Important Payment Locations
                </CardTitle>
                <CardDescription className="text-sm pt-2">
                    You or your representative can pay your Business Levy, Green Fund Levy, or Corporation Tax. You must have your BIR Number and pay at a cashier in any of these locations. Cheques can be made payable to “Chairman Board of Inland Revenue”.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="md:grid md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-3 mt-2 md:mt-0">Inland Revenue Division (IRD) Offices</h3>
                        <Accordion type="single" collapsible className="w-full">
                            {paymentLocations.irdOffices.map(office => (
                                <AccordionItem value={office.id} key={office.id}>
                                    <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3">
                                        <div className="flex items-start sm:items-center">
                                            <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-1 sm:mt-0" />
                                            <span>{office.name}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground pl-7">
                                        {office.details || "Details not available yet."}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <h3 className="text-lg font-semibold text-primary mb-3">Warden’s Offices</h3>
                        <p className="text-sm text-muted-foreground mb-3">Additionally, these payments can be made at any Warden’s Office.</p>
                        <Accordion type="single" collapsible className="w-full">
                             {paymentLocations.wardenOffices.map(office => (
                                <AccordionItem value={office.id} key={office.id}>
                                    <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3">
                                        <div className="flex items-start sm:items-center">
                                            <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-1 sm:mt-0" />
                                           <span>{office.name}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground pl-7">
                                        {office.details || "Details not available yet. Please contact the office directly for more information."}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
