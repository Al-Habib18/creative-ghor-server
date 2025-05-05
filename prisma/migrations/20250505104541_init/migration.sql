/*
  Warnings:

  - You are about to drop the column `orderId` on the `ShippingAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderStatus" SET DEFAULT 'PENDING',
ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "orderId";
