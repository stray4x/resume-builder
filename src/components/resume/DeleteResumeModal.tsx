"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  resumeId: string;
  resumeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteResumeModal: React.FC<Props> = ({
  resumeId,
  resumeName,
  open,
  onOpenChange,
}) => {
  const router = useRouter();
  const { mutate: deleteResume, isPending } =
    api.resume.deleteResume.useMutation();

  const handleDelete = () => {
    deleteResume(
      { resumeId },
      {
        onSuccess: () => {
          router.refresh();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Delete &quot;{resumeName}&quot; ?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. The resume will be permanently deleted.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
