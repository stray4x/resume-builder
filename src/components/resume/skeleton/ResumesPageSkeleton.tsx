import React from "react";

export const ResumesPageSkeleton: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Resumes</h1>
      <ul className="mb-4 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="bg-muted mb-2 h-18 animate-pulse" />
        ))}
      </ul>
    </div>
  );
};
