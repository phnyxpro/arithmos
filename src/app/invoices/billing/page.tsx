"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog'; // Added DialogDescription
import { FileText, Search, CirclePlus, Repeat, Settings, CreditCard, Bell, TriangleAlert, Calendar, Trash2, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available
import { format } from 'date-fns'; // Assuming date-fns is available

interface LineItem {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enableReminders, setEnableReminders] = useState(false);
  const [recurringInvoiceSettings, setRecurringInvoiceSettings] = useState({
    client: '',
    template: '',
    frequency: '',
    startDate: format(new Date(), 'yyyy-MM-dd'), // Use date-fns for consistent format
    endDate: '',
    neverEnds: true,
  });

  // State for Create New Invoice Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000), // Simple random placeholder
    invoiceDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date().setDate(new Date().getDate() + 30), 'yyyy-MM-dd'), // Due date 30 days from now
    lineItems: [] as LineItem[],
    applyVat: false,
    discountType: 'None', // or 'Percentage', 'Amount'
    discountValue: 0,
    notes: '',
    terms: 'Payment due upon receipt.',
  });
  const [lineItemCounter, setLineItemCounter] = useState(0); // Counter for unique line item IDs

  // Placeholder data for selects (replace with actual data fetching if needed)
  const clients = [{ value: 'client1', label: 'Client A' }, { value: 'client2', label: 'Client B' }];
  const invoiceTemplates = [{ value: 'template1', label: 'Standard Invoice' }];
  const frequencies = [{ value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' }];

  // Placeholder handlers
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement search logic
  };

  const handleCreateInvoiceClick = () => {
    setIsCreateModalOpen(true);
    // Reset new invoice state with default values when opening modal
    setNewInvoice({
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000), // New random invoice number
      invoiceDate: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(new Date().setDate(new Date().getDate() + 30), 'yyyy-MM-dd'),
      lineItems: [],
      applyVat: false,
      discountType: 'None',
      discountValue: 0,
      notes: '',
      terms: 'Payment due upon receipt.',
    });
    setLineItemCounter(0); // Reset counter
  };

  const handleSaveInvoice = () => {
    console.log('Saving invoice:', newInvoice);
    // Implement save invoice logic (e.g., to local storage, API)
    setIsCreateModalOpen(false);
  };

  const handleCreateRecurringInvoice = () => {
    console.log('Creating recurring invoice with settings:', recurringInvoiceSettings);
    // Implement recurring invoice creation logic
  };

  const handleSaveReminderSettings = () => {
    console.log('Saving reminder settings:', enableReminders);
    // Implement save reminder settings logic
  };

  const handleAddLineItem = () => {
    setLineItemCounter(lineItemCounter + 1);
    setNewInvoice({
      ...newInvoice,
      lineItems: [...newInvoice.lineItems, { id: lineItemCounter, description: '', qty: 1, unitPrice: 0, amount: 0 }],
    });
  };

  const handleRemoveLineItem = (id: number) => {
    setNewInvoice({
      ...newInvoice,
      lineItems: newInvoice.lineItems.filter(item => item.id !== id),
    });
  };

  const handleLineItemChange = (id: number, field: string, value: any) => {
    const updatedLineItems = newInvoice.lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate amount based on qty and unit price
        if (field === 'qty' || field === 'unitPrice') {
          updatedItem.amount = updatedItem.qty * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });
    setNewInvoice({ ...newInvoice, lineItems: updatedLineItems });
  };

  // Calculate totals dynamically
  const { subtotal, vatAmount, totalAmountDue } = useMemo(() => {
    const subtotal = newInvoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const vatRate = newInvoice.applyVat ? 0.125 : 0;
    const vatAmount = subtotal * vatRate;
    const totalAmountDue = subtotal + vatAmount - (newInvoice.discountType === 'Amount' ? newInvoice.discountValue : subtotal * (newInvoice.discountValue / 100)); // Basic discount logic
    return { subtotal, vatAmount, totalAmountDue };
  }, [newInvoice.lineItems, newInvoice.applyVat, newInvoice.discountType, newInvoice.discountValue]);


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
            <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleCreateInvoiceClick}>
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
                                {recurringInvoiceSettings.startDate ? format(new Date(recurringInvoiceSettings.startDate), 'MMM dd, yyyy') : "Pick a date"}
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
                                {recurringInvoiceSettings.endDate ? format(new Date(recurringInvoiceSettings.endDate), 'MMM dd, yyyy') : "Pick a date"}
                             </Button>
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
                
