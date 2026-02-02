"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { BackgroundDescription } from "./BackgroundDescription";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";

import type { CourseDraft } from "@/store/types";

export const Courses: React.FC = () => {
  const t = useTranslations();

  const courses: CourseDraft[] = useSectionItems("courses");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("courses");

  return (
    <div>
      <SectionTitle>{t("courses")}</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer
          moveItem={moveItem}
          items={courses.map((item) => item.id)}
        >
          {courses.map((item) => {
            return (
              <BackgroundDescription
                key={item.id}
                id={item.id}
                inputOne={item.title}
                inputTwo={item.institution}
                startDate={item.startDate}
                endDate={item.startDate}
                endDateIsCurrent={item.endDateIsCurrent}
                type="course"
                inputLabelOne={t("course")}
                inputLabelTwo={t("institution")}
                handleDeleteItem={deleteItem}
                updateStartDate={(v) => updateItem(item.id, v, "startDate")}
                updateEndDate={(v) => updateItem(item.id, v, "endDate")}
                updateInputOne={(v) => updateItem(item.id, v, "title")}
                updateInputTwo={(v) => updateItem(item.id, v, "institution")}
                updateEndDateIsCurrent={(v) =>
                  updateItem(item.id, v, "endDateIsCurrent")
                }
              />
            );
          })}
        </DndContainer>
      </div>
      <Button
        className="mt-4"
        size="lg"
        variant="link"
        onClick={addItem}
        disabled={courses.length >= 10}
      >
        {!courses.length
          ? t("buttons.addCourse")
          : t("buttons.addOneMoreCourse")}
      </Button>
    </div>
  );
};
