import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Auth } from 'src/auth/presentation/decorators';
import { UserRole } from 'src/auth/domain/enums';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @Auth(UserRole.SystemAdmin)
  async create(@Body() createAreaDto: CreateAreaDto) {
    await this.areaService.create(createAreaDto);
    return {message: 'Area creada correctamente'};
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}
