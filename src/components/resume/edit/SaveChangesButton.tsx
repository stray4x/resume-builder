"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";
import { ItemStatus } from "@/store/types";
import { api } from "@/trpc/react";

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

export const SaveChangesButton: React.FC = () => {
  const router = useRouter();

  const resume = useResume((state) => state);

  const { mutateAsync: updateResume, isPending } =
    api.resume.updateResume.useMutation({
      onError: (e) => {
        handleError(e, "Something went wrong while updating resume");
      },
    });

  const { mutateAsync: addSections } = api.resume.addSections.useMutation({
    onError: (e) => {
      handleError(e, "Something went wrong while adding sections");
    },
  });

  const { mutateAsync: updSections } = api.resume.updateSections.useMutation({
    onError: (e) => {
      handleError(e, "Something went wrong while updating sections");
    },
  });

  const { mutateAsync: delSections } = api.resume.deleteSections.useMutation({
    onError: (e) => {
      handleError(e, "Something went wrong while deleting sections");
    },
  });

  const handleSave = async () => {
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
      }),
      addSections({ resumeId: resume.id, ...sectionsToAdd }),
      delSections({ resumeId: resume.id, ...sectionsToDelete }),
      updSections({ resumeId: resume.id, ...sectionToUpdate }),
    ]).then((result) => {
      if (result.every((item) => item.status === "fulfilled")) {
        toast.success("Saved successfully!");
        router.refresh();
      }
    });
  };

  return (
    <Button onClick={handleSave} disabled={isPending}>
      Save Changes
    </Button>
  );
};
