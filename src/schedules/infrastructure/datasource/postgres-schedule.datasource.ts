import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "src/schedules/domain/interfaces";
import { ScheduleDatasource } from "src/schedules/domain/repository/schedule.repository";
import { Schedule } from "../data/postgres";
import { Repository } from "typeorm";
import { UserError } from "src/common/errors";

@Injectable()
export class PostgresScheduleDs implements ScheduleDatasource{

    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ){}

    public async create(universityAdminId: string, createScheduleOptions: CreateScheduleOptions[]): Promise<void> {
        
        const existente = await this.scheduleRepository.find({
            relations: {universityAdmin: true},
            where: {universityAdmin: {id: universityAdminId}}
        });

        if(existente.length>0) throw new UserError('Ya tienes un horario creado');
        
        const schedules = createScheduleOptions.map((newSchedule) => 
            this.scheduleRepository.create({
                universityAdmin: {id: universityAdminId},
                ...newSchedule
            })
        );

        await this.scheduleRepository.save(schedules);
    }

    public async findOne(universityAdminId: string): Promise<ScheduleInterface[]> {
        throw ''
    }

    public async removeOne(universityAdminId: string, scheduleId: string): Promise<boolean> {
        throw ''
    }

    public async removeAll(universityAdminId: string): Promise<boolean> {
        throw ''
    }

    public async update(universityAdminId: string, updateScheduleOptions: UpdateScheduleOptions): Promise<void> {
        throw ''
    }
}