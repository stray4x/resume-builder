import Link from "next/link";
import React from "react";

import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { clientUrls } from "@/utils/urls";

import { ResumeItem } from "./ResumeItem";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const ResumesPage: React.FC = async () => {
  const session = await requireSession();

  const resumes = await db.resume.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Resumes</h1>
      <ul className="mb-4 flex flex-col gap-4">
        {resumes.map((resume, idx, arr) => (
          <ResumeItem
            isLast={idx === arr.length - 1}
            key={resume.id}
            resume={resume}
          />
        ))}
      </ul>

      <div>
        {resumes.length < 10 ? (
          <Button asChild>
            <Link
              href={clientUrls.createResume}
              className="block w-full px-4 py-8"
            >
              Create new resume
            </Link>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button disabled className="w-full px-4 py-8">
                  Create new resume
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cannot have more than {10} resumes</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
