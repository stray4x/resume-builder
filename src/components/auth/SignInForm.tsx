"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignInForm: React.FC = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (errors[e.target.name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, success, error } = signUpSchema.safeParse(formData);

    if (!success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof formData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsPending(true);

      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.data) {
        router.push(clientUrls.resumes);
        router.refresh();
      } else if (res.error) {
        toast.error(res.error.message ?? "Something went wrong");
      }
    } catch (_) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="mb-4">
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="mb-2">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        Sign in
      </Button>
    </form>
  );
};
