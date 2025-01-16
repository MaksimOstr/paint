import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { options } from "src/shared/config/jwt-module-options";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenModule } from "src/refreshToken/refreshToken.module";
import { GoogleStrategy } from "./strategies/google.strategy";

@Global()
@Module({
    imports: [
        RefreshTokenModule,
        PassportModule.register({ session: false }),
        UserModule,
        JwtModule.registerAsync(options())
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
    exports: [ JwtModule ]
})

export class AuthModule {}