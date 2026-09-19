/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "type" "VoteType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_postId_key" ON "likes"("userId", "postId");
