"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "@/lib/dayjs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const years = [...new Array(50)].map((_, idx) => currentYear - idx);

type Props = {
  id?: string;
  label: string;
  value?: Date | null;
  disabled?: boolean;
  onChange?: (date: Date | null) => void;
};

export function DatePicker({ id, label, value, disabled, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [displayMonth, setDisplayMonth] = useState<Date>(value ?? new Date());

  useEffect(() => {
    if (value) {
      setDisplayMonth(value);
    }
  }, [value]);

  const selectedMonth = dayjs(displayMonth).month(); // 0–11
  const selectedYear = dayjs(displayMonth).year();

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="mb-2 px-1">
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="w-full justify-between font-normal"
            disabled={disabled}
          >
            {value ? dayjs(value).format("D MMMM YYYY") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <div className="flex gap-2 p-2">
            <Select
              value={selectedMonth.toString()}
              onValueChange={(v) => {
                const newDate = dayjs(displayMonth).month(Number(v)).toDate();
                setDisplayMonth(newDate);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Month</SelectLabel>
                  {months.map((mon, idx) => (
                    <SelectItem key={mon} value={idx.toString()}>
                      {mon}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={selectedYear.toString()}
              onValueChange={(v) => {
                const newDate = dayjs(displayMonth).year(Number(v)).toDate();
                setDisplayMonth(newDate);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={value ?? undefined}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            onSelect={(date) => {
              onChange?.(date ?? null);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
