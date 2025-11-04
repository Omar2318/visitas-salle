import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { CreateVisitorDto, LoginUserDto } from './dto';
import { UserRole } from '../domain/enums';
import { User } from '../infrastructure/data/postgres';
import { Auth, GetUser } from './decorators';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  private returnCookie(res: Response, token: string) {

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60
    });

  }

  @Post('register')
  async createVisitor(@Body() createUserDto: CreateVisitorDto, @Res({passthrough: true}) res: Response) {
    const token = await this.authService.createVisitor(createUserDto);
    this.returnCookie(res,token);
    return {message: 'Bienvenido'};
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) res: Response) {
    const token = await this.authService.login(loginUserDto);
  
    this.returnCookie(res,token);
    return {message: 'Bienvenido'};
  }

  //!El mero mero

  @Get('private3')
  @Auth(UserRole.UniversityAdmin)
  privateRoute3(
    @GetUser() user: User
  ) {
    return 'ok'
  }
}
