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
import { LanguageLevel } from "generated/prisma";

import { ResumeAccordion } from "./ui/EditResumeAccordion";

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

  const t = useTranslations();

  return (
    <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>
        {language || `(${t("empty")})`} {level && `- ${level}`}
      </AccordionTrigger>
      <AccordionContent className="h-fit">
        <div className="xs:flex-row xs:gap-8 flex flex-col justify-between gap-4">
          <div className="w-full">
            <Label htmlFor={`link-title-${id}`} className="mb-2">
              {t("language")}
            </Label>
            <Input
              id={`lang-${id}`}
              value={language}
              placeholder={t("language")}
              maxLength={60}
              onChange={(e) => handleUpdateItem(id, e.target.value, "language")}
            />
          </div>
          <div className="w-full">
            <Label className="mb-2">{t("level")}</Label>
            <Select
              value={level}
              onValueChange={(v) => handleUpdateItem(id, v, "level")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectLanguageLevel")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("selectLanguageLevel")}</SelectLabel>
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
    </ResumeAccordion>
  );
};
