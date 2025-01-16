import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { LobbyService } from './lobby.service'
import { SocketsRoom } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join } from 'path'
import { Response } from 'express';
import { exists, existsSync, fstat } from 'fs'

@Controller('lobby')
export class LobbyController {
  constructor(private eventService: LobbyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRoom(@Req() req): Promise<SocketsRoom> {
    return await this.eventService.createRoom(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteRoom(
    @Body('roomId') roomId: string,
    @Req() req,
  ): Promise<SocketsRoom | null> {
    return await this.eventService.deleteRoom(roomId, req.user.id)
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('canvas', {
      storage: diskStorage({
        destination: './uploads/canvases',
        filename: (req, file, cb) => {
          const roomId = req.headers['roomid'];
          if (!roomId) {
            cb(new Error('Room ID is missing'), null);
          } else {
            cb(null, `${roomId}.png`);
          }
        },
      }),
    }),
  )
  saveLobbyImage(@UploadedFile() file: Express.Multer.File, @Body() test) {
    return { message: 'Canvas saved successfully!' }
  }

  @Get('getCanvas/:roomId')
  getLobbyCanvas(@Param('roomId') roomId: string) {
    const filePath = `http://localhost:4000/uploads/canvases/${roomId}.png`;
    const localFilePath = join(process.cwd(), './uploads/canvases', `${roomId}.png`);
    
    if(existsSync(localFilePath)) {
      return {filePath}
    }

    return ''
  }
}
