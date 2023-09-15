-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "diary_id" SERIAL NOT NULL,
    "diary_content" TEXT NOT NULL,
    "diary_location" TEXT NOT NULL,
    "diary_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diary_updatedAt" TIMESTAMP(3),
    "usersUser_id" INTEGER NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("diary_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_usersUser_id_fkey" FOREIGN KEY ("usersUser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
