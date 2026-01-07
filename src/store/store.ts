import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

import {
  defaultEducation,
  defaultWorkExperience,
  defaultProject,
  defaultLink,
  defaultSkill,
  defaultLanguage,
  defaultCourse,
} from "./defaultSections";
import {
  ItemStatus,
  type ResumeDraft,
  type ResumeSectionDrafts,
  type ResumeSections,
} from "./types";

export const defaultState: ResumeDraft = {
  id: "",
  templateId: "",
  resumeName: "",
  jobTitle: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  summary: "",
  workExperience: [],
  education: [],
  projects: [],
  links: [],
  skills: [],
  languages: [],
  courses: [],
};

type ResumeStore = ResumeDraft & {
  setField: (field: string, value: string) => void;
  setResume: (resume: ResumeDraft) => void;
  addSectionItem: (section: ResumeSections) => void;
  updateSectionItem: <K extends ResumeSections>(
    section: ResumeSections,
    id: string,
    field: keyof ResumeSectionDrafts[K],
    value: ResumeSectionDrafts[K][typeof field],
  ) => void;
  moveSectionItem: (
    section: ResumeSections,
    activeId: string,
    overId: string,
  ) => void;
  deleteSectionItem: (section: ResumeSections, id: string) => void;
  reset: () => void;
};

export const useResume = create<ResumeStore>((set, get, store) => ({
  ...defaultState,

  setField: (field: string, value: string) => set(() => ({ [field]: value })),

  setResume: (resume: ResumeDraft) => set(() => ({ ...resume })),

  addSectionItem: (section) => {
    let newItem = {} as ResumeSectionDrafts[typeof section];

    switch (section) {
      case "workExperience":
        newItem = { ...defaultWorkExperience };
        break;
      case "education":
        newItem = { ...defaultEducation };
        break;
      case "projects":
        newItem = { ...defaultProject };
        break;
      case "links":
        newItem = { ...defaultLink };
        break;
      case "skills":
        newItem = { ...defaultSkill };
        break;
      case "languages":
        newItem = { ...defaultLanguage };
        break;
      case "courses":
        newItem = { ...defaultCourse };
        break;
    }

    set((state) => ({
      [section]: [
        ...state[section],
        {
          ...newItem,
          id: `new-item-${Date.now()}`,
          sortOrder: BigInt(Date.now()),
        },
      ],
    }));
  },

  updateSectionItem: (section, id, field, value) => {
    if (field === "sortOrder") {
      throw new Error("oh no");
    }
    set((state: ResumeDraft) => ({
      [section]: state[section].map((item) =>
        item.id === id && item.status !== ItemStatus.Deleted
          ? { ...item, [field]: value, status: ItemStatus.Updated }
          : item,
      ),
    }));
  },

  moveSectionItem: (section, activeId, overId) => {
    set((state) => {
      const list = [...state[section]];
      const activeIdx = list.findIndex((a) => a.id === activeId);
      const overIdx = list.findIndex((a) => a.id === overId);

      if (activeIdx === -1 || overIdx === -1) {
        return state;
      }

      const newList = arrayMove(list, activeIdx, overIdx);

      const movedItem = newList[overIdx]!;
      const prev = newList[overIdx - 1];
      const next = newList[overIdx + 1];

      const nextOrder = next ? next.sortOrder : BigInt(prev!.sortOrder) + 1n;
      const prevOrder = prev ? prev.sortOrder : next!.sortOrder - 1n;

      movedItem.sortOrder = (prevOrder + nextOrder) / 2n;

      if (movedItem.status === ItemStatus.Unchanged) {
        movedItem.status = ItemStatus.Updated;
      }

      return { ...state, [section]: newList };
    });
  },

  deleteSectionItem: (section: ResumeSections, id: string) =>
    set((state: ResumeDraft) => ({
      [section]: state[section].map((item) => ({
        ...item,
        status: id === item.id ? ItemStatus.Deleted : item.status,
      })),
    })),

  reset: () => {
    set(store.getInitialState());
  },
}));
