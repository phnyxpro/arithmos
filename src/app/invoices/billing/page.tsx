"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Search, CirclePlus, Repeat, Settings, CreditCard, Bell, TriangleAlert, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enableReminders, setEnableReminders] = useState(false);
  const [recurringInvoiceSettings, setRecurringInvoiceSettings] = useState({
    client: '',
    template: '',
    frequency: '',
    startDate: '2025-05-17', // Placeholder date
    endDate: '',
    neverEnds: true,
  });

  // Placeholder data for selects (replace with actual data fetching if needed)
  const clients = [{ value: 'client1', label: 'Client A' }, { value: 'client2', label: 'Client B' }];
  const invoiceTemplates = [{ value: 'template1', label: 'Standard Invoice' }];
  const frequencies = [{ value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' }];

  // Placeholder handlers
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement search logic
  };

  const handleCreateInvoice = () => {
    console.log('Creating new invoice');
    // Implement create invoice logic
  };

  const handleCreateRecurringInvoice = () => {
    console.log('Creating recurring invoice with settings:', recurringInvoiceSettings);
    // Implement recurring invoice creation logic
  };

  const handleSaveReminderSettings = () => {
    console.log('Saving reminder settings:', enableReminders);
    // Implement save reminder settings logic
  };

  // Placeholder for invoice list rendering (replace with actual data mapping)
  const renderInvoiceList = () => {
    return (
      <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground text-center">No invoices created yet. Click 'Create New Invoice' to start.</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="border bg-card text-card-foreground w-full max-w-6xl shadow-xl rounded-xl">
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="tracking-tight text-3xl font-bold text-primary">Invoicing & Billing</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Create, send, and track professional invoices. Invoices are currently saved to your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-8">
          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by client name or invoice #"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>
            <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleCreateInvoice}>
              <CirclePlus className="mr-2 h-5 w-5" /> Create New Invoice
            </Button>
          </div>

          {/* Invoice List */}
          {renderInvoiceList()}

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Recurring Billing & Reminders */}
            <Card>
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                 <div className="font-semibold tracking-tight text-lg flex items-center">
                   <Repeat className="mr-2 h-5 w-5 text-primary" /> Recurring Billing & Reminders
                 </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                {/* Setup Recurring Invoice */}
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                     <Settings className="mr-2 h-4 w-4 text-muted-foreground" />Setup Recurring Invoice
                  </h4>
                  <div className="space-y-3 p-3 border rounded-md bg-muted/50">
                     <div className="grid gap-2">
                        <Label htmlFor="clientSelect" className="text-xs font-medium">Client</Label>
                         <Select value={recurringInvoiceSettings.client} onValueChange={(value) => setRecurringInvoiceSettings({...recurringInvoiceSettings, client: value})}>
                            <SelectTrigger id="clientSelect" className="h-8 text-xs mt-1">
                                <SelectValue placeholder="Select client..." />
                            </SelectTrigger>
                            <SelectContent>
                                {clients.map(client => <SelectItem key={client.value} value={client.value}>{client.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="grid gap-2">
                        <Label htmlFor="invoiceTemplateSelect" className="text-xs font-medium">Invoice Template</Label>
                         <Select value={recurringInvoiceSettings.template} onValueChange={(value) => setRecurringInvoiceSettings({...recurringInvoiceSettings, template: value})}>
                            <SelectTrigger id="invoiceTemplateSelect" className="h-8 text-xs mt-1">
                                <SelectValue placeholder="Select invoice template..." />
                            </SelectTrigger>
                            <SelectContent>
                                {invoiceTemplates.map(template => <SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="grid gap-2">
                        <Label htmlFor="frequencySelect" className="text-xs font-medium">Frequency</Label>
                         <Select value={recurringInvoiceSettings.frequency} onValueChange={(value) => setRecurringInvoiceSettings({...recurringInvoiceSettings, frequency: value})}>
                            <SelectTrigger id="frequencySelect" className="h-8 text-xs mt-1">
                                <SelectValue placeholder="Select frequency..." />
                            </SelectTrigger>
                            <SelectContent>
                                {frequencies.map(freq => <SelectItem key={freq.value} value={freq.value}>{freq.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                         <div className="grid gap-2">
                            <Label htmlFor="startDate" className="text-xs font-medium">Start Date</Label>
                            <Button variant={"outline"} className={cn(
                                "w-full justify-start text-left font-normal h-8 text-xs mt-1"
                                // !date && "text-muted-foreground"
                                )}>
                                <Calendar className="mr-2 h-3 w-3" />
                                {recurringInvoiceSettings.startDate ? recurringInvoiceSettings.startDate : "Pick a date"}
                                {/* Format date here if using a date picker */}
                            </Button>
                            {/* DatePicker Component Needed */}
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="endDate" className="text-xs font-medium">End Date</Label>
                             <Button variant={"outline"} className={cn(
                                "w-full justify-start text-left font-normal h-8 text-xs mt-1",
                                "text-muted-foreground"
                                )}
                                disabled={recurringInvoiceSettings.neverEnds} // Disable if never ends
                                >
                                <Calendar className="mr-2 h-3 w-3" />
                                {recurringInvoiceSettings.endDate ? recurringInvoiceSettings.endDate : "Pick a date"}
                                 {/* Format date here if using a date picker */}
                            </Button>
                             {/* DatePicker Component Needed */}
                             <div className="flex items-center space-x-2 mt-1.5">
                                <Checkbox
                                    id="neverEnds"
                                    checked={recurringInvoiceSettings.neverEnds}
                                    onCheckedChange={(checked) => setRecurringInvoiceSettings({...recurringInvoiceSettings, neverEnds: Boolean(checked), endDate: ''})} // Clear end date if never ends
                                />
                                <Label htmlFor="neverEnds" className="text-xs font-normal">Never Ends</Label>
                            </div>
                        </div>
                    </div>
                     <Button className="w-full mt-2 text-xs h-8 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleCreateRecurringInvoice}>Create Recurring Invoice</Button>
                  </div>
                </div>

                {/* Subscription Management */}
                <div className="mt-4">
                   <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />Subscription Management
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">Manage client subscriptions and automated billing cycles.</p>
                  <Button className="w-full text-xs h-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground">View Subscriptions (Coming Soon)</Button>
                </div>

                {/* Payment Reminders */}
                <div className="mt-4">
                   <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Bell className="mr-2 h-4 w-4 text-muted-foreground" />Payment Reminders
                  </h4>
                  <div className="space-y-3 p-3 border rounded-md bg-muted/50">
                     <div className="flex items-center space-x-2">
                        <Checkbox
                            id="enableReminders"
                            checked={enableReminders}
                            onCheckedChange={(checked) => setEnableReminders(Boolean(checked))}
                        />
                        <Label htmlFor="enableReminders" className="text-xs font-normal">Enable Automated Payment Reminders</Label>
                    </div>
                     <Button className="w-full mt-2 text-xs h-8 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSaveReminderSettings}>Save Reminder Settings</Button>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Online Payments */}
            <Card>
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight text-lg flex items-center">
                   <CreditCard className="mr-2 h-5 w-5 text-primary" /> Online Payments
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-sm text-muted-foreground mb-3">Configure integrations with payment gateways to accept online payments. (Conceptual settings below)</CardDescription>
                 {/* Accordion Placeholder */}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm">WiPay</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs">
                           Placeholder for WiPay integration settings.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-2">
                        <AccordionTrigger className="text-sm">Paywise</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs">
                           Placeholder for Paywise integration settings.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger className="text-sm">Fygaro</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs">
                           Placeholder for Fygaro integration settings.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger className="text-sm">PayPal</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs">
                           Placeholder for PayPal integration settings.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-5">
                        <AccordionTrigger className="text-sm">Stripe</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xs">
                           Placeholder for Stripe integration settings.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Data Storage Warning */}
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <TriangleAlert className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Data Storage:</h3>
                <p className="text-sm">
                  Invoices and gateway settings are currently saved in your browser's local storage. They are not backed up to the cloud. Clearing your browser data will remove them.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center p-6 pt-0">
          <p className="text-xs text-muted-foreground text-center w-full">
            Streamline your billing process. Full cloud integration and advanced features are planned for future updates.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
