"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useSectionItems } from "@/store/selectors";
import { useResume } from "@/store/store";

import { ResumeDocument } from "./ResumeDocument";

import type {
  CourseDraft,
  EducationDraft,
  LanguageDraft,
  LinkDraft,
  ProjectDraft,
  SkillDraft,
  WorkExperienceDraft,
} from "@/store/types";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export const ResumePreview: React.FC = () => {
  const state = useResume((state) => state);

  const educ: EducationDraft[] = useSectionItems("education");
  const workExp: WorkExperienceDraft[] = useSectionItems("workExperience");
  const proj: ProjectDraft[] = useSectionItems("projects");
  const links: LinkDraft[] = useSectionItems("links");
  const skills: SkillDraft[] = useSectionItems("skills");
  const langs: LanguageDraft[] = useSectionItems("languages");
  const courses: CourseDraft[] = useSectionItems("courses");

  const stateCopy = { ...state };

  stateCopy.workExperience = workExp;
  stateCopy.education = educ;
  stateCopy.projects = proj;
  stateCopy.courses = courses;
  stateCopy.links = links;
  stateCopy.skills = skills;
  stateCopy.languages = langs;

  const [isChanged, setIsChanged] = useState(false);
  const timerId = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setIsChanged(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    const newTimer = setTimeout(() => {
      setIsChanged(false);
    }, 400);

    timerId.current = newTimer;
  }, [state]);

  return (
    <div className="relative bg-[#292929]">
      {isChanged ? (
        <Spinner className="text-primary absolute top-1/2 left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <PDFViewer
          className="absolute h-[calc(100vh-64px)] w-full"
          showToolbar={false}
        >
          <ResumeDocument resume={stateCopy} />
        </PDFViewer>
      )}
    </div>
  );
};
