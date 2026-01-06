"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { BackgroundDescription } from "./BackgroundDescription";

import type { EducationDraft } from "@/store/types";

export const Education: React.FC = () => {
  const educ = useResume((state) => state.education);
  const addEduc = useResume((state) => state.addSectionItem);
  const updEduc = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addEduc("education");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof EducationDraft,
  ) => {
    updEduc("education", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Education</h6>
      <div className="flex flex-col gap-4">
        {educ.map((item) => {
          return (
            <BackgroundDescription
              key={item.id}
              id={item.id}
              inputOne={item.school}
              inputTwo={item.degree}
              city={item.city}
              description={item.description}
              type="education"
              inputLabelOne="School"
              inputLabelTwo="Degree"
              updateInputOne={(v) => handleUpdateItem(item.id, v, "school")}
              updateInputTwo={(v) => handleUpdateItem(item.id, v, "degree")}
              updateCity={(v) => handleUpdateItem(item.id, v, "city")}
              updateDescription={(v) =>
                handleUpdateItem(item.id, v, "description")
              }
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!educ.length ? "Add education" : "Add one more education"}
      </Button>
    </div>
  );
};
