"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteAccountModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const router = useRouter();
  const { isPending, mutate: deleteUser } = api.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("Your account was deleted");
      router.refresh();
      router.push(clientUrls.home);
    },
  });

  const handleDelete = () => {
    deleteUser();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Delete account?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. Your account will be permanently
          deleted.
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
