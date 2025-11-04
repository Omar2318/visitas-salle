import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateVisitorDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../infrastructure/data/postgres';
import { UserError } from '../domain/errors';
import { CreateVisitor, LoginUser } from '../application/use-cases';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly createVisitorUseCase: CreateVisitor,
    private readonly loginUserUseCase: LoginUser,
  ) { }

  async createVisitor(createUserDto: CreateVisitorDto) {
    try {
      const newUser = await this.createVisitorUseCase.execute(createUserDto);

      return this.getJwtToken({id: newUser.id});

    }catch (error) {
      this.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    try{
      const userId = await this.loginUserUseCase.execute(loginUserDto);
      return this.getJwtToken({id: userId});
    }catch(error){
      this.handleError(error);
    }
    
    
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleError(error:any): never{
    if(error instanceof UserError){
      throw new BadRequestException(error.message);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }



}
