import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {  ArrayNotEmpty, IsEnum, IsOptional, Matches,ValidateNested } from "class-validator";
import { DayOfWeek } from "src/schedules/domain/enums";
import { CreateScheduleOptions } from "src/schedules/domain/interfaces";



export class ScheduleBlockDto implements CreateScheduleOptions{

  @IsEnum(DayOfWeek)
  @ApiProperty({enum: DayOfWeek})
  dayOfWeek: DayOfWeek;

  @Matches(/^(0[7-9]|1\d|20):[0-5]\d$/, {
    message: 'startTime must be between 07:00 and 20:59 in HH:mm format'
  })
  @ApiProperty()
  startTime: string;

  @Matches(/^(0[7-9]|1\d|20):[0-5]\d$/, {
    message: 'endTime must be between 07:00 and 20:59 in HH:mm format'
  })
  @ApiProperty()
  endTime: string;
}



export class CreateScheduleDto {
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => ScheduleBlockDto)
  @ApiProperty({type: [ScheduleBlockDto]})
  schedule: ScheduleBlockDto[];

}