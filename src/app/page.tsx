
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Keep for potential future image use, though not in current design
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  ShieldCheck,
  BarChart3, // Using BarChart3 for Financial Insights
  FileText,
  CalendarDays,
  Bell,
  ArrowRight,
  Target,     // For "Tailored Solutions"
  Zap,        // For "Efficiency"
  BookOpen,   // For "Knowledge"
  Linkedin,
  Facebook,
  UsersIcon, // Added UsersIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, addDays } from 'date-fns';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  Icon: React.ElementType;
}

const heroData: HeroSectionProps = {
  title: "Empowering SMEs in Trinidad & Tobago",
  subtitle: "Your Partner for Simplified Accounting & Finance.",
  description:
    "Navigate local tax compliance, manage payroll, and gain financial clarity with tools designed for T&T businesses.",
  ctaText: "Explore Financial Tools",
  ctaLink: "/dashboard", // Link to dashboard or a general calculators overview
  Icon: Briefcase,
};

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefitsData: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "IRD Compliance Confidence",
    description:
      "Stay aligned with Trinidad & Tobago's tax laws. Our tools help you calculate and prepare for filings with accuracy.",
  },
  {
    icon: Target,
    title: "Tailored for T&T SMEs",
    description:
      "Whether you're a startup, sole trader, or growing company, find straightforward tools without unnecessary complexity.",
  },
  {
    icon: Zap,
    title: "Boost Financial Efficiency",
    description:
      "Streamline tasks like payroll (PAYE, NIS, HS), levy calculations (Business & Green Fund), and VAT estimations.",
  },
  {
    icon: BarChart3,
    title: "Gain Financial Insights",
    description:
      "Utilize calculators for cash flow, break-even analysis, and loan amortization to make informed business decisions.",
  },
];

interface Deadline {
  id: string;
  name: string;
  dueDate: string;
  details: string;
}

// Example deadlines, should be updated with current/relevant info
const upcomingDeadlines: Deadline[] = [
  {
    id: "bl-q3",
    name: "Business & Green Fund Levy (Q3)",
    dueDate: "2025-09-30",
    details: "Third quarterly installment for Business Levy and Green Fund Levy.",
  },
  {
    id: "vat-sep-oct",
    name: "VAT Return (Sep-Oct)",
    dueDate: "2025-11-25",
    details: "Bi-monthly VAT return and payment for the period September to October.",
  },
  {
    id: "paye-oct",
    name: "PAYE Remittance (October)",
    dueDate: "2025-11-15",
    details: "Monthly remittance of PAYE deducted from employees for October salaries.",
  },
];

interface KnowledgeHubItem {
  id: string;
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
}

const knowledgeHubItems: KnowledgeHubItem[] = [
  {
    id: "vat-sme",
    title: "VAT Essentials for T&T SMEs",
    description: "Understand registration, zero-rated vs. exempt supplies, and filing obligations.",
    href: "/knowledge-base/vat",
    Icon: FileText,
  },
  {
    id: "corp-tax-basics",
    title: "Corporation Tax & Levies Overview",
    description: "A guide to Corporation Tax, Business Levy, and Green Fund Levy for companies in T&T.",
    href: "/knowledge-base/income-corporation-tax", // Assuming corp tax details are here
    Icon: Briefcase,
  },
  {
    id: "payroll-compliance",
    title: "Payroll Compliance in T&T",
    description: "Learn about PAYE, NIS, and Health Surcharge obligations for employers.",
    href: "/calculators/payroll", // Link to the detailed payroll page
    Icon: UsersIcon,
  },
];

