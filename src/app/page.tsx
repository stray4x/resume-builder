import Link from "next/link";

import { Button } from "@/components/ui/button";
import { clientUrls } from "@/utils/urls";

export default async function Home() {
  return (
    <main className="from-background to-muted flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-8 bg-linear-to-b">
      <h1 className="text-center text-5xl font-bold">Resume Builder</h1>
      <h3 className="mb-12 max-w-3xl px-8 text-center md:text-lg">
        A modern, minimalistic resume builder — create, customize, and export
        professional resumes with ease.
      </h3>
      <div className="flex items-center gap-4">
        <Button size="lg" asChild variant="link">
          <Link href={clientUrls.authSignIn}>Sign in</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href={clientUrls.resumeBuilder}>Create Resume</Link>
        </Button>
      </div>
    </main>
  );
}
