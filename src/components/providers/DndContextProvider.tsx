"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import React from "react";

type Props = {
  onDragEnd?: (event: DragEndEvent) => void;
} & React.PropsWithChildren;

export const DndContextProvider: React.FC<Props> = ({
  onDragEnd,
  children,
}) => {
  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
      {children}
    </DndContext>
  );
};
