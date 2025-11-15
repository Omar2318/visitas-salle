import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException, Put } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Auth, GetUser } from 'src/auth/presentation/decorators';
import { User } from 'src/auth/infrastructure/data/postgres';
import { UserRole } from 'src/auth/domain/enums';
import { AuthRouteDoc } from 'documentation/auth';
import { CreateScheduleDoc, DeleteScheduleDoc, FindByOwnerDoc, FindByVisitorDoc, UpdateScheduleDoc } from 'documentation/schedules';

@Controller('schedules')
@AuthRouteDoc()
export class SchedulesController {

  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @Auth(UserRole.UniversityAdmin)
  @CreateScheduleDoc()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @GetUser() user: User
  ) {
    await this.schedulesService.create(user.universityAdmin!.id, createScheduleDto);
    return {message: 'Horario creado correctamente'};
  }

  @Get()
  @Auth(UserRole.UniversityAdmin)
  @FindByOwnerDoc()
  findOwnSchedule(
    @GetUser() user: User
  ){
    return this.schedulesService.findOne(user.universityAdmin!.id);
  }

  @Put('')
  @Auth(UserRole.UniversityAdmin)
  @UpdateScheduleDoc()
  async update(
    @Body() updateScheduleDto: UpdateScheduleDto,
    @GetUser() user: User
  ) {
    await this.schedulesService.update(user.universityAdmin!.id, updateScheduleDto);
    return {message: 'Horario actualizado correctamente'};
  }

  @Delete()
  @Auth(UserRole.UniversityAdmin)
  @DeleteScheduleDoc()
  async remove(@GetUser() user: User) {
    const wasDeleted = await this.schedulesService.remove(user.universityAdmin!.id);
    if(!wasDeleted) throw new BadRequestException('No tienes un horario para eliminar');

    return {message: 'Horario eliminado correctamente'};
  }

  @Get('admin/:id')
  @Auth(UserRole.Visitor)
  @FindByVisitorDoc()
  async findOneScheduleAdmin(@Param('id', ParseUUIDPipe) id: string) {
    const schedule = await this.schedulesService.findOne(id);

    if(schedule.length === 0) throw new BadRequestException('Administrador no encontrado o no tiene horario');

    return schedule;
  }

}
