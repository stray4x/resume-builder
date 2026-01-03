"use client";

import React from "react";
import { Button } from "../../ui/button";
import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  templateId: string;
};

export const CreateResumeButton: React.FC<Props> = ({ templateId }) => {
  const router = useRouter();

  const { mutate, isPending } = api.resume.createNewResume.useMutation({
    onSuccess: (data) => {
      router.push(clientUrls.resumeId(data.id));
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateResume = () => {
    mutate({ templateId });
  };

  return (
    <Button onClick={handleCreateResume} disabled={isPending}>
      Create
    </Button>
  );
};
