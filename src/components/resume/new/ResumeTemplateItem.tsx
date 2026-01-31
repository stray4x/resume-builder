"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/i18n/navigation";
import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";

import type { ResumeTemplate } from "generated/prisma";

type Props = {
  template: ResumeTemplate;
};

export const ResumeTemplateItem: React.FC<Props> = ({ template }) => {
  const router = useRouter();

  const { data: isAllowedResult } =
    api.resume.isUserAllowedToCreateNewResume.useQuery();

  const { mutate, isPending } = api.resume.createNewResume.useMutation({
    onSuccess: (data) => {
      router.refresh();
      router.push(clientUrls.editResume(data.id));
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateResume = () => {
    mutate({ templateId: template.id });
  };

  useEffect(() => {
    if (isAllowedResult && !isAllowedResult.allowed) {
      router.push(clientUrls.resumes);
    }
  }, [isAllowedResult, router]);

  return (
    <li
      key={template.id}
      className="mb-2 flex cursor-pointer flex-col items-center justify-center gap-2"
      onClick={handleCreateResume}
    >
      <span className="text-lg">{template.displayName}</span>
      <div className="hover:border-foreground rounded border bg-white">
        <Image
          src={template.imageUrl}
          width={172}
          height={240}
          alt="Default Template"
          objectFit="cover"
          className={isPending ? "opacity-50" : ""}
        />
      </div>
    </li>
  );
};
