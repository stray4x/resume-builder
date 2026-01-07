"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { SkillItem } from "./SkillItem";
import { DndContainer } from "./ui/DndContainer";
import { SortableItem } from "./ui/SortableItem";

import type { SkillDraft } from "@/store/types";

export const Skills: React.FC = () => {
  const skills: SkillDraft[] = useSectionItems("skills");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("skills");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Skills</h6>
      <div className="flex flex-col gap-4">
        <DndContainer moveItem={moveItem} items={skills.map((item) => item.id)}>
          {skills.map((item) => {
            return (
              <SortableItem key={item.id} id={item.id}>
                <SkillItem
                  item={item}
                  handleUpdateItem={updateItem}
                  handleDeleteItem={deleteItem}
                />
              </SortableItem>
            );
          })}
        </DndContainer>
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!skills.length ? "Add skill" : "Add one more skill"}
      </Button>
    </div>
  );
};
