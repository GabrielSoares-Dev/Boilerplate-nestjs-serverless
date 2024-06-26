-- CreateTable
CREATE TABLE `_RoleHasPermissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleHasPermissions_AB_unique`(`A`, `B`),
    INDEX `_RoleHasPermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RoleHasPermissions` ADD CONSTRAINT `_RoleHasPermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleHasPermissions` ADD CONSTRAINT `_RoleHasPermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
