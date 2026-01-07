"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { BackgroundDescription } from "./BackgroundDescription";
import { DndContainer } from "./ui/DndContainer";
import { SortableItem } from "./ui/SortableItem";

import type { WorkExperienceDraft } from "@/store/types";

export const WorkExperience: React.FC = () => {
  const workExp: WorkExperienceDraft[] = useSectionItems("workExperience");

  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("workExperience");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Work Experience</h6>
      <div className="flex flex-col gap-4">
        <DndContainer
          moveItem={moveItem}
          items={workExp.map((item) => item.id)}
        >
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
                updateInputOne={(v) => updateItem(item.id, v, "jobTitle")}
                updateInputTwo={(v) => updateItem(item.id, v, "employer")}
                updateCity={(v) => updateItem(item.id, v, "city")}
                updateDescription={(v) => updateItem(item.id, v, "description")}
                handleDeleteItem={deleteItem}
              />
            );
          })}
        </DndContainer>
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!workExp.length ? "Add employment" : "Add one more employment"}
      </Button>
    </div>
  );
};
