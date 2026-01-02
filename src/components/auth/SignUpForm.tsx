"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";
import toast from "react-hot-toast";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string().min(8, "Please confirm your password"),
});

export const SignUpForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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

    if (!success || data.password !== data.passwordConfirm) {
      let errs = {};

      if (!success) {
        const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof formData] = err.message;
          }
        });
        errs = { ...fieldErrors };
      } else if (data.password !== data.passwordConfirm) {
        errs = { ...errs, passwordConfirm: "Passwords do not match" };
      }

      setErrors({ ...errs });
      return;
    }

    try {
      const res = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.data) {
        router.push(clientUrls.account);
      } else if (res.error) {
        toast.error(res.error.message ?? "Something went wrong");
      }
    } catch (_) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="mb-4">
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
      </div>

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
      <div className="mb-4">
        <Label htmlFor="passwordConfirm" className="mb-2">
          Confirm Password
        </Label>
        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg">
        Sign Up
      </Button>
    </form>
  );
};
