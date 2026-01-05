"use client";

import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/store/store";
import React from "react";

export const Summary: React.FC = () => {
  const summary = useResume((state) => state.summary);
  const updateSummary = useResume((state) => state.setField);

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Summary</h6>
      <Textarea
        rows={10}
        value={summary}
        onChange={(e) => updateSummary("summary", e.target.value)}
      />
    </div>
  );
};
