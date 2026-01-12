/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type ResumeWithRelations,
  type ResumeDraft,
  ItemStatus,
} from "@/store/types";

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
    themeColor: resume.themeColor,

    workExperience: resume.workExperience.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    education: resume.education.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    projects: resume.projects.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    links: resume.links.map(({ resumeId, createdAt, updatedAt, ...item }) => ({
      ...item,
      status: ItemStatus.Unchanged,
    })),
    skills: resume.skills.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    languages: resume.languages
      .map(({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }))
      .sort(),
    courses: resume.courses.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
  };
};
