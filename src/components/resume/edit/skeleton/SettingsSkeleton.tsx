import React from "react";

import { InputSkeleton } from "@/components/ui/skeleton";

export const SettingsSkeleton: React.FC = () => {
  return (
    <div>
      <div className="bg-muted mb-6 h-6 w-40 animate-pulse rounded" />

      <div className="flex justify-between gap-8">
        <div className="w-full">
          <div className="mb-8">
            <div className="bg-muted mb-2 h-4 w-28 animate-pulse rounded" />
            <InputSkeleton />
          </div>

          <div>
            <div className="bg-muted mb-2 h-4 w-24 animate-pulse rounded" />
            <InputSkeleton />
          </div>
        </div>

        <div className="w-full">
          <div className="bg-muted mb-2 h-4 w-20 animate-pulse rounded" />
          <InputSkeleton />
        </div>
      </div>
    </div>
  );
};
