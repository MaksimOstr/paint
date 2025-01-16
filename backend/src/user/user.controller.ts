import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname } from 'path'
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiParam, ApiResponse, PickType } from '@nestjs/swagger'
import { CreateUserSwaggerResponse } from './swaggerTypeResponses/createUser.swagerResponse'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @ApiCreatedResponse({description: 'New user has been successfully created.', type: CreateUserSwaggerResponse})
  @ApiBadRequestResponse({description: 'User with such a email already exists!'})
  async createUser(@Body() data: CreateUserDto): Promise<UserWithoutPassword> {
    const isUser = await this.userService.findUserByIdOrEmail(data.email)

    if (isUser) {
      throw new BadRequestException('User with such a email already exists!')
    }

    return await this.userService.createUser(data)
  }

  @Get(':idOrEmail')
  @ApiParam({ name: 'idOrUsername', type: String, description: 'Find user by id or username.' })
  
  async findUserByEmailOrId(
    @Param('idOrUsername') idOrEmail: string,
  ): Promise<UserWithoutPassword | null> {
    return await this.userService.findUserByIdOrEmail(idOrEmail)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updateUser')
  @UseInterceptors(FileInterceptor('profileLogo'),)
  async updateUserLogoAndUsername(
    @UploadedFile() profileLogo: Express.Multer.File,
    @Body('username') username: string,
    @Req() req,
  ) {
    return await this.userService.updateUserLogoAndUsername(req.user, {profileLogo , username})
  }
}
