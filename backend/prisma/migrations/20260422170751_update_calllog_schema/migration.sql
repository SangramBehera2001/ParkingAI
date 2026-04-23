-- AlterTable
ALTER TABLE `call_logs` ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `endedAt` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;
