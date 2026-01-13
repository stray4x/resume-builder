"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { clientUrls } from "@/utils/urls";

import { DownloadPdfButton } from "./DownloadPdfButton";
import { SaveChangesButton } from "./SaveChangesButton";

export const EditResumeNavbar: React.FC = () => {
  const path = usePathname();
  const { id } = useParams();

  if (!path.includes(clientUrls.editResume(id as string))) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <SaveChangesButton />
      <DownloadPdfButton />
    </div>
  );
};
