import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthMethod, User } from "@prisma/client";
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

    

    async createUser(data: CreateUserDto, profileLogo?: string, authMethod?: AuthMethod ): Promise<UserWithoutPassword> {
        const { username, password } = data

        return await this.prismaService.user.create({
            data: {
                username,
                password: password ? await bcrypt.hash(password, await bcrypt.genSalt(10)) : null,
                role: ['USER'],
                profileLogo,
                authMethod: authMethod
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