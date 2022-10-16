import {ScheduleDay, ScheduleWeek} from "./schedule.entity";
import {IsEnum, IsOptional} from "class-validator";

export class GetScheduleDto {
    @IsOptional()
    @IsEnum(ScheduleDay)
    day?: ScheduleDay

    @IsOptional()
    @IsEnum(ScheduleWeek)
    week?: ScheduleWeek
}