import { Injectable } from '@nestjs/common';
import { CreateVisitorDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateVisitor, LoginUser, ValidateEmail } from '../application/use-cases';
import { HandleError } from 'src/common/errors';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly createVisitorUseCase: CreateVisitor,
    private readonly loginUserUseCase: LoginUser,
    private readonly validateEmailUseCase: ValidateEmail,
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
      const userId = await this.loginUserUseCase.execute(loginUserDto);
      return this.getJwtToken({id: userId});
    }catch(error){
      HandleError.throw(error)
    }
    
  }

  public validateEmail(token: string){
    return this.validateEmailUseCase.execute(token);
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }


}
