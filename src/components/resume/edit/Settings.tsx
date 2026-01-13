"use client";

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
  const resumeName = useResume((state) => state.resumeName);
  const resumeTemplate = useResume((state) => state.templateId);
  const resumeColor = useResume((state) => state.themeColor);

  const updResume = useResume((state) => state.setField);

  const { data } = api.resume.getAllResumeTemplates.useQuery();

  return (
    <div>
      <SectionTitle>Resume Settings</SectionTitle>
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <div className="mb-8">
            <Label htmlFor="resumeName" className="mb-2">
              Resume Name
            </Label>
            <Input
              id="resumeName"
              placeholder="Resume Name"
              value={resumeName}
              onChange={(e) => updResume("resumeName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="resumeName" className="mb-2">
              Resume color
            </Label>
            <Select
              value={resumeColor}
              onValueChange={(v) => updResume("themeColor", v)}
            >
              <SelectTrigger className="flex w-full items-center gap-2">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select resume color</SelectLabel>
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
                      <span>{key}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full">
          <Label className="mb-2">Template</Label>
          <Select
            disabled={!data?.templates.length}
            value={resumeTemplate}
            onValueChange={(v) => updResume("templateId", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select resume template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select resume template</SelectLabel>
                {data?.templates?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.displayName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
