"use client";

import React from "react";

import { TextEditor } from "@/components/ui/TextEditor";

export const SummarySkeleton: React.FC = () => {
  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Summary</h6>
      <TextEditor />
    </div>
  );
};
