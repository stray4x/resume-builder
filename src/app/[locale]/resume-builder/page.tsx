import { EditResumeForm } from "@/components/resume/edit/EditResumeForm";
import { LocalModeChip } from "@/components/resume/edit/LocalModeChip";
import { ResumePreview } from "@/components/resume/preview/ResumePreview";

export default async function ResumeBuilderPage() {
  return (
    <div className="grid h-[calc(100vh-64px)] grid-cols-1 overflow-y-hidden lg:grid-cols-2">
      <EditResumeForm />
      <ResumePreview />
      <LocalModeChip />
    </div>
  );
}
