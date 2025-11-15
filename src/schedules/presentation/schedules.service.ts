import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
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

  
  public async create(universityAdminId: string, createScheduleDto: CreateScheduleDto) {
    
    const {schedule} = createScheduleDto;
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
    try{
      await this.scheduleRepository.create(universityAdminId,schedule);
    }catch(error){
      HandleError.throw(error);
    }
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
