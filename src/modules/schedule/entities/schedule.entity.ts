import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Flow} from "../../flow/entities/flow.entity";
import {ScheduleEntry} from "./schedule.entry.dto";

export enum ScheduleDay {
    D1 = "MONDAY",
    D2 = "TUESDAY",
    D3 = "WEDNESDAY",
    D4 = "THURSDAY",
    D5 = "FRIDAY",
    D6 = "SATURDAY",
    D7 = "SUNDAY"
}

export enum ScheduleWeek {
    NUMERATOR = "NUMERATOR",
    DENOMINATOR = "DENOMINATOR"
}

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Flow, (flow) => flow.schedule)
    flow: Flow

    @Column({
        type: "jsonb",
        nullable: false,
        default: () => "'{}'"
    })
    entries: ScheduleEntry[]
}