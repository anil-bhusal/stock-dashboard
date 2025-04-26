import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Custom exception filter to handle all instances of HttpException.
 * Logs the error and sends a consistent JSON error response.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // Logger instance scoped to this class
    private readonly logger = new Logger(HttpExceptionFilter.name);

    /**
     * This method is triggered when an exception is thrown within the scope of the filter.
     * @param exception The HttpException object thrown
     * @param host Provides methods to access the context of the request/response
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        // Get HTTP-specific context
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        // Extract HTTP status code from the exception
        const status = exception.getStatus();

        // Log error details using NestJS logger
        this.logger.error(`${request.method} ${request.url} - ${status} - ${exception.message}`);

        // Send a formatted error response back to the client
        response.status(status).json({
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
