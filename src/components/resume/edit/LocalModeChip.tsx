"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clientUrls } from "@/utils/urls";

export const LocalModeChip: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="fixed bottom-4 left-4 rounded-xl bg-amber-400 px-4 py-1.5 text-sm text-black dark:bg-amber-300">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{t("localMode")}</span>
        </TooltipTrigger>
        <TooltipContent align="start">
          <div className="max-w-70 text-sm">
            <p className="mb-1">{t("allChangesSavedLocally")}</p>
            <p>
              <Link
                href={clientUrls.authSignIn}
                target="_blank"
                className="dark:text-primary dark:border-primary mt-1 font-semibold hover:border-b"
              >
                {t("buttons.signIn")}
              </Link>{" "}
              {t("toCreateMultipleResumesAndAccessThemAnywhere")}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
