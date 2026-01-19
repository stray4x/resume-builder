import React from "react";

import { Button } from "@/components/ui/button";

export const ResumesPageSkeleton: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-10/12 lg:max-w-8/12">
      <div className="mb-16">
        <Button>Create new resume</Button>
      </div>
      <ul>
        {[...Array(3)].map((_, i) => (
          <li key={i} className="bg-muted mb-2 h-12 animate-pulse" />
        ))}
      </ul>
    </div>
  );
};
