import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { UserWithoutPassword } from 'src/shared/types/userWithoutPassword'
import { userAgent } from 'src/shared/decorators/userAgent.decorator'
import { userIp } from 'src/shared/decorators/userIp.decorator'
import { Request, Response } from 'express'
import { Tokens } from 'src/shared/types/tokens'
import { Cookie } from 'src/shared/decorators/cookie.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res() res: Response,
    @Req() req,
    @userAgent() agent: string,
    @userIp() userIp: string,
  ): Promise<void> {
    const tokens = await this.authService.generateTokens(req.user, agent, userIp)
    this.setRefreshTokenToCookies(tokens, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req): UserWithoutPassword {
    return req.user
  }

  @Post('refresh')
  async refresh(
    @Res() res: Response,
    @userAgent() agent: string,
    @userIp() userIp: string,
    @Cookie('refreshToken') refreshToken: string
  ) {
    const tokens = await this.authService.refreshTokens(refreshToken, agent, userIp)
    this.setRefreshTokenToCookies(tokens, res)
  }

  private setRefreshTokenToCookies(tokens: Tokens, res: Response): void {
    if (!tokens) {
      throw new UnauthorizedException()
    }

    res.cookie('refreshToken', tokens.refresh_token.token, {
      httpOnly: true,
      sameSite: 'none',
      expires: new Date(tokens.refresh_token.expiresAt),
      path: '/',
      secure: true,
    })
    res.json({ access_token: tokens.access_token })
  }
}
