import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SanitizeInterceptor } from './common/interceptors/sanitize.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 1. Set Security HTTP Headers using Helmet
   * Helmet helps protect your app from some well-known web vulnerabilities by setting appropriate HTTP headers.
   */
  app.use(helmet());

  /**
   * 2. Apply Rate Limiting Middleware
   * Limits the number of requests from a single IP in a given time window (15 minutes in this case).
   * This helps prevent abuse and brute-force attacks.
   */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,                 // limit each IP to 100 requests per window
      standardHeaders: true,   // return rate limit info in `RateLimit-*` headers
      legacyHeaders: false,    // disable the deprecated `X-RateLimit-*` headers
    }),
  );

  /**
   * 3. Register Global Filters
   * Filters catch unhandled exceptions thrown in the app and allow you to return custom error responses.
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * 4. Register Global Interceptors
   * Interceptors are used for cross-cutting concerns like logging, transforming responses, or sanitizing input/output.
   */
  app.useGlobalInterceptors(new SanitizeInterceptor());

  /**
   * 5. Enable Cross-Origin Resource Sharing (CORS)
   * This allows your frontend (e.g., running on localhost:5173 or your production domain) to make API requests to this backend.
   */
  app.enableCors({
    origin: ['http://localhost:5173', 'https://your-domain.com'], // whitelist of allowed origins
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'], // allowed HTTP methods
    allowedHeaders: ['Content-Type'], // allowed headers in requests
  });

  await app.listen(3000);
}

bootstrap();
