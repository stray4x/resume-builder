/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from "react-hot-toast";

import {
  type ResumeWithRelations,
  type ResumeDraft,
  ItemStatus,
} from "@/store/types";

import { localStorageKeys } from "./constants/localStorage";
import { resumeColors } from "./constants/resumeColors";

export const normalizeResume = (resume: ResumeWithRelations): ResumeDraft => {
  return {
    id: resume.id,
    templateId: resume.templateId,
    resumeName: resume.resumeName,
    jobTitle: resume.jobTitle,
    firstName: resume.firstName,
    lastName: resume.lastName,
    email: resume.email,
    phone: resume.phone,
    country: resume.country,
    city: resume.city,
    summary: resume.summary,
    themeColor: resume.themeColor || resumeColors.Blue,
    photoUrl: resume.photoUrl,

    workExperience: resume.workExperience.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    education: resume.education.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    projects: resume.projects.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    links: resume.links.map(({ resumeId, createdAt, updatedAt, ...item }) => ({
      ...item,
      status: ItemStatus.Unchanged,
    })),
    skills: resume.skills.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
    languages: resume.languages
      .map(({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }))
      .sort(),
    courses: resume.courses.map(
      ({ resumeId, createdAt, updatedAt, ...item }) => ({
        ...item,
        status: ItemStatus.Unchanged,
      }),
    ),
  };
};

export const stringifyResume = (resume: ResumeDraft) =>
  JSON.stringify(resume, (key, value) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    key === "sortOrder"
      ? { __type: "bigint", value: (value as bigint).toString() }
      : value,
  );

export const parseResume = () =>
  JSON.parse(
    localStorage.getItem(localStorageKeys.RESUME) ?? "{}",
    // bigint parse
    (_, value: { __type: string; value: string }) =>
      value && typeof value === "object" && value.__type === "bigint"
        ? BigInt(value.value)
        : value,
  ) as ResumeDraft;

export const saveResumeToLocalStorage = (resume: ResumeDraft) => {
  localStorage.setItem(localStorageKeys.RESUME, stringifyResume(resume));
};
