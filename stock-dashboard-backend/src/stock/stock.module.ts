import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock/stock';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockService],
  controllers: [StockController]
})
export class StockModule {}
