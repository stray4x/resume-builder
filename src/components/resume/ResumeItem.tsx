import Link from "next/link";
import React from "react";

import dayjs from "@/lib/dayjs";
import { clientUrls } from "@/utils/urls";

import { ResumeItemDropdown } from "./ResumeItemDropdown";

import type { Resume } from "generated/prisma";
import type { _Translator } from "next-intl";

type Props = {
  resume: Resume;
  t: _Translator;
};

export const ResumeItem: React.FC<Props> = ({ resume, t }) => {
  return (
    <li className="group bg-card hover:bg-accent flex items-center justify-between rounded-lg border px-4 text-sm">
      <Link
        href={clientUrls.editResume(resume.id)}
        className="flex max-w-[80%] flex-col gap-0.5 py-3 sm:w-full"
      >
        <span className="truncate text-base font-medium">
          {resume.resumeName}
        </span>

        <span className="text-muted-foreground truncate text-sm">
          {resume.jobTitle || "—"} · {t("updated")}{" "}
          {dayjs(resume.updatedAt).format("DD MMMM, YYYY")}
        </span>
      </Link>
      <ResumeItemDropdown resume={resume} />
    </li>
  );
};
