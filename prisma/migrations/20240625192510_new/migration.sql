/*
  Warnings:

  - You are about to drop the `_RoleHasPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RoleHasPermissions` DROP FOREIGN KEY `_RoleHasPermissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RoleHasPermissions` DROP FOREIGN KEY `_RoleHasPermissions_B_fkey`;

-- DropTable
DROP TABLE `_RoleHasPermissions`;
