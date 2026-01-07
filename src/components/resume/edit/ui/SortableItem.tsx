import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import React from "react";

type Props = { id: string } & React.PropsWithChildren;

export const SortableItem: React.FC<Props> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} className="-ml-10 flex items-start">
      <button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-pointer px-2 py-4 opacity-25 transition-opacity hover:opacity-60"
      >
        <GripVertical />
      </button>
      <div className="w-full">{children}</div>
    </div>
  );
};
