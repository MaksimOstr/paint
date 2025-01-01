import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { AuthMethod, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from 'src/shared/dto/create-user.dto'
import { userSelect } from 'src/shared/selectors/user.select'
import * as bcrypt from 'bcrypt'
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword'
import { JwtService } from '@nestjs/jwt'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async createUser(
    data: CreateUserDto,
    profileLogo?: string,
    authMethod?: AuthMethod,
  ): Promise<UserWithoutPassword> {
    const { username, password, email } = data

    return await this.prismaService.user.create({
      data: {
        email,
        username,
        password: password
          ? await bcrypt.hash(password, await bcrypt.genSalt(10))
          : null,
        role: ['USER'],
        profileLogo,
        authMethod: authMethod,
      },
      select: userSelect,
    })
  }

  async findUserByIdOrEmail(param: string): Promise<User | null> {
    console.log(param)
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: param }, { id: param }],
      },
    })
  }
  
  async updateUserLogoAndUsername(userData: UserWithoutPassword, updateData: UpdateUserDto) {

    const { username, id, email, role } = userData

    const payload: Omit<UserWithoutPassword, 'authMethod'> = {
        email,
        id,
        username: updateData.username,
        role,
        profileLogo: updateData.profileLogo
    }

    const access_token = await this.jwtService.signAsync(payload)

    await this.prismaService.user.update({
      where: {
        id,
        username,
      },
      data: {
        username: updateData.username,
        profileLogo: updateData.profileLogo,
      }
    })

    return {access_token}
  }
}
