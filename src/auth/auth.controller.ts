import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Body } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req, @Body('newPassword') newPassword: string) {
    return this.authService.changePassword(req.user.sub, newPassword);
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string; phoneNumber: string }) {
    return this.authService.register(body);
  }
}
