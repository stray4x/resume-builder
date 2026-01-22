import { EllipsisVertical } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

import dayjs from "@/lib/dayjs";
import { api } from "@/trpc/server";
import { clientUrls } from "@/utils/urls";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import type { Resume } from "generated/prisma";
type Props = {
  resume: Resume;
  isLast: boolean;
};

export const ResumeItem: React.FC<Props> = ({ resume }) => {
  return (
    <>
      <li
        key={resume.id}
        className="group hover:bg-accent flex items-center justify-between rounded-lg border px-4 text-sm"
      >
        <Link
          href={clientUrls.editResume(resume.id)}
          className="flex max-w-[80%] flex-col gap-0.5 py-3 sm:w-full"
        >
          <span className="truncate text-base font-medium">
            {resume.resumeName}
          </span>

          <span className="text-muted-foreground truncate text-sm">
            {resume.jobTitle || "—"} · Updated{" "}
            {dayjs(resume.updatedAt).format("DD MMMM, YYYY")}
          </span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-2">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  await api.resume.deleteResume({ resumeId: resume.id });
                  revalidatePath(clientUrls.resumes);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </>
  );
};
