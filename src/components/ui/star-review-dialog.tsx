
"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  calculatorName: string | null;
  onSubmitReview: (calculatorName: string, rating: number) => void;
}

export function StarReviewDialog({
  isOpen,
  onOpenChange,
  calculatorName,
  onSubmitReview,
}: StarReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Reset rating when the dialog is opened for a new calculator
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoverRating(0);
    }
  }, [isOpen, calculatorName]);

  const handleSubmit = () => {
    if (rating > 0 && calculatorName) {
      onSubmitReview(calculatorName, rating);
    }
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  }

  if (!calculatorName) {
    return null; // Don't render if no calculator name is provided
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">Rate Your Experience</DialogTitle>
          <DialogDescription className="text-center pt-2 text-muted-foreground">
            How was your experience with the {calculatorName}?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center space-x-1 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-8 w-8 cursor-pointer transition-colors",
                (hoverRating >= star || rating >= star)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground hover:text-yellow-300"
              )}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <DialogFooter className="sm:justify-center gap-2 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Skip
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
