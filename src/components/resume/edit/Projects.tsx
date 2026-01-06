"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { ProjectItem } from "./ProjectItem";

import type { ProjectDraft } from "@/store/types";

export const Projects: React.FC = () => {
  const projects: ProjectDraft[] = useSectionItems("projects");
  const { addItem, updateItem, deleteItem } = useSectionActions("projects");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Projects</h6>
      <div className="flex flex-col gap-4">
        {projects.map((item) => {
          return (
            <ProjectItem
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              repoUrl={item.repoUrl}
              description={item.description}
              updateDescription={(v) => updateItem(item.id, v, "description")}
              handleUpdateItem={updateItem}
              handleDeleteItem={deleteItem}
            />
          );
        })}
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!projects.length ? "Add project" : "Add one more project"}
      </Button>
    </div>
  );
};
