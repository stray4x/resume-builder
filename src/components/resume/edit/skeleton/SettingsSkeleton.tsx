"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

import { SectionTitle } from "../ui/SectionTitle";

export const SettingsSkeleton: React.FC = () => {
  return (
    <div>
      <SectionTitle>Resume Settings</SectionTitle>
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <div className="mb-8">
            <Label className="mb-2">Resume Name</Label>
            <Input placeholder="Resume Name" disabled />
          </div>
          <div>
            <Label className="mb-2">Resume color</Label>
            <Select disabled>
              <SelectTrigger className="flex w-full items-center gap-2">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
        <div className="w-full">
          <Label className="mb-2">Template</Label>
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select resume template" />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    </div>
  );
};
