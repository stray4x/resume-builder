import React from "react";

export const ResumesListSkeleton: React.FC = () => {
  return (
    <ul>
      {[...Array(3)].map((_, i) => (
        <li key={i} className="bg-muted mb-2 h-12 animate-pulse" />
      ))}
    </ul>
  );
};
