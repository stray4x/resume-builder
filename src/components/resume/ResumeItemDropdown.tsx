"use client";

import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { api } from "@/trpc/react";

import { DeleteResumeModal } from "./DeleteResumeModal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

import type { Resume } from "generated/prisma";

type Props = {
  resume: Resume;
};

export const ResumeItemDropdown: React.FC<Props> = ({ resume }) => {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: copyResume, isPending } = api.resume.copyResume.useMutation({
    onSuccess: () => {
      toast.success("Resume was copied successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleCopyResume = () => {
    copyResume({ resumeId: resume.id });
  };

  return (
    <>
      {isPending && <Spinner />}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleCopyResume}>Copy</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteModalOpen(true)}
              variant="destructive"
            >
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
