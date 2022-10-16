import {Module} from '@nestjs/common';
import {CourseController} from './course.controller';
import {CourseService} from './course.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Flow} from "../flow/entities/flow.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Flow])],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {
}
