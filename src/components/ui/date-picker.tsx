"use client";

import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "@/lib/dayjs";

function formatDate(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  return dayjs(date).format("DD/MM/YYYY");
}

type Props = {
  id?: string;
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
};

export function DatePicker({ id = "date", label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(value ?? undefined);

  const [inputValue, setInputValue] = useState(formatDate(value));

  const [error, setError] = useState(false);

  useEffect(() => {
    setMonth(value ?? undefined);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    //todo: add mask
    if (!/^[0-9/]*$/.test(nextValue) || nextValue.length > 10) {
      return;
    }

    setInputValue(nextValue);

    const parsed = dayjs(nextValue, "DD/MM/YYYY", true);
    if (parsed.isValid() || !nextValue.length) {
      onChange?.(parsed.isValid() ? parsed.toDate() : null);
      setMonth(parsed.isValid() ? parsed.toDate() : undefined);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="mb-2 px-1">
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          value={inputValue}
          placeholder="DD/MM/YYYY"
          className="bg-background pr-10"
          onChange={handleInputChange}
          error={error && "Invalid date"}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={value ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onChange?.(date ?? null);
                setInputValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
