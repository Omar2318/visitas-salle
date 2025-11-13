import { CreateScheduleOptions } from "./create-schedule.options";

export type UpdateScheduleOptions = Partial<CreateScheduleOptions> & {
    scheduleId: string;
}