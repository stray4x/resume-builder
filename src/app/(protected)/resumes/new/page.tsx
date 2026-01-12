import { unstable_cache } from "next/cache";

import { CreateResumeButton } from "@/components/resume/new/CreateResumeButton";
import { db } from "@/server/db";

const getTemplates = unstable_cache(
  async () => {
    const templates = await db.resumeTemplate.findMany();
    return templates ?? [];
  },
  [],
  { revalidate: 60 * 60 * 12 },
);

export default async function NewResumePage() {
  const templates = await getTemplates();

  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-bold">Create new resume</h2>
      <p className="mb-16 text-center">choose resume template</p>

      <ul className="mx-auto w-full max-w-3xl">
        {templates.map((template) => (
          <li
            key={template.id}
            className="bg-card mb-2 flex items-center justify-between p-2"
          >
            <h3 className="text-xl font-semibold">{template.displayName}</h3>
            <CreateResumeButton templateId={template.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
