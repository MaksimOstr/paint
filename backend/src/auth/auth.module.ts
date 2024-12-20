import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [PassportModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: []
})

export class AuthModule {}