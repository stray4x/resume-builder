import { CreateResumeButton } from "@/components/resume/new/CreateResumeButton";
import { api } from "@/trpc/server";

export default async function NewResumePage() {
  const { templates } = await api.resume.getAllResumeTemplates();

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
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <CreateResumeButton templateId={template.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
