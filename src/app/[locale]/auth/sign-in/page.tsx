import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { GithubSignInButton } from "@/components/auth/GithubSignInButton";
import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { clientUrls } from "@/utils/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mb-16 w-full max-w-md">
      <h2 className="mb-12 text-center text-4xl font-bold">
        {t("auth.signIn")}
      </h2>

      <SignInForm />
      <span className="my-4 block text-center">{t("auth.or")}</span>
      <GithubSignInButton />
      <div className="mt-16 flex items-center justify-center gap-1">
        <span>{t("auth.dont_have_an_account")}</span>
        <Button asChild variant="link">
          <Link href={clientUrls.authSignUp}>{t("buttons.signUp")}</Link>
        </Button>
      </div>
    </div>
  );
}
