import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { randomBytes } from 'crypto'
import { RefreshToken } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Tokens } from 'src/shared/types/tokens'

@Injectable()
export class RefreshTokenService {
  constructor(private prismaService: PrismaService) {}

  async generateRefreshToken(
    userId: string,
    userAgent: string,
    userIp: string,
    expiresIn: number = 7 * 24 * 60 * 60,
  ): Promise<Tokens['refresh_token']> {

    const token = randomBytes(32).toString('hex')
    const hashedToken = await bcrypt.hash(token, 10)

    const expiresAt = new Date()
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn)

    await this.prismaService.refreshToken.upsert({
      where: {
        userId_userAgent_userIp: {
          userAgent,
          userId,
          userIp,
        },
      },
      update: {
        token: hashedToken,
        expiresAt,
      },
      create: {
        userId,
        userAgent,
        userIp,
        token: hashedToken,
        expiresAt,
      },
    })

    return {
      token,
      expiresAt,
    }
  }

  async validateRefreshToken(
    userIp: string,
    userAgent: string,
    token: string,
  ): Promise<RefreshToken | false> {
    
    const validToken = await this.compareTokenFromMany(userAgent, userIp, token)
    
    if(!validToken) {
      return false
    }

    if (validToken.expiresAt < new Date()) {
      await this.prismaService.refreshToken.delete({
        where: { id: validToken.id },
      })
      return false
    }

    return validToken
  }

  async deleteRefreshToken(userIp: string, userAgent: string, token: string) {

    const validToken = await this.compareTokenFromMany(userAgent, userIp, token)

    if(!validToken) {
      return false
    }
    
    return await this.prismaService.refreshToken.delete({
      where: {
        id: validToken.id
      }
    })
  }

  async compareTokenFromMany(userAgent: string, userIp: string, token: string): Promise<RefreshToken | false>  {
    const storedTokens = await this.prismaService.refreshToken.findMany({
      where: { userAgent, userIp },
    })

    if (!storedTokens || storedTokens.length === 0) {
      return false
    }
    
    let validToken: RefreshToken | undefined
    for(const storedToken of storedTokens) {
      const isTokenValid = await bcrypt.compare(token, storedToken.token)
      if(isTokenValid) {
        validToken = storedToken
        break
      }
    }

    return validToken
  }
}
