
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CalculatorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  icon: React.ElementType;
  title: string;
  description: string;
  CalculatorComponent: React.ReactElement;
}

const CalculatorDialog = ({
  isOpen,
  onOpenChange,
  icon: Icon,
  title,
  description,
  CalculatorComponent,
}: CalculatorDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent
      className="w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto"
      aria-describedby="calculator-description"
    >
      <DialogHeader>
        <DialogTitle className="text-2xl text-primary flex items-center mb-2">
          <Icon className="mr-2 h-6 w-6" />
          {title}
        </DialogTitle>
      </DialogHeader>
      {CalculatorComponent}
      <Button type="button" variant="outline" className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      <p id="calculator-description" className="sr-only">
        {description}
      </p>
    </DialogContent>
  </Dialog>
);

export default CalculatorDialog;
