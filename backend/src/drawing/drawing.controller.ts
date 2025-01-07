import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { DrawingService } from './drawing.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateDrawingDto } from './dto/createDrawing.dto'
import { Drawing } from '@prisma/client'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path'


@UseGuards(JwtAuthGuard)
@Controller('drawing')
export class DrawingController {
  constructor(private drawingService: DrawingService) {}

  @Post('save')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './drawUploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${
            extname(file.originalname) || '.png'
          }`
          callback(null, uniqueName)
        },
      }),
    }),
  )
  async saveDrawing(
    @UploadedFile() canvasImg: Express.Multer.File,
    @Body('title') title: string,
    @Req() req
  ) {
    return await this.drawingService.save({ title, imageData: canvasImg }, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDrawings(@Req() req): Promise<Drawing[]> {
    return await this.drawingService.getDrawings(req.user.id)
  }


  @Delete('delete')
  async deleteDrawing(
    @Body() body
  ) {
    return await this.drawingService.delete(body.id)
  }
}
