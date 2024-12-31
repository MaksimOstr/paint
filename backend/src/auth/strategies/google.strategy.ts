import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { UserWithoutPassword } from "src/shared/types/userWithoutPassword";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
        clientID: configService.get('CLIENT_ID'),
        clientSecret: configService.get('CLIENT_SECRET'),
        callbackURL: configService.get('CALLBACK_URL'),
        scope: ['profile', 'email'],
        session: false
    });
  }

  async validate(accessToken: string, refreshToken: string, profile ): Promise<UserWithoutPassword> {
     return await this.authService.validateUser(profile.displayName.replace(/\s+/g, ''), undefined, 'GOOGLE', profile.photos[0].value);
  }
}