import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { SecurityEmailService } from './security-email.service';
import { CreateSecurityEmailDto } from './dto/create-security-email.dto';
import { UpdateSecurityEmailDto } from './dto/update-security-email.dto';
import { PaginationDto } from 'src/common/dto';


@Controller('security-email')
export class SecurityEmailController {
  constructor(private readonly securityEmailService: SecurityEmailService) {}

  @Post()
  async create(@Body() createSecurityEmailDto: CreateSecurityEmailDto) {
    await this.securityEmailService.create(createSecurityEmailDto);
    return {message: 'Email de seguridad creado correctamente'}
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.securityEmailService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.securityEmailService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSecurityEmailDto: UpdateSecurityEmailDto) {

    await this.securityEmailService.update(id, updateSecurityEmailDto);
    return {message: 'Email de seguridad actualizado correctamente'}
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.securityEmailService.remove(id);
    return {message: 'Email de seguridad eliminado correctamente'};
  }
}
