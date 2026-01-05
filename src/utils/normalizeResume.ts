import type { ResumeWithRelations, ResumeDraft } from "@/store/types";

export const normalizeResume = (resume: ResumeWithRelations): ResumeDraft => {
  return {
    id: resume.id,
    templateId: resume.templateId,
    resumeName: resume.resumeName,
    jobTitle: resume.jobTitle,
    firstName: resume.firstName,
    lastName: resume.lastName,
    email: resume.email,
    phone: resume.phone,
    country: resume.country,
    city: resume.city,
    summary: resume.summary,

    workExperience: resume.workExperience.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
    education: resume.education.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
    projects: resume.projects.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
    links: resume.links.map(({ resumeId, createdAt, updatedAt, ...item }) => ({
      ...item,
      status: "unchanged",
    })),
    skills: resume.skills.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
    languages: resume.languages.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
    courses: resume.courses.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: "unchanged",
      }),
    ),
  };
};
