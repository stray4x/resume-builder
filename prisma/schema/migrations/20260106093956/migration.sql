/*
  Warnings:

  - Changed the type of `level` on the `Language` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Legendary');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "level",
ADD COLUMN     "level" "LanguageLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "level",
ADD COLUMN     "level" "SkillLevel" NOT NULL;
