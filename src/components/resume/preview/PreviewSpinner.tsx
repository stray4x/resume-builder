"use client";

import { useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useResume } from "@/store/store";

export const PreviewSpinner: React.FC = () => {
  const state = useResume((state) => state);

  const [isChanged, setIsChanged] = useState(false);
  const timerId = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setIsChanged(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    const newTimer = setTimeout(() => {
      setIsChanged(false);
    }, 850);

    timerId.current = newTimer;
  }, [state]);

  return (
    isChanged && (
      <Spinner className="text-primary absolute top-1/2 left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2" />
    )
  );
};
