import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}