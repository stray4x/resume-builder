"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { BackgroundDescription } from "./BackgroundDescription";
import { DndContainer } from "./ui/DndContainer";

import type { EducationDraft } from "@/store/types";

export const Education: React.FC = () => {
  const educ: EducationDraft[] = useSectionItems("education");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("education");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Education</h6>
      <div className="flex flex-col gap-4">
        <DndContainer moveItem={moveItem} items={educ.map((item) => item.id)}>
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
                handleDeleteItem={deleteItem}
                updateInputOne={(v) => updateItem(item.id, v, "school")}
                updateInputTwo={(v) => updateItem(item.id, v, "degree")}
                updateCity={(v) => updateItem(item.id, v, "city")}
                updateDescription={(v) => updateItem(item.id, v, "description")}
              />
            );
          })}
        </DndContainer>
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!educ.length ? "Add education" : "Add one more education"}
      </Button>
    </div>
  );
};
