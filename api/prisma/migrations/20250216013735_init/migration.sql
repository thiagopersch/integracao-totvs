/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `process` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbcs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "backups" DROP CONSTRAINT "backups_tbc_id_fkey";

-- DropForeignKey
ALTER TABLE "filters" DROP CONSTRAINT "filters_client_id_fkey";

-- DropForeignKey
ALTER TABLE "filters" DROP CONSTRAINT "filters_tbc_id_fkey";

-- DropForeignKey
ALTER TABLE "tbcs" DROP CONSTRAINT "tbcs_client_id_fkey";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "process";

-- DropTable
DROP TABLE "tbcs";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "change_password" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "link_crm" TEXT NOT NULL,
    "site" TEXT,
    "student_qtd" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbc" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "not_required_license" BOOLEAN NOT NULL DEFAULT true,
    "coligate_context" INTEGER NOT NULL,
    "branch_context" INTEGER NOT NULL,
    "level_education_context" INTEGER NOT NULL,
    "cod_system_context" TEXT NOT NULL,
    "user_context" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "tbc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "tbc" ADD CONSTRAINT "tbc_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_tbc_id_fkey" FOREIGN KEY ("tbc_id") REFERENCES "tbc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backups" ADD CONSTRAINT "backups_tbc_id_fkey" FOREIGN KEY ("tbc_id") REFERENCES "tbc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
