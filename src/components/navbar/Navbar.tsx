"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

import { AccountDropdown } from "./AccountDropdown";
import { DarkModeButton } from "./DarkModeButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ResumeNavbar } from "../resume/ResumeNavbar";
import { Button } from "../ui/button";
import { GithubIcon } from "../ui/icons/Github";

export const Navbar: React.FC = () => {
  const { data, isPending } = authClient.useSession();

  const t = useTranslations("buttons");

  return (
    <header className="bg-background sticky top-0 flex h-16 w-full items-center justify-between p-4">
      <div className="flex gap-4">
        <Suspense>
          <ResumeNavbar />
        </Suspense>
      </div>
      <div className="xxs:gap-4 flex gap-2">
        <Button asChild variant="ghost">
          <Link
            href="https://github.com/stray4x/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </Link>
        </Button>
        <Suspense>
          <LanguageSwitcher />
        </Suspense>
        <DarkModeButton />
        {isPending && (
          <div className="bg-muted h-8 w-16 animate-pulse rounded" />
        )}
        {data?.session && <AccountDropdown user={data.user} />}
        {!data?.session && !isPending && (
          <Button variant="link" asChild>
            <Link href={clientUrls.authSignIn}>{t("signIn")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
