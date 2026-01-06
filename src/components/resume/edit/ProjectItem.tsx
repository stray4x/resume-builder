"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ProjectDraft } from "@/store/types";
// import moment from "moment";

type Props = {
  id: string;
  title: string;
  url: string;
  repoUrl: string;
  description?: string;
  //   handleDeleteItem: () => void;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof ProjectDraft,
  ) => void;
  updateDescription: (value: string) => void;
  //   updateDescriptionDelta?: (value: string) => void;
  //   updateStartEndDate: (value: string) => void;
};

// const convertDateString = (date: string | undefined) => {
//   return date && moment(date).isValid()
//     ? moment(date, "MMM, YYYY").toDate()
//     : null;
// };

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

export const ProjectItem: React.FC<Props> = ({
  id,
  title,
  url,
  repoUrl,
  description,
  //   handleDeleteItem,
  handleUpdateItem,
  updateDescription,
  //   updateStartEndDate,
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
    <Accordion type="single" collapsible className="border py-2">
      <AccordionItem value={id}>
        <AccordionTrigger>{title || "(Empty)"}</AccordionTrigger>
        <AccordionContent>
          <div className="mt-1 mb-8 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor={`proj-title-${id}`} className="mb-2">
                  Project Name
                </Label>
                <Input
                  id={`proj-title-${id}`}
                  value={title}
                  placeholder="Project Name"
                  onChange={(e) =>
                    handleUpdateItem(id, e.target.value, "title")
                  }
                />
              </div>
              <div>
                <Label htmlFor={`proj-repo-${id}`} className="mb-2">
                  Repository Link
                </Label>
                <Input
                  id={`proj-repo-${id}`}
                  value={repoUrl}
                  placeholder="Repository Link"
                  onChange={(e) =>
                    handleUpdateItem(id, e.target.value, "repoUrl")
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor={`proj-url-${id}`} className="mb-2">
                  Project Link
                </Label>
                <Input
                  id={`proj-url-${id}`}
                  value={url}
                  placeholder="Project Link"
                  onChange={(e) => handleUpdateItem(id, e.target.value, "url")}
                />
              </div>
            </div>
          </div>

          <Label htmlFor={`desc-${id}`} className="mb-2">
            Description
          </Label>
          <Textarea
            id={`desc-${id}`}
            value={description ?? ""}
            placeholder="Description"
            onChange={(e) => updateDescription(e.target.value)}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
