"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { LanguageItem } from "./LanguageItem";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";
import { SortableItem } from "./ui/SortableItem";

import type { LanguageDraft } from "@/store/types";

export const Languages: React.FC = () => {
  const langs: LanguageDraft[] = useSectionItems("languages");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("languages");

  return (
    <div>
      <SectionTitle>Languages</SectionTitle>
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
        {!langs.length ? "Add language" : "Add one more language"}
      </Button>
    </div>
  );
};
