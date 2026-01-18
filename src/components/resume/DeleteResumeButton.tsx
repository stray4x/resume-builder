"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

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
