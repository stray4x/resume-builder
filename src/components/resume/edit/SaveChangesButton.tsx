"use client";

import { Save } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useResume } from "@/store/store";
import { ItemStatus } from "@/store/types";
import { api } from "@/trpc/react";
import { saveResumeToLocalStorage } from "@/utils/resume";
import { clientUrls } from "@/utils/urls";

import type { TRPCClientErrorLike } from "@trpc/client";

const getItemsToAdd = <T extends { status: ItemStatus }>(items: T[]) => {
  return items.filter((item) => item.status === ItemStatus.Added);
};

const getItemsToUpdate = <T extends { status: ItemStatus }>(items: T[]) => {
  return items.filter((item) => item.status === ItemStatus.Updated);
};

const getIdsToDelete = <T extends { id: string; status: ItemStatus }>(
  items: T[],
) => {
  return items
    .filter((item) => item.status === ItemStatus.Deleted)
    .map((item) => item.id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (e: TRPCClientErrorLike<any>, errorText: string) => {
  try {
    const messages = JSON.parse(e.message) as {
      message: string;
      path: string[];
    }[];

    messages.forEach((item) => {
      toast.error(`${item.path[0]}: ${item.message}`);
    });
  } catch (_) {
    toast.error(errorText);
  }
};

type Props = {
  disabled?: boolean;
  isMobile?: boolean;
};

export const SaveChangesButton: React.FC<Props> = ({ disabled, isMobile }) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations();

  const resume = useResume((state) => state);
  const markSaved = useResume((state) => state.markSaved);

  const { mutateAsync: updateResume, isPending } =
    api.resume.updateResume.useMutation({
      onError: (e) => {
        handleError(e, t("toasts.errorWhileUploadingResume"));
      },
    });

  const { mutateAsync: addSections, isPending: isAddingSections } =
    api.resume.addSections.useMutation({
      onError: (e) => {
        handleError(e, t("toasts.errorWhileAddingSections"));
      },
    });

  const { mutateAsync: updSections, isPending: isUpdatingSections } =
    api.resume.updateSections.useMutation({
      onError: (e) => {
        handleError(e, t("toasts.errorWhileUpdatingSections"));
      },
    });

  const { mutateAsync: delSections, isPending: isDeletingSections } =
    api.resume.deleteSections.useMutation({
      onError: (e) => {
        handleError(e, t("toasts.errorWhileDeletingSections"));
      },
    });

  const handleSave = async () => {
    if (path === clientUrls.resumeBuilder) {
      saveResumeToLocalStorage(resume);
      markSaved();
      toast.success(t("toasts.savedSuccessfully"));
      return;
    }

    const sectionsToAdd = {
      workExperience: getItemsToAdd(resume.workExperience),
      education: getItemsToAdd(resume.education),
      projects: getItemsToAdd(resume.projects),
      courses: getItemsToAdd(resume.courses),
      skills: getItemsToAdd(resume.skills),
      links: getItemsToAdd(resume.links),
      languages: getItemsToAdd(resume.languages),
    };

    const sectionToUpdate = {
      workExperience: getItemsToUpdate(resume.workExperience),
      education: getItemsToUpdate(resume.education),
      projects: getItemsToUpdate(resume.projects),
      courses: getItemsToUpdate(resume.courses),
      skills: getItemsToUpdate(resume.skills),
      links: getItemsToUpdate(resume.links),
      languages: getItemsToUpdate(resume.languages),
    };

    const sectionsToDelete = {
      workExperience: getIdsToDelete(resume.workExperience),
      education: getIdsToDelete(resume.education),
      projects: getIdsToDelete(resume.projects),
      courses: getIdsToDelete(resume.courses),
      skills: getIdsToDelete(resume.skills),
      links: getIdsToDelete(resume.links),
      languages: getIdsToDelete(resume.languages),
    };

    void Promise.allSettled([
      updateResume({
        id: resume.id,
        templateId: resume.templateId,
        resumeName: resume.resumeName,
        firstName: resume.firstName,
        lastName: resume.lastName,
        jobTitle: resume.jobTitle,
        city: resume.city,
        email: resume.email,
        country: resume.country,
        phone: resume.phone,
        summary: resume.summary,
        themeColor: resume.themeColor,
        photoUrl: resume.photoUrl,
      }),
      addSections({ resumeId: resume.id, ...sectionsToAdd }),
      delSections({ resumeId: resume.id, ...sectionsToDelete }),
      updSections({ resumeId: resume.id, ...sectionToUpdate }),
    ]).then((result) => {
      if (result.every((item) => item.status === "fulfilled")) {
        markSaved();
        toast.success(t("toasts.savedSuccessfully"));
        router.refresh();
      }
    });
  };

  const disableBtn =
    isPending ||
    isAddingSections ||
    isUpdatingSections ||
    isDeletingSections ||
    disabled;

  return isMobile ? (
    <Button
      onClick={handleSave}
      disabled={disableBtn}
      variant="ghost"
      className="flex w-full justify-start gap-4"
    >
      <Save />
      {t("buttons.saveChanges")}
    </Button>
  ) : (
    <Button onClick={handleSave} disabled={disableBtn} variant="outline">
      {t("buttons.saveChanges")}
    </Button>
  );
};
