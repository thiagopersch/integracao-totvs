/*
  Warnings:

  - You are about to drop the column `student_qtd` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `branch_context` on the `tbc` table. All the data in the column will be lost.
  - You are about to drop the column `cod_system_context` on the `tbc` table. All the data in the column will be lost.
  - You are about to drop the column `coligate_context` on the `tbc` table. All the data in the column will be lost.
  - You are about to drop the column `level_education_context` on the `tbc` table. All the data in the column will be lost.
  - You are about to drop the column `user_context` on the `tbc` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link_crm]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[link]` on the table `tbc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branch_context` to the `filters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_system_context` to the `filters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coligate_context` to the `filters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_education_context` to the `filters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_context` to the `filters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "student_qtd";

-- AlterTable
ALTER TABLE "filters" ADD COLUMN     "branch_context" INTEGER NOT NULL,
ADD COLUMN     "cod_system_context" TEXT NOT NULL,
ADD COLUMN     "coligate_context" INTEGER NOT NULL,
ADD COLUMN     "level_education_context" INTEGER NOT NULL,
ADD COLUMN     "user_context" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbc" DROP COLUMN "branch_context",
DROP COLUMN "cod_system_context",
DROP COLUMN "coligate_context",
DROP COLUMN "level_education_context",
DROP COLUMN "user_context";

-- CreateIndex
CREATE UNIQUE INDEX "client_link_crm_key" ON "client"("link_crm");

-- CreateIndex
CREATE UNIQUE INDEX "tbc_link_key" ON "tbc"("link");
