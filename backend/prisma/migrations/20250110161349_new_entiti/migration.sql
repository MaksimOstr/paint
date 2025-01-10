-- CreateTable
CREATE TABLE "SocketsRoom" (
    "roomId" TEXT NOT NULL,

    CONSTRAINT "SocketsRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocketsRoom_roomId_key" ON "SocketsRoom"("roomId");
