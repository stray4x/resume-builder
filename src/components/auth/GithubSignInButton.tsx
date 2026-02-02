"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

import { Button } from "../ui/button";

export const GithubSignInButton: React.FC = () => {
  const t = useTranslations("buttons");

  const handleSignIn = () => {
    void authClient.signIn.social({
      provider: "github",
      callbackURL: clientUrls.resumes,
    });
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleSignIn}>
      {t("signInGithub")}
    </Button>
  );
};
