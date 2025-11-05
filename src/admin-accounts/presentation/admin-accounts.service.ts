import { Injectable } from '@nestjs/common';
import { CreateAdminAccountDto, UpdateAdminAccountDto } from './dto';

@Injectable()
export class AdminAccountsService {
  create(createAdminAccountDto: CreateAdminAccountDto) {
    return 'This action adds a new adminAccount';
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
