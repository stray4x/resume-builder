"use client";

import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();

  const signInSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .email(t("validation.invalidEmail"))
          .max(50, t("validation.maxLength", { count: 50 })),
        password: z
          .string()
          .min(8, t("validation.minPasswordLength", { count: 8 }))
          .max(50, t("validation.maxLength", { count: 50 })),
      }),
    [t],
  );

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

    const { data, success, error } = signInSchema.safeParse(formData);

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
          {t("forms.email")}
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder={t("forms.email")}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="mb-2">
          {t("forms.password")}
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder={t("forms.password")}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        {t("buttons.signIn")}
      </Button>
    </form>
  );
};
