import Link from "next/link";

import { GithubSignInButton } from "@/components/auth/GithubSignInButton";
import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { clientUrls } from "@/utils/urls";

export default function SignInPage() {
  return (
    <div className="mb-16 w-full max-w-md">
      <h2 className="mb-12 text-center text-4xl font-bold">Sign in</h2>

      <SignInForm />
      <span className="my-4 block text-center">or</span>
      <GithubSignInButton />
      <div className="mt-16 flex items-center justify-center gap-1">
        <span>Don&apos;t have and account?</span>
        <Button asChild variant="link">
          <Link href={clientUrls.authSignUp}>Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
