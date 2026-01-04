import { clientUrls } from "@/utils/urls";
import { auth } from ".";
import { headers } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export async function requireSession() {
  const session = await getSession();

  if (!session?.user) {
    redirect(clientUrls.home);
  }

  return session;
}
