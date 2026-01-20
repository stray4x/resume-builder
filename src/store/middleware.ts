import toast from "react-hot-toast";

import { localStorageKeys } from "@/utils/constants/localStorage";
import { saveResumeToLocalStorage } from "@/utils/resume";

import { useResume } from "./store";

let unsubscribe: (() => void) | null = null;

export const initResumeAutosave = () => {
  if (typeof window === "undefined") return;
  if (unsubscribe) return;

  const store = useResume;

  unsubscribe = store.subscribe((resume) => {
    if (
      JSON.parse(
        localStorage.getItem(localStorageKeys.AUTOSAVE_RESUME) ?? "false",
      ) as boolean
    ) {
      try {
        saveResumeToLocalStorage(resume);
      } catch (_) {
        toast.error("Something went wrong while saving resume");
      }
    }
  });
};
