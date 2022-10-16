import {BaseExceptionFilter} from "@nestjs/core";
import {ArgumentsHost, Catch, Logger} from "@nestjs/common";
import {ExceptionFactory} from "../common/exceptions";

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        Logger.error(error)

        const exception = ExceptionFactory.fromError(error);

        super.catch(exception, host);
    }
}