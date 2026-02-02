"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { useResume } from "@/store/store";

import { TextEditor } from "../../ui/TextEditor";

export const Summary: React.FC = () => {
  const t = useTranslations();

  const summary = useResume((state) => state.summary);
  const updateSummary = useResume((state) => state.setField);

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">{t("summary")}</h6>
      <TextEditor
        value={summary}
        maxLength={2500}
        className="bg-card"
        onChange={(v) => updateSummary("summary", v)}
      />
    </div>
  );
};
