import {
  Controller,
  Get,
  Post,
  Redirect,
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
import { GoogleAuthGuard } from './guards/google-auth.guard'

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
    const tokens = await this.authService.generateTokens(
      req.user,
      agent,
      userIp,
    )
    this.setRefreshTokenToCookies(tokens.refresh_token, res)
    res.json({ access_token: tokens.access_token })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req): UserWithoutPassword {
    return req.user
  }

  @Get('refresh')
  async refresh(
    @Res() res: Response,
    @userAgent() agent: string,
    @userIp() userIp: string,
    @Cookie('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.refreshTokens(
      refreshToken,
      agent,
      userIp,
    )
    
    this.setRefreshTokenToCookies(tokens.refresh_token, res)
    res.json({ access_token: tokens.access_token })
  }

  private setRefreshTokenToCookies(
    refreshToken: Tokens['refresh_token'],
    res: Response,
  ): void {
    if (!refreshToken) {
      throw new UnauthorizedException()
    }
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(refreshToken.expiresAt),
      path: '/',
      secure: true,
    })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async handleLogin() {
    return { msg: 'ok' }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @Redirect('http://localhost:3000/redirectPage')
  async handleRedirect(
    @Req() req,
    @userAgent() agent: string,
    @userIp() userIp: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.generateTokens(
      req.user,
      agent,
      userIp,
    )
    if (tokens) {
      this.setRefreshTokenToCookies(tokens.refresh_token, res)
      return { url: `http://localhost:3000/redirectPage?token=${tokens.access_token}` }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @userAgent() agent: string,
    @userIp() userIp: string,
    @Cookie('refreshToken') refreshToken: string,
    @Res() res: Response
  ) {
    
    await this.authService.logout(refreshToken, userIp, agent)
    
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(0),
    });
    res.send({ message: 'Cookies cleared successfully' });
  }
}
