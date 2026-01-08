import { revalidatePath } from "next/cache";
import Link from "next/link";

import { DeleteResumeButton } from "@/components/resume/DeleteResumeButton";
import { Button } from "@/components/ui/button";
import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { clientUrls } from "@/utils/urls";

export default async function ResumesPage() {
  const session = await requireSession();

  const resumes = await db.resume.findMany({
    where: {
      ownerId: session.user.id,
    },
  });

  return (
    <div className="mx-auto w-full max-w-10/12 lg:max-w-8/12">
      <div className="mb-16">
        <Button>
          <Link href={clientUrls.createResume}>Create new resume</Link>
        </Button>
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
}
