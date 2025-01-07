import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDrawingDto } from "./dto/createDrawing.dto";

@Injectable()
export class DrawingService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async save(drawingData: CreateDrawingDto,  userId: string) {
        const { title, imageData } = drawingData

        return await this.prismaService.drawing.create({
            data: {
                title,
                imageData,
                authorId: userId
            }
        })
    }
    
    async getDrawings(userId: string) {
        return await this.prismaService.drawing.findMany({
            where: { authorId: userId  }
        })
    }
}