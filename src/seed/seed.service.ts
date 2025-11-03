import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, UserRole } from 'src/auth/domain/enums';
import { SystemAdmin, User } from 'src/auth/infrastructure/data/postgres';
import { Repository } from 'typeorm';


@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(SystemAdmin)
    private readonly systemAdminRepo: Repository<SystemAdmin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}
  async execute(){
    const resultado = await this.systemAdminRepo.count();
    if(resultado == 1) throw new BadRequestException('No puedes tener otro super admin');

    const admin = this.systemAdminRepo.create({user: this.userRepo.create({
      names: 'omar',
      lastName: 'ramirez',
      secondLastName: 'morales',
      email: 'omar@omar.com',
      password: 'sexo',
      gender: Gender.Masculino,
      role: UserRole.SystemAdmin,
    })});

    return this.systemAdminRepo.save(admin);

  }
}
