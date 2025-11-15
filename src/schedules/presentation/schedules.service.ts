import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto, ScheduleBlockDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepositoryImpl } from '../infrastructure/repository/schedule.repository.impl';
import { DayOfWeek } from '../domain/enums';
import { CreateScheduleOptions } from '../domain/interfaces';
import { HandleError } from 'src/common/errors';


@Injectable()
export class SchedulesService {

  constructor(
    private readonly scheduleRepository: ScheduleRepositoryImpl
  ){}

  private validateSchedule(schedule: ScheduleBlockDto[]){

    const days: Record<string, CreateScheduleOptions[]> = {};

    for(let s of schedule) {

      const {dayOfWeek,endTime,startTime} = s;

      if(endTime===startTime) throw new BadRequestException('endTime y startTime deben ser diferentes');
      if(startTime>endTime) throw new BadRequestException('endTime debe ser mayor que startTime');

      if(!days[dayOfWeek]){
        days[dayOfWeek] = [s];
        continue;
      }

      const repetido = days[dayOfWeek].find( i => i.startTime <= endTime && i.endTime >= startTime );

      if(repetido) throw new BadRequestException(`No puede haber horas repetidas en el horario`);

      days[dayOfWeek].push(s);

    }
  }

  
  public async create(universityAdminId: string, createScheduleDto: CreateScheduleDto) {
    
    const existente = await this.scheduleRepository.findOne(universityAdminId);

    if(existente.length > 0) throw new BadRequestException('No puedes insertar otro horario');

    const {schedule} = createScheduleDto;

    this.validateSchedule(schedule);

    await this.scheduleRepository.create(universityAdminId,schedule);
    
  }

  findOne(id: string) {
    return this.scheduleRepository.findOne(id);
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const existente = await this.scheduleRepository.findOne(id);
    if(existente.length === 0) throw new BadRequestException('No tienes un horario creado');
    
    const {schedule} = updateScheduleDto;
    this.validateSchedule(schedule);
    await this.scheduleRepository.update(id,schedule);
  }

  remove(id: string) {
    return this.scheduleRepository.remove(id);
  }
}
