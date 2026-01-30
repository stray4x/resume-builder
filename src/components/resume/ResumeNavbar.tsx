"use client";

import { Menu } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useResume } from "@/store/store";
import { breakpoints } from "@/utils/constants/breakpoints";
import { localStorageKeys } from "@/utils/constants/localStorage";
import { SAVE_TO_LOCAL_STORAGE_TIMEOUT } from "@/utils/constants/time";
import { debounce } from "@/utils/debounce";
import { saveResumeToLocalStorage } from "@/utils/resume";
import { clientUrls } from "@/utils/urls";

import { DownloadPdfButton } from "./edit/DownloadPdfButton";
import { SaveChangesButton } from "./edit/SaveChangesButton";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

let unsubscribe: (() => void) | null = null;

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = "";
};

export const ResumeNavbar: React.FC = () => {
  const path = usePathname();
  const { id } = useParams();

  const isDirty = useResume((state) => state.isDirty);

  const [autosaveOn, setAutosaveOn] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

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

  useEffect(() => {
    if (!isDirty || autosaveOn) {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      return;
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, autosaveOn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoints.MD);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (
    isMobile === undefined ||
    (path !== clientUrls.editResume(id as string) &&
      path !== clientUrls.resumeBuilder)
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-fit">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DownloadPdfButton isMobile />
              </DropdownMenuItem>

              <DropdownMenuItem>
                <SaveChangesButton
                  isMobile
                  disabled={path === clientUrls.resumeBuilder && autosaveOn}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <DownloadPdfButton />
          <SaveChangesButton
            disabled={path === clientUrls.resumeBuilder && autosaveOn}
          />
        </>
      )}

      {path === clientUrls.resumeBuilder && (
        <div className="flex items-center gap-2">
          <Switch
            id="autosave-resume"
            checked={autosaveOn}
            size={isMobile ? "sm" : "default"}
            onCheckedChange={handleAutosaveChange}
          />
          <Label
            htmlFor="autosave-resume"
            className="cursor-pointer text-xs sm:text-sm"
          >
            Autosave
          </Label>
        </div>
      )}
    </div>
  );
};
