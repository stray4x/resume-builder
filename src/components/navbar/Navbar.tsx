import Link from "next/link";
import React from "react";

import { clientUrls } from "@/utils/urls";

import { DarkModeButton } from "./DarkModeButton";
import { Button } from "../ui/button";
import { GithubIcon } from "../ui/icons/Github";
import { getSession } from "@/server/better-auth/server";
import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const Navbar: React.FC = async () => {
  const session = await getSession();

  return (
    <header className="bg-background sticky top-0 flex h-16 w-full items-center justify-end gap-4 p-4">
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
      {/* <Button>create resume</Button> */}
    </header>
  );
};
