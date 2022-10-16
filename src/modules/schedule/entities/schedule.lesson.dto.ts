export enum ScheduleLessonFrequency {
    NUMERATOR = "NUMERATOR",
    DENOMINATOR = "DENOMINATOR",
    ALWAYS = "ALWAYS"
}

export enum ScheduleLessonTime {
    L1 = '8:00-9:35',
    L2 = '9:45-11:20',
    L3 = '11:30-13:05',
    L4 = '13:25-15:00',
    L5 = '15:10-16:45',
    L6 = '16:55-18:30',
    L7 = '18:40-20:00',
    L8 = '20:10-21:30',
}

export class ScheduleLessonDto {
    frequency: ScheduleLessonFrequency
    time: ScheduleLessonTime
    value: string
}