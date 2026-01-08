import z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  getAllResumeTemplates: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.resumeTemplate.findMany();

    return {
      templates: data ?? [],
    };
  }),

  createNewResume: protectedProcedure
    .input(z.object({ templateId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

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
          owner: { connect: { id: userId } },
          template: { connect: { id: input.templateId } },
        },
      });

      return newResume;
    }),

  updateResume: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        templateId: z.string().min(1),
        resumeName: z.string().max(100),
        firstName: z.string().max(50),
        lastName: z.string().max(50),
        jobTitle: z.string().max(50),
        city: z.string().max(100),
        email: z.string().max(50),
        country: z.string().max(50),
        phone: z.string().max(25),
        summary: z.string().max(1000),
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
    .input(z.object({ resumeId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db.resume.delete({
        where: {
          id: input.resumeId,
          ownerId: userId,
        },
      });
    }),
});
