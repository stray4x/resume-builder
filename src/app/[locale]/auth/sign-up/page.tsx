import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mb-16 w-full max-w-md">
      <h2 className="mb-12 text-center text-4xl font-bold">
        {t("auth.signUp")}
      </h2>

      <SignUpForm />

      <div className="mt-16 flex items-center justify-center gap-1">
        <span>{t("auth.already_have_an_account")}</span>
        <Button asChild variant="link">
          <Link href="/auth/sign-in">{t("buttons.signIn")}</Link>
        </Button>
      </div>
    </div>
  );
}
