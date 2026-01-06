"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { useResume } from "@/store/store";

import { BackgroundDescription } from "./BackgroundDescription";

import type { CourseDraft } from "@/store/types";

export const Courses: React.FC = () => {
  const courses = useResume((state) => state.courses);
  const addCourse = useResume((state) => state.addSectionItem);
  const updCourse = useResume((state) => state.updateSectionItem);

  const handleAddNew = () => {
    addCourse("courses");
  };

  const handleUpdateItem = (
    id: string,
    value: string,
    field: keyof CourseDraft,
  ) => {
    updCourse("courses", id, field, value);
  };

  return (
    <div>
      <h6 className="mb-4 text-xl font-bold">Courses</h6>
      <div className="flex flex-col gap-4">
        {courses.map((item) => {
          return (
            <BackgroundDescription
              key={item.id}
              id={item.id}
              inputOne={item.title}
              inputTwo={item.institution}
              type="course"
              inputLabelOne="Course"
              inputLabelTwo="Institution"
              updateInputOne={(v) => handleUpdateItem(item.id, v, "title")}
              updateInputTwo={(v) =>
                handleUpdateItem(item.id, v, "institution")
              }
            />
          );
        })}
      </div>
      <Button onClick={handleAddNew} className="mt-4" size="lg" variant="link">
        {!courses.length ? "Add course" : "Add one more course"}
      </Button>
    </div>
  );
};
