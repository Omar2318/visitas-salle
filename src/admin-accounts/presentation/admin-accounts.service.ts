import { Injectable } from '@nestjs/common';
import { CreateAdminAccountDto, UpdateAdminAccountDto } from './dto';
import { CreateAdminAccount, FindAll } from '../application/use-cases';
import { HandleError } from 'src/common/errors';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class AdminAccountsService {

  constructor(
    private readonly createAccountUseCase: CreateAdminAccount,
    private readonly findAllUseCase: FindAll,
  ){}

  async create(createAdminAccountDto: CreateAdminAccountDto) {
    try{
      return await this.createAccountUseCase.execute(createAdminAccountDto);
    }catch(error){
      HandleError.throw(error);
    }
    
  }

  findAll(paginationDto: PaginationDto) {
    return this.findAllUseCase.execute(paginationDto);
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
