"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { ProjectItem } from "./ProjectItem";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";
import { SortableItem } from "./ui/SortableItem";

import type { ProjectDraft } from "@/store/types";

export const Projects: React.FC = () => {
  const projects: ProjectDraft[] = useSectionItems("projects");
  const { addItem, updateItem, moveItem, deleteItem } =
    useSectionActions("projects");

  return (
    <div>
      <SectionTitle>Projects</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer
          moveItem={moveItem}
          items={projects.map((item) => item.id)}
        >
          {projects.map((item) => {
            return (
              <SortableItem key={item.id} id={item.id}>
                <ProjectItem
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  repoUrl={item.repoUrl}
                  description={item.description}
                  updateDescription={(v) =>
                    updateItem(item.id, v, "description")
                  }
                  handleUpdateItem={updateItem}
                  handleDeleteItem={deleteItem}
                />
              </SortableItem>
            );
          })}
        </DndContainer>
      </div>
      <Button
        className="mt-4"
        size="lg"
        variant="link"
        onClick={addItem}
        disabled={projects.length >= 10}
      >
        {!projects.length ? "Add project" : "Add one more project"}
      </Button>
    </div>
  );
};
