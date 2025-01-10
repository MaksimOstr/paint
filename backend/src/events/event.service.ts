import { Injectable } from "@nestjs/common";
import { SocketsRoom } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class EventService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async createRoom(userId: string): Promise<SocketsRoom> {
        return await this.prismaService.socketsRoom.create({
            data: { creatorId:  userId }
        })
    }

    async deleteRoom(roomId: string, userId: string): Promise<SocketsRoom> {
        const room = await this.prismaService.socketsRoom.findUnique({ where: { roomId } });
        if (room?.creatorId === userId) {
          return await this.prismaService.socketsRoom.delete({ where: { roomId } });
        }
    }
}