"use client";

import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

import { DeleteResumeModal } from "./DeleteResumeModal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import type { Resume } from "generated/prisma";

type Props = {
  resume: Resume;
};

export const ResumeItemDropdown: React.FC<Props> = ({ resume }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteResumeModal
        resumeId={resume.id}
        resumeName={resume.resumeName}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
    </>
  );
};
