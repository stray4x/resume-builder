import React from "react";

import { InputSkeleton } from "@/components/ui/skeleton";

export const DetailsSkeleton: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="bg-muted mb-6 h-6 w-32 animate-pulse rounded" />

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="bg-muted mb-2 h-4 w-28 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-16 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-20 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-24 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-16 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-20 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-24 animate-pulse rounded" />
          <InputSkeleton />
        </div>

        <div>
          <div className="bg-muted mb-2 h-4 w-16 animate-pulse rounded" />
          <InputSkeleton />
        </div>
      </div>
    </div>
  );
};
