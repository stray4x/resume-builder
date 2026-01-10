import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import { clientUrls } from "@/utils/urls";

import { DarkModeButton } from "./DarkModeButton";
import { SaveChangesButton } from "../resume/edit/SaveChangesButton";
import { Button } from "../ui/button";
import { GithubIcon } from "../ui/icons/Github";

export const Navbar: React.FC = async () => {
  const session = await getSession();

  return (
    <header className="bg-background sticky top-0 flex h-16 w-full items-center justify-between p-4">
      <div className="flex gap-4">
        {session && (
          <Button variant="link" asChild>
            <Link href={clientUrls.resumes}>my resumes</Link>
          </Button>
        )}
        <SaveChangesButton />
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
        {session ? (
          <form>
            <Button
              variant="link"
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              sign out
            </Button>
          </form>
        ) : (
          <Button variant="link" asChild>
            <Link href={clientUrls.authSignIn}>sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
