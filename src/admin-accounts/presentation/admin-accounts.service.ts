import { Injectable } from '@nestjs/common';
import { CreateAdminAccountDto, UpdateAdminAccountDto } from './dto';
import { CreateAdminAccount, FindAll, FindOne, UpdateAdminAccount } from '../application/use-cases';
import { HandleError } from 'src/common/errors';
import { PaginationDto } from 'src/common/dto';
import { FindAdminsDto } from './dto/find-admins.dto';

@Injectable()
export class AdminAccountsService {

  constructor(
    private readonly createAccountUseCase: CreateAdminAccount,
    private readonly findAllUseCase: FindAll,
    private readonly findOneUseCase: FindOne,
    private readonly updateAccountUseCase: UpdateAdminAccount,
  ){}

  async create(createAdminAccountDto: CreateAdminAccountDto) {
    try{
      return await this.createAccountUseCase.execute(createAdminAccountDto);
    }catch(error){
      HandleError.throw(error);
    }
    
  }

  findAll(findAdminsDto: FindAdminsDto) {
    return this.findAllUseCase.execute(findAdminsDto);
  }

  public async findOne(id: string) {
    try{
      return await this.findOneUseCase.execute(id);
    }catch(error){
      HandleError.throw(error);
    }
  }

  public async update(id: string, updateAdminAccountDto: UpdateAdminAccountDto) {
    try{
      return await this.updateAccountUseCase.execute(id,updateAdminAccountDto);
    }catch(error){
      HandleError.throw(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} adminAccount`;
  }
}
