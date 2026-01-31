"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { BackgroundDescription } from "./BackgroundDescription";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";

import type { WorkExperienceDraft } from "@/store/types";

export const WorkExperience: React.FC = () => {
  const t = useTranslations();
  const workExp: WorkExperienceDraft[] = useSectionItems("workExperience");

  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("workExperience");

  return (
    <div>
      <SectionTitle>{t("workExperience")}</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer
          moveItem={moveItem}
          items={workExp.map((item) => item.id)}
        >
          {workExp.map((item) => {
            return (
              <BackgroundDescription
                key={item.id}
                id={item.id}
                inputOne={item.jobTitle}
                inputTwo={item.employer}
                city={item.city}
                description={item.description}
                startDate={item.startDate}
                endDate={item.endDate}
                endDateIsCurrent={item.endDateIsCurrent}
                type="workExperience"
                inputLabelOne={t("jobTitle")}
                inputLabelTwo={t("employer")}
                updateStartDate={(v) => updateItem(item.id, v, "startDate")}
                updateEndDate={(v) => updateItem(item.id, v, "endDate")}
                updateInputOne={(v) => updateItem(item.id, v, "jobTitle")}
                updateInputTwo={(v) => updateItem(item.id, v, "employer")}
                updateCity={(v) => updateItem(item.id, v, "city")}
                updateDescription={(v) => updateItem(item.id, v, "description")}
                updateEndDateIsCurrent={(v) =>
                  updateItem(item.id, v, "endDateIsCurrent")
                }
                handleDeleteItem={deleteItem}
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
        disabled={workExp.length >= 20}
      >
        {!workExp.length
          ? t("buttons.addEmployment")
          : t("buttons.addOneMoreEmployment")}
      </Button>
    </div>
  );
};
