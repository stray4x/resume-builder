"use client";

import { Document, Font } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import React from "react";

import { useResume } from "@/store/store";

import { DefaultTemplate } from "./templates/Default";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

Font.register({
  family: "Open Sans",
  fontWeight: 400,
  src: "/fonts/OpenSans-Regular.ttf",
});
Font.register({
  family: "Open Sans",
  fontWeight: 400,
  fontStyle: "italic",
  src: "/fonts/OpenSans-Italic.ttf",
});

Font.register({
  family: "Open Sans",
  fontWeight: 500,
  src: "/fonts/OpenSans-Medium.ttf",
});

Font.register({
  family: "Open Sans",
  fontWeight: 600,
  src: "/fonts/OpenSans-SemiBold.ttf",
});

Font.register({
  family: "Open Sans",
  fontWeight: 700,
  src: "/fonts/OpenSans-Bold.ttf",
});
Font.register({
  family: "Open Sans",
  fontWeight: 700,
  fontStyle: "italic",
  src: "/fonts/OpenSans-BoldItalic.ttf",
});

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
