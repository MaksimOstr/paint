import { Module } from "@nestjs/common";
import { RefreshTokenService } from "./refreshToken.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [RefreshTokenService],
    exports: [RefreshTokenService]
})

export class RefreshTokenModule {}