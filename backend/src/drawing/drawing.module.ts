import { Module } from "@nestjs/common";
import { DrawingService } from "./drawing.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { DrawingController } from "./drawing.controller";

@Module({
    imports: [PrismaModule],
    controllers: [DrawingController],
    providers: [
        DrawingService
    ]
})

export class DrawingModule {}