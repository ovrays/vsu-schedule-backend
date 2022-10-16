import {Module} from '@nestjs/common';
import {FlowController} from './flow.controller';
import {FlowService} from './flow.service';
import {Flow} from "./entities/flow.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Flow])],
    controllers: [FlowController],
    providers: [FlowService],
    exports: [FlowService]
})
export class FlowModule {
}
