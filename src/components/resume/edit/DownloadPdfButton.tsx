"use client";

import { pdf, Document } from "@react-pdf/renderer";
import saveAs from "file-saver";
import { Download } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { DefaultTemplate } from "../preview/templates/Default";

type Props = {
  isMobile?: boolean;
};

export const DownloadPdfButton: React.FC<Props> = ({ isMobile }) => {
  const resume = useResume((state) => state);

  const saveFile = () => {
    pdf(
      <Document title={resume.resumeName}>
        <DefaultTemplate resume={resume} />
      </Document>,
    )
      .toBlob()
      .then((blob) => {
        saveAs(blob, `${resume.resumeName}.pdf`);
      })
      .catch((_) => {
        toast.error("Something went wrong");
      });
  };

  return isMobile ? (
    <Button onClick={saveFile} className="flex gap-4" variant="ghost">
      <Download /> Download Resume
    </Button>
  ) : (
    <Button onClick={saveFile}>
      Download Resume
      <Download />
    </Button>
  );
};
