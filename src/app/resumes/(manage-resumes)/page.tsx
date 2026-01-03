import { DeleteResumeButton } from "@/components/resume/DeleteResumeButton";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { clientUrls } from "@/utils/urls";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function ResumesPage() {
  const { resumes } = await api.resume.getAllUserResumes();

  return (
    <div>
      <div className="mb-16">
        <Button>
          <Link href={clientUrls.createResume}>Create new resume</Link>
        </Button>
      </div>
      <ul>
        {resumes.map((resume, idx) => (
          <li
            key={resume.id}
            className="bg-card flex items-center justify-between gap-4 p-2"
          >
            <div>
              <span>{idx + 1}.</span>{" "}
              <span>
                {resume.resumeName} | {resume.jobTitle}
              </span>
            </div>
            <div className="flex gap-4">
              <Button>
                <Link href={clientUrls.resumeId(resume.id)}>edit</Link>
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
