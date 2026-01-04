import { getSession } from "@/server/better-auth/server";
import { clientUrls } from "@/utils/urls";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  if (!session) {
    redirect(clientUrls.home);
  }

  return <>{children}</>;
}
