/*
  Warnings:

  - You are about to drop the column `suplier_id` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `Supliers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `supplier_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_suplier_id_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "suplier_id",
ADD COLUMN     "supplier_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Supliers";

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
