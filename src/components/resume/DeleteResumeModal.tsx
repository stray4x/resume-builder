"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { useRouter } from "@/i18n/navigation";
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
  const t = useTranslations();

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
          <DialogTitle className="xxs:w-70 mb-2 w-60 truncate">
            {t("buttons.delete")} &quot;{resumeName}&quot; ?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("thisActionCannotBeUndoneResumeWillBeDeleted")}
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
