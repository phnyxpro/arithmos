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
import { FileText, Search, CirclePlus, Repeat, Settings, CreditCard, Bell, TriangleAlert, Calendar, Trash2, MinusCircle, Users } from 'lucide-react'; // Added Users icon
import { cn } from '@/lib/utils'; // Assuming cn utility is available
import { format } from 'date-fns'; // Assuming date-fns is available
import { Textarea } from '@/components/ui/textarea';

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
  const [lineItemCounter, setLineItemCounter] = useState(1); // Counter for unique line item IDs, start from 1

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
      lineItems: [{ id: 0, description: '', qty: 1, unitPrice: 0, amount: 0 }], // Start with one empty line item
      applyVat: false,
      discountType: 'None',
      discountValue: 0,
      notes: '',
      terms: 'Payment due upon receipt.',
    });
    setLineItemCounter(1); // Reset counter and add initial item
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Saving invoice:', newInvoice);
    // Implement save invoice logic (e.g., to local storage, API)
    // After successful save:
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
    setNewInvoice({
      ...newInvoice,
      lineItems: [...newInvoice.lineItems, { id: lineItemCounter, description: '', qty: 1, unitPrice: 0, amount: 0 }],
    });
    setLineItemCounter(lineItemCounter + 1);
  };

  const handleRemoveLineItem = (id: number) => {
    setNewInvoice({
      ...newInvoice,
      lineItems: newInvoice.lineItems.filter(item => item.id !== id),
    });
  };

  const handleLineItemChange = (id: number, field: keyof LineItem, value: any) => {
    const updatedLineItems = newInvoice.lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate amount based on qty and unit price
        if (field === 'qty' || field === 'unitPrice') {
           const qty = parseFloat(updatedItem.qty as any) || 0; // Ensure parsing
           const unitPrice = parseFloat(updatedItem.unitPrice as any) || 0; // Ensure parsing
          updatedItem.amount = qty * unitPrice;
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
    const vatRate = newInvoice.applyVat ? 0.125 : 0; // Assuming 12.5% VAT
    const vatAmount = subtotal * vatRate;

    let discountAmount = 0;
    if(newInvoice.discountType === 'Amount') {
        discountAmount = newInvoice.discountValue || 0;
    } else if (newInvoice.discountType === 'Percentage') {
        discountAmount = subtotal * ((newInvoice.discountValue || 0) / 100);
    }

    const totalAmountDue = subtotal + vatAmount - discountAmount;
    return { subtotal, vatAmount, totalAmountDue };
  }, [newInvoice.lineItems, newInvoice.applyVat, newInvoice.discountType, newInvoice.discountValue]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Placeholder for invoice list rendering (replace with actual data mapping)
  const renderInvoiceList = () => {
    return (
      <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground text-center">No invoices created yet. Click 'Create New Invoice' to start.</p>
      </div>
    );
  };

   // Placeholder for client list rendering (replace with actual data mapping)
  const renderClientList = () => {
    return (
      <div className="border rounded-lg p-6 min-h-[100px] flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground text-center">No clients added yet. Click 'Add Client' to start.</p>
      </div>
    );
  };

  // Placeholder handler for Add Client button
  const handleAddClientClick = () => {
    console.log('Add Client button clicked');
    // Implement logic to add a new client (e.g., open a modal, navigate to a new page)
  };

  return (
     <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center pt-10">
      <Card className="border bg-card text-card-foreground w-full max-w-6xl shadow-xl rounded-xl mb-8"> {/* Added margin bottom */}
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="tracking-tight text-3xl font-bold text-primary">Invoicing & Billing</CardTitle>
          </div>
          <CardDescription className="text-md pt-2">
            Create, send, and track professional invoices. Invoices are currently saved to your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-8 max-w-full overflow-x-hidden"> {/* Added max-w-full and overflow-x-hidden to contain content */}
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
                            {/* DatePicker Component Needed */}
                            <Input type="date" id="startDate" value={recurringInvoiceSettings.startDate} onChange={(e) => setRecurringInvoiceSettings({...recurringInvoiceSettings, startDate: e.target.value})} className="h-8 text-xs mt-1" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="endDate" className="text-xs font-medium">End Date</Label>
                             {/* DatePicker Component Needed */}
                            <Input type="date" id="endDate" value={recurringInvoiceSettings.endDate} onChange={(e) => setRecurringInvoiceSettings({...recurringInvoiceSettings, endDate: e.target.value})} className="h-8 text-xs mt-1" disabled={recurringInvoiceSettings.neverEnds} />
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

            {/* Clients Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-3">
                 <div className="font-semibold tracking-tight text-lg flex items-center">
                   <Users className="mr-2 h-5 w-5 text-primary" /> Clients
                 </div>
                 <Button className="text-xs h-8 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddClientClick}>
                    <CirclePlus className="mr-2 h-4 w-4" /> Add Client
                 </Button>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                {/* Client List */}
                 {renderClientList()}

                 {/* Add Client Button below list */}
                 <Button variant="outline" className="w-full text-sm" onClick={handleAddClientClick}>
                    <CirclePlus className="mr-2 h-4 w-4" /> Add Client
                 </Button>
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
        </CardContent>
      </Card>

       {/* Create New Invoice Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new invoice.
            </DialogDescription>
          </DialogHeader>
           <form onSubmit={handleSaveInvoice} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName" className="text-right">
                Client Name
              </Label>
              <Input
                id="clientName"
                value={newInvoice.clientName}
                onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientEmail" className="text-right">
                Client Email
              </Label>
              <Input
                id="clientEmail"
                type="email"
                value={newInvoice.clientEmail}
                onChange={(e) => setNewInvoice({...newInvoice, clientEmail: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientAddress" className="text-right">
                Client Address
              </Label>
              <Textarea
                id="clientAddress"
                value={newInvoice.clientAddress}
                onChange={(e) => setNewInvoice({...newInvoice, clientAddress: e.target.value})}
                className="col-span-3"
              />
            </div>
             <Separator className="my-4" />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invoiceNumber" className="text-right">
                Invoice #
              </Label>
              <Input
                id="invoiceNumber"
                value={newInvoice.invoiceNumber}
                readOnly // Invoice number is auto-generated
                className="col-span-3 font-mono text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invoiceDate" className="text-right">
                Invoice Date
              </Label>
              <Input
                id="invoiceDate"
                type="date"
                value={newInvoice.invoiceDate}
                onChange={(e) => setNewInvoice({...newInvoice, invoiceDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                className="col-span-3"
              />
            </div>
             <Separator className="my-4" />

            {/* Line Items */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Line Items</h4>
              {newInvoice.lineItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-center">
                   <div className="col-span-full sm:col-span-2">
                      <Label htmlFor={`description-${item.id}`} className="sr-only">Description</Label>
                      <Input
                        id={`description-${item.id}`}
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                        className="text-sm"
                      />
                   </div>
                   <div className="col-span-2 sm:col-span-1">
                       <Label htmlFor={`qty-${item.id}`} className="sr-only">Qty</Label>
                       <Input
                          id={`qty-${item.id}`}
                          type="number"
                          placeholder="Qty"
                           value={item.qty}
                           onChange={(e) => handleLineItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                           className="text-sm"
                       />
                   </div>
                    <div className="col-span-2 sm:col-span-1">
                       <Label htmlFor={`price-${item.id}`} className="sr-only">Unit Price</Label>
                       <Input
                          id={`price-${item.id}`}
                          type="number"
                          step="0.01"
                          placeholder="Price"
                           value={item.unitPrice}
                           onChange={(e) => handleLineItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="text-sm"
                       />
                   </div>
                    <div className="col-span-2 sm:col-span-1 text-right">
                       <Label htmlFor={`amount-${item.id}`} className="sr-only">Amount</Label>
                       <Input id={`amount-${item.id}`} value={item.amount.toFixed(2)} readOnly className="text-sm text-right" />
                   </div>
                   <div className="col-span-full sm:col-span-1 flex justify-end">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveLineItem(item.id)} disabled={newInvoice.lineItems.length <= 1}>
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                   </div>
                </div>
              ))}
               <Button variant="outline" onClick={handleAddLineItem} type="button" className="w-full text-sm">
                 <CirclePlus className="mr-2 h-4 w-4" /> Add Line Item
              </Button>
            </div>
             <Separator className="my-4" />

             {/* Totals and Adjustments */}
            <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2 md:col-span-1 flex items-center space-x-2">
                    <Checkbox id="applyVat" checked={newInvoice.applyVat} onCheckedChange={(checked) => setNewInvoice({...newInvoice, applyVat: Boolean(checked)})} />
                    <Label htmlFor="applyVat">Apply VAT (12.5%)</Label>
                </div>
                 <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-2 items-center">
                    <Label htmlFor="discount" className="text-right">Discount</Label>
                     <div className="flex items-center gap-2">
                        <Select value={newInvoice.discountType} onValueChange={(value) => setNewInvoice({...newInvoice, discountType: value as 'None' | 'Percentage' | 'Amount', discountValue: 0})}>
                            <SelectTrigger id="discountType">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="None">None</SelectItem>
                                <SelectItem value="Percentage">%</SelectItem>
                                <SelectItem value="Amount">Amount</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                          id="discountValue"
                          type="number"
                          step="0.01"
                          placeholder="Value"
                          value={newInvoice.discountValue}
                           onChange={(e) => setNewInvoice({...newInvoice, discountValue: parseFloat(e.target.value) || 0})}
                          disabled={newInvoice.discountType === 'None'}
                          className="flex-1"
                        />
                     </div>
                </div>
            </div>

             <Separator className="my-4" />

             {/* Summary Totals */}
             <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div className="col-span-full text-right">Subtotal: <span className="font-normal">TT$ {formatCurrency(subtotal)}</span></div>
                 {newInvoice.applyVat && (
                    <div className="col-span-full text-right">VAT (12.5%): <span className="font-normal">TT$ {formatCurrency(vatAmount)}</span></div>
                 )}
                 {newInvoice.discountType !== 'None' && (
                    <div className="col-span-full text-right">Discount: <span className="font-normal">TT$ {formatCurrency(newInvoice.discountType === 'Amount' ? newInvoice.discountValue : subtotal * (newInvoice.discountValue / 100))}</span></div>
                 )}
                 <div className="col-span-full text-right text-lg font-bold text-primary">Total Amount Due: <span>TT$ {formatCurrency(totalAmountDue)}</span></div>
             </div>

             <Separator className="my-4" />

             {/* Notes and Terms */}
            <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                   <Textarea
                    id="notes"
                    value={newInvoice.notes}
                    onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                    className="col-span-3"
                   />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="terms" className="text-right">Terms</Label>
                   <Textarea
                    id="terms"
                    value={newInvoice.terms}
                    onChange={(e) => setNewInvoice({...newInvoice, terms: e.target.value})}
                    className="col-span-3"
                   />
                </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Invoice</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
