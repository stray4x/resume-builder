"use client";

import React from "react";

import { DetailsSkeleton } from "./DetailsSkeleton";
import { SettingsSkeleton } from "./SettingsSkeleton";
import { SummarySkeleton } from "./SummarySkeleton";

export const EditResumeFormSkeleton: React.FC = () => {
  return (
    <div className="mb-8 flex flex-col gap-12">
      <SettingsSkeleton />
      <DetailsSkeleton />
      <SummarySkeleton />
    </div>
  );
};
