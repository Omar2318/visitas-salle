import { Injectable } from "@nestjs/common";
import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "src/schedules/domain/interfaces";
import { ScheduleRepository } from "src/schedules/domain/repository/schedule.repository";
import { PostgresScheduleDs } from "../datasource/postgres-schedule.datasource";

@Injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository{
    
    constructor(
        private readonly scheduleDatasource: PostgresScheduleDs
    ){}

    create(createScheduleOptions: CreateScheduleOptions[]): Promise<void> {
        return this.scheduleDatasource.create(createScheduleOptions);
    }

    findOne(userId: string): Promise<ScheduleInterface[]> {
        return this.scheduleDatasource.findOne(userId);
    }

    removeAll(userId: string): Promise<boolean> {
        return this.scheduleDatasource.removeAll(userId);
    }

    removeOne(userId: string, scheduleId: string): Promise<boolean> {
        return this.scheduleDatasource.removeOne(userId,scheduleId);
    }

    update(updateScheduleOptions: UpdateScheduleOptions): Promise<void> {
        return this.scheduleDatasource.update(updateScheduleOptions);
    }
}