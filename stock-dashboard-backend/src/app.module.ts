import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
// import { FavoritesController } from './favorite/favorite.controller';
// import { FavoritesService } from './favorite/favorite.service';
import { FavoritesModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ disable in prod
    }),
    StockModule, FavoritesModule
  ],

  // controllers: [AppController, FavoritesController],
  // providers: [AppService, FavoritesService],
})
export class AppModule { }
