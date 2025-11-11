import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, } from '@nestjs/common';
import { AreaService } from './area.service';
import { PaginationDto } from 'src/common/dto';
import { Auth } from 'src/auth/presentation/decorators';
import { UserRole } from 'src/auth/domain/enums';
import { CreateAreaDto, UpdateAreaDto } from './dto';
import { CreateAreaDoc, FindAllDoc, FindOneDoc, RemoveAreaDoc, UpdateAreaDoc } from 'documentation/area';
import { AuthRouteDoc } from 'documentation/auth';

 
@AuthRouteDoc()
@Controller('area')
export class AreaController {

  constructor(private readonly areaService: AreaService) {}

  @Post()
  @Auth(UserRole.SystemAdmin)
  @CreateAreaDoc()
  async create(@Body() createAreaDto: CreateAreaDto) {
    await this.areaService.create(createAreaDto);
    return { message: 'Área creada correctamente' };
  }

  @Get()
  @Auth()
  @FindAllDoc()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.areaService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @FindOneDoc()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRole.SystemAdmin)
  @UpdateAreaDoc()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    await this.areaService.update(id, updateAreaDto);
    return { message: 'Area actualizada correctamente' };
  }

  @Delete(':id')
  @Auth(UserRole.SystemAdmin)
  @RemoveAreaDoc()
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.areaService.remove(id);
    return { message: 'Area eliminada correctamente' };
  }
}
