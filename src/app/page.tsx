import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-8">
      <h1 className="mb-12 text-center text-5xl font-bold">Resume Builder</h1>
      <h3 className="mb-4 max-w-3xl px-8 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iste
        a quibusdam tempore, corporis possimus enim accusantium. Ratione, nihil
        libero?
      </h3>
      <div className="flex items-center gap-4">
        <Button size="lg" asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button size="lg">Create Resume</Button>
      </div>
    </main>
  );
}
