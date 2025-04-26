import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock/stock';
import { Throttle } from '@nestjs/throttler';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async createStock(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  getAllStocks() {
    return this.stockService.getAllLiveStocks();
  }

  @Get(':symbol')
  async getStockBySymbol(@Param('symbol') symbol: string): Promise<Stock | null> {
    return this.stockService.findBySymbol(symbol);
  }
}
