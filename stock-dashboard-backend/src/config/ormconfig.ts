import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Stock } from 'src/stock/entities/stock/stock';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_NAME,
  synchronize: false, // Don't use true in production
  logging: false,
  entities: [Stock, Favorite],
  migrations: ['src/migrations/*.ts'],
});