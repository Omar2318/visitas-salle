import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Auth, GetUser } from 'src/auth/presentation/decorators';
import { User } from 'src/auth/infrastructure/data/postgres';
import { UserRole } from 'src/auth/domain/enums';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @Auth(UserRole.UniversityAdmin)
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @GetUser() user: User
  ) {
    await this.schedulesService.create(user.universityAdmin!.id, createScheduleDto);
    return {message: 'Horario creado correctamente'};
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Patch('')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
