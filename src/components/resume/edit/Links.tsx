"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { LinkItem } from "./LinkItem";

import type { LinkDraft } from "@/store/types";

export const Links: React.FC = () => {
  const links = useResume((state) => state.links);
  const addLink = useResume((state) => state.addSectionItem);
  const updLink = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addLink("links");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof LinkDraft,
  ) => {
    updLink("links", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Links</h6>
      <div className="flex flex-col gap-4">
        {links.map((item) => {
          return (
            <LinkItem
              key={item.id}
              item={item}
              handleUpdateItem={handleUpdateItem}
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!links.length ? "Add link" : "Add one more link"}
      </Button>
    </div>
  );
};
