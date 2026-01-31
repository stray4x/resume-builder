"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { LanguageItem } from "./LanguageItem";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";
import { SortableItem } from "./ui/SortableItem";

import type { LanguageDraft } from "@/store/types";

export const Languages: React.FC = () => {
  const t = useTranslations();

  const langs: LanguageDraft[] = useSectionItems("languages");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("languages");

  return (
    <div>
      <SectionTitle>{t("languages")}</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer moveItem={moveItem} items={langs.map((item) => item.id)}>
          {langs.map((item) => {
            return (
              <SortableItem key={item.id} id={item.id}>
                <LanguageItem
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
        disabled={langs.length >= 10}
      >
        {!langs.length
          ? t("buttons.addLanguage")
          : t("buttons.addOneMoreLanguage")}
      </Button>
    </div>
  );
};
