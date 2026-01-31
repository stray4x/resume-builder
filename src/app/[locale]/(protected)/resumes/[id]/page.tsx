import { EditResumeForm } from "@/components/resume/edit/EditResumeForm";
import { ResumePreview } from "@/components/resume/preview/ResumePreview";
import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";

export default async function EditResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireSession();
  const { id: resumeId } = await params;

  const resume = await db.resume.findFirst({
    where: { id: resumeId, ownerId: user.id },
    include: {
      workExperience: { orderBy: { sortOrder: "asc" } },
      projects: { orderBy: { sortOrder: "asc" } },
      education: { orderBy: { sortOrder: "asc" } },
      skills: { orderBy: { sortOrder: "asc" } },
      links: { orderBy: { sortOrder: "asc" } },
      languages: { orderBy: { sortOrder: "asc" } },
      courses: { orderBy: { sortOrder: "asc" } },
    },
  });

  return (
    <div className="grid h-[calc(100vh-64px)] grid-cols-1 overflow-y-hidden lg:grid-cols-2">
      <EditResumeForm resume={resume} />
      <ResumePreview />
    </div>
  );
}
