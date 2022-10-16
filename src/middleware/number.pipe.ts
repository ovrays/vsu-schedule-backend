import {ParseIntPipe} from "@nestjs/common";
import {ExceptionFactory} from "../common/exceptions";

export class ParseNumberPipe extends ParseIntPipe {
    constructor() {
        super({
            exceptionFactory: error => ExceptionFactory.BadRequest({
                description: error
            })
        });
    }
}