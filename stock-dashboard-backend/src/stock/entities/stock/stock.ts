import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('stocks')
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Symbol: string;

    @Column()
    AssetType: string;

    @Column()
    Name: string;

    @Column({ type: 'text' })
    Description: string;

    @Column()
    CIK: string;

    @Column()
    Exchange: string;

    @Column()
    Currency: string;

    @Column()
    Country: string;

    @Column()
    Sector: string;

    @Column()
    Industry: string;

    @Column({ type: 'text' })
    Address: string;

    @Column({ nullable: true })
    OfficialSite: string;

    @Column()
    FiscalYearEnd: string;

    @Column()
    LatestQuarter: string;

    @Column({ type: 'bigint' })
    MarketCapitalization: string;

    @Column()
    EBITDA: string;

    @Column()
    PERatio: string;

    @Column()
    PEGRatio: string;

    @Column()
    BookValue: string;

    @Column()
    DividendPerShare: string;

    @Column()
    DividendYield: string;

    @Column()
    EPS: string;

    @Column()
    RevenuePerShareTTM: string;

    @Column()
    ProfitMargin: string;

    @Column()
    OperatingMarginTTM: string;

    @Column()
    ReturnOnAssetsTTM: string;

    @Column()
    ReturnOnEquityTTM: string;

    @Column()
    RevenueTTM: string;

    @Column()
    GrossProfitTTM: string;

    @Column()
    DilutedEPSTTM: string;

    @Column()
    QuarterlyEarningsGrowthYOY: string;

    @Column()
    QuarterlyRevenueGrowthYOY: string;

    @Column()
    AnalystTargetPrice: string;

    @Column()
    AnalystRatingStrongBuy: string;

    @Column()
    AnalystRatingBuy: string;

    @Column()
    AnalystRatingHold: string;

    @Column()
    AnalystRatingSell: string;

    @Column()
    AnalystRatingStrongSell: string;

    @Column()
    TrailingPE: string;

    @Column()
    ForwardPE: string;

    @Column()
    PriceToSalesRatioTTM: string;

    @Column()
    PriceToBookRatio: string;

    @Column()
    EVToRevenue: string;

    @Column()
    EVToEBITDA: string;

    @Column()
    Beta: string;

    @Column()
    '52WeekHigh': string;

    @Column()
    '52WeekLow': string;

    @Column()
    '50DayMovingAverage': string;

    @Column()
    '200DayMovingAverage': string;

    @Column()
    SharesOutstanding: string;

    @Column()
    DividendDate: string;

    @Column()
    ExDividendDate: string;

    // Define the relation to Favorite
    @OneToMany(() => Favorite, favorite => favorite.stock)
    favorites: Favorite[];
}
