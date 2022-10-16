import {Injectable, ValidationError, ValidationPipe} from "@nestjs/common";
import {ExceptionFactory} from "../common/exceptions";

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) =>
                ExceptionFactory.BadRequest({
                    description: errors.map(error => error.constraints)
                }),
        });
    }
}