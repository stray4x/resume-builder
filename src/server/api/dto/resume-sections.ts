import z from "zod";

const SortOrder = z.bigint();

// basic inputs
export const WorkExperienceInput = z.object({
  jobTitle: z.string().max(100),
  employer: z.string().max(100),
  city: z.string().max(100),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().max(2000),
  sortOrder: SortOrder,
});

export const EducationInput = z.object({
  school: z.string().max(100),
  degree: z.string().max(100),
  city: z.string().max(100),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().max(2000),
  sortOrder: SortOrder,
});

export const ProjectInput = z.object({
  title: z.string().max(100),
  url: z.string().url().or(z.literal("")),
  repoUrl: z.string().url().or(z.literal("")),
  description: z.string().max(2000),
  sortOrder: SortOrder,
});

export const CourseInput = z.object({
  title: z.string().max(100),
  institution: z.string().max(100),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  sortOrder: SortOrder,
});

export const LinkInput = z.object({
  title: z.string().max(100),
  url: z.string().url().or(z.literal("")),
  sortOrder: SortOrder,
});

export const SkillInput = z.object({
  title: z.string().max(100),
  level: z.enum([
    "Novice",
    "Apprentice",
    "Adept",
    "Expert",
    "Master",
    "Legendary",
  ]),
  sortOrder: SortOrder,
});

export const LanguageInput = z.object({
  language: z.string().max(100),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  sortOrder: SortOrder,
});

// update inputs
export const WorkExperienceUpdateInput = WorkExperienceInput.extend({
  id: z.string().cuid(),
});

export const EducationUpdateInput = EducationInput.extend({
  id: z.string().cuid(),
});

export const ProjectUpdateInput = ProjectInput.extend({
  id: z.string().cuid(),
});

export const CourseUpdateInput = CourseInput.extend({
  id: z.string().cuid(),
});

export const LinkUpdateInput = LinkInput.extend({
  id: z.string().cuid(),
});

export const SkillUpdateInput = SkillInput.extend({
  id: z.string().cuid(),
});

export const LanguageUpdateInput = LanguageInput.extend({
  id: z.string().cuid(),
});
