import { EditResumeFormSkeleton } from "@/components/resume/edit/skeleton/EditResumeFormSkeleton";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="relative grid h-[calc(100vh-64px)] grid-cols-1 overflow-y-hidden lg:grid-cols-2">
      <Spinner className="text-primary absolute top-1/2 left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2" />
      <EditResumeFormSkeleton />
      <div className="w-full bg-[#292929] lg:h-[calc(screen-64px)]"></div>
    </div>
  );
}