export default function LandingPage() {
  const { toast } = useToast();
  const HeroIcon = heroData.Icon;

  const handleAddToCalendar = React.useCallback((deadline: Deadline) => {
    const eventDate = parseISO(deadline.dueDate);
    if (isNaN(eventDate.getTime()) || eventDate < new Date(new Date().setHours(0,0,0,0))) {
      toast({
        title: "Invalid or Past Date",
        description: `Cannot set a reminder for "${deadline.name}" as the date is invalid or in the past.`,
        variant: "destructive",
      });
      return;
    }

    const startDateStr = format(eventDate, "yyyyMMdd");
    const endDateStr = format(addDays(eventDate, 1), "yyyyMMdd");

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `TaxTT Reminder: ${deadline.name}`
    )}&dates=${startDateStr}/${endDateStr}&details=${encodeURIComponent(
      `${deadline.details}

View more at TaxTT.`
    )}&location=Trinidad%20and%20Tobago`;

    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
        `TaxTT Reminder: ${deadline.name}`
      )}&startdt=${format(eventDate, "yyyy-MM-dd")}T00:00:00&enddt=${format(addDays(eventDate,1), "yyyy-MM-dd")}T00:00:00&body=${encodeURIComponent(
        `${deadline.details}

View more at TaxTT.`
      )}&location=Trinidad%20and%20Tobago`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//TaxTT//TaxTT Reminder//EN`,
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}@taxtt.com`,
      `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
      `DTSTART;VALUE=DATE:${startDateStr}`,
      `DTEND;VALUE=DATE:${endDateStr}`,
      `SUMMARY:TaxTT Reminder: ${deadline.name}`,
      `DESCRIPTION:${deadline.details}

View more at TaxTT.`,
      "LOCATION:Trinidad and Tobago",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("
");

    // For this example, we'll just use the ICS download for all,
    // as direct links to Google/Outlook can be complex to get right universally.
    // You can extend this to offer choices or use platform-specific libraries.

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `TaxTT_Reminder_${deadline.name.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({
      title: "Calendar File Downloading",
      description: `An .ics file for "${deadline.name}" is being downloaded. You can import this into your calendar.`,
    });
  }, [toast]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="py-20 md:py-28 text-center bg-gradient-to-b from-card to-background"
      >
        <div className="container mx-auto px-4">
          <HeroIcon className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {heroData.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-primary/90 mb-6">
            {heroData.subtitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10">
            {heroData.description}
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={heroData.ctaLink}>
              {heroData.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why TaxTT is Essential for Your T&amp;T SME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitsData.map((benefit) => (
              <Card key={benefit.title} className="shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader className="flex flex-row items-start space-x-4">
                  <benefit.icon className="h-10 w-10 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-xl text-primary mb-1">{benefit.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines Section */}
      <section id="deadlines" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              Key Compliance Deadlines for T&amp;T SMEs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about crucial tax and statutory deadlines. (Example dates provided).
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingDeadlines.map((deadline) => (
              <Card key={deadline.id} className="flex flex-col shadow-md rounded-xl">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-primary">{deadline.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs pt-1">Due: {format(parseISO(deadline.dueDate), "MMMM d, yyyy")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-2">{deadline.details}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-sm text-primary border-primary hover:bg-primary/10"
                    onClick={() => handleAddToCalendar(deadline)}
                  >
                    <Bell className="mr-2 h-4 w-4" /> Add to Calendar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Hub Section */}
      <section id="knowledge-hub" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            SME Finance &amp; Tax Hub for Trinidad &amp; Tobago
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {knowledgeHubItems.map((item) => (
              <Card key={item.id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <CardHeader>
                  <item.Icon className="h-8 w-8 text-accent mb-3" />
                  <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-accent p-0">
                    <Link href={item.href}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Link href="/knowledge-base">
                Explore All Knowledge Base Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="py-12 bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="h-10 w-10 text-primary-foreground/80 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">{heroData.title}</h3>
          <p className="text-sm text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Your trusted partner for Trinidad & Tobago SME financial solutions.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
             <Link href="#" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Linkedin size={24} />
             </Link>
             <Link href="#" aria-label="Facebook" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Facebook size={24} />
             </Link>
          </div>
          <div className="text-xs text-primary-foreground/70">
            <Link href="#" className="hover:underline">Privacy Policy</Link> • <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-4">
            © {new Date().getFullYear()} TaxTT for SMEs. All rights reserved.
          </p>
           <p className="text-[10px] text-primary-foreground/50 mt-4 max-w-xl mx-auto">
            Disclaimer: TaxTT provides tools and information for general guidance only. It is not a substitute for professional financial or legal advice.
            All calculations should be verified with official IRD guidelines and qualified professionals. Tax laws are subject to change.
          </p>
        </div>
      </footer>
    </div>
  );
}
