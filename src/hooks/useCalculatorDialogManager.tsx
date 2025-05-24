import * as React from "react";
import { ActiveCalculatorInfo } from "../types"; // Adjusted path

export function useCalculatorDialogManager() {
  const [openState, setOpenState] = React.useState<Record<string, boolean>>({});
  const [dialogKeys, setDialogKeys] = React.useState<Record<string, number>>({});
  const [activeCalculator, setActiveCalculator] = React.useState<ActiveCalculatorInfo | null>(null); // Used the new type

  const openDialog = React.useCallback(
    (
      identifier: string,
      title: string,
      icon: React.ElementType,
      componentName: string
    ) => {
      setOpenState((prev) => ({ ...prev, [identifier]: true }));
      const newKey = Date.now();
      setDialogKeys((prev) => ({ ...prev, [identifier]: newKey }));
      setActiveCalculator({
        name: identifier,
        key: newKey,
        title,
        icon,
        componentName,
      });
    },
    []
  );

  const closeDialog = React.useCallback((identifier: string) => {
    setOpenState((prev) => ({ ...prev, [identifier]: false }));
    if (activeCalculator && activeCalculator.name === identifier) {
      setActiveCalculator(null);
    }
  }, [activeCalculator]);

  const closeAllDialogs = React.useCallback(() => {
    const allClosed = Object.keys(openState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {} as Record<string, boolean>);
    setOpenState(allClosed);
    setActiveCalculator(null);
  }, [openState]);

  return {
    openState,
    dialogKeys,
    activeCalculator,
    openDialog,
    closeDialog,
    closeAllDialogs,
    setActiveCalculator
  };
}
