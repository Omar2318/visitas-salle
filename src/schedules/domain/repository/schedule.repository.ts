import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "../interfaces";

export interface ScheduleRepository {
    create(universityAdminId: string, createScheduleOptions: CreateScheduleOptions[]): Promise<void>;
    findOne(universityAdminId: string): Promise<ScheduleInterface[]>;
    update(universityAdminId: string, updateScheduleOptions: UpdateScheduleOptions): Promise<void>;
    removeOne(universityAdminId: string, scheduleId: string): Promise<boolean>;
    removeAll(universityAdminId: string): Promise<boolean>;
}

export interface ScheduleDatasource extends ScheduleRepository{

}