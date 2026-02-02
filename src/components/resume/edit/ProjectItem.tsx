"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextEditor } from "@/components/ui/TextEditor";

import { ResumeAccordion } from "./ui/EditResumeAccordion";

import type { ProjectDraft } from "@/store/types";

type Props = {
  id: string;
  title: string;
  url: string;
  repoUrl: string;
  description?: string;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (
    id: string,
    value: string,
    field: keyof ProjectDraft,
  ) => void;
  updateDescription: (value: string) => void;
};

export const ProjectItem: React.FC<Props> = ({
  id,
  title,
  url,
  repoUrl,
  description,
  handleDeleteItem,
  handleUpdateItem,
  updateDescription,
}) => {
  const t = useTranslations();

  return (
    <ResumeAccordion id={id} handleDeleteItem={handleDeleteItem}>
      <AccordionTrigger>{title || `(${t("empty")})`}</AccordionTrigger>
      <AccordionContent className="h-fit">
        <div className="xs:grid-cols-2 xs:gap-8 mt-1 mb-8 grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor={`proj-title-${id}`} className="mb-2">
                {t("projectName")}
              </Label>
              <Input
                id={`proj-title-${id}`}
                value={title}
                placeholder={t("projectName")}
                maxLength={60}
                onChange={(e) => handleUpdateItem(id, e.target.value, "title")}
              />
            </div>
            <div>
              <Label htmlFor={`proj-repo-${id}`} className="mb-2">
                {t("repositoryLink")}
              </Label>
              <Input
                id={`proj-repo-${id}`}
                value={repoUrl}
                placeholder={t("repositoryLink")}
                maxLength={100}
                onChange={(e) =>
                  handleUpdateItem(id, e.target.value, "repoUrl")
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor={`proj-url-${id}`} className="mb-2">
                {t("projectLink")}
              </Label>
              <Input
                id={`proj-url-${id}`}
                value={url}
                placeholder={t("projectLink")}
                maxLength={100}
                onChange={(e) => handleUpdateItem(id, e.target.value, "url")}
              />
            </div>
          </div>
        </div>

        <Label className="mb-2">{t("description")}</Label>
        <TextEditor
          value={description ?? "{}"}
          maxLength={3000}
          onChange={(v) => updateDescription(v)}
        />
      </AccordionContent>
    </ResumeAccordion>
  );
};
