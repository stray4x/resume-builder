import { TRPCError } from "@trpc/server";

import type { PrismaClient } from "generated/prisma";

const RESUME_LIMIT = 10;

export async function assertUserCanCreateResume({
  db,
  userId,
  throwError,
}: {
  db: PrismaClient;
  userId: string;
  throwError?: boolean;
}) {
  const count = await db.resume.count({
    where: { ownerId: userId },
  });

  const allowed = count < RESUME_LIMIT;

  if (throwError && !allowed) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Cannot create more than ${RESUME_LIMIT} resumes`,
    });
  }

  return { allowed, limit: RESUME_LIMIT };
}
