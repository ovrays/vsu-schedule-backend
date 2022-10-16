import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Flow} from "../flow/entities/flow.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ExceptionFactory} from "../../common/exceptions";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Flow)
        private readonly flowRepository: Repository<Flow>
    ) {
    }

    async getCourses(): Promise<String[]> {
        let flows = await this.flowRepository.find()

        let courses = flows.map(flow => flow.course)

        return this.uniqueEntriesOf(courses)
    }

    async getCourseGroups(courseId: string): Promise<String[]> {
        let flows = await this.flowRepository.find({
            where: {course: courseId}
        })

        if (!flows.length)
            throw ExceptionFactory.Unprocessable({ description: "Course not found"})

        return flows.map(flow => flow.group)
    }

    async getGroupSubgroups(courseId: string, groupId: string): Promise<String[]> {
        let flows = await this.flowRepository.find({
            where: {course: courseId, group: groupId}
        })

        if (!flows.length)
            throw ExceptionFactory.Unprocessable({description: "Group not found"})

        return flows.map(flow => flow.subgroup)
    }

    private uniqueEntriesOf<T>(value: Iterable<T>): Array<T> {
        let set = new Set(value)

        return [...set]
    }
}
