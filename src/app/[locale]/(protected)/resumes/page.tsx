import { Suspense } from "react";

import { ResumesPage } from "@/components/resume/ResumesPage";
import { ResumesPageSkeleton } from "@/components/resume/skeleton/ResumesPageSkeleton";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  return (
    <Suspense fallback={<ResumesPageSkeleton />}>
      <ResumesPage params={params} />
    </Suspense>
  );
}
