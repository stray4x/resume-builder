import { TRPCError } from "@trpc/server";
import z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const deletedUser = await ctx.db.user.delete({
        where: { id: userId },
      });

      return { success: true, userId: deletedUser.id };
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete user",
      });
    }
  }),

  updateUser: protectedProcedure
    .input(z.object({ name: z.string().max(50) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const updated = await ctx.db.user.update({
        where: {
          id: userId,
        },
        data: input,
      });

      return updated;
    }),
});
