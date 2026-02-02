"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ResumeAccordion } from "./ui/EditResumeAccordion";

import type { LinkDraft } from "@/store/types";

type Props = {
  item: LinkDraft;
  handleUpdateItem: (id: string, value: string, field: keyof LinkDraft) => void;
  handleDeleteItem: (id: string) => void;
};

export const LinkItem: React.FC<Props> = ({
  item,
  handleUpdateItem,
  handleDeleteItem,
}) => {
  const { id, url, title } = item;
  const t = useTranslations();

  return (
    <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>{title || `(${t("empty")})`}</AccordionTrigger>
      <AccordionContent className="h-fit">
        <div className="xs:flex-row xs:gap-8 flex flex-col justify-between gap-4">
          <div className="w-full">
            <Label htmlFor={`link-title-${id}`} className="mb-2">
              {t("label")}
            </Label>
            <Input
              id={`link-title-${id}`}
              value={title}
              placeholder={t("label")}
              maxLength={100}
              onChange={(e) => handleUpdateItem(id, e.target.value, "title")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor={`link-url-${id}`} className="mb-2">
              {t("link")}
            </Label>
            <Input
              id={`link-url-${id}`}
              value={url}
              type="url"
              placeholder={t("link")}
              maxLength={100}
              onChange={(e) => handleUpdateItem(id, e.target.value, "url")}
            />
          </div>
        </div>
      </AccordionContent>
    </ResumeAccordion>
  );
};
