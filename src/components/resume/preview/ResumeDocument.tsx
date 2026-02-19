"use client";

import { Document, Font } from "@react-pdf/renderer";
import React from "react";

import { DefaultTemplate } from "./templates/Default";

import type { ResumeDraft } from "@/store/types";

type Props = {
  resume: ResumeDraft;
};

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

export const ResumeDocument: React.FC<Props> = ({ resume }) => {
  return (
    <Document>
      <DefaultTemplate resume={resume} />
    </Document>
  );
};
