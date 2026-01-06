"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { EditResumeAccordion } from "./EditResumeAccordion";
// import moment from "moment";

interface IBackgroundDescProps {
  id: string;
  inputOne: string;
  inputTwo: string;
  inputLabelOne: string;
  inputLabelTwo: string;
  description?: string;
  city?: string;
  type: "workExperience" | "education" | "course";
  handleDeleteItem: (id: string) => void;
  updateDescription?: (value: string) => void;
  //   updateDescriptionDelta?: (value: string) => void;
  //   updateStartEndDate: (value: string) => void;
  updateCity?: (value: string) => void;
  updateInputOne: (value: string) => void;
  updateInputTwo: (value: string) => void;
}

// const convertDateString = (date: string | undefined) => {
//   return date && moment(date).isValid()
//     ? moment(date, "MMM, YYYY").toDate()
//     : null;
// };

const getItemTitle = (inpOne: string, inpTwo: string) => {
  if (inpOne && inpTwo) {
    return `${inpOne} at ${inpTwo}`;
  }
  return inpOne || inpTwo || "(Empty)";
};

// const getValueFromFormattedDate = (
//   startEndDate: string,
// ): [Date | null, Date | null, boolean] => {
//   const [formattedStart, formattedEnd] = startEndDate.split(" - ");
//   const toPresent = !!(
//     formattedStart?.includes("Present") || formattedEnd?.includes("Present")
//   );
//   const startDate = convertDateString(formattedStart);
//   const endDate = convertDateString(formattedEnd);
//   return [startDate, endDate, toPresent];
// };

// const getSummaryDate = (
//   startDate: Date | null,
//   endDate: Date | null,
//   toPresent: boolean,
// ) => {
//   const formattedStartDate = startDate
//     ? moment(startDate).format("MMM, YYYY")
//     : "";
//   const formattedEndDate = endDate ? moment(endDate).format("MMM, YYYY") : "";
//   if (startDate && (endDate || toPresent)) {
//     return `${formattedStartDate} - ${toPresent ? "Present" : formattedEndDate}`;
//   }
//   if (startDate) return formattedStartDate;
//   return formattedEndDate;
// };

export const BackgroundDescription: React.FC<IBackgroundDescProps> = ({
  id,
  inputOne,
  inputTwo,
  inputLabelOne,
  inputLabelTwo,
  type,
  city,
  description,
  handleDeleteItem,
  updateDescription,
  //   updateStartEndDate,
  updateCity,
  updateInputOne,
  updateInputTwo,
}) => {
  const userModifiedDateRef = useRef(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [toPresent, setToPresent] = useState(false);

  //   useEffect(() => {
  //     if (startEndDate) {
  //       const [start, end, present] = getValueFromFormattedDate(startEndDate);
  //       setStartDate(start);
  //       setEndDate(end);
  //       setToPresent(present);
  //     }
  //   }, [startEndDate]);

  //   const formattedDate = useMemo(
  //     () => getSummaryDate(startDate, endDate, toPresent),
  //     [startDate, endDate, toPresent],
  //   );

  //   useEffect(() => {
  //     if (userModifiedDateRef.current) {
  //       updateStartEndDate(formattedDate);
  //       userModifiedDateRef.current = false;
  //     }
  //   }, [formattedDate]);

  return (
    <EditResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>{getItemTitle(inputOne, inputTwo)}</AccordionTrigger>
      <AccordionContent>
        <div className="mt-1 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor={`inp-one-${id}`} className="mb-2">
                {inputLabelOne}
              </Label>
              <Input
                id={`inp-one-${id}`}
                value={inputOne}
                placeholder={inputLabelOne}
                onChange={(e) => updateInputOne(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`date-${id}`} className="mb-2">
                Date
              </Label>
              <Input id={`date-${id}`} placeholder="Date" type="date" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor={`inp-two-${id}`} className="mb-2">
                {inputLabelTwo}
              </Label>
              <Input
                id={`inp-two-${id}`}
                value={inputTwo}
                placeholder={inputLabelTwo}
                onChange={(e) => updateInputTwo(e.target.value)}
              />
            </div>

            {type !== "course" && (
              <div>
                <Label htmlFor={`city-${id}`} className="mb-2">
                  City
                </Label>
                <Input
                  id={`city-${id}`}
                  value={city ?? ""}
                  placeholder="City"
                  onChange={(e) => updateCity?.(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {type !== "course" && (
          <>
            <Label htmlFor={`desc-${id}`} className="mt-8 mb-2">
              Description
            </Label>
            <Textarea
              id={`desc-${id}`}
              value={description ?? ""}
              placeholder="Description"
              onChange={(e) => updateDescription?.(e.target.value)}
            />
          </>
        )}
      </AccordionContent>
    </EditResumeAccordion>
  );
};
