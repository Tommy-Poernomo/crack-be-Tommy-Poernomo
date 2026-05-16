import { Body, Controller, Post, Get, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport' ;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt')) //hanya yang punya token bisa lewat
  @Get('profile')
  getProfile(@Request() req){
  return req.user;
  }

  @UseGuards(AuthGuard('jwt')) // Amankan data user dengan JWT token
  @Get('users')
  getUsers() {
    return this.authService.findAllUsers();
  }
}