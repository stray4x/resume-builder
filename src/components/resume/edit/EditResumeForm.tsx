"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import { useResume } from "@/store/store";
import { normalizeResume, parseResume } from "@/utils/normalizeResume";
import { clientUrls } from "@/utils/urls";

import { Courses } from "./Courses";
import { Details } from "./Details";
import { Education } from "./Education";
import { Languages } from "./Languages";
import { Links } from "./Links";
import { Projects } from "./Projects";
import { Settings } from "./Settings";
import { Skills } from "./Skills";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";

import type { ResumeWithRelations } from "@/store/types";

type Props = {
  resume?: ResumeWithRelations | null;
};

export const EditResumeForm: React.FC<Props> = ({ resume }) => {
  const path = usePathname();

  const setResume = useResume((state) => state.setResume);
  const resetResume = useResume((state) => state.reset);

  useEffect(() => {
    if (resume) {
      setResume(normalizeResume(resume));
    }

    return () => {
      resetResume();
    };
  }, [resume]);

  useEffect(() => {
    if (path === clientUrls.resumeBuilder) {
      const resume = parseResume();

      if (Object.keys(resume).length) {
        setResume(resume);
      }
    }
  }, []);

  return (
    <div className="mb-8 flex flex-col gap-12">
      <Settings />
      <Details />
      <Summary />
      <div className="-mr-10 flex flex-col gap-12">
        <WorkExperience />
        <Projects />
        <Education />
        <Links />
        <Skills />
        <Languages />
        <Courses />
      </div>
    </div>
  );
};
