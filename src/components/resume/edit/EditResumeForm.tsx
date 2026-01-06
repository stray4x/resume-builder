"use client";

import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/store/store";
import { normalizeResume } from "@/utils/normalizeResume";

import { Courses } from "./Courses";
import { Details } from "./Details";
import { Education } from "./Education";
import { Languages } from "./Languages";
import { Links } from "./Links";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";

import type { ResumeWithRelations } from "@/store/types";

type Props = {
  resume: ResumeWithRelations;
};

export const EditResumeForm: React.FC<Props> = ({ resume }) => {
  const resumeName = useResume((state) => state.resumeName);
  const setResumeName = useResume((state) => state.setField);
  const setResume = useResume((state) => state.setResume);

  useEffect(() => {
    setResume(normalizeResume(resume));
  }, [resume]);

  return (
    <div className="mb-8 flex flex-col gap-12">
      <div>
        <Label htmlFor="resumeName" className="mb-2">
          Resume Name
        </Label>
        <Input
          id="resumeName"
          placeholder="Resume Name"
          value={resumeName}
          onChange={(e) => setResumeName("resumeName", e.target.value)}
        />
      </div>
      <Details />
      <Summary />
      <WorkExperience />
      <Projects />
      <Education />
      <Links />
      <Skills />
      <Languages />
      <Courses />
    </div>
  );
};
