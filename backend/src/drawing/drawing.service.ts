import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDrawingDto } from "./dto/createDrawing.dto";
import { Drawing } from "@prisma/client";
import { gzipSync } from "zlib";

@Injectable()
export class DrawingService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async save(drawingData: CreateDrawingDto,  userId: string): Promise<Drawing> {
        const { title, imageData } = drawingData

        const drawingPath = `/drawuploads/${imageData.filename}`

        return await this.prismaService.drawing.create({
            data: {
                title,
                imageData: drawingPath, 
                authorId: userId
            }
        })
    }
    
    async getDrawings(userId: string): Promise<Drawing[]> {
        return await this.prismaService.drawing.findMany({
            where: { authorId: userId  }
        })
    }

    async delete(drawingId: string) {
        return await this.prismaService.drawing.delete({
            where: { id: drawingId }
        })
    }
}