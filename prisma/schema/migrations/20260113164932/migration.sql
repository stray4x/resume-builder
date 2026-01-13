-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "endDateIsCurrent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "endDateIsCurrent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "endDateIsCurrent" BOOLEAN NOT NULL DEFAULT false;
