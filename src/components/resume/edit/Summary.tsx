"use client";

import React from "react";

import { useResume } from "@/store/store";

import { TextEditor } from "../../ui/TextEditor";

export const Summary: React.FC = () => {
  const summary = useResume((state) => state.summary);
  const updateSummary = useResume((state) => state.setField);

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Summary</h6>
      <TextEditor
        value={summary}
        onChange={(v) => updateSummary("summary", v)}
      />
    </div>
  );
};
