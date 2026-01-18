import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { clientUrls } from "@/utils/urls";

import { DeleteResumeButton } from "./DeleteResumeButton";
import { Button } from "../ui/button";

export const ResumesList: React.FC = async () => {
  const session = await requireSession();

  const resumes = await db.resume.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
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
  );
};
