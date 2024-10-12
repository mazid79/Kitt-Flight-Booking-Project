"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerDemoProps {
  placeholder: string;
  selectedDate: string; // Add selectedDate prop
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>; // Add setSelectedDate prop
  className?: string; // Allow className as a prop
}

export function DatePickerDemo({ placeholder, selectedDate, setSelectedDate, className }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    // Update date state when selectedDate changes
    if (selectedDate) {
      setDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setSelectedDate(format(date, "yyyy-MM-dd")); // Update selectedDate state in parent
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-center text-left font-normal",
            !date && "text-muted-foreground", 
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect} // Update the handleSelect function to set the selected date
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}