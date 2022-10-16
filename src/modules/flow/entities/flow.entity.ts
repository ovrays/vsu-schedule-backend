import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from "class-transformer";
import {ApiHideProperty} from "@nestjs/swagger";
import {Schedule} from "../../schedule/entities/schedule.entity";

@Entity()
export class Flow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course: string;

    @Column()
    group: string;

    @Column()
    subgroup: string;

    @Column()
    @Exclude()
    @ApiHideProperty()
    column: number;

    @Exclude()
    @ApiHideProperty()
    @OneToOne(() => Schedule, (schedule) => schedule.flow)
    @JoinColumn()
    schedule: Schedule;
}