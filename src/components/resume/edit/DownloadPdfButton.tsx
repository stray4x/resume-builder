"use client";

import { pdf, Document } from "@react-pdf/renderer";
import saveAs from "file-saver";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { DefaultTemplate } from "../preview/templates/Default";

export const DownloadPdfButton: React.FC = () => {
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

  return <Button onClick={saveFile}>Download Resume</Button>;
};
