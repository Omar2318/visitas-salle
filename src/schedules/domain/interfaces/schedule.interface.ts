import { DayOfWeek } from "../enums";

export interface ScheduleInterface {
    id: string;
    startTime: string;
    endTime: string;
    dayOfWeek: DayOfWeek;
}