import { Injectable } from '@nestjs/common';
import { CreateVisitorDto, LoginUserDto, ResetPasswordDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateVisitor, ForgotPassword, LoginUser, ResetPassword, ValidateEmail } from '../application/use-cases';
import { HandleError } from 'src/common/errors';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly createVisitorUseCase: CreateVisitor,
    private readonly loginUserUseCase: LoginUser,
    private readonly validateEmailUseCase: ValidateEmail,
    private readonly forgotPasswordUseCase: ForgotPassword,
    private readonly resetPasswordUseCase: ResetPassword
  ) { }

  async createVisitor(createUserDto: CreateVisitorDto) {
    try {
      const newUser = await this.createVisitorUseCase.execute(createUserDto);

      return this.getJwtToken({id: newUser.userId});

    }catch (error) {
     
      HandleError.throw(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    try{
      const user = await this.loginUserUseCase.execute(loginUserDto);
      return {token: this.getJwtToken({id: user.userId}), user};
    }catch(error){
      HandleError.throw(error)
    }
    
  }

  public async validateEmail(token: string){
    try{
      return await this.validateEmailUseCase.execute(token);
    }catch(error){
     
      HandleError.throw(error);
    }
  }

  public async forgotPassword(email:string){
    try{
      await this.forgotPasswordUseCase.execute(email);
    }catch(error){
      HandleError.throw(error);
    }
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto){
    try{
      return await this.resetPasswordUseCase.execute(resetPasswordDto);
    }catch(error){
      HandleError.throw(error)
    }
  }








  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }


}
