import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Stock } from 'src/stock/entities/stock/stock';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async markAsFavorite(stockId: number): Promise<Favorite> {
    const stock = await this.stockRepository.findOne({ where: { id: stockId } });

    if (!stock) {
      throw new Error('Stock not found');
    }

    let favorite = await this.favoriteRepository.findOne({ where: { stock } });

    if (!favorite) {
      // Create a new favorite entry if it doesn't exist
      favorite = this.favoriteRepository.create({ stock, isFavorite: true });
      await this.favoriteRepository.save(favorite);
    } else {
      // If it exists, just update
      favorite.isFavorite = true;
      await this.favoriteRepository.save(favorite);
    }

    return favorite;
  }

  async unmarkAsFavorite(stockId: number): Promise<Favorite | null> {
    const stock = await this.stockRepository.findOne({ where: { id: stockId } });

    if (!stock) {
      throw new Error('Stock not found');
    }

    const favorite = await this.favoriteRepository.findOne({ where: { stock } });

    if (favorite) {
      favorite.isFavorite = false;
      await this.favoriteRepository.save(favorite);
    }

    return favorite;
  }

  async getFavorites(): Promise<Stock[]> {
    const favorites = await this.favoriteRepository.find({
      where: { isFavorite: true },
      relations: ['stock'],
    });
    return favorites.map(fav => fav.stock);
  }
}
