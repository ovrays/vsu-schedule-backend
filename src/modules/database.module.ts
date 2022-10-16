import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Flow} from "./flow/entities/flow.entity";
import {ScheduleModule} from './schedule/schedule.module';
import {Schedule} from "./schedule/entities/schedule.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [Flow, Schedule],
                synchronize: true,
            }),
        }),
        ScheduleModule,
    ],
})
export class DatabaseModule {
}