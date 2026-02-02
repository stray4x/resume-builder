"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { SkillItem } from "./SkillItem";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";
import { SortableItem } from "./ui/SortableItem";

import type { SkillDraft } from "@/store/types";

export const Skills: React.FC = () => {
  const t = useTranslations();

  const skills: SkillDraft[] = useSectionItems("skills");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("skills");

  return (
    <div>
      <SectionTitle>{t("skills")}</SectionTitle>
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
      <Button
        className="mt-4"
        size="lg"
        variant="link"
        onClick={addItem}
        disabled={skills.length >= 40}
      >
        {!skills.length ? t("buttons.addSkill") : t("buttons.addOneMoreSkill")}
      </Button>
    </div>
  );
};
