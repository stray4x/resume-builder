"use client";

import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useResume } from "@/store/store";
import { localStorageKeys } from "@/utils/constants/localStorage";
import { SAVE_TO_LOCAL_STORAGE_TIMEOUT } from "@/utils/constants/time";
import { debounce } from "@/utils/debounce";
import { saveResumeToLocalStorage } from "@/utils/resume";
import { clientUrls } from "@/utils/urls";

import { DownloadPdfButton } from "./edit/DownloadPdfButton";
import { SaveChangesButton } from "./edit/SaveChangesButton";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

let unsubscribe: (() => void) | null = null;

export const ResumeNavbar: React.FC = () => {
  const path = usePathname();
  const { id } = useParams();

  const [autosaveOn, setAutosaveOn] = useState<boolean>(false);

  const handleAutosaveChange = (v: boolean) => {
    localStorage.setItem(localStorageKeys.AUTOSAVE_RESUME, JSON.stringify(v));
    setAutosaveOn(v);
  };

  useEffect(() => {
    if (path === clientUrls.resumeBuilder) {
      setAutosaveOn(
        JSON.parse(
          localStorage.getItem(localStorageKeys.AUTOSAVE_RESUME) ?? "false",
        ) as boolean,
      );
    }
  }, [path]);

  useEffect(() => {
    if (path !== clientUrls.resumeBuilder) {
      return;
    }

    if (autosaveOn) {
      const debouncedSave = debounce(
        saveResumeToLocalStorage,
        SAVE_TO_LOCAL_STORAGE_TIMEOUT,
      );

      unsubscribe = useResume.subscribe(debouncedSave);
    } else if (unsubscribe) {
      unsubscribe();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [autosaveOn, path]);

  if (
    path !== clientUrls.editResume(id as string) &&
    path !== clientUrls.resumeBuilder
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <DownloadPdfButton />
      <SaveChangesButton
        disabled={path === clientUrls.resumeBuilder && autosaveOn}
      />
      {path === clientUrls.resumeBuilder && (
        <div className="flex gap-2">
          <Switch
            id="autosave-resume"
            checked={autosaveOn}
            onCheckedChange={handleAutosaveChange}
          />
          <Label htmlFor="autosave-resume" className="cursor-pointer">
            Autosave
          </Label>
        </div>
      )}
    </div>
  );
};
