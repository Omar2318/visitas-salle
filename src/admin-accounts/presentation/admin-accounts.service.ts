import { Injectable } from '@nestjs/common';
import { CreateAdminAccountDto, UpdateAdminAccountDto } from './dto';
import { CreateAdminAccount } from '../application/use-cases';
import { HandleError } from 'src/common/errors';

@Injectable()
export class AdminAccountsService {

  constructor(
    private readonly createAccountUseCase: CreateAdminAccount
  ){}

  async create(createAdminAccountDto: CreateAdminAccountDto) {
    try{
      return await this.createAccountUseCase.execute(createAdminAccountDto);
    }catch(error){
      HandleError.throw(error);
    }
    
  }

  findAll() {
    return `This action returns all adminAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminAccount`;
  }

  update(id: number, updateAdminAccountDto: UpdateAdminAccountDto) {
    return `This action updates a #${id} adminAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminAccount`;
  }
}
