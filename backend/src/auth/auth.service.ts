import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import passport from "passport";
import { CreateUserDto } from "src/shared/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserWithoutPassword } from "src/shared/types/userWithoutPassword";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<UserWithoutPassword> {
        const user = await this.userService.findUserByIdOrUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: UserWithoutPassword): Promise<{ access_token: string }> {
        const payload = { id: user.id, username: user.username, role: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}