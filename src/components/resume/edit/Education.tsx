"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/components/ui/button";
import { useSectionActions, useSectionItems } from "@/store/selectors";

import { BackgroundDescription } from "./BackgroundDescription";
import { DndContainer } from "./ui/DndContainer";
import { SectionTitle } from "./ui/SectionTitle";

import type { EducationDraft } from "@/store/types";

export const Education: React.FC = () => {
  const t = useTranslations();

  const educ: EducationDraft[] = useSectionItems("education");
  const { addItem, updateItem, deleteItem, moveItem } =
    useSectionActions("education");

  return (
    <div>
      <SectionTitle>{t("education")}</SectionTitle>
      <div className="flex flex-col gap-4">
        <DndContainer moveItem={moveItem} items={educ.map((item) => item.id)}>
          {educ.map((item) => {
            return (
              <BackgroundDescription
                key={item.id}
                id={item.id}
                inputOne={item.school}
                inputTwo={item.degree}
                city={item.city}
                description={item.description}
                startDate={item.startDate}
                endDate={item.endDate}
                endDateIsCurrent={item.endDateIsCurrent}
                type="education"
                inputLabelOne={t("school")}
                inputLabelTwo={t("degree")}
                handleDeleteItem={deleteItem}
                updateStartDate={(v) => updateItem(item.id, v, "startDate")}
                updateEndDate={(v) => updateItem(item.id, v, "endDate")}
                updateInputOne={(v) => updateItem(item.id, v, "school")}
                updateInputTwo={(v) => updateItem(item.id, v, "degree")}
                updateCity={(v) => updateItem(item.id, v, "city")}
                updateDescription={(v) => updateItem(item.id, v, "description")}
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
        disabled={educ.length >= 10}
      >
        {!educ.length
          ? t("buttons.addEducation")
          : t("buttons.addOneMoreEducation")}
      </Button>
    </div>
  );
};
