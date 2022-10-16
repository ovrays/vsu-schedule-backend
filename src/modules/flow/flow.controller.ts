import {Controller, Get} from '@nestjs/common';
import {FlowService} from './flow.service';
import {Flow} from "./entities/flow.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller('flows')
@ApiTags('Flows')
export class FlowController {
    constructor(
        private readonly flowService: FlowService
    ) {
    }

    @Get()
    @ApiOperation({summary: 'Get all flows'})
    async getFlows(): Promise<Flow[]> {
        return this.flowService.getFlows()
    }
}
