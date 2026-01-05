"use client";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";
import React from "react";
import { BackgroundDescription } from "./BackgroundDescription";
import type { WorkExperienceDraft } from "@/store/types";

export const WorkExperience: React.FC = () => {
  const workExp = useResume((state) => state.workExperience);
  const addWorkExp = useResume((state) => state.addSectionItem);
  const updWorkExp = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addWorkExp("workExperience");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof WorkExperienceDraft,
  ) => {
    updWorkExp("workExperience", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Work Experience</h6>
      <div className="flex flex-col gap-4">
        {workExp.map((item) => {
          return (
            <BackgroundDescription
              key={item.id}
              id={item.id}
              inputOne={item.jobTitle}
              inputTwo={item.employer}
              city={item.city}
              description={item.description}
              type="workExperience"
              inputLabelOne="Job Title"
              inputLabelTwo="Employer"
              updateInputOne={(v) => handleUpdateItem(item.id, v, "jobTitle")}
              updateInputTwo={(v) => handleUpdateItem(item.id, v, "employer")}
              updateCity={(v) => handleUpdateItem(item.id, v, "city")}
              updateDescription={(v) =>
                handleUpdateItem(item.id, v, "description")
              }
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!workExp.length ? "Add employment" : "Add one more employment"}
      </Button>
    </div>
  );
};
