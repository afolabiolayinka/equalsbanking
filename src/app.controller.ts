import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserDto } from './auth/dto/user.dto';
import { Public } from 'src/decorator/isPublic';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: UserDto): Promise<any> {
    return this.authService.login(userDto);
  }

  @Post('refresh')
  async refresh(@Param('refreshToken') refreshToken: string): Promise<any> {
    //return this.authService.login(userDto);
  }
}
