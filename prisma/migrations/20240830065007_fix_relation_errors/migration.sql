-- AlterTable
ALTER TABLE `session` MODIFY `expires` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `ratingId` INTEGER NULL,

    UNIQUE INDEX `Product_ratingId_key`(`ratingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` DOUBLE NOT NULL,
    `count` INTEGER NOT NULL,
    `productId` INTEGER NULL,

    UNIQUE INDEX `Rating_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ratingId_fkey` FOREIGN KEY (`ratingId`) REFERENCES `Rating`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
