import { Stock } from "src/stock/entities/stock/stock";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stockId: string;

    @ManyToOne(() => Stock, stock => stock.favorites)
    stock: Stock;

    @Column({ default: false })
    isFavorite: boolean;
}
