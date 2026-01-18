import { EditResumeForm } from "@/components/resume/edit/EditResumeForm";
import { ResumePreview } from "@/components/resume/preview/ResumePreview";

export default async function ResumeBuilderPage() {
  return (
    <div className="grid h-[calc(100vh-64px)] grid-cols-2 overflow-y-hidden">
      <div className="no-arrow-scroll h-[calc(screen-64px)] overflow-y-auto p-12">
        <EditResumeForm />
      </div>
      <ResumePreview />
    </div>
  );
}
