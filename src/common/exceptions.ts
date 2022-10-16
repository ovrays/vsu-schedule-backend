import {HttpException, HttpStatus, Logger} from '@nestjs/common';
import {EntityNotFoundError, TypeORMError} from 'typeorm'

export class CommonException extends HttpException {
    constructor(message: string, description: string | object, status: number) {
        const timestamp = new Date()
            .toISOString();

        super(
            {
                message,
                description,
                timestamp,
            },
            status,
        );
    }
}

export interface ExceptionOptions {
    message?: string;
    description?: string | object;
}

export class ExceptionFactory {
    // Syntax error in request body
    static BadRequest = (
        options?: ExceptionOptions,
    ) => new CommonException(options.message || "Bad Request", options.description, HttpStatus.BAD_REQUEST);

    // Unable to process syntactically correct request body
    static Unprocessable = (
        options?: ExceptionOptions
    ) => new CommonException(options.message || "Unprocessable Entity", options.description, HttpStatus.UNPROCESSABLE_ENTITY)

    // Authentication required
    static Unauthorized = (
        options?: ExceptionOptions,
    ) => new CommonException(options.message || "Unauthorized", options.description, HttpStatus.UNAUTHORIZED);


    // Not enough permissions
    static Forbidden = (
        options?: ExceptionOptions,
    ) => new CommonException(options.message || "Forbidden", options.description, HttpStatus.FORBIDDEN);

    static InternalError = (
        options?: ExceptionOptions,
    ) => new CommonException(options.message || "Internal Server Error", options.description, HttpStatus.INTERNAL_SERVER_ERROR);

    static fromError(error: Error) {
        if (error instanceof CommonException) return error;

        if (error instanceof HttpException) return this.fromHttp(error);

        if (error instanceof TypeORMError) return this.fromTypeORM(error);

        Logger.error(error);

        return ExceptionFactory.InternalError();
    }

    static fromHttp(httpException: HttpException): CommonException {
        return new CommonException(
            httpException.message,
            httpException.getResponse(),
            httpException.getStatus(),
        );
    }

    static fromTypeORM(error: TypeORMError): CommonException {
        let description = error.message;

        if (error instanceof EntityNotFoundError)
            description = "Entity not found";

        if (error.message.includes("FOREIGN"))
            description = "Referenced entity not found";

        if (error.message.includes("UNIQUE"))
            description = "Unique constraint failed";

        return ExceptionFactory.Unprocessable({ description });
    }
}