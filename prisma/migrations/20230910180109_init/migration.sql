/*
  Warnings:

  - Added the required column `userUser_id` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_usersUser_id_fkey";

-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "userUser_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
