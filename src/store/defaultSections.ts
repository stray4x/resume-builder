import { LanguageLevel, SkillLevel } from "generated/prisma";

import {
  type WorkExperienceDraft,
  type EducationDraft,
  type ProjectDraft,
  type LinkDraft,
  type SkillDraft,
  type LanguageDraft,
  type CourseDraft,
  ItemStatus,
} from "./types";

export const defaultWorkExperience: WorkExperienceDraft = {
  id: "",
  jobTitle: "",
  employer: "",
  city: "",
  startDate: null,
  endDate: null,
  description: "",
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultEducation: EducationDraft = {
  id: "",
  school: "",
  degree: "",
  city: "",
  startDate: null,
  endDate: null,
  description: "",
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultProject: ProjectDraft = {
  id: "",
  title: "",
  url: "",
  repoUrl: "",
  description: "",
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultLink: LinkDraft = {
  id: "",
  title: "",
  url: "",
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultSkill: SkillDraft = {
  id: "",
  title: "",
  level: SkillLevel.Novice,
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultLanguage: LanguageDraft = {
  id: "",
  language: "",
  level: LanguageLevel.A1,
  sortOrder: 0n,
  status: ItemStatus.Added,
};

export const defaultCourse: CourseDraft = {
  id: "",
  title: "",
  institution: "",
  date: null,
  sortOrder: 0n,
  status: ItemStatus.Added,
};
