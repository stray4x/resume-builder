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

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();

  const signUpSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, t("validation.minLength"))
          .max(50, t("validation.maxLength", { count: 50 })),
        email: z
          .string()
          .email(t("validation.invalidEmail"))
          .max(50, t("validation.maxLength", { count: 50 })),
        password: z
          .string()
          .min(8, t("validation.minPasswordLength", { count: 8 }))
          .max(50, t("validation.maxLength", { count: 50 })),
        passwordConfirm: z
          .string()
          .min(8, t("validation.confirmPassword"))
          .max(50, t("validation.maxLength", { count: 50 })),
      }),
    [t],
  );

  const [isPending, setIsPending] = useState(false);
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
        errs = { ...errs, passwordConfirm: t("validation.passwordsNotMatch") };
      }

      setErrors({ ...errs });
      return;
    }

    try {
      setIsPending(true);

      const res = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.data) {
        router.push(clientUrls.resumes);
        router.refresh();
      } else if (res.error) {
        toast.error(res.error.message ?? t("toasts.sumTingWong"));
      }
    } catch (_) {
      toast.error(t("toasts.sumTingWong"));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="mb-4">
        <Label htmlFor="name" className="mb-2">
          {t("forms.name")}
        </Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder={t("forms.name")}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
      </div>

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
      <div className="mb-4">
        <Label htmlFor="passwordConfirm" className="mb-2">
          {t("forms.confirmPassword")}
        </Label>
        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          placeholder={t("forms.confirmPassword")}
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        {t("buttons.signUp")}
      </Button>
    </form>
  );
};
