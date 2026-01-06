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
import { SkillLevel } from "generated/prisma";

import type { SkillDraft } from "@/store/types";

type Props = {
  item: SkillDraft;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof SkillDraft,
  ) => void;
};

export const SkillItem: React.FC<Props> = ({ item, handleUpdateItem }) => {
  const { id, title, level } = item;

  return (
    <Accordion type="single" collapsible className="border py-2">
      <AccordionItem value={id}>
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
      </AccordionItem>
    </Accordion>
  );
};
