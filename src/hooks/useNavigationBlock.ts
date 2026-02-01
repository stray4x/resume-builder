"use client";

import { useEffect, useCallback, useRef } from "react";

export function useNavigationBlock(
  shouldBlock: boolean,
  message = "Changes you made may not be saved.",
) {
  const isNavigatingRef = useRef(false);

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        return;
      }

      e.preventDefault();
      e.returnValue = message;
      return message;
    },
    [message],
  );

  useEffect(() => {
    if (!shouldBlock) {
      isNavigatingRef.current = false;
      return;
    }

    // hard navigation (uncached, external links, page refresh)
    window.addEventListener("beforeunload", handleBeforeUnload);

    // soft navigation (cached next links)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link?.href) {
        const isInternalLink = link.href.startsWith(window.location.origin);
        const isHashLink = link.href.includes("#");
        const isSamePage = link.href === window.location.href;

        if (isInternalLink && !isHashLink && !isSamePage) {
          const confirmLeave = window.confirm(message);

          if (!confirmLeave) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            isNavigatingRef.current = true;
          }
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick, true);
      isNavigatingRef.current = false;
    };
  }, [shouldBlock, message, handleBeforeUnload]);
}
