"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { SkillItem } from "./SkillItem";

import type { SkillDraft } from "@/store/types";

export const Skills: React.FC = () => {
  const skills: SkillDraft[] = useSectionItems("skills");
  const { addItem, updateItem, deleteItem } = useSectionActions("skills");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Skills</h6>
      <div className="flex flex-col gap-4">
        {skills.map((item) => {
          return (
            <SkillItem
              key={item.id}
              item={item}
              handleUpdateItem={updateItem}
              handleDeleteItem={deleteItem}
            />
          );
        })}
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!skills.length ? "Add skill" : "Add one more skill"}
      </Button>
    </div>
  );
};
