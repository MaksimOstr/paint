import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthMethod, User } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import passport from 'passport'
import { CreateUserDto } from 'src/shared/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword'
import { RefreshTokenService } from 'src/refreshToken/refreshToken.service'
import { Tokens } from 'src/shared/types/tokens'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(
    username: string,
    pass?: string,
    authMethod?: AuthMethod,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.findUserByIdOrUsername(username)

    if (authMethod === 'GOOGLE') {
      if (!user) {
        return await this.userService.createUser({ username }, authMethod)
      }
    } else if (!(user && (await bcrypt.compare(pass, user.password)))) {
      return null
    }

    const { password, ...result } = user
    return result
  }

  async generateAccessToken(payload: UserWithoutPassword): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }

  async generateTokens(
    payload: UserWithoutPassword,
    userAgent: string,
    userIp: string,
  ): Promise<Tokens> {
    const access_token = await this.generateAccessToken(payload)
    const refresh_token = await this.refreshTokenService.generateRefreshToken(
      payload.id,
      userAgent,
      userIp,
    )
    return { access_token, refresh_token }
  }

  async refreshTokens(
    refreshToken: string,
    userAgent: string,
    userIp: string,
  ): Promise<Tokens> {
    if (!refreshToken) throw new UnauthorizedException()

    const validRefreshToken = await this.refreshTokenService.validateRefreshToken(
        userIp,
        userAgent,
        refreshToken,
      )

    if (!validRefreshToken) {
      throw new UnauthorizedException()
    }

    const { password, ...result } = await this.userService.findUserByIdOrUsername(validRefreshToken.userId)

    return await this.generateTokens(result, userAgent, userIp)
  }

  async logout(token: string, userIp: string, userAgent: string) {

    const deletedToken = await this.refreshTokenService.deleteRefreshToken(userIp, userAgent, token)

    if(!deletedToken) {
      throw new UnauthorizedException()
    }

    return deletedToken
  }
  
}
