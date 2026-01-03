"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

type Props = {
  formAction: () => Promise<void>;
};

export const DeleteResumeButton: React.FC<Props> = ({ formAction }) => {
  const { pending } = useFormStatus();

  return (
    <Button formAction={formAction} disabled={pending}>
      delete
    </Button>
  );
};
