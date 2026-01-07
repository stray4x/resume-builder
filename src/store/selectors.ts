import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { useResume } from "./store";
import {
  ItemStatus,
  type ResumeSectionDrafts,
  type ResumeSections,
} from "./types";

export function useSectionItems<T>(section: ResumeSections) {
  return useResume(
    useShallow(
      (state) =>
        state[section].filter(
          (item) => item.status !== ItemStatus.Deleted,
        ) as T[],
    ),
  );
}

export function useSectionActions<S extends keyof ResumeSectionDrafts>(
  section: S,
) {
  type Item = ResumeSectionDrafts[S];

  const add = useResume((s) => s.addSectionItem);
  const update = useResume((s) => s.updateSectionItem);
  const move = useResume((s) => s.moveSectionItem);
  const remove = useResume((s) => s.deleteSectionItem);

  const addItem = useCallback(() => {
    add(section);
  }, [add, section]);

  const updateItem = useCallback(
    <K extends keyof Item>(id: string, value: Item[K], field: K) => {
      update(section, id, field, value);
    },
    [update, section],
  );

  const moveItem = useCallback(
    (activeId: string, overId: string) => {
      move(section, activeId, overId);
    },
    [move, section],
  );

  const deleteItem = useCallback(
    (id: string) => {
      remove(section, id);
    },
    [remove, section],
  );

  return {
    addItem,
    updateItem,
    moveItem,
    deleteItem,
  };
}
