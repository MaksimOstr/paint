import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "src/shared/dto/create-user.dto";
import { UserWithoutPassword } from "src/shared/types/userWithoutPassword";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('create')
    async createUser(
        @Body() data: CreateUserDto
    ): Promise<UserWithoutPassword> {
        return await this.userService.createUser(data)
    }

    @Get(':idOrUsername') 
    async findUserByUsernameOrId(
        @Param('idOrUsername') idOrUsername: string
    ): Promise<UserWithoutPassword | null> {
        return await this.userService.findUserByIdOrUsername(idOrUsername)
    }
}