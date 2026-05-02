/*
  Warnings:

  - You are about to drop the column `user1id` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the column `user2id` on the `friend` table. All the data in the column will be lost.
  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_fromUser_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_toUser_fkey";

-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_user1id_fkey";

-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_user2id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_senderId_fkey";

-- DropIndex
DROP INDEX "friend_user1id_idx";

-- DropIndex
DROP INDEX "friend_user1id_user2id_key";

-- DropIndex
DROP INDEX "friend_user2id_idx";

-- AlterTable
ALTER TABLE "friend" DROP COLUMN "user1id",
DROP COLUMN "user2id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user1Id" TEXT NOT NULL,
ADD COLUMN     "user2Id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "FriendRequest";

-- CreateTable
CREATE TABLE "friend_request" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "friend_request_senderId_idx" ON "friend_request"("senderId");

-- CreateIndex
CREATE INDEX "friend_request_receiverId_idx" ON "friend_request"("receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "friend_request_senderId_receiverId_key" ON "friend_request"("senderId", "receiverId");

-- CreateIndex
CREATE INDEX "friend_user1Id_idx" ON "friend"("user1Id");

-- CreateIndex
CREATE INDEX "friend_user2Id_idx" ON "friend"("user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "friend_user1Id_user2Id_key" ON "friend"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
