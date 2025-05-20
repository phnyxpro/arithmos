
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Library, Building, ReceiptText, Factory, ArrowRight } from "lucide-react";

const knowledgeBaseSections = [
  {
    title: "Property Tax Act",
    description: "Understand the fundamentals of property taxation in Trinidad & Tobago.",
    href: "/knowledge-base/property-tax",
    Icon: Library,
  },
  {
    title: "VAT Act",
    description: "Learn about Value Added Tax, registration, taxable supplies, and more.",
    href: "/knowledge-base/vat",
    Icon: ReceiptText,
  },
  {
    title: "Income & Corporation Tax Act",
    description: "Explore the laws governing personal income tax and corporate taxation.",
    href: "/knowledge-base/income-corporation-tax",
    Icon: Building,
  },
  {
    title: "Aid to Industry Act",
    description: "Discover incentives and concessions available for industries in T&T.",
    href: "/knowledge-base/aid-to-industry",
    Icon: Factory,
  },
];

export default function KnowledgeBaseIndexPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-primary mb-4 text-center">
        Tax Knowledge Base
      </h1>
      <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
        Explore summaries and highlights of key tax legislation in Trinidad & Tobago.
        This information is for general guidance and not legal advice. Always consult official sources.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {knowledgeBaseSections.map((section) => (
          <Card key={section.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-xl">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <section.Icon className="h-8 w-8 text-accent" />
                <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </CardContent>
            <CardDescription className="p-6 pt-0">
               <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                <Link href={section.href}>
                  View Highlights <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

    