import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";

import { ResumeTemplateItem } from "@/components/resume/new/ResumeTemplateItem";
import { db } from "@/server/db";

const getTemplates = unstable_cache(
  async () => {
    const templates = await db.resumeTemplate.findMany();
    return templates ?? [];
  },
  ["resume-templates"],
  { revalidate: 3600 * 6, tags: ["resume-templates"] },
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewResumePage({ params }: Props) {
  const templates = await getTemplates();

  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-bold">
        {t("createNewResume")}
      </h2>
      <ul className="xxs:justify-start mx-auto flex w-full max-w-98 flex-wrap justify-center gap-4 px-4 md:max-w-3xl">
        {templates.map((template) => (
          <ResumeTemplateItem key={template.id} template={template} />
        ))}
      </ul>
    </div>
  );
}
