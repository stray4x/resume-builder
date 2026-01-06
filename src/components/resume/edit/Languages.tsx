"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { LanguageItem } from "./LanguageItem";

import type { LanguageDraft } from "@/store/types";

export const Languages: React.FC = () => {
  const langs = useResume((state) => state.languages);
  const addLang = useResume((state) => state.addSectionItem);
  const updLang = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addLang("languages");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof LanguageDraft,
  ) => {
    updLang("languages", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Languages</h6>
      <div className="flex flex-col gap-4">
        {langs.map((item) => {
          return (
            <LanguageItem
              key={item.id}
              item={item}
              handleUpdateItem={handleUpdateItem}
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!langs.length ? "Add language" : "Add one more language"}
      </Button>
    </div>
  );
};
