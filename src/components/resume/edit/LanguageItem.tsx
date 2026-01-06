"use client";

import React from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
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
import { LanguageLevel } from "generated/prisma";

import { EditResumeAccordion } from "./EditResumeAccordion";

import type { LanguageDraft } from "@/store/types";

type Props = {
  item: LanguageDraft;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof LanguageDraft,
  ) => void;
};

export const LanguageItem: React.FC<Props> = ({
  item,
  handleUpdateItem,
  handleDeleteItem,
}) => {
  const { id, language, level } = item;

  return (
    <EditResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
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
              onChange={(e) => handleUpdateItem(id, e.target.value, "language")}
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
                  {Object.values(LanguageLevel).map((lvl) => (
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
    </EditResumeAccordion>
  );
};
