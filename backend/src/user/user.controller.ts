import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "src/shared/dto/create-user.dto";
import { UserWithoutPassword } from "src/shared/types/userWithoutPassword";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('create')
    async createUser(
        @Body() data: CreateUserDto
    ): Promise<UserWithoutPassword> {
        const isUser = await this.userService.findUserByIdOrEmail(data.email)

        if(isUser) {
            throw new BadRequestException('User with such a email already exists!')
        }
        
        return await this.userService.createUser(data)
    }

    @Get(':idOrEmail') 
    async findUserByEmailOrId(
        @Param('idOrUsername') idOrEmail: string
    ): Promise<UserWithoutPassword | null> {
        return await this.userService.findUserByIdOrEmail(idOrEmail)
    }


    @UseGuards(JwtAuthGuard)
    @Patch('/updateUser')
    async updateUserLogoAndUsername (
        @Body() data: any,
        @Req() req
    ) {
        const access_token = await this.userService.updateUserLogoAndUsername(req.user, data)
        return access_token
    }
    
}