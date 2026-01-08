import { TRPCError } from "@trpc/server";

import type { PrismaClient } from "generated/prisma";

const MAX_SECTION_ITEMS = 50;

export const validateMaxItemsCount = async (
  db: PrismaClient,
  resumeId: string,
  workExpLen: number,
  educLen: number,
  projLen: number,
  coursesLen: number,
  skillsLen: number,
  linksLen: number,
  langsLen: number,
) => {
  const [
    existingWork,
    existingEducation,
    existingProjects,
    existingCourses,
    existingSkills,
    existingLinks,
    existingLanguages,
  ] = await Promise.all([
    db.workExperience.count({ where: { resumeId } }),
    db.education.count({ where: { resumeId } }),
    db.project.count({ where: { resumeId } }),
    db.course.count({ where: { resumeId } }),
    db.skill.count({ where: { resumeId } }),
    db.link.count({ where: { resumeId } }),
    db.language.count({ where: { resumeId } }),
  ]);

  const sections = [
    { name: "WorkExperience", curr: existingWork, added: workExpLen },
    { name: "Education", curr: existingEducation, added: educLen },
    { name: "Project", curr: existingProjects, added: projLen },
    { name: "Course", curr: existingCourses, added: coursesLen },
    { name: "Skill", curr: existingSkills, added: skillsLen },
    { name: "Link", curr: existingLinks, added: linksLen },
    { name: "Language", curr: existingLanguages, added: langsLen },
  ];

  sections.forEach(({ name, curr, added }) => {
    if (curr + added > MAX_SECTION_ITEMS) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Maximum of ${MAX_SECTION_ITEMS} ${name} items allowed`,
      });
    }
  });
};
