import { DataSource } from 'typeorm';
import { Stock } from './stock/entities/stock/stock';
import { Favorite } from './favorite/entities/favorite.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_NAME,
  synchronize: false, // Don't use true in production
  logging: false,
  entities: [Stock, Favorite],
  migrations: ['src/migrations/*.ts'],
});