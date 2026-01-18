import Link from "next/link";
import { Suspense } from "react";

import { ResumesList } from "@/components/resume/ResumesList";
import { Button } from "@/components/ui/button";
import { clientUrls } from "@/utils/urls";

export default async function ResumesPage() {
  return (
    <div className="mx-auto w-full max-w-10/12 lg:max-w-8/12">
      <div className="mb-16">
        <Button>
          <Link href={clientUrls.createResume}>Create new resume</Link>
        </Button>
      </div>
      <Suspense fallback={<ResumesSkeleton />}>
        <ResumesList />
      </Suspense>
    </div>
  );
}

function ResumesSkeleton() {
  return (
    <ul>
      {[...Array(3)].map((_, i) => (
        <li key={i} className="bg-muted mb-2 h-12 animate-pulse" />
      ))}
    </ul>
  );
}
