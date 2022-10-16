import {Injectable} from '@nestjs/common';
import {InjectRepository,} from "@nestjs/typeorm";
import {Flow} from "./entities/flow.entity";
import {Repository} from 'typeorm';

@Injectable()
export class FlowService {
    constructor(
        @InjectRepository(Flow)
        private readonly flowRepository: Repository<Flow>,
    ) {
    }

    async getFlows(): Promise<Flow[]> {
        return this.flowRepository.find()
    }

    async save(flow: Flow) {
        return this.flowRepository.save(flow)
    }
}
