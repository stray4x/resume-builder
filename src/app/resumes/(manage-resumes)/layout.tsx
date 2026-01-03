import React from "react";

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto w-full max-w-10/12 lg:max-w-8/12">{children}</div>
  );
}
