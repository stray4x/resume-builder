import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

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
