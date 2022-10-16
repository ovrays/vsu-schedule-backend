import {ScheduleLessonDto} from "./schedule.lesson.dto";
import {ScheduleDay} from "./schedule.entity";

export class ScheduleEntry {
    day: ScheduleDay
    lessons: ScheduleLessonDto[]
}