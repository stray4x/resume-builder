"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { clientUrls } from "@/utils/urls";

import { DownloadPdfButton } from "./edit/DownloadPdfButton";
import { SaveChangesButton } from "./edit/SaveChangesButton";
import { Button } from "../ui/button";

export const ResumeNavbar: React.FC = () => {
  const path = usePathname();
  const { id } = useParams();

  return (
    <>
      {path.includes(clientUrls.resumes) && (
        <Button variant="link" asChild>
          <Link href={clientUrls.resumes}>my resumes</Link>
        </Button>
      )}
      {path.includes(clientUrls.editResume(id as string)) && (
        <div className="flex gap-4">
          <SaveChangesButton />
          <DownloadPdfButton />
        </div>
      )}
    </>
  );
};
