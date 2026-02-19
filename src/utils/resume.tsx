import { pdf } from "@react-pdf/renderer";
import saveAs from "file-saver";
import toast from "react-hot-toast";

import { type ResumeStore } from "@/store/store";
import {
  type ResumeWithRelations,
  type ResumeDraft,
  ItemStatus,
} from "@/store/types";

import { localStorageKeys } from "./constants/localStorage";
import { resumeColors } from "./constants/resumeColors";
import { ResumeDocument } from "../components/resume/preview/ResumeDocument";

import type { _Translator } from "next-intl";

export const normalizeResume = (resume: ResumeWithRelations): ResumeDraft => {
  return {
    isDirty: false,
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

export const saveResumeToLocalStorage = (resume: ResumeStore) => {
  localStorage.setItem(localStorageKeys.RESUME, stringifyResume(resume));
};

export const saveResumeAsPdf = (resume: ResumeDraft, t: _Translator) => {
  pdf(<ResumeDocument resume={resume} />)
    .toBlob()
    .then((blob) => {
      saveAs(blob, `${resume.resumeName}.pdf`);
    })
    .catch((_) => {
      toast.error(t("toasts.errorWhileGeneratingPdf"));
    });
};
