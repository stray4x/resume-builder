import React from "react";

export const InputSkeleton: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div className="bg-muted h-9 w-full animate-pulse rounded-md" {...props} />
  );
};
