import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { SocketsRoom } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('room')
export class EventController {
    constructor(
        private eventService: EventService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createRoom(
        @Req() req
    ): Promise<SocketsRoom> {
        return await this.eventService.createRoom(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deleteRoom(
        @Body('roomId') roomId: string,
        @Req() req
    ): Promise<SocketsRoom | null> {
        return await this.eventService.deleteRoom(roomId, req.user.id)
    }
} 