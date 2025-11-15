import { DayOfWeek } from "../enums";

export interface ScheduleInterface {
    scheduleId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: DayOfWeek;
}