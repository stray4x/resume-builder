"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

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
import { useResume } from "@/store/store";
import { api } from "@/trpc/react";
import { resumeColors } from "@/utils/constants/resumeColors";

import { SectionTitle } from "./ui/SectionTitle";

export const Settings: React.FC = () => {
  const t = useTranslations();

  const resumeName = useResume((state) => state.resumeName);
  const resumeTemplate = useResume((state) => state.templateId);
  const resumeColor = useResume((state) => state.themeColor);

  const updResume = useResume((state) => state.setField);

  const { data } = api.resume.getAllResumeTemplates.useQuery();

  return (
    <div>
      <SectionTitle>{t("resumeSettings")}</SectionTitle>
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <div className="mb-8">
            <Label htmlFor="resumeName" className="mb-2">
              {t("resumeName")}
            </Label>
            <Input
              id="resumeName"
              placeholder={t("resumeName")}
              value={resumeName}
              maxLength={50}
              onChange={(e) => updResume("resumeName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="resumeName" className="mb-2">
              {t("resumeColor")}
            </Label>
            <Select
              value={resumeColor}
              onValueChange={(v) => updResume("themeColor", v)}
            >
              <SelectTrigger className="flex w-full items-center gap-2">
                <SelectValue placeholder={t("selectColor")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("selectResumeColor")}</SelectLabel>
                  {Object.entries(resumeColors).map(([key, val]) => (
                    <SelectItem
                      key={val}
                      value={val}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: val }}
                      />
                      <span>{t(key)}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full">
          <Label className="mb-2" htmlFor="resume-template">
            {t("template")}
          </Label>
          <Select
            disabled={!data?.templates.length}
            value={resumeTemplate}
            onValueChange={(v) => updResume("templateId", v)}
          >
            <SelectTrigger className="w-full" id="resume-template">
              <SelectValue placeholder={t("selectResumeTemplate")}>
                <span>
                  {resumeTemplate
                    ? data?.templates.find((t) => t.id === resumeTemplate)
                        ?.displayName
                    : t("selectResumeTemplate")}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-center">
                  {t("selectResumeTemplate")}
                </SelectLabel>
                <div className="grid grid-cols-2 gap-1">
                  {data?.templates?.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="col-span-1"
                    >
                      <div>
                        <span className="block text-center">
                          {item.displayName}
                        </span>
                        <Image
                          src={item.imageUrl}
                          alt={item.displayName}
                          width={160}
                          height={100}
                        />
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
