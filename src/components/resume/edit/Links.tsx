"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { LinkItem } from "./LinkItem";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";
import { SortableItem } from "./ui/SortableItem";

import type { LinkDraft } from "@/store/types";

export const Links: React.FC = () => {
  const links: LinkDraft[] = useSectionItems("links");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("links");

  return (
    <div>
      <SectionTitle>Links</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer moveItem={moveItem} items={links.map((item) => item.id)}>
          {links.map((item) => {
            return (
              <SortableItem key={item.id} id={item.id}>
                <LinkItem
                  item={item}
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
        disabled={links.length >= 10}
      >
        {!links.length ? "Add link" : "Add one more link"}
      </Button>
    </div>
  );
};
