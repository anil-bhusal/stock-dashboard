import { DataSource } from 'typeorm';
import { stocks } from './stock.seed';
import { Stock } from 'src/stock/entities/stock/stock';


const AppDataSource = new DataSource({
    type: 'postgres', // or mysql/mariadb/sqlite
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_NAME,
    entities: [Stock],
    synchronize: true, // ONLY FOR DEV, NOT IN PRODUCTION
});

async function seed() {
    await AppDataSource.initialize();

    for (const stock of stocks) {
        const repo = AppDataSource.getRepository(Stock);
        const newStock = repo.create(stock);
        await repo.save(newStock);
    }

    console.log('Seeding finished');
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('Seeding error', err);
    process.exit(1);
});
