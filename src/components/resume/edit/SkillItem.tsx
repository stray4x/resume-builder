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
import { SkillLevel } from "generated/prisma";

import { ResumeAccordion } from "./ui/EditResumeAccordion";

import type { SkillDraft } from "@/store/types";

type Props = {
  item: SkillDraft;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof SkillDraft,
  ) => void;
};

export const SkillItem: React.FC<Props> = ({
  item,
  handleUpdateItem,
  handleDeleteItem,
}) => {
  const { id, title, level } = item;

  return (
    <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>
        {title || "(Empty)"} {level && `- ${level}`}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex justify-between gap-8">
          <div className="w-full">
            <Label htmlFor={`skill-${id}`} className="mb-2">
              Skill
            </Label>
            <Input
              id={`skill-${id}`}
              value={title}
              placeholder="Skill"
              onChange={(e) => handleUpdateItem(id, e.target.value, "title")}
            />
          </div>
          <div className="w-full">
            <Label className="mb-2">Level</Label>
            <Select
              value={level}
              onValueChange={(v) => handleUpdateItem(id, v, "level")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a your skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a your skill level</SelectLabel>
                  {Object.keys(SkillLevel).map((lvl) => (
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
    </ResumeAccordion>
  );
};
