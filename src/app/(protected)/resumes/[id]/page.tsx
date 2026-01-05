import { EditResumeForm } from "@/components/resume/edit/EditResumeForm";
import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import type { ResumeWithRelations } from "@/store/types";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireSession();
  const { id: resumeId } = await params;

  const resume = await db.resume.findFirst({
    where: { id: resumeId, ownerId: user.id },
    include: {
      workExperience: true,
      projects: true,
      education: true,
      skills: true,
      links: true,
      languages: true,
      courses: true,
    },
  });

  return (
    <div className="grid h-[calc(100vh-64px)] grid-cols-2 overflow-y-hidden">
      <div className="no-arrow-scroll h-[calc(screen-64px)] overflow-y-auto p-12">
        <EditResumeForm resume={resume as ResumeWithRelations} />
      </div>
      <div className="bg-amber-50 p-4">resume preview</div>
    </div>
  );
}
