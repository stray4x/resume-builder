import Link from "next/link";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="mb-16 w-full max-w-md">
      <h2 className="mb-12 text-center text-4xl font-bold">Sign up</h2>

      <SignUpForm />

      <div className="mt-16 flex items-center justify-center gap-1">
        <span>Already have an account?</span>
        <Button asChild variant="link">
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
