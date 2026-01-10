"use client";

import React, { useEffect } from "react";

import { useResume } from "@/store/store";
import { normalizeResume } from "@/utils/normalizeResume";

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
  resume: ResumeWithRelations;
};

export const EditResumeForm: React.FC<Props> = ({ resume }) => {
  const setResume = useResume((state) => state.setResume);

  useEffect(() => {
    setResume(normalizeResume(resume));
  }, [resume]);

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
