import type { Prisma } from "generated/prisma";
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
import type { ResumeDraft, ResumeSectionDrafts, ResumeSections } from "./types";

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
    section: K,
    id: string,
    field: keyof ResumeSectionDrafts[K],
    value: ResumeSectionDrafts[K][typeof field],
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

    newItem.id = `new-item-${Date.now()}`;

    set((state) => ({
      ...state,
      [section]: [...state[section], newItem],
    }));
  },

  updateSectionItem: (section, id, field, value) =>
    set((state: ResumeDraft) => ({
      [section]: state[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    })),

  deleteSectionItem: (section: ResumeSections, id: string) =>
    set((state: ResumeDraft) => ({
      [section]: state[section].filter((item) => item.id !== id),
    })),

  reset: () => {
    set(store.getInitialState());
  },
}));
