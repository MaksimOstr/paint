import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { DrawingService } from "./drawing.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateDrawingDto } from "./dto/createDrawing.dto";


@UseGuards(JwtAuthGuard)
@Controller('drawing')
export class DrawingController {
    constructor(
        private drawingService: DrawingService
    ) {}


    @Post('save')
    async saveDrawing(
        @Req() req,
        @Body() data: CreateDrawingDto
    ) {
        return await this.drawingService.save(data, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getDrawings(
        @Req() req
    ) {
        return await this.drawingService.getDrawings(req.user.id)
    }
}