import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import passport from "passport";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
        const user = await this.userService.findUserByIdOrUsername(username);
        console.log(user)
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async login(user: Omit<User, 'password'>) {
        
    }
}