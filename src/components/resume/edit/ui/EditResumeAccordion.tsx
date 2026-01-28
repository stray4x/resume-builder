import { Trash } from "lucide-react";
import React from "react";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  handleDeleteItem: (id: string) => void;
} & React.PropsWithChildren;

export const ResumeAccordion: React.FC<Props> = ({
  id,
  children,
  handleDeleteItem,
  ...props
}) => {
  const deleteItem = () => {
    handleDeleteItem(id);
  };

  return (
    <div className="group flex items-start gap-2" {...props}>
      <Accordion type="single" collapsible className="bg-card border py-2">
        <AccordionItem value={id}>{children}</AccordionItem>
      </Accordion>
      <Button
        onClick={deleteItem}
        variant="ghost"
        className="mt-3 transition-opacity duration-200 group-hover:opacity-100 lg:opacity-0"
      >
        <Trash />
      </Button>
    </div>
  );
};
