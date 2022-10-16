import {Controller, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {CourseService} from "./course.service";

@Controller('courses')
@ApiTags('Courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) {
    }


    @Get()
    @ApiOperation({summary: 'Get all courses '})
    async getCourses(): Promise<String[]> {
        return this.courseService.getCourses()
    }

    @Get(':courseId/groups')
    @ApiOperation({summary: 'Get course groups'})
    @ApiParam({name: "courseId", required: true, description: "Course identifier", type: String})
    async getCourseGroups(
        @Param('courseId') courseId
    ) {
        return this.courseService.getCourseGroups(courseId)
    }

    @Get(':courseId/groups/:groupId')
    @ApiOperation({summary: 'Get group subgroups'})
    @ApiParam({name: "courseId", required: true, description: "Course identifier", type: String})
    @ApiParam({name: "groupId", required: true, description: "Group identifier", type: String})
    async getGroupSubgroups(
        @Param('courseId') courseId,
        @Param('groupId') groupId
    ) {
        return this.courseService.getGroupSubgroups(courseId, groupId)
    }
}
