/*
  Warnings:

  - Added the required column `proxyNumberId` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `proxyNumberId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `proxy_numbers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isBusy` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `proxy_numbers_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `call_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caller` VARCHAR(191) NOT NULL,
    `receiver` VARCHAR(191) NOT NULL,
    `proxyNumber` VARCHAR(191) NOT NULL,
    `tokenId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_proxyNumberId_fkey` FOREIGN KEY (`proxyNumberId`) REFERENCES `proxy_numbers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `call_logs` ADD CONSTRAINT `call_logs_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `tokens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
