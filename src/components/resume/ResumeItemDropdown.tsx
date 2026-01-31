"use client";

import { EllipsisVertical } from "lucide-react";
import { useTranslations, type _Translator } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/i18n/navigation";
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
  const t = useTranslations();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: copyResume, isPending } = api.resume.copyResume.useMutation({
    onSuccess: () => {
      toast.success(t("toasts.resumeCopied"));
      router.refresh();
    },
    onError: () => {
      toast.error(t("toasts.sumTingWong"));
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
            <DropdownMenuItem onClick={handleCopyResume}>
              {t("buttons.copy")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteModalOpen(true)}
              variant="destructive"
            >
              {t("buttons.delete")}
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
