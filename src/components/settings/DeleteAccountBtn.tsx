"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { DeleteAccountModal } from "./DeleteAccountModal";
import { Button } from "../ui/button";

export const DeleteAccountBtn: React.FC = () => {
  const t = useTranslations("buttons");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button variant="destructive" onClick={handleShowModal}>
        {t("deleteAccount")}
      </Button>
      <DeleteAccountModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};
