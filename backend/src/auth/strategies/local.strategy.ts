import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<UserWithoutPassword> {
    const user = await this.authService.validateUser(email, undefined, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password!');
    }
    return user;
  }
}