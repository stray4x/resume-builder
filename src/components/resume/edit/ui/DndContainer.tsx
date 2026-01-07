/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { SortableContext } from "@dnd-kit/sortable";
import React from "react";

import { DndContextProvider } from "@/components/providers/DndContextProvider";

import type { DragEndEvent } from "@dnd-kit/core";

type Props = {
  items: string[];
  moveItem: (activeId: string, overId: string) => void;
} & React.PropsWithChildren;

export const DndContainer: React.FC<Props> = ({
  items,
  moveItem,
  children,
}) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const activeId = active.id;
    const overId = over?.id;

    if (!overId || activeId === overId) {
      return;
    }

    moveItem(activeId as string, overId as string);
  };

  return (
    <DndContextProvider onDragEnd={onDragEnd}>
      <SortableContext items={items}>{children}</SortableContext>
    </DndContextProvider>
  );
};
