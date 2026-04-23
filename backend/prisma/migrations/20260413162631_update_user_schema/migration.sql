/*
  Warnings:

  - A unique constraint covering the columns `[emailHash]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneHash]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- DropIndex
DROP INDEX `users_phone_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `emailHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneHash` VARCHAR(191) NOT NULL,
    MODIFY `name` TEXT NOT NULL,
    MODIFY `phone` TEXT NOT NULL,
    MODIFY `email` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_emailHash_key` ON `users`(`emailHash`);

-- CreateIndex
CREATE UNIQUE INDEX `users_phoneHash_key` ON `users`(`phoneHash`);
