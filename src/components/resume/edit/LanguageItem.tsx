"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { LanguageDraft } from "@/store/types";

type Props = {
  item: LanguageDraft;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof LanguageDraft,
  ) => void;
};

enum LangLevels {
  a1 = "A1",
  a2 = "A2",
  b1 = "B1",
  b2 = "B2",
  c1 = "C1",
  c2 = "C2",
}

export const LanguageItem: React.FC<Props> = ({ item, handleUpdateItem }) => {
  const { id, language, level } = item;

  return (
    <Accordion type="single" collapsible className="border py-2">
      <AccordionItem value={id}>
        <AccordionTrigger>
          {language || "(Empty)"} {level && `- ${level}`}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between gap-8">
            <div className="w-full">
              <Label htmlFor={`link-title-${id}`} className="mb-2">
                Language
              </Label>
              <Input
                id={`lang-${id}`}
                value={language}
                placeholder="Language"
                onChange={(e) =>
                  handleUpdateItem(id, e.target.value, "language")
                }
              />
            </div>
            <div className="w-full">
              <Label className="mb-2">Level</Label>
              <Select
                value={level}
                onValueChange={(v) => handleUpdateItem(id, v, "level")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a your language level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a your language level</SelectLabel>
                    {Object.values(LangLevels).map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
