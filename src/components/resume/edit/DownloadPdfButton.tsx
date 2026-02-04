"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";
import { saveResumeAsPdf } from "@/utils/resume";

type Props = {
  isMobile?: boolean;
};

export const DownloadPdfButton: React.FC<Props> = ({ isMobile }) => {
  const t = useTranslations("");

  const resume = useResume((state) => state);

  const handleSave = () => {
    saveResumeAsPdf(resume, t);
  };

  return isMobile ? (
    <Button onClick={handleSave} className="flex gap-4" variant="ghost">
      <Download /> {t("buttons.downloadResume")}
    </Button>
  ) : (
    <Button onClick={handleSave}>
      {t("buttons.downloadResume")}
      <Download />
    </Button>
  );
};
