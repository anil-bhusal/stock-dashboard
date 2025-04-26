import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StockModule } from './stock/stock.module';
import { FavoritesModule } from './favorite/favorite.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SanitizeInterceptor } from './common/interceptors/sanitize.interceptor';
import { EncryptionInterceptor } from './common/interceptors/encryption.interceptor';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Database configuration for TypeORM (PostgreSQL)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,  // Automatically load all entities
      synchronize: true,       // Do not use synchronize in production
    }),

    /**
     * Applies rate-limiting globally (e.g., 10 requests per minute per IP).
     * Helps prevent abuse or DoS attacks.
     */
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),

    // Your custom modules
    StockModule,
    FavoritesModule,
  ],

  /**
  * Global providers that apply to the entire app.
  * - Exception Filter: catches and formats unhandled HTTP errors.
  * - Sanitize Interceptor: cleans outgoing response data from XSS.
  */
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Global Exception Filter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SanitizeInterceptor, // Output Sanitizer for cleaning data
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EncryptionInterceptor, // Encryption Interceptor
    },
  ],
})
export class AppModule { }
