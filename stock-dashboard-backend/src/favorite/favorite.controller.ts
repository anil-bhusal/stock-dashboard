import { Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { Stock } from 'src/stock/entities/stock/stock';
import { Throttle } from '@nestjs/throttler';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post(':stockId')
  async markAsFavorite(@Param('stockId') stockId: number) {
    return this.favoritesService.markAsFavorite(stockId);
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Delete(':stockId')
  async unmarkAsFavorite(@Param('stockId') stockId: number) {
    return this.favoritesService.unmarkAsFavorite(stockId);
  }

  @Get()
  async getFavorites(): Promise<Stock[]> {
    return this.favoritesService.getFavorites();
  }
}
