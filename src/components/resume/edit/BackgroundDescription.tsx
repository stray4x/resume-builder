"use client";

import React from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TextEditor } from "@/components/ui/TextEditor";

import { ResumeAccordion } from "./ui/EditResumeAccordion";
import { SortableItem } from "./ui/SortableItem";

interface IBackgroundDescProps {
  id: string;
  inputOne: string;
  inputTwo: string;
  inputLabelOne: string;
  inputLabelTwo: string;
  description?: string;
  city?: string;
  startDate: Date | null;
  endDate: Date | null;
  endDateIsCurrent: boolean;
  type: "workExperience" | "education" | "course";
  handleDeleteItem: (id: string) => void;
  updateDescription?: (value: string) => void;
  updateStartDate: (value: Date | null) => void;
  updateEndDate: (value: Date | null) => void;
  updateEndDateIsCurrent: (value: boolean) => void;
  updateCity?: (value: string) => void;
  updateInputOne: (value: string) => void;
  updateInputTwo: (value: string) => void;
}

export const getItemTitle = (inpOne: string, inpTwo: string) => {
  if (inpOne && inpTwo) {
    return `${inpOne} at ${inpTwo}`;
  }
  return inpOne || inpTwo || "(Empty)";
};

export const BackgroundDescription: React.FC<IBackgroundDescProps> = ({
  id,
  inputOne,
  inputTwo,
  inputLabelOne,
  inputLabelTwo,
  type,
  city,
  description,
  startDate,
  endDate,
  endDateIsCurrent,
  handleDeleteItem,
  updateDescription,
  updateStartDate,
  updateEndDate,
  updateCity,
  updateInputOne,
  updateInputTwo,
  updateEndDateIsCurrent,
}) => {
  return (
    <SortableItem id={id}>
      <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
        <AccordionTrigger className="text-xs sm:text-sm">
          {type === "education"
            ? getItemTitle(inputTwo, inputOne)
            : getItemTitle(inputOne, inputTwo)}
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <div className="xs:grid-cols-2 xs:gap-8 mt-1 grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor={`inp-one-${id}`} className="mb-2">
                  {inputLabelOne}
                </Label>
                <Input
                  id={`inp-one-${id}`}
                  value={inputOne}
                  placeholder={inputLabelOne}
                  maxLength={60}
                  onChange={(e) => updateInputOne(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`inp-two-${id}`} className="mb-2">
                  {inputLabelTwo}
                </Label>
                <Input
                  id={`inp-two-${id}`}
                  value={inputTwo}
                  placeholder={inputLabelTwo}
                  maxLength={60}
                  onChange={(e) => updateInputTwo(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                {type !== "course" && (
                  <div>
                    <Label htmlFor={`city-${id}`} className="mb-2">
                      City
                    </Label>
                    <Input
                      id={`city-${id}`}
                      value={city ?? ""}
                      placeholder="City"
                      maxLength={100}
                      onChange={(e) => updateCity?.(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <DatePicker
                id={`start-date-${id}`}
                label="Start Date"
                value={startDate}
                onChange={updateStartDate}
              />
              <DatePicker
                id={`end-date-${id}`}
                label="End Date"
                value={endDate}
                disabled={endDateIsCurrent}
                onChange={updateEndDate}
              />
              <div className="flex gap-2">
                <Switch
                  id={`end-date-current-${id}`}
                  checked={endDateIsCurrent}
                  onCheckedChange={updateEndDateIsCurrent}
                />
                <Label htmlFor={`end-date-current-${id}`}>
                  {type === "workExperience" && "Currently work here"}
                  {type === "education" && "Currently study here"}
                  {type === "course" && "Currently taking this course"}
                </Label>
              </div>
            </div>
          </div>

          {type !== "course" && (
            <>
              <Label className="mt-8 mb-2">Description</Label>
              <TextEditor
                value={description ?? "{}"}
                maxLength={3000}
                onChange={(v) => updateDescription?.(v)}
              />
            </>
          )}
        </AccordionContent>
      </ResumeAccordion>
    </SortableItem>
  );
};
