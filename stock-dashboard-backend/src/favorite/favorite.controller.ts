import { Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { Stock } from 'src/stock/entities/stock/stock';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':stockId')
  async markAsFavorite(@Param('stockId') stockId: number) {
    return this.favoritesService.markAsFavorite(stockId);
  }

  @Delete(':stockId')
  async unmarkAsFavorite(@Param('stockId') stockId: number) {
    return this.favoritesService.unmarkAsFavorite(stockId);
  }

  @Get()
  async getFavorites(): Promise<Stock[]> {
    return this.favoritesService.getFavorites();
  }
}
