"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/store/store";

import { ImageInput } from "./ui/ImageInput";
import { SectionTitle } from "./ui/SectionTitle";

export const Details: React.FC = () => {
  const t = useTranslations();

  const jobTitle = useResume((state) => state.jobTitle);
  const firstName = useResume((state) => state.firstName);
  const lastName = useResume((state) => state.lastName);
  const email = useResume((state) => state.email);
  const phone = useResume((state) => state.phone);
  const country = useResume((state) => state.country);
  const city = useResume((state) => state.city);
  const photoUrl = useResume((state) => state.photoUrl);

  const setField = useResume((state) => state.setField);

  return (
    <div className="mb-8">
      <SectionTitle>{t("details")}</SectionTitle>
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-8">
        <div>
          <Label htmlFor="jobTitle" className="mb-2">
            {t("wantedJobTitle")}
          </Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder={t("wantedJobTitle")}
            className="w-full"
            value={jobTitle}
            maxLength={50}
            onChange={(e) => setField("jobTitle", e.target.value)}
          />
        </div>
        <ImageInput
          image={photoUrl}
          setImage={(v) => setField("photoUrl", v)}
          className="xs:order-0 order-first"
        />
        <div>
          <Label htmlFor="firstName" className="mb-2">
            {t("firstName")}
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder={t("firstName")}
            className="w-full"
            value={firstName}
            maxLength={50}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="mb-2">
            {t("lastName")}
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder={t("lastName")}
            className="w-full"
            value={lastName}
            maxLength={50}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2">
            {t("email")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("email")}
            className="w-full"
            value={email}
            maxLength={50}
            onChange={(e) => setField("email", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-2">
            {t("phone")}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t("phone")}
            className="w-full"
            value={phone}
            maxLength={25}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="country" className="mb-2">
            {t("country")}
          </Label>
          <Input
            id="country"
            type="text"
            placeholder={t("country")}
            className="w-full"
            value={country}
            maxLength={50}
            onChange={(e) => setField("country", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="city" className="mb-2">
            {t("city")}
          </Label>
          <Input
            id="city"
            type="text"
            placeholder={t("city")}
            className="w-full"
            value={city}
            maxLength={100}
            onChange={(e) => setField("city", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
