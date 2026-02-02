"use client";

import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/i18n/navigation";
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
  const t = useTranslations();

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
          <DialogTitle className="mb-2">
            {t("settings.deleteAccount?")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("thisActionCannotBeUndoneAccountWillBeDeleted")}
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("buttons.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? t("deleting") : t("buttons.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
