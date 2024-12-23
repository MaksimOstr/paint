/*
  Warnings:

  - A unique constraint covering the columns `[userId,user-agent,user-ip]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_user-agent_user-ip_key" ON "RefreshToken"("userId", "user-agent", "user-ip");
