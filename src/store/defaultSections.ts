import { LanguageLevel, SkillLevel } from "generated/prisma";

import type {
  WorkExperienceDraft,
  EducationDraft,
  ProjectDraft,
  LinkDraft,
  SkillDraft,
  LanguageDraft,
  CourseDraft,
} from "./types";

export const defaultWorkExperience: WorkExperienceDraft = {
  id: "",
  jobTitle: "",
  employer: "",
  city: "",
  startDate: null,
  endDate: null,
  description: "",
  sortOrder: 0,
  status: "added",
};

export const defaultEducation: EducationDraft = {
  id: "",
  school: "",
  degree: "",
  city: "",
  startDate: null,
  endDate: null,
  description: "",
  sortOrder: 0,
  status: "added",
};

export const defaultProject: ProjectDraft = {
  id: "",
  title: "",
  url: "",
  repoUrl: "",
  description: "",
  sortOrder: 0,
  status: "added",
};

export const defaultLink: LinkDraft = {
  id: "",
  title: "",
  url: "",
  sortOrder: 0,
  status: "added",
};

export const defaultSkill: SkillDraft = {
  id: "",
  title: "",
  level: SkillLevel.Novice,
  sortOrder: 0,
  status: "added",
};

export const defaultLanguage: LanguageDraft = {
  id: "",
  language: "",
  level: LanguageLevel.A1,
  sortOrder: 0,
  status: "added",
};

export const defaultCourse: CourseDraft = {
  id: "",
  title: "",
  institution: "",
  date: null,
  sortOrder: 0,
  status: "added",
};
