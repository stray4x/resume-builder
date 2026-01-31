"use client";

import { pdf, Document } from "@react-pdf/renderer";
import saveAs from "file-saver";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { DefaultTemplate } from "../preview/templates/Default";

type Props = {
  isMobile?: boolean;
};

export const DownloadPdfButton: React.FC<Props> = ({ isMobile }) => {
  const t = useTranslations("");

  const resume = useResume((state) => state);

  const saveFile = () => {
    pdf(
      <Document title={resume.resumeName}>
        <DefaultTemplate resume={resume} t={t} />
      </Document>,
    )
      .toBlob()
      .then((blob) => {
        saveAs(blob, `${resume.resumeName}.pdf`);
      })
      .catch((_) => {
        toast.error(t("toasts.sumTingWong"));
      });
  };

  return isMobile ? (
    <Button onClick={saveFile} className="flex gap-4" variant="ghost">
      <Download /> {t("buttons.downloadResume")}
    </Button>
  ) : (
    <Button onClick={saveFile}>
      {t("buttons.downloadResume")}
      <Download />
    </Button>
  );
};
