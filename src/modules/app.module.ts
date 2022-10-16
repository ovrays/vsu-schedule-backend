import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';
import {DocsModule} from './docs.module';
import {SwaggerModule} from '@nestjs/swagger';
import {DatabaseModule} from './database.module';
import {FlowModule} from "./flow/flow.module";
import {APP_FILTER, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import {GlobalExceptionFilter} from "../middleware/exception.filter";
import {GlobalValidationPipe} from "../middleware/validation.pipe";
import {CourseModule} from './course/course.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        DatabaseModule,
        SwaggerModule,
        DocsModule,
        FlowModule,
        CourseModule,
        TableModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useClass: GlobalValidationPipe,
        },
    ],
})
export class AppModule {
}
