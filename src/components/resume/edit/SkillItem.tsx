"use client";

import { useTranslations } from "next-intl";
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

  const t = useTranslations();

  return (
    <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>
        {title || `(${t("empty")})`} {level && `- ${t(level)}`}
      </AccordionTrigger>
      <AccordionContent className="h-fit">
        <div className="xs:flex-row xs:gap-8 flex flex-col justify-between gap-4">
          <div className="w-full">
            <Label htmlFor={`skill-${id}`} className="mb-2">
              {t("skill")}
            </Label>
            <Input
              id={`skill-${id}`}
              value={title}
              placeholder={t("skill")}
              maxLength={60}
              onChange={(e) => handleUpdateItem(id, e.target.value, "title")}
            />
          </div>
          <div className="w-full">
            <Label className="mb-2">{t("level")}</Label>
            <Select
              value={level}
              onValueChange={(v) => handleUpdateItem(id, v, "level")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectSkillLevel")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("selectSkillLevel")}</SelectLabel>
                  {Object.keys(SkillLevel).map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {t(lvl)}
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
