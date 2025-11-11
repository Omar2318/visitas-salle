import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AdminAccountsService } from './admin-accounts.service';
import { CreateAdminAccountDto, UpdateAdminAccountDto } from './dto';
import { Auth } from 'src/auth/presentation/decorators';
import { UserRole } from 'src/auth/domain/enums';
import { PaginationDto } from 'src/common/dto';
import { FindAllDoc } from 'documentation/admin-accounts';
import { FindAdminsDto } from './dto/find-admins.dto';


@Controller('admin-accounts')
export class AdminAccountsController {

  constructor(private readonly adminAccountsService: AdminAccountsService) {}

  @Post()
  @Auth(UserRole.SystemAdmin)
  async create(@Body() createAdminAccountDto: CreateAdminAccountDto) {
    await this.adminAccountsService.create(createAdminAccountDto);
    return {message: 'Administrador creado correctamente'};
  }

  @Get()
  @Auth(UserRole.SystemAdmin, UserRole.Visitor)
  @FindAllDoc()
  async findAll(@Query() findAdminsDto: FindAdminsDto) {
    
    return this.adminAccountsService.findAll(findAdminsDto);
  }

  @Get(':id')
  @Auth(UserRole.SystemAdmin, UserRole.Visitor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminAccountsService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRole.SystemAdmin) 
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdminAccountDto: UpdateAdminAccountDto) {
    return this.adminAccountsService.update(id, updateAdminAccountDto);
  }

  @Delete(':id')
  @Auth(UserRole.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.adminAccountsService.remove(+id);
  }
}
