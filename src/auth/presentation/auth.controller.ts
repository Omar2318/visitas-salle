import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { CreateVisitorDto, LoginUserDto } from './dto';
import { UserRole } from '../domain/enums';
import { User } from '../infrastructure/data/postgres';
import { Auth, GetUser } from './decorators';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  private returnCookie(res: Response, payload: string) {
    res.clearCookie('token');

    res.cookie('token', payload, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60
    });

  }

  @Post('register')
  async createVisitor(@Body() createUserDto: CreateVisitorDto, @Res({passthrough: true}) res: Response) {
    const payload = await this.authService.createVisitor(createUserDto);
    this.returnCookie(res,payload);
    return {message: 'Bienvenido'};
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) res: Response) {
    const payload = await this.authService.login(loginUserDto);
  
    this.returnCookie(res,payload);
    return {message: 'Bienvenido'};
  }

  @Get('validate-email/:token')
  async validateEmail(@Param('token') token: string, @Res({passthrough: true}) res: Response){
    const validado = await this.authService.validateEmail(token);
    
    if(validado) res.send('Email validado correctamente');

    return;
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
