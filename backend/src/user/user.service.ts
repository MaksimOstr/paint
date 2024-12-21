import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/shared/dto/create-user.dto";
import { userSelect } from "src/shared/selectors/user.select";
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from "src/shared/types/userWithoutPassword";

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) {}



    async createUser(data: CreateUserDto): Promise<UserWithoutPassword> {
        const { username, password } = data

        const isUser = await this.findUserByIdOrUsername(username)

        if(isUser) {
            throw new BadRequestException('User with such a username already exists!')
        }

        return await this.prismaService.user.create({
            data: {
                username,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
                role: ['USER']
            },
            select: userSelect
        })
    }

    async findUserByIdOrUsername(param: string): Promise<User | null> {
        return await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: param }, { id: param }]
            }
        })
    }

    
}