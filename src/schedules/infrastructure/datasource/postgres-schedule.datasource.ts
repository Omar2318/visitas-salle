import { Injectable } from "@nestjs/common";
import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "src/schedules/domain/interfaces";
import { ScheduleDatasource } from "src/schedules/domain/repository/schedule.repository";

@Injectable()
export class PostgresScheduleDs implements ScheduleDatasource{

    public async create(createScheduleOptions: CreateScheduleOptions[]): Promise<void> {
        
    }

    public async findOne(userId: string): Promise<ScheduleInterface[]> {
        throw ''
    }

    public async removeOne(userId: string, scheduleId: string): Promise<boolean> {
        throw ''
    }

    public async removeAll(userId: string): Promise<boolean> {
        throw ''
    }

    public async update(updateScheduleOptions: UpdateScheduleOptions): Promise<void> {
        throw ''
    }
}