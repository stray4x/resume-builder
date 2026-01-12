"use client";

import { Document } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";

import { useResume } from "@/store/store";

import { DefaultTemplate } from "./templates/DefaultTemplate";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export const ResumePreview: React.FC = () => {
  const state = useResume((state) => state);

  return (
    <div>
      <PDFViewer className="h-[calc(100vh-64px)] w-full">
        <Document>
          <DefaultTemplate resume={state} />
        </Document>
      </PDFViewer>
    </div>
  );
};
