"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { LinkItem } from "./LinkItem";

import type { LinkDraft } from "@/store/types";

export const Links: React.FC = () => {
  const links: LinkDraft[] = useSectionItems("links");
  const { addItem, updateItem, deleteItem } = useSectionActions("links");

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Links</h6>
      <div className="flex flex-col gap-4">
        {links.map((item) => {
          return (
            <LinkItem
              key={item.id}
              item={item}
              handleUpdateItem={updateItem}
              handleDeleteItem={deleteItem}
            />
          );
        })}
      </div>
      <Button onClick={addItem} className="mt-4" size="lg" variant="link">
        {!links.length ? "Add link" : "Add one more link"}
      </Button>
    </div>
  );
};
