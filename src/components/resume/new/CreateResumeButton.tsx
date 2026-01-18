"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { api } from "@/trpc/react";
import { clientUrls } from "@/utils/urls";

import { Button } from "../../ui/button";

type Props = {
  templateId: string;
};

export const CreateResumeButton: React.FC<Props> = ({ templateId }) => {
  const router = useRouter();

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

  return (
    <Button onClick={handleCreateResume} disabled={isPending}>
      Create
    </Button>
  );
};
