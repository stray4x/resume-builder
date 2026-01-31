import React from "react";

import { DetailsSkeleton } from "./DetailsSkeleton";
import { SettingsSkeleton } from "./SettingsSkeleton";

export const EditResumeFormSkeleton: React.FC = () => {
  return (
    <div className="h-[calc(screen-64px)] overflow-hidden px-4 py-4 lg:py-12 lg:pr-16 lg:pl-12">
      <div className="mb-8 flex flex-col gap-12">
        <SettingsSkeleton />
        <DetailsSkeleton />
      </div>
    </div>
  );
};
