"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { SkillItem } from "./SkillItem";

import type { SkillDraft } from "@/store/types";

export const Skills: React.FC = () => {
  const skills = useResume((state) => state.skills);
  const addSkill = useResume((state) => state.addSectionItem);
  const updSkill = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addSkill("skills");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof SkillDraft,
  ) => {
    updSkill("skills", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Skills</h6>
      <div className="flex flex-col gap-4">
        {skills.map((item) => {
          return (
            <SkillItem
              key={item.id}
              item={item}
              handleUpdateItem={handleUpdateItem}
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!skills.length ? "Add skill" : "Add one more skill"}
      </Button>
    </div>
  );
};
