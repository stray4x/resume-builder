import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ScreamingSun } from "@/components/ui/icons/screaming-sun";
import { clientUrls } from "@/utils/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="from-background to-muted relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-linear-to-b">
      {/* Solar System Background */}

      <div className="absolute inset-0">
        {/* Stars */}
        <div className="bg-foreground/40 absolute top-[15%] left-[10%] h-2 w-2 rounded-full" />
        <div className="bg-foreground/30 absolute top-[20%] left-[85%] h-2 w-2 rounded-full" />
        <div className="bg-foreground/20 absolute top-[70%] left-[20%] h-2 w-2 rounded-full" />
        <div className="bg-foreground/35 absolute top-[65%] left-[75%] h-2 w-2 rounded-full" />
        <div className="bg-foreground/30 absolute top-[45%] left-[15%] h-1.5 w-1.5 rounded-full" />
        <div className="bg-foreground/40 absolute top-[50%] left-[90%] h-2 w-2 rounded-full" />
        <div className="bg-foreground/35 absolute top-[85%] left-[60%] h-1 w-1 rounded-full" />

        {/* Orbit Rings */}
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 md:left-[20%]">
          {/* Orbit 1 */}
          <div className="h-64 w-64 animate-[spin_25s_linear_infinite] md:h-80 md:w-80">
            <div className="border-border/60 h-full w-full rounded-full border" />
            {/* Planet 1 */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <div className="border-chart-1/40 inset-0 h-6 w-6 rounded-full border md:h-7 md:w-7"></div>
            </div>
          </div>

          {/* Orbit 2 */}
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite] md:h-112.5 md:w-112.5">
            <div className="border-border/50 h-full w-full rounded-full border" />
            {/* Planet 2 */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <div className="border-chart-3/45 inset-0 h-10 w-10 rounded-full border md:h-12 md:w-12"></div>
            </div>
          </div>

          {/* Orbit 3 */}
          <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 animate-[spin_45s_linear_infinite] md:h-145 md:w-145">
            <div className="border-border h-full w-full rounded-full border" />
            {/* Planet 3 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="border-chart-2/50 inset-0 h-5 w-5 rounded-full border md:h-6 md:w-6"></div>
            </div>
          </div>

          {/* Orbit 4 */}
          <div className="absolute top-1/2 left-1/2 hidden h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] md:block">
            <div className="border-border/80 h-full w-full rounded-full border" />
            {/* Planet 4 */}
            <div className="absolute top-[20%] right-[10%]">
              <div className="border-chart-5/50 inset-0 h-4 w-4 rounded-full border" />
            </div>
          </div>

          {/* Orbit 5 - outer */}
          <div className="absolute top-1/2 left-1/2 hidden h-200 w-200 -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite] lg:block">
            <div className="border-border h-full w-full rounded-full border" />
            {/* Planet 5 */}
            <div className="planet-5 absolute right-[14%] bottom-[15%]">
              <div className="border-chart-1/80 dark:border-chart-1/50 h-3 w-3 rounded-full border"></div>
            </div>
          </div>
        </div>

        {/* Central Sun */}
        <div className="group absolute top-1/2 left-[15%] -translate-y-1/2 md:left-[23%]">
          <div className="relative h-32 w-32 md:h-40 md:w-40">
            {/* Inner background on hover */}
            <div className="bg-chart-4/0 group-hover:bg-chart-4/10 absolute inset-0 rounded-full opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100" />
            <ScreamingSun className="pointer-events-none h-[150%] w-[150%] -translate-x-1/6 -translate-y-1/6 opacity-0 transition-opacity duration-800 not-dark:group-hover:opacity-100" />
            {/* Rim */}
            <div className="border-primary/30 group-hover:border-primary/60 group-hover:shadow-primary/20 absolute inset-2 rounded-full border transition-all duration-500 group-hover:shadow-lg md:inset-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-center">
          <div className="relative">
            <div className="bg-primary/10 absolute -inset-4 rounded-full blur-xl" />
            <h1 className="text-foreground relative text-center text-5xl font-bold tracking-tight md:text-6xl">
              {t("homepage.title")}
            </h1>
          </div>
        </div>
        <h2 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl">
          {t("homepage.subtitle")}
        </h2>
      </div>

      <h3 className="text-muted-foreground relative z-10 mb-12 max-w-3xl px-8 text-center text-base md:text-lg">
        {t("homepage.description")}
      </h3>

      <div className="relative z-10 flex items-center gap-4">
        <Button size="lg" asChild variant="outline">
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
