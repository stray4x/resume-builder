"use client";

import React, { useState } from "react";

import { DeleteAccountModal } from "./DeleteAccountModal";
import { Button } from "../ui/button";

export const DeleteAccountBtn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button variant="destructive" onClick={handleShowModal}>
        Delete account
      </Button>
      <DeleteAccountModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};
