import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock/stock';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) { }

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
