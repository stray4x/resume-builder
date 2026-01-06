"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { LanguageItem } from "./LanguageItem";

import type { LanguageDraft } from "@/store/types";

export const Languages: React.FC = () => {
  const langs: LanguageDraft[] = useSectionItems("languages");
  const { addItem, updateItem, deleteItem } = useSectionActions("languages");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Languages</h6>
      <div className="flex flex-col gap-4">
        {langs.map((item) => {
          return (
            <LanguageItem
              key={item.id}
              item={item}
              handleUpdateItem={updateItem}
              handleDeleteItem={deleteItem}
            />
          );
        })}
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!langs.length ? "Add language" : "Add one more language"}
      </Button>
    </div>
  );
};
