import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { SecurityEmailService } from './security-email.service';
import { CreateSecurityEmailDto } from './dto/create-security-email.dto';
import { UpdateSecurityEmailDto } from './dto/update-security-email.dto';
import { PaginationDto } from 'src/common/dto';
import { AuthRouteDoc } from 'documentation/auth';
import { Auth } from 'src/auth/presentation/decorators';
import { UserRole } from 'src/auth/domain/enums';
import { CreateSecEmailDoc, FindAllSecEmDoc, FindOneSecEmDoc, RemoveSecEmailDoc, UpdateSecEmailDoc } from 'documentation/security-email';


@AuthRouteDoc()
@Controller('security-email')
export class SecurityEmailController {
  constructor(private readonly securityEmailService: SecurityEmailService) { }

  @Post()
  @Auth(UserRole.SystemAdmin)
  @CreateSecEmailDoc()
  async create(@Body() createSecurityEmailDto: CreateSecurityEmailDto) {
    await this.securityEmailService.create(createSecurityEmailDto);
    return { message: 'Email de seguridad creado correctamente' }
  }

  @Get()
  @Auth(UserRole.SystemAdmin)
  @FindAllSecEmDoc()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.securityEmailService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(UserRole.SystemAdmin)
  @FindOneSecEmDoc()
  findOne(@Param('id') id: string) {
    return this.securityEmailService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRole.SystemAdmin)
  @UpdateSecEmailDoc()
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSecurityEmailDto: UpdateSecurityEmailDto) {

    await this.securityEmailService.update(id, updateSecurityEmailDto);
    return { message: 'Email de seguridad actualizado correctamente' }
  }

  @Delete(':id')
  @Auth(UserRole.SystemAdmin)
  @RemoveSecEmailDoc()
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.securityEmailService.remove(id);
    return { message: 'Email de seguridad eliminado correctamente' };
  }
}
