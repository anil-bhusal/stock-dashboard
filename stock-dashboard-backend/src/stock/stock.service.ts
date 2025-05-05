import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Stock } from './entities/stock/stock';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';

dotenv.config();

@Injectable()
export class StockService {

    constructor(
        @InjectRepository(Stock)
        private stockRepository: Repository<Stock>,
    ) { }


    async create(createStockDto: CreateStockDto): Promise<Stock> {
        const stock = this.stockRepository.create(createStockDto);
        return this.stockRepository.save(stock);
    }


    async getAllLiveStocks(): Promise<Stock[]> {
        // const stocks = await this.stockRepository
        //     .createQueryBuilder("stock")
        //     .leftJoinAndSelect("stock.favorites", "favorite")
        //     .getMany();

        // // Sort to move favorites to the top
        // stocks.sort((a, b) => {
        //     const aFav = a.favorites?.some(f => f.isFavorite) ? 1 : 0;
        //     const bFav = b.favorites?.some(f => f.isFavorite) ? 1 : 0;
        //     return bFav - aFav; // Descending order: true (1) comes before false (0)
        // });

        // return stocks;

        return await this.stockRepository
            .createQueryBuilder("stock")
            .leftJoinAndSelect("stock.favorites", "favorite")
            .addSelect(`
                    CASE 
                        WHEN EXISTS (
                            SELECT 1 
                            FROM "favorite" f 
                            WHERE f."stockId" = stock.id AND f."isFavorite" = true
                        ) THEN 1 
                        ELSE 0 
                    END
                `, "is_fav")
            .orderBy("is_fav", "DESC")
            .addOrderBy("stock.id", "ASC")
            .getMany();
    }

    async findBySymbol(symbol: string): Promise<Stock | null> {
        return await this.stockRepository.findOne({ where: { Symbol: symbol } });
    }
}
