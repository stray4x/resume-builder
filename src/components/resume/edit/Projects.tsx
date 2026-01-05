"use client";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";
import React from "react";
import { BackgroundDescription } from "./BackgroundDescription";
import type { EducationDraft, ProjectDraft } from "@/store/types";
import { ProjectItem } from "./ProjectItem";

export const Projects: React.FC = () => {
  const educ = useResume((state) => state.projects);
  const addProj = useResume((state) => state.addSectionItem);
  const updProj = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addProj("projects");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof ProjectDraft,
  ) => {
    updProj("projects", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Projects</h6>
      <div className="flex flex-col gap-4">
        {educ.map((item) => {
          return (
            <ProjectItem
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              repoUrl={item.repoUrl}
              description={item.description}
              updateDescription={(v) =>
                handleUpdateItem(item.id, v, "description")
              }
              handleUpdateItem={handleUpdateItem}
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg">
        {!educ.length ? "Add project" : "Add one more project"}
      </Button>
    </div>
  );
};
