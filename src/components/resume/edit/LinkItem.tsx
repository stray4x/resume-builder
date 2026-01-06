"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { LinkDraft } from "@/store/types";

type Props = {
  item: LinkDraft;
  handleUpdateItem: (id: string, value: string, field: keyof LinkDraft) => void;
};

export const LinkItem: React.FC<Props> = ({ item, handleUpdateItem }) => {
  const { id, url, title } = item;

  return (
    <Accordion type="single" collapsible className="border py-2">
      <AccordionItem value={id}>
        <AccordionTrigger>{title || "(Empty)"}</AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between gap-8">
            <div className="w-full">
              <Label htmlFor={`link-title-${id}`} className="mb-2">
                Label
              </Label>
              <Input
                id={`link-title-${id}`}
                value={title}
                placeholder="Label"
                onChange={(e) => handleUpdateItem(id, e.target.value, "title")}
              />
            </div>
            <div className="w-full">
              <Label htmlFor={`link-url-${id}`} className="mb-2">
                Link
              </Label>
              <Input
                id={`link-url-${id}`}
                value={url}
                placeholder="Link"
                onChange={(e) => handleUpdateItem(id, e.target.value, "url")}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
