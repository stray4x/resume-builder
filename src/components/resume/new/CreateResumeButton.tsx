"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";

import { Button } from "../../ui/button";

type Props = {
  templateId: string;
};

export const CreateResumeButton: React.FC<Props> = ({ templateId }) => {
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
    mutate({ templateId });
  };

  useEffect(() => {
    if (isAllowedResult && !isAllowedResult.allowed) {
      router.push(clientUrls.resumes);
    }
  }, [isAllowedResult, router]);

  return (
    <Button onClick={handleCreateResume} disabled={isPending}>
      Create
    </Button>
  );
};
