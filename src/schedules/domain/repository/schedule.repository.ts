import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "../interfaces";

export interface ScheduleRepository {
    create(createScheduleOptions: CreateScheduleOptions[]): Promise<void>;
    findOne(userId: string): Promise<ScheduleInterface[]>;
    update(updateScheduleOptions: UpdateScheduleOptions): Promise<void>;
    removeOne(userId: string, scheduleId: string): Promise<boolean>;
    removeAll(userId: string): Promise<boolean>;
}

export interface ScheduleDatasource extends ScheduleRepository{

}