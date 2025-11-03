import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateVisitorDto, LoginUserDto } from './presentation/dto';
import { JwtPayload } from './presentation/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './infrastructure/data/postgres';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateVisitorDto) {
    try {
      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });


      await this.userRepository.save(user) 

      return this.getJwtToken({id: user.id});
    }catch (error) {
      this.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    const {password, email} = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: { email: true, password: true, id: true}
    });

    if(!user) throw new UnauthorizedException('Credentials are not valid');

    if(!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid');
    
    return this.getJwtToken({id: user.id});
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleError(error:any): never{
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }



}
