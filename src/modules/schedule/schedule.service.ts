import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Schedule, ScheduleDay, ScheduleWeek} from "./entities/schedule.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ) {
    }

    async getSchedule(flowId: number, day: ScheduleDay, week: ScheduleWeek) {
        let schedule = await this.scheduleRepository.findOneOrFail({
            where: {
                flow: {id: flowId}
            }
        })

        if (day)
            schedule.entries = schedule.entries.filter(entry => entry.day == day)

        if (week)
            schedule.entries.forEach(entry => entry.lessons = entry.lessons.filter(lesson => lesson.frequency == week.valueOf() || lesson.frequency == "ALWAYS"))

        return schedule
    }

    async create() {
        let schedule = this.scheduleRepository.create()

        return this.scheduleRepository.save(schedule)
    }

    async save(schedule: Schedule) {
        return this.scheduleRepository.save(schedule)
    }

    async delete(scheduleId: number) {
        return this.scheduleRepository.delete({ id: scheduleId })
    }
}
