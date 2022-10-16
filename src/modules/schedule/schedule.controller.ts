import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {ScheduleService} from "./schedule.service";
import {ScheduleDay, ScheduleWeek} from "./entities/schedule.entity";
import {GetScheduleDto} from "./entities/get.schedule.dto";
import {ParseNumberPipe} from "../../middleware/number.pipe";

@Controller('schedule')
@ApiTags('Schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService
    ) {
    }

    @Get(':flowId')
    @ApiParam({name: "flowId", required: true, description: "Flow identifier", type: Number})
    @ApiQuery({name: "day", required: false, description: "Day", enum: ScheduleDay, type: String})
    @ApiQuery({name: "week", required: false, description: "Week", enum: ScheduleWeek, type: String})
    @ApiOperation({summary: "Get flow schedule"})
    async getSchedule(
        @Param('flowId', ParseNumberPipe)
            flowId: number,
        @Query()
        dto: GetScheduleDto
    ) {
        return this.scheduleService.getSchedule(flowId, dto.day, dto.week)
    }
}
