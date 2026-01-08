"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/store/store";

import { SectionTitle } from "./ui/SectionTitle";

export const Settings: React.FC = () => {
  const resumeName = useResume((state) => state.resumeName);
  const setResumeName = useResume((state) => state.setField);

  return (
    <div>
      <SectionTitle>Resume Settings</SectionTitle>
      <div>
        <Label htmlFor="resumeName" className="mb-2">
          Resume Name
        </Label>
        <Input
          id="resumeName"
          placeholder="Resume Name"
          value={resumeName}
          onChange={(e) => setResumeName("resumeName", e.target.value)}
        />
      </div>
      {/* todo: add template */}
      {/* todo: add color */}
    </div>
  );
};
