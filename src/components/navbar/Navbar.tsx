"use client";

import Link from "next/link";
import { Suspense } from "react";

import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

import { AccountDropdown } from "./AccountDropdown";
import { DarkModeButton } from "./DarkModeButton";
import { ResumeNavbar } from "../resume/ResumeNavbar";
import { Button } from "../ui/button";
import { GithubIcon } from "../ui/icons/Github";

export const Navbar: React.FC = () => {
  const { data, isPending } = authClient.useSession();

  return (
    <header className="bg-background sticky top-0 flex h-16 w-full items-center justify-between p-4">
      <div className="flex gap-4">
        <Suspense>
          <ResumeNavbar />
        </Suspense>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="ghost">
          <Link
            href="https://github.com/stray4x/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </Link>
        </Button>
        <DarkModeButton />
        {data?.session && <AccountDropdown user={data.user} />}
        {!data?.session && !isPending && (
          <Button variant="link" asChild>
            <Link href={clientUrls.authSignIn}>sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
