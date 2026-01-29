import { TRPCError } from "@trpc/server";
import z from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import {
  CourseInput,
  CourseUpdateInput,
  EducationInput,
  EducationUpdateInput,
  LanguageInput,
  LanguageUpdateInput,
  LinkInput,
  LinkUpdateInput,
  ProjectInput,
  ProjectUpdateInput,
  SkillInput,
  SkillUpdateInput,
  WorkExperienceInput,
  WorkExperienceUpdateInput,
} from "../dto/resume-sections";
import { validateMaxItemsCount } from "../services/resume-sections.service";
import { assertUserCanCreateResume } from "../services/resume.service";

export const resumeRouter = createTRPCRouter({
  getAllResumeTemplates: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.resumeTemplate.findMany();

    return {
      templates: data ?? [],
    };
  }),

  isUserAllowedToCreateNewResume: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const result = await assertUserCanCreateResume({ db: ctx.db, userId });

    return result;
  }),

  createNewResume: protectedProcedure
    .input(z.object({ templateId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await assertUserCanCreateResume({ db: ctx.db, userId, throwError: true });

      const newResume = await ctx.db.resume.create({
        data: {
          resumeName: "New Resume",
          firstName: "",
          lastName: "",
          jobTitle: "",
          city: "",
          email: "",
          country: "",
          phone: "",
          summary: "",
          themeColor: "",
          owner: { connect: { id: userId } },
          template: { connect: { id: input.templateId } },
        },
      });

      return newResume;
    }),

  updateResume: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        templateId: z.string().cuid(),
        resumeName: z.string().max(50).nonempty(),
        firstName: z.string().max(50),
        lastName: z.string().max(50),
        jobTitle: z.string().max(50),
        city: z.string().max(100),
        email: z.string().max(50),
        country: z.string().max(50),
        phone: z.string().max(25),
        summary: z.string().max(2500),
        themeColor: z.string().max(10),
        photoUrl: z.string().max(5000, {
          message: "Image is too large",
        }), // temporary - todo:fix this
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { id, ...data } = input;

      const updated = await ctx.db.resume.update({
        where: {
          id: id,
          ownerId: userId,
        },
        data,
      });

      return updated;
    }),

  deleteResume: protectedProcedure
    .input(z.object({ resumeId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db.resume.delete({
        where: {
          id: input.resumeId,
          ownerId: userId,
        },
      });
    }),

  addSections: protectedProcedure
    .input(
      z.object({
        resumeId: z.string().cuid(),
        workExperience: z.array(WorkExperienceInput).max(50).default([]),
        education: z.array(EducationInput).max(50).default([]),
        projects: z.array(ProjectInput).max(50).default([]),
        courses: z.array(CourseInput).max(50).default([]),
        skills: z.array(SkillInput).max(50).default([]),
        links: z.array(LinkInput).max(50).default([]),
        languages: z.array(LanguageInput).max(50).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {
        resumeId,
        workExperience,
        education,
        projects,
        courses,
        links,
        skills,
        languages,
      } = input;

      const resume = await ctx.db.resume.findFirst({
        where: { ownerId: userId, id: resumeId },
      });

      if (!resume) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Resume not found" });
      }

      await validateMaxItemsCount(
        ctx.db,
        resumeId,
        workExperience.length,
        education.length,
        projects.length,
        courses.length,
        skills.length,
        links.length,
        languages.length,
      );

      await ctx.db.$transaction([
        ctx.db.workExperience.createMany({
          data: workExperience.map((w) => ({ ...w, resumeId })),
        }),
        ctx.db.education.createMany({
          data: education.map((e) => ({ ...e, resumeId })),
        }),
        ctx.db.project.createMany({
          data: projects.map((p) => ({ ...p, resumeId })),
        }),
        ctx.db.course.createMany({
          data: courses.map((c) => ({ ...c, resumeId })),
        }),
        ctx.db.link.createMany({
          data: links.map((l) => ({ ...l, resumeId })),
        }),
        ctx.db.skill.createMany({
          data: skills.map((s) => ({ ...s, resumeId })),
        }),
        ctx.db.language.createMany({
          data: languages.map((l) => ({ ...l, resumeId })),
        }),
      ]);
    }),

  updateSections: protectedProcedure
    .input(
      z.object({
        resumeId: z.string().cuid(),
        workExperience: z.array(WorkExperienceUpdateInput).default([]),
        education: z.array(EducationUpdateInput).default([]),
        projects: z.array(ProjectUpdateInput).default([]),
        courses: z.array(CourseUpdateInput).default([]),
        links: z.array(LinkUpdateInput).default([]),
        skills: z.array(SkillUpdateInput).default([]),
        languages: z.array(LanguageUpdateInput).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {
        resumeId,
        workExperience,
        education,
        projects,
        courses,
        links,
        skills,
        languages,
      } = input;

      const resume = await ctx.db.resume.findFirst({
        where: { id: resumeId, ownerId: userId },
      });

      if (!resume) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Resume not found" });
      }

      await ctx.db.$transaction([
        ...workExperience.map((w) =>
          ctx.db.workExperience.update({
            where: { id: w.id, resumeId },
            data: { ...w },
          }),
        ),

        ...education.map((e) =>
          ctx.db.education.update({
            where: { id: e.id, resumeId },
            data: { ...e },
          }),
        ),

        ...projects.map((p) =>
          ctx.db.project.update({
            where: { id: p.id, resumeId },
            data: { ...p },
          }),
        ),

        ...courses.map((c) =>
          ctx.db.course.update({
            where: { id: c.id, resumeId },
            data: { ...c },
          }),
        ),

        ...links.map((l) =>
          ctx.db.link.update({
            where: { id: l.id, resumeId },
            data: { ...l },
          }),
        ),

        ...skills.map((s) =>
          ctx.db.skill.update({
            where: { id: s.id, resumeId },
            data: { ...s },
          }),
        ),

        ...languages.map((l) =>
          ctx.db.language.update({
            where: { id: l.id, resumeId },
            data: { ...l },
          }),
        ),
      ]);
    }),

  deleteSections: protectedProcedure
    .input(
      z.object({
        resumeId: z.string().cuid(),
        workExperience: z.array(z.string()).default([]),
        education: z.array(z.string()).default([]),
        projects: z.array(z.string()).default([]),
        courses: z.array(z.string()).default([]),
        skills: z.array(z.string()).default([]),
        links: z.array(z.string()).default([]),
        languages: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {
        resumeId,
        workExperience,
        education,
        projects,
        courses,
        links,
        skills,
        languages,
      } = input;

      const resume = await ctx.db.resume.findFirst({
        where: { id: resumeId, ownerId: userId },
      });

      if (!resume) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Resume not found" });
      }

      await ctx.db.$transaction([
        ctx.db.workExperience.deleteMany({
          where: { id: { in: workExperience }, resumeId },
        }),

        ctx.db.education.deleteMany({
          where: { id: { in: education }, resumeId },
        }),

        ctx.db.project.deleteMany({
          where: { id: { in: projects }, resumeId },
        }),

        ctx.db.course.deleteMany({
          where: { id: { in: courses }, resumeId },
        }),

        ctx.db.link.deleteMany({
          where: { id: { in: links }, resumeId },
        }),

        ctx.db.skill.deleteMany({
          where: { id: { in: skills }, resumeId },
        }),

        ctx.db.language.deleteMany({
          where: { id: { in: languages }, resumeId },
        }),
      ]);
    }),

  copyResume: protectedProcedure
    .input(z.object({ resumeId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const originalResume = await ctx.db.resume.findFirst({
        where: { id: input.resumeId, ownerId: userId },
        include: {
          workExperience: true,
          education: true,
          projects: true,
          courses: true,
          skills: true,
          links: true,
          languages: true,
        },
      });

      if (!originalResume) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Resume not found" });
      }

      const {
        id,
        ownerId,
        createdAt,
        updatedAt,
        templateId,
        workExperience,
        education,
        projects,
        courses,
        skills,
        links,
        languages,
        ...resumeData
      } = originalResume;

      const newResume = await ctx.db.resume.create({
        data: {
          ...resumeData,
          resumeName: `${originalResume.resumeName} copy`,
          owner: { connect: { id: userId } },
          template: { connect: { id: templateId } },
        },
      });

      await ctx.db.$transaction([
        ctx.db.workExperience.createMany({
          data: workExperience.map(
            ({ id, resumeId, createdAt, updatedAt, ...w }) => ({
              ...w,
              resumeId: newResume.id,
            }),
          ),
        }),
        ctx.db.education.createMany({
          data: education.map(
            ({ id, resumeId, createdAt, updatedAt, ...e }) => ({
              ...e,
              resumeId: newResume.id,
            }),
          ),
        }),
        ctx.db.project.createMany({
          data: projects.map(
            ({ id, resumeId, createdAt, updatedAt, ...p }) => ({
              ...p,
              resumeId: newResume.id,
            }),
          ),
        }),
        ctx.db.course.createMany({
          data: courses.map(({ id, resumeId, createdAt, updatedAt, ...c }) => ({
            ...c,
            resumeId: newResume.id,
          })),
        }),
        ctx.db.link.createMany({
          data: links.map(({ id, resumeId, createdAt, updatedAt, ...l }) => ({
            ...l,
            resumeId: newResume.id,
          })),
        }),
        ctx.db.skill.createMany({
          data: skills.map(({ id, resumeId, createdAt, updatedAt, ...s }) => ({
            ...s,
            resumeId: newResume.id,
          })),
        }),
        ctx.db.language.createMany({
          data: languages.map(
            ({ id, resumeId, createdAt, updatedAt, ...l }) => ({
              ...l,
              resumeId: newResume.id,
            }),
          ),
        }),
      ]);

      return newResume;
    }),
});
