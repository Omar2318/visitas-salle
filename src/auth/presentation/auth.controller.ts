import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { CreateVisitorDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from './dto';
import { UserRole } from '../domain/enums';
import { User } from '../infrastructure/data/postgres';
import { Auth, GetUser } from './decorators';
import { ConfigService } from '@nestjs/config';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  private returnCookie(res: Response, token: string) {

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60
    });

  }

  @Post('register')
  async createVisitor(@Body() createUserDto: CreateVisitorDto, @Res({ passthrough: true }) res: Response) {
    const payload = await this.authService.createVisitor(createUserDto);
    this.returnCookie(res, payload);
    return { message: 'Valida tu email' };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(loginUserDto);

    this.returnCookie(res, token);

    return { role: user.role};
  }

  @Get('validate-email/:token')
  async validateEmail(@Param('token') token: string, @Res() res: Response) {
    const validado = await this.authService.validateEmail(token);
    const urlFront = this.configService.get<string>('FRONT_URL');

    if (validado) {

      return res.redirect(`${urlFront}/login`);

    } else {

      return res.redirect(`${urlFront}/not-found`);

    }
  }


  @Post('forgot-password')
  async recoverPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    await this.authService.forgotPassword(email);
    return { message: 'Email mandado correctamente' };
  }

  @Post('reset-password')
  async resetPassoword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);

    return { message: 'Contraseña actualizada correctamente' };

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
