import { Suspense } from "react";

import { ResumesPage } from "@/components/resume/ResumesPage";
import { ResumesPageSkeleton } from "@/components/resume/skeleton/ResumesPageSkeleton";

export default async function Page() {
  return (
    <Suspense fallback={<ResumesPageSkeleton />}>
      <ResumesPage />
    </Suspense>
  );
}
