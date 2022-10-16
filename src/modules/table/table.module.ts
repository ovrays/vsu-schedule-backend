import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import {HttpModule} from "@nestjs/axios";
import {FlowModule} from "../flow/flow.module";
import {ScheduleModule} from "../schedule/schedule.module";

@Module({
  imports: [HttpModule, FlowModule, ScheduleModule],
  providers: [TableService]
})
export class TableModule {}
