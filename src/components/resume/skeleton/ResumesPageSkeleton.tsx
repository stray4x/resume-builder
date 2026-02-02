import React from "react";

export const ResumesPageSkeleton: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <div className="bg-muted mx-auto mb-8 h-8 w-36"></div>
      <ul className="mb-4 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="bg-muted mb-2 h-18 animate-pulse" />
        ))}
      </ul>
    </div>
  );
};
