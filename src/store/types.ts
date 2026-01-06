import type { Prisma } from "generated/prisma";

export type ResumeWithRelations = Prisma.ResumeGetPayload<{
  include: {
    workExperience: true;
    education: true;
    projects: true;
    links: true;
    skills: true;
    languages: true;
    courses: true;
  };
}>;

export type ResumeDraft = Omit<
  ResumeWithRelations,
  | "createdAt"
  | "updatedAt"
  | "ownerId"
  | "workExperience"
  | "education"
  | "projects"
  | "links"
  | "skills"
  | "languages"
  | "courses"
> & {
  workExperience: WorkExperienceDraft[];
  education: EducationDraft[];
  projects: ProjectDraft[];
  links: LinkDraft[];
  skills: SkillDraft[];
  languages: LanguageDraft[];
  courses: CourseDraft[];
};

type OmitFields = "createdAt" | "updatedAt" | "resumeId";

// export type ItemStatus = "unchanged" | "added" | "deleted" | "updated";

export enum ItemStatus {
  Unchanged = "unchanged",
  Added = "added",
  Deleted = "deleted",
  Updated = "updated",
}

export type WorkExperienceDraft = Omit<
  ResumeWithRelations["workExperience"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type EducationDraft = Omit<
  ResumeWithRelations["education"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type ProjectDraft = Omit<
  ResumeWithRelations["projects"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type LinkDraft = Omit<
  ResumeWithRelations["links"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type SkillDraft = Omit<
  ResumeWithRelations["skills"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type LanguageDraft = Omit<
  ResumeWithRelations["languages"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type CourseDraft = Omit<
  ResumeWithRelations["courses"][number],
  OmitFields
> & {
  status: ItemStatus;
};

export type ResumeSections = keyof Pick<
  ResumeDraft,
  | "workExperience"
  | "education"
  | "projects"
  | "links"
  | "skills"
  | "languages"
  | "courses"
>;

export type ResumeSectionDrafts = {
  workExperience: WorkExperienceDraft;
  education: EducationDraft;
  projects: ProjectDraft;
  links: LinkDraft;
  skills: SkillDraft;
  languages: LanguageDraft;
  courses: CourseDraft;
};
