import Link from "next/link";
import { getTranslations } from "next-intl/server";
import React from "react";

import { requireSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { clientUrls } from "@/utils/urls";

import { ResumeItem } from "./ResumeItem";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  params: Promise<{ locale: string }>;
};

export const ResumesPage: React.FC<Props> = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const session = await requireSession();

  const resumes = await db.resume.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-8 text-center text-2xl font-bold">{t("resumes")}</h1>
      <ul className="mb-4 flex flex-col gap-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} t={t} />
        ))}
      </ul>

      <div>
        {resumes.length < 10 ? (
          <Button asChild>
            <Link
              href={clientUrls.createResume}
              className="block w-full px-4 py-8"
            >
              {t("buttons.createNewResume")}
            </Link>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button disabled className="w-full px-4 py-8">
                  {t("buttons.createNewResume")}
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("cannotHaveMoreThanXResumes", { count: 10 })}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
