/*
  Warnings:

  - A unique constraint covering the columns `[privateToken]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `privateToken` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `privateToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tokens_privateToken_key` ON `tokens`(`privateToken`);
