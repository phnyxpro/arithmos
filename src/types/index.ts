import React from 'react';

export interface ActiveCalculatorInfo {
  name: string;
  key: number;
  title: string;
  icon: React.ElementType;
  component: React.ElementType; // Changed from componentName to component
}

// If there was existing content in this file, it should be preserved.
// For this example, I'm assuming it's a new file or can be overwritten.
// If other types exist, this new interface should be added alongside them.
