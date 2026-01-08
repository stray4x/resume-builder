"use client";

import React from "react";

export const SectionTitle: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <h6 className="mb-4 text-xl font-bold">{children}</h6>;
};
