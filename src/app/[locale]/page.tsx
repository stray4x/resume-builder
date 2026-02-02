import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { clientUrls } from "@/utils/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="from-background to-muted flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-8 bg-linear-to-b">
      <h1 className="text-center text-5xl font-bold">{t("homepage.title")}</h1>
      <h3 className="mb-12 max-w-3xl px-8 text-center md:text-lg">
        {t("homepage.subtitle")}
      </h3>
      <div className="flex items-center gap-4">
        <Button size="lg" asChild variant="link">
          <Link href={clientUrls.authSignIn}>{t("buttons.signIn")}</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href={clientUrls.resumeBuilder}>
            {t("buttons.createResume")}
          </Link>
        </Button>
      </div>
    </main>
  );
}
