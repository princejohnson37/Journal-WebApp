/*
  Warnings:

  - You are about to drop the column `usersUser_id` on the `Diary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "usersUser_id",
ALTER COLUMN "userUser_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
