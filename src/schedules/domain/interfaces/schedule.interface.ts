import { DayOfWeek } from "../enums";

export interface ScheduleInterface {
    userId: string;
    scheduleId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: DayOfWeek;
}