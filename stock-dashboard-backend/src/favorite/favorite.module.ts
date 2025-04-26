import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Stock } from 'src/stock/entities/stock/stock';
import { FavoritesController } from './favorite.controller';
import { FavoritesService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Stock])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
