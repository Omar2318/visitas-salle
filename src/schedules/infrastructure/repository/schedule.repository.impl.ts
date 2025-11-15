import { Injectable } from "@nestjs/common";
import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "src/schedules/domain/interfaces";
import { ScheduleRepository } from "src/schedules/domain/repository/schedule.repository";
import { PostgresScheduleDs } from "../datasource/postgres-schedule.datasource";

@Injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository{
    
    constructor(
        private readonly scheduleDatasource: PostgresScheduleDs
    ){}

    create(universityAdminId: string, createScheduleOptions: CreateScheduleOptions[]): Promise<void> {
        return this.scheduleDatasource.create(universityAdminId, createScheduleOptions);
    }

    findOne(universityAdminId: string): Promise<ScheduleInterface[]> {
        return this.scheduleDatasource.findOne(universityAdminId);
    }

    removeAll(universityAdminId: string): Promise<boolean> {
        return this.scheduleDatasource.removeAll(universityAdminId);
    }

    removeOne(universityAdminId: string, scheduleId: string): Promise<boolean> {
        return this.scheduleDatasource.removeOne(universityAdminId,scheduleId);
    }

    update(universityAdminId: string, updateScheduleOptions: UpdateScheduleOptions): Promise<void> {
        return this.scheduleDatasource.update(universityAdminId, updateScheduleOptions);
    }
}