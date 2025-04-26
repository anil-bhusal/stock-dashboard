import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import * as sanitizeHtml from 'sanitize-html';

/**
 * SanitizeInterceptor
 * 
 * This interceptor automatically sanitizes all string responses sent from your controllers,
 * helping prevent XSS (Cross-Site Scripting) attacks by removing potentially dangerous HTML.
 */
@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
    /**
     * Intercepts the response before it's sent back to the client.
     * @param context ExecutionContext provides access to the details of the current request.
     * @param next CallHandler handles the flow to the next handler or controller method.
     * @returns Observable that sanitizes the outgoing response data.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => sanitizeRecursively(data)), // Apply sanitization recursively
        );
    }
}

/**
 * sanitizeRecursively
 * 
 * Recursively sanitizes:
 * - strings (using sanitize-html)
 * - arrays (by mapping through each element)
 * - objects (by sanitizing each key-value pair)
 * 
 * @param value The data to sanitize.
 * @returns Sanitized data.
 */
function sanitizeRecursively(value: any): any {
    if (typeof value === 'string') {
        return sanitizeHtml(value); // Sanitize strings
    } else if (Array.isArray(value)) {
        return value.map(sanitizeRecursively); // Sanitize each item in array
    } else if (typeof value === 'object' && value !== null) {
        const sanitizedObj: any = {};
        for (const key in value) {
            sanitizedObj[key] = sanitizeRecursively(value[key]); // Sanitize each property recursively
        }
        return sanitizedObj;
    }
    return value; // Return non-string values (numbers, booleans, null, etc.) as-is
}
