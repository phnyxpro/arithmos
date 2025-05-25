import * as React from "react";
import { ActiveCalculatorInfo } from "../types";

export function useCalculatorDialogManager() {
  const [activeCalculator, setActiveCalculator] = React.useState<ActiveCalculatorInfo | null>(null);

  const openDialog = React.useCallback(
    (
      identifier: string,
      title: string,
      icon: React.ElementType,
      component: React.ElementType // Changed from componentName to component
    ) => {
      const newKey = Date.now();
      setActiveCalculator({
        name: identifier,
        key: newKey,
        title,
        icon,
        component, // Use component here
      });
    },
    []
  );

  const closeDialog = React.useCallback(() => {
    // No identifier needed as we only manage one active dialog
    setActiveCalculator(null);
  }, []);

  // activeCalculator already holds the open state (if null, it's closed)
  // and the key is part of activeCalculator, so separate openState and dialogKeys are not strictly needed
  // if we only ever show one dialog at a time, which seems to be the new goal.

  return {
    activeCalculator,
    openDialog,
    closeDialog,
    setActiveCalculator, // Exposing this if direct manipulation is needed (e.g., by parent for review dialog logic)
  };
}
