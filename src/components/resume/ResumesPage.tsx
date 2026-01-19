import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { clientUrls } from "@/utils/urls";

import { DeleteResumeButton } from "./DeleteResumeButton";
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
    <div className="mx-auto w-full max-w-10/12 lg:max-w-8/12">
      <div className="mb-16">
        {resumes.length < 10 ? (
          <Button>
            <Link href={clientUrls.createResume}>Create new resume</Link>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button disabled>Create new resume</Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cannot have more than {10} resumes</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <ul>
        {resumes.map((resume, idx) => (
          <li
            key={resume.id}
            className="bg-card mb-2 flex items-center justify-between gap-4 p-2"
          >
            <div>
              <span>{idx + 1}.</span>{" "}
              <span>
                {resume.resumeName} | {resume.jobTitle}
              </span>
            </div>
            <div className="flex gap-4">
              <Button>
                <Link href={clientUrls.editResume(resume.id)}>edit</Link>
              </Button>

              <form>
                <DeleteResumeButton
                  formAction={async () => {
                    "use server";
                    await api.resume.deleteResume({ resumeId: resume.id });

                    revalidatePath(clientUrls.resumes);
                  }}
                />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
