import { redirect } from "next/navigation";

import { getSession } from "@/server/better-auth/server";
import { clientUrls } from "@/utils/urls";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  if (session) {
    redirect(clientUrls.resumes);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-4 sm:max-w-8/12 sm:px-0 md:max-w-6/12 xl:max-w-4/12">
      {children}
    </div>
  );
}
