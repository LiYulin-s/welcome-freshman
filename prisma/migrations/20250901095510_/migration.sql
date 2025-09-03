/*
  Warnings:

  - You are about to drop the column `studentId` on the `profile` table. All the data in the column will be lost.
  - Added the required column `phone` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qq` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentNum` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."profile" DROP COLUMN "studentId",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "qq" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "studentNum" TEXT NOT NULL;
