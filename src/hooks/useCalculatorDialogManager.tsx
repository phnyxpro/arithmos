\
import * as React from "react";

export function useCalculatorDialogManager() {
  const [openState, setOpenState] = React.useState<Record<string, boolean>>({});
  const [dialogKeys, setDialogKeys] = React.useState<Record<string, number>>({});
  const [activeCalculator, setActiveCalculator] = React.useState<null | {
    name: string;
    key: number;
    title: string;
    icon: React.ElementType;
    componentName: string;
  }>(null);

  const openDialog = React.useCallback(
    (
      identifier: string,
      title: string,
      icon: React.ElementType,
      componentName: string
    ) => {
      setOpenState((prev) => ({ ...prev, [identifier]: true }));
      // Use Date.now() for key to ensure it's unique for re-renders,
      // rather than incrementing, as the old keySetter did.
      // The original suggestion used Date.now() for activeCalculator.key, so this aligns.
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
    // Create an object with all known identifiers set to false
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
    closeDialog, // Added for individual dialog closing
    closeAllDialogs,
    setActiveCalculator // Expose to allow modification, e.g., clearing after review
  };
}
