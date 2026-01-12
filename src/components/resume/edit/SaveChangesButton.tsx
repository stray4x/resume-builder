"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";
import { ItemStatus } from "@/store/types";
import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";

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

export const SaveChangesButton: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const { id } = useParams();

  const resume = useResume((state) => state);

  const { mutateAsync: updateResume, isPending } =
    api.resume.updateResume.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  const { mutateAsync: addSections } = api.resume.addSections.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      toast.error("Something went wrong while adding sections");
    },
  });

  const { mutateAsync: updSections } = api.resume.updateSections.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      toast.error("Something went wrong while updating sections");
    },
  });

  const { mutateAsync: delSections } = api.resume.deleteSections.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      toast.error("Something went wrong while deleting sections");
    },
  });

  if (!path.includes(clientUrls.editResume(id as string))) {
    return null;
  }

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

    // todo: handle errors
    await Promise.all([
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
    ]).then(() => toast.success("Saved successfully!"));

    router.refresh();
  };

  return (
    <Button onClick={handleSave} disabled={isPending}>
      Save Changes
    </Button>
  );
};
